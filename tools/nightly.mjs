// =====================================================================
//  Mixtape – nächtliche Prüfung (läuft als GitHub Action, ohne Handy)
//  1) Korrekturen aus der App (Issues „[mixtape-auto]“ von WillyBeLate) übernehmen
//  2) Spotify-Abgleich für Songs ohne feste ID (Client-Credentials)
//  3) MusicBrainz-Jahresprüfung für ungeprüfte Songs
//  Eindeutige Treffer → ids.js / geprueft.js. Unsichere → tools/pruefen.json (prüft Claude).
// =====================================================================
import fs from "node:fs";
import { execSync } from "node:child_process";
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
  ";this.SONGS=SONGS;this.KATEGORIEN=KATEGORIEN;this.PRUEFEN=typeof PRUEFEN!=='undefined'?PRUEFEN:{};this.RETTE_8=typeof RETTE_8!=='undefined'?RETTE_8:{};this.KUENSTLER_10=typeof KUENSTLER_10!=='undefined'?KUENSTLER_10:{};this.SPOTIFY_IDS=SPOTIFY_IDS;this.MB_GEPRUEFT=MB_GEPRUEFT;this.BESTAETIGT=typeof BESTAETIGT!=='undefined'?BESTAETIGT:new Set();" +
  "this.NICHT_BEI_SPOTIFY=typeof NICHT_BEI_SPOTIFY!=='undefined'?NICHT_BEI_SPOTIFY:[];this.TV_IDS=typeof TV_IDS!=='undefined'?TV_IDS:{};" +
  "this.SYNC_FALSCH_IDS=typeof SYNC_FALSCH_IDS!=='undefined'?SYNC_FALSCH_IDS:null;" +
  "this.TVLISTEN={tv:typeof TVTHEMEN!=='undefined'?TVTHEMEN:[],kids:typeof KINDERTHEMEN!=='undefined'?KINDERTHEMEN:[],games:typeof GAMETHEMEN!=='undefined'?GAMETHEMEN:[],disney:typeof DISNEYTHEMEN!=='undefined'?DISNEYTHEMEN:[],film:typeof FILMTHEMEN!=='undefined'?FILMTHEMEN:[]};", ctx);
const { SONGS, SPOTIFY_IDS, MB_GEPRUEFT, BESTAETIGT } = ctx;
const NOSPOT = new Set(ctx.NICHT_BEI_SPOTIFY);
const html = rd("index.html");
// Bekannt falsche Spotify-Aufnahmen (SYNC_FALSCH_IDS in ids.js; früher direkt in index.html)
const SYNC_FALSCH = new Set(ctx.SYNC_FALSCH_IDS || JSON.parse("[" + (html.match(/const SYNC_FALSCH = new Set\(\[([^\]]*)\]\)/) || [, ""])[1] + "]"));
const key = s => s[0] + "|" + s[1];
const inlineId = s => typeof s[5] === "string" ? s[5] : null;
let pruefen = fs.existsSync(ROOT + "tools/pruefen.json") ? JSON.parse(rd("tools/pruefen.json")) : { spotify: {}, jahr: {} };
pruefen.spotify ??= {}; pruefen.jahr ??= {}; pruefen.ersatz ??= {}; pruefen.tv ??= {};
const MAX_TV = +(process.env.MAX_TV ?? 25);
// Fällt ein Song weg (gibt es nicht bei Spotify), merken wir, wo er fehlt – Claude sucht dafür Ersatz.
function ersatzNoetig(k){
  const s = SONGS.find(x => key(x) === k); if (!s) return;
  const rette = Object.entries(ctx.RETTE_8).filter(([, l]) => l.includes(k)).map(([y]) => +y);
  const kuenstler = Object.entries(ctx.KUENSTLER_10).filter(([, l]) => l.includes(k)).map(([n]) => n);
  pruefen.ersatz[k] = { jahr: s[2], land: s[3], kategorien: s[4], rette, kuenstler, seit: new Date().toISOString().slice(0, 10) };
}
const sum = { fix: 0, nospot: 0, ids: 0, neu: 0, tv: 0, mb: 0, review: 0, issues: [], bad: [] };

