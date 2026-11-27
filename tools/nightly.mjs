// =====================================================================
//  Mixtape – nächtliche Prüfung (läuft als GitHub Action, ohne Handy)
//  1) Korrekturen aus der App (Issues „[mixtape-auto]“ von WillyBeLate) übernehmen
//  2) Spotify-Abgleich für Songs ohne feste ID (Client-Credentials)
//  3) MusicBrainz-Jahresprüfung für ungeprüfte Songs
//  Eindeutige Treffer → ids.js / geprueft.js. Unsichere → tools/pruefen.json (prüft Claude).
// =====================================================================
import fs from "node:fs";
import vm from "node:vm";

const ROOT = new URL("..", import.meta.url).pathname;
const rd = f => fs.readFileSync(ROOT + f, "utf8");
const wr = (f, t) => fs.writeFileSync(ROOT + f, t);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OWNER = "WillyBeLate";
const REPO = process.env.REPO || "WillyBeLate/mixtape";
const MAX_SPOTIFY = +(process.env.MAX_SPOTIFY || 400), MAX_MB = +(process.env.MAX_MB || 900);
const deadline = Date.now() + 45 * 60e3;   // nach 45 Min. aufhören, Rest morgen

// ---------- Daten laden ----------
const ctx = {};
vm.createContext(ctx);
vm.runInContext(rd("daten.js") + rd("ids.js") + rd("geprueft.js") +
  ";this.SONGS=SONGS;this.SPOTIFY_IDS=SPOTIFY_IDS;this.MB_GEPRUEFT=MB_GEPRUEFT;this.BESTAETIGT=typeof BESTAETIGT!=='undefined'?BESTAETIGT:new Set();" +
  "this.NICHT_BEI_SPOTIFY=typeof NICHT_BEI_SPOTIFY!=='undefined'?NICHT_BEI_SPOTIFY:[];", ctx);
const { SONGS, SPOTIFY_IDS, MB_GEPRUEFT, BESTAETIGT } = ctx;
const NOSPOT = new Set(ctx.NICHT_BEI_SPOTIFY);
const html = rd("index.html");
const SYNC_FALSCH = new Set(JSON.parse("[" + (html.match(/const SYNC_FALSCH = new Set\(\[([^\]]*)\]\)/) || [, ""])[1] + "]"));
const key = s => s[0] + "|" + s[1];
const inlineId = s => typeof s[5] === "string" ? s[5] : null;
let pruefen = fs.existsSync(ROOT + "tools/pruefen.json") ? JSON.parse(rd("tools/pruefen.json")) : { spotify: {}, jahr: {} };
pruefen.spotify ??= {}; pruefen.jahr ??= {};
const sum = { fix: 0, nospot: 0, ids: 0, mb: 0, review: 0, issues: [] };

// ---------- 1) Korrekturen aus der App ----------
async function gh(path, opt = {}){
  const r = await fetch("https://api.github.com" + path, { ...opt, headers: { Authorization: "Bearer " + process.env.GH_TOKEN, Accept: "application/vnd.github+json", "Content-Type": "application/json" } });
  if (!r.ok) throw new Error("GitHub " + r.status + " " + path);
  return r.status === 204 ? null : r.json();
}
if (process.env.GH_TOKEN) {
  const iss = await gh(`/repos/${REPO}/issues?state=open&per_page=100&creator=${OWNER}`);
  for (const it of iss.filter(i => i.title.startsWith("[mixtape-auto]") && !i.pull_request)) {
    const m = (it.body || "").match(/```json\s*([\s\S]*?)```/); if (!m) continue;
    let d; try { d = JSON.parse(m[1]); } catch(e) { continue; }
    for (const [k, v] of Object.entries(d.fix || {})) {
      if (!v?.id || !/^[A-Za-z0-9]{22}$/.test(v.id)) continue;
      SPOTIFY_IDS[k] = v.id; NOSPOT.delete(k); delete pruefen.spotify[k]; sum.fix++;
    }
    for (const k of d.nospot || []) { if (typeof k === "string") { NOSPOT.add(k); delete SPOTIFY_IDS[k]; sum.nospot++; } }
    sum.issues.push(it.number);
  }
}