// ---------- 1) Korrekturen aus der App ----------
async function gh(path, opt = {}){
  const r = await fetch("https://api.github.com" + path, { ...opt, headers: { Authorization: "Bearer " + process.env.GH_TOKEN, Accept: "application/vnd.github+json", "Content-Type": "application/json" } });
  if (!r.ok) throw new Error("GitHub " + r.status + " " + path);
  return r.status === 204 ? null : r.json();
}
if (process.env.GH_TOKEN) {
  // Alle offenen Meldungen, älteste zuerst – so gewinnt bei mehreren Korrekturen zum selben Song die neueste
  const iss = [];
  for (let n = 1; n <= 20; n++) {
    const page = await gh(`/repos/${REPO}/issues?state=open&per_page=100&creator=${OWNER}&sort=created&direction=asc&page=${n}`);
    iss.push(...page); if (page.length < 100) break;
  }
  for (const it of iss.filter(i => i.title.startsWith("[mixtape-auto]") && !i.pull_request)) {
    const m = (it.body || "").match(/```json\s*([\s\S]*?)```/);
    let d = null; try { d = m && JSON.parse(m[1]); } catch(e) {}
    if (!d || typeof d !== "object") { sum.bad.push(it.number); continue; }      // unlesbar → Workflow schließt mit Hinweis
    const vorher = sum.fix + sum.nospot + (sum.tvfix || 0);
    for (const [k, v] of Object.entries(d.fix || {})) {
      if (!v?.id || !/^[A-Za-z0-9]{22}$/.test(v.id)) continue;
      SPOTIFY_IDS[k] = v.id; NOSPOT.delete(k); delete pruefen.spotify[k]; sum.fix++;
    }
    for (const [k, v] of Object.entries(d.tvfix || {})) {          // Titelmelodien: „tv:Serie“ → Spotify-ID
      if (!/^(tv|kids|games|disney|film):.{1,120}$/.test(k) || !v?.id || !/^[A-Za-z0-9]{22}$/.test(v.id)) continue;
      ctx.TV_IDS[k] = v.id; sum.tvfix = (sum.tvfix || 0) + 1;
    }
    for (const k of Array.isArray(d.nospot) ? d.nospot : []) { if (typeof k === "string" && k.length < 300) { if (!NOSPOT.has(k)) ersatzNoetig(k); NOSPOT.add(k); delete SPOTIFY_IDS[k]; delete pruefen.spotify[k]; sum.nospot++; } }
    if (sum.fix + sum.nospot + (sum.tvfix || 0) === vorher) { sum.bad.push(it.number); continue; }  // nichts Gültiges drin
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
  const alt = pruefen.spotify[key(s)], nein = new Set([...(alt?.abgelehnt || []), ...(alt?.status === "neu suchen" && alt.id ? [alt.id] : [])]);
  const tries = [`track:${cleanTitle(t)} artist:${a}`, `${cleanTitle(t)} ${a}`];
  if (/ß/.test(t)) tries.push(`${cleanTitle(t).replace(/ß/g, "ss")} ${a}`);
  for (const q of tries) {
    const j = await spotify(`/search?type=track&limit=10&market=DE&q=${encodeURIComponent(q)}`);
    const own = cleanTitle(t).toLowerCase();
    const items = (j?.tracks?.items || []).filter(tr => !SYNC_FALSCH.has(tr.id) && !nein.has(tr.id) &&
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
  // Zuerst abgelehnte Treffer („neu suchen“) erneut suchen, dann neue Songs ohne ID
  const neu = SONGS.filter(s => pruefen.spotify[key(s)]?.status === "neu suchen" && !NOSPOT.has(key(s)));
  const todo = [...neu, ...SONGS.filter(s => !inlineId(s) && !SPOTIFY_IDS[key(s)] && !NOSPOT.has(key(s)) && !pruefen.spotify[key(s)])].slice(0, MAX_SPOTIFY);
  for (const s of todo) {
    if (Date.now() > deadline) break;
    const alt = pruefen.spotify[key(s)], wieder = alt?.status === "neu suchen";
    const abgelehnt = [...new Set([...(alt?.abgelehnt || []), ...(wieder && alt.id ? [alt.id] : [])])];
    const extra = abgelehnt.length ? { abgelehnt } : {};
    try {
      const b = await spSearch(s);
      if (!b) { pruefen.spotify[key(s)] = { status: "nicht gefunden", jahr: s[2], ...extra }; sum.review++; }
      else { const f = flags(s, b);
        if (!f.length) { SPOTIFY_IDS[key(s)] = b.id; delete pruefen.spotify[key(s)]; sum.ids++; if (wieder) sum.neu++; }
        else { pruefen.spotify[key(s)] = { status: "unsicher", id: b.id, name: b.name, artist: b.artists.map(x => x.name).join(", "), album: b.album?.name || "", date: b.album?.release_date || "", typ: b.album?.album_type || "", jahr: s[2], flags: f, ...extra }; sum.review++; } }
    } catch(e) { console.log("Spotify-Abbruch:", e.message); break; }
    await sleep(350);
  }
}

// ---------- 2b) Titelmelodien ohne feste ID: Kandidaten für die Auswertung sammeln ----------
// Gleiche Suche/Bewertung wie in der App (resolveTV); Claude wählt danach aus und schreibt TV_IDS.
const TV_NOGO = /\b(karaoke|cover|tribute|8-bit|lullaby|remix|live|piano|ringtone|hörspiel|horspiel|hörbuch|folge|teil \d+|kapitel|episode|party|tanz|mix|medley)\b/i;
const TV_SUCH = { games: x => [`${x.serie} ${x.t}`, `${x.serie} soundtrack`, `${x.serie} theme`, x.t],
  disney: x => [`${x.t} ${x.serie}`, `${x.t} deutsch`, x.t], film: x => [`${x.t} ${x.serie}`, `${x.serie} soundtrack`, `${x.serie} theme`] };
const tvSuchStd = x => [`${x.serie} titellied`, `${x.serie} titelsong`, `${x.serie} intro deutsch`, `${x.t} titelsong`, x.serie];
function tvScore(tr, x){
  const name = tr.name.toLowerCase(), alb = (tr.album?.name || "").toLowerCase(), all = norm(tr.name + " " + (tr.album?.name || "") + " " + tr.artists.map(a => a.name).join(" "));
  if (TV_NOGO.test(tr.name) || TV_NOGO.test(tr.album?.name || "")) return -1;
  const core = norm(x.serie.replace(/\(.*?\)/g, "").replace(/^(die|der|das|unser|the)\s+/i, "").split(/\s[–-]\s/)[0]);
  if (!all.includes(core) && !all.includes(norm(x.t))) return -1;
  let sc = 0;
  if (norm(tr.name).includes(norm(x.t))) sc += 3;
  if (/titel|intro|vorspann|theme|opening|title|lied|song/.test(name + " " + alb)) sc += 3;
  if (/deutsch|german/.test(name + " " + alb)) sc += 2;
  if (x.a && tr.artists.some(a => norm(a.name).includes(norm(x.a)) || norm(x.a).includes(norm(a.name)))) sc += 5;
  if (/english|englisch|\(us\)/.test(name)) sc -= 2;
  return sc + (tr.popularity || 0) / 50;
}
if (spTok && MAX_TV > 0) {
  const offen = Object.entries(ctx.TVLISTEN).flatMap(([pre, arr]) => arr.map(r => ({ i: pre + ":" + r[0], pre, serie: r[0], t: r[1], a: r[2], y: r[3], sid: r[5] })))
    .filter(x => !x.sid && !ctx.TV_IDS[x.i] && !pruefen.tv[x.i]).slice(0, MAX_TV);
  for (const x of offen) {
    if (Date.now() > deadline) break;
    try {
      const qs = x.a ? [`track:${x.t} artist:${x.a}`, `${x.t} ${x.a}`] : [];
      qs.push(...(TV_SUCH[x.pre] || tvSuchStd)(x));
      const seen = new Map();
      for (const qq of qs) {
        const j = await spotify(`/search?type=track&limit=10&market=DE&q=${encodeURIComponent(qq)}`);
        for (const tr of j?.tracks?.items || []) { const sc = tvScore(tr, x); if (sc >= 3 && !seen.has(tr.id)) seen.set(tr.id, { id: tr.id, name: tr.name, artist: tr.artists.map(a => a.name).join(", "), album: tr.album?.name || "", date: tr.album?.release_date || "", score: Math.round(sc * 10) / 10 }); }
        await sleep(300);
      }
      const kand = [...seen.values()].sort((p, q2) => q2.score - p.score).slice(0, 5);
      pruefen.tv[x.i] = { serie: x.serie, titel: x.t, komponist: x.a || "", jahr: x.y, kandidaten: kand, seit: new Date().toISOString().slice(0, 10) };
      sum.tv++;
    } catch(e) { console.log("Spotify-Abbruch (TV):", e.message); break; }
  }
}
// Bereits übernommene Titelmelodien aus der Kandidatenliste entfernen
for (const k of Object.keys(pruefen.tv)) if (ctx.TV_IDS[k]) delete pruefen.tv[k];

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
const q = JSON.stringify;
const idsTxt = rd("ids.js");
const head = idsTxt.slice(0, idsTxt.indexOf("const SPOTIFY_IDS"));
wr("ids.js", head + "const SPOTIFY_IDS = {\n" + Object.entries(SPOTIFY_IDS).map(([k, v]) => `  ${q(k)}: ${q(v)}`).join(",\n") + "\n};\n" +
  "// Von euch über „Falscher Song“ als „gibt es bei Spotify nicht“ gemeldet – ist in keinem Spiel mehr\n" +
  "const NICHT_BEI_SPOTIFY = [" + [...NOSPOT].map(q).join(", ") + "];\n" +
  "// Titelmelodien: eure „Falscher Song?“-Korrekturen aus TV-, Kinder-, Spiele-, Disney- und Film-Quiz (Schlüssel „quiz:Serie“)\n" +
  "const TV_IDS = {\n" + Object.entries(ctx.TV_IDS).map(([k, v]) => `  ${q(k)}: ${q(v)}`).join(",\n") + "\n};\n" +
  "// Bekannt falsche Spotify-Aufnahmen (falsche Version/anderer Song) – werden bei keiner Suche mehr genommen\n" +
  "const SYNC_FALSCH_IDS = [" + [...SYNC_FALSCH].map(q).join(", ") + "];\n");
const gTxt = rd("geprueft.js"), gHead = gTxt.slice(0, gTxt.indexOf("const MB_GEPRUEFT"));
wr("geprueft.js", gHead + "const MB_GEPRUEFT = {\n" + Object.entries(MB_GEPRUEFT).map(([k, v]) => `  ${q(k)}: ${q(v).replace(",", ", ")},`).join("\n") + "\n};\n");
wr("tools/pruefen.json", JSON.stringify(pruefen, null, 1) + "\n");

// Unsichere Songs (Liste UNSICHER in ids.js) und Lücken je Main-Kategorie (pruefen.luecken) neu berechnen
console.log(execSync("node " + JSON.stringify(ROOT + "tools/unsicher.mjs")).toString().trim());
const parts = [];
if (sum.ids) parts.push(`${sum.ids} Spotify-IDs`);
if (sum.fix) parts.push(`${sum.fix} Korrekturen`);
if (sum.nospot) parts.push(`${sum.nospot} ohne Spotify`);
if (sum.tvfix) parts.push(`${sum.tvfix} Titelmelodien`);
if (sum.neu) parts.push(`${sum.neu} neu gefunden`);
if (sum.tv) parts.push(`${sum.tv} Melodien zur Auswahl`);
if (sum.mb) parts.push(`${sum.mb} Jahre geprüft`);
fs.writeFileSync(ROOT + "tools/.summary", parts.join(", ") || "Prüfliste aktualisiert");
// Verarbeitete Issues schließt der Workflow erst NACH erfolgreichem Push (sonst gingen Korrekturen verloren)
fs.writeFileSync(ROOT + "tools/.issues", sum.issues.join(" "));
fs.writeFileSync(ROOT + "tools/.bad", sum.bad.join(" "));
console.log(JSON.stringify(sum));