// ---------- 2) Spotify ----------
const BAD = /\b(live|remix|mixed|karaoke|instrumental|cover|tribute|re-?record(ed)?|taylor'?s version|acoustic|unplugged|demo|sped up|slowed|nightcore|orchestral|symphonic|edit by|8-bit|lullaby)\b/i;
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^the\s+/, "").replace(/[^a-z0-9]/g, "");
const cleanTitle = t => t.replace(/\(.*?\)/g, "").replace(/[!?,.]/g, " ").replace(/\s+/g, " ").trim();
let spTok = null;
async function spotify(path){
  for (let k = 0; k < 6; k++) {
    const r = await fetch("https://api.spotify.com/v1" + path, { headers: { Authorization: "Bearer " + spTok } });
    if (r.status === 429) { const ra = +(r.headers.get("retry-after") || 30); if (ra > 600) throw new Error("Spotify-Sperre " + ra + "s"); await sleep((ra + 1) * 1000); continue; }
    if (r.status >= 500) { await sleep(5000 * (k + 1)); continue; }
    if (!r.ok) throw new Error("Spotify " + r.status);
    return r.json();
  }
  throw new Error("Spotify antwortet nicht");
}
function flags(s, b){
  const f = [], y = parseInt(b.album?.release_date) || 0;
  if (y && y < s[2] && !BESTAETIGT.has(key(s))) f.push(`Spotify-Album von ${y} – älter als unser Jahr ${s[2]}`);
  if (y && y > s[2] + 1 && b.album?.album_type !== "compilation") f.push(`nur spätere Ausgabe (${y})`);
  if (b.album?.album_type === "compilation") f.push("nur auf Sampler");
  if (/\b(version|edit|mix|mono|re-?recorded|re-?mastered \d{4} version|from .* soundtrack)\b/i.test(b.name.replace(/\(.*remaster.*\)/i, ""))) f.push("Versionshinweis im Titel");
  return f;
}
async function spSearch(s){
  const t = s[0], a = s[1], opt = s[5] && typeof s[5] === "object" ? s[5] : {};
  const tries = [`track:${cleanTitle(t)} artist:${a}`, `${cleanTitle(t)} ${a}`];
  if (/ß/.test(t)) tries.push(`${cleanTitle(t).replace(/ß/g, "ss")} ${a}`);
  for (const q of tries) {
    const j = await spotify(`/search?type=track&limit=10&market=DE&q=${encodeURIComponent(q)}`);
    const own = cleanTitle(t).toLowerCase();
    const items = (j?.tracks?.items || []).filter(tr => !SYNC_FALSCH.has(tr.id) &&
      !BAD.test(tr.name.toLowerCase().replace(own, "")) && !BAD.test((tr.album?.name || "").toLowerCase().replace(own, "")) &&
      tr.artists.some(ar => norm(ar.name).includes(norm(a)) || norm(a).includes(norm(ar.name))) &&
      norm(tr.name).includes(norm(cleanTitle(t))) && (!opt.mit || tr.artists.some(ar => norm(ar.name).includes(norm(opt.mit)))));
    if (!items.length) { await sleep(250); continue; }
    items.sort((x, y) => (x.album.album_type === "compilation") - (y.album.album_type === "compilation")
      || (x.album.release_date || "9999").localeCompare(y.album.release_date || "9999"));
    return items[0];
  }
  return null;
}
if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
  const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST",
    headers: { Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials" });
  spTok = r.ok ? (await r.json()).access_token : null;
  if (!spTok) console.log("Spotify-Anmeldung fehlgeschlagen:", r.status);
}
if (spTok) {
  const todo = SONGS.filter(s => !inlineId(s) && !SPOTIFY_IDS[key(s)] && !NOSPOT.has(key(s)) && !pruefen.spotify[key(s)]).slice(0, MAX_SPOTIFY);
  for (const s of todo) {
    if (Date.now() > deadline) break;
    try {
      const b = await spSearch(s);
      if (!b) { pruefen.spotify[key(s)] = { status: "nicht gefunden", jahr: s[2] }; sum.review++; }
      else { const f = flags(s, b);
        if (!f.length) { SPOTIFY_IDS[key(s)] = b.id; sum.ids++; }
        else { pruefen.spotify[key(s)] = { status: "unsicher", id: b.id, name: b.name, artist: b.artists.map(x => x.name).join(", "), album: b.album?.name || "", date: b.album?.release_date || "", typ: b.album?.album_type || "", jahr: s[2], flags: f }; sum.review++; } }
    } catch(e) { console.log("Spotify-Abbruch:", e.message); break; }
    await sleep(350);
  }
}

// ---------- 3) MusicBrainz ----------
const MB_BAD = /\b(live|demo|remix|mix|instrumental|karaoke|acoustic|unplugged|rehearsal|session|take \d|edit|version|re-?record)/i;
async function mbCheck(s){
  const q = `recording:"${cleanTitle(s[0]).replace(/"/g, "")}" AND artist:"${s[1].replace(/"/g, "")}"`;
  for (let k = 0; k < 5; k++) {
    const r = await fetch("https://musicbrainz.org/ws/2/recording/?fmt=json&limit=100&query=" + encodeURIComponent(q), { headers: { Accept: "application/json", "User-Agent": "Mixtape/1.0 ( https://github.com/WillyBeLate/mixtape )" } });
    if (r.status === 503 || r.status === 429 || r.status >= 500) { await sleep(5000 * (k + 1)); continue; }
    if (!r.ok) throw new Error("MB " + r.status);
    const j = await r.json(), want = norm(cleanTitle(s[0])), artist = norm(s[1]);
    let best = null;
    for (const rec of j.recordings || []) {
      const credit = norm((rec["artist-credit"] || []).map(c => c.name + (c.joinphrase || "")).join(""));
      const okA = credit.includes(artist) || artist.includes(credit), okT = norm(rec.title).startsWith(want) || want.startsWith(norm(rec.title));
      const bad = MB_BAD.test((rec.disambiguation || "") + " " + rec.title.replace(new RegExp(cleanTitle(s[0]).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), ""));
      const d = rec["first-release-date"];
      if (okA && okT && !bad && d) { const y = +d.slice(0, 4); if (!best || y < best.y) best = { y, d }; }
    }
    return best;
  }
  throw new Error("MusicBrainz antwortet nicht");
}
{
  const todo = SONGS.filter(s => !NOSPOT.has(key(s)) && !BESTAETIGT.has(key(s)) && (!MB_GEPRUEFT[key(s)] || MB_GEPRUEFT[key(s)][0] !== s[2])).slice(0, MAX_MB);
  for (const s of todo) {
    if (Date.now() > deadline) break;
    try { const b = await mbCheck(s); MB_GEPRUEFT[key(s)] = [s[2], b ? b.y : null]; sum.mb++;
      if (b && b.y < s[2]) { pruefen.jahr[key(s)] = { wir: s[2], mb: b.y, datum: b.d }; sum.review++; } }
    catch(e) { console.log("MB:", s[0], e.message); }
    await sleep(1100);   // MusicBrainz: höchstens 1 Anfrage pro Sekunde
  }
}

// ---------- Schreiben ----------
const changed = sum.fix || sum.nospot || sum.ids || sum.mb;
const q = JSON.stringify;
const idsTxt = rd("ids.js");
const head = idsTxt.slice(0, idsTxt.indexOf("const SPOTIFY_IDS"));
wr("ids.js", head + "const SPOTIFY_IDS = {\n" + Object.entries(SPOTIFY_IDS).map(([k, v]) => `  ${q(k)}: ${q(v)}`).join(",\n") + "\n};\n" +
  "// Von euch über „Falscher Song“ als „gibt es bei Spotify nicht“ gemeldet – ist in keinem Spiel mehr\n" +
  "const NICHT_BEI_SPOTIFY = [" + [...NOSPOT].map(q).join(", ") + "];\n");
const gTxt = rd("geprueft.js"), gHead = gTxt.slice(0, gTxt.indexOf("const MB_GEPRUEFT"));
wr("geprueft.js", gHead + "const MB_GEPRUEFT = {\n" + Object.entries(MB_GEPRUEFT).map(([k, v]) => `  ${q(k)}: ${q(v).replace(",", ", ")},`).join("\n") + "\n};\n");
wr("tools/pruefen.json", JSON.stringify(pruefen, null, 1) + "\n");

if (changed) {
  // Version hochzählen + Neuigkeiten
  let h = rd("index.html");
  const v = h.match(/const APP_VERSION = "(\d+)\.(\d+)\.(\d+)"/), nv = `${v[1]}.${v[2]}.${+v[3] + 1}`;
  wr("index.html", h.replace(v[0], `const APP_VERSION = "${nv}"`));
  const sw = rd("sw.js"), sv = sw.match(/mixtape-v(\d+)/); wr("sw.js", sw.replace(sv[0], "mixtape-v" + (+sv[1] + 1)));
  const parts = [];
  if (sum.ids) parts.push(`${sum.ids} Songs spielen jetzt immer die richtige Spotify-Aufnahme`);
  if (sum.fix) parts.push(`${sum.fix} eurer „Falscher Song“-Korrekturen übernommen`);
  if (sum.nospot) parts.push(`${sum.nospot} Songs ohne Spotify-Version aus den Spielen genommen`);
  if (sum.mb) parts.push(`${sum.mb} Songs auf das Jahr geprüft`);
  const d = new Date().toISOString().slice(0, 10);
  const cl = rd("changelog.js").replace("const CHANGELOG = [\n", `const CHANGELOG = [\n  { v: ${q(nv)}, d: ${q(d)}, e: [\n    ["change", ${q("Nächtliche Prüfung: " + parts.join(", ") + ".")}],\n  ]},\n`);
  wr("changelog.js", cl);
  fs.writeFileSync(ROOT + "tools/.summary", `${nv} – ${parts.join(", ")}`);
} else fs.writeFileSync(ROOT + "tools/.summary", "");

// verarbeitete Issues schließen
if (process.env.GH_TOKEN && !process.env.DRY) for (const n of sum.issues) {
  try { await gh(`/repos/${REPO}/issues/${n}/comments`, { method: "POST", body: q({ body: "✅ Übernommen in der nächtlichen Prüfung." }) });
    await gh(`/repos/${REPO}/issues/${n}`, { method: "PATCH", body: q({ state: "closed" }) }); } catch(e) { console.log(e.message); }
}
console.log(JSON.stringify(sum));
