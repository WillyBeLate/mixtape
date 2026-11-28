// Gleicht ids.js (UNSICHER) und tools/pruefen.json (luecken) mit dem aktuellen Stand ab.
// Aufruf nach jeder Bearbeitung von pruefen.json:  node tools/unsicher.mjs
// Ausgabe: verbleibende Lücken je Main-Kategorie (Jahre ohne spielbaren Song).
import fs from "fs";
import vm from "vm";
const ROOT = new URL("..", import.meta.url).pathname;
const rd = f => fs.readFileSync(ROOT + f, "utf8"), wr = (f, t) => fs.writeFileSync(ROOT + f, t);
const ctx = {}; vm.createContext(ctx);
vm.runInContext(rd("daten.js") + rd("geprueft.js") + rd("ids.js") + ";this.MB=MB_GEPRUEFT;this.BEST=typeof BESTAETIGT!=='undefined'?BESTAETIGT:new Set();" + ";this.SONGS=SONGS;this.KATEGORIEN=KATEGORIEN;this.PRUEFEN=typeof PRUEFEN!=='undefined'?PRUEFEN:{};" +
  "this.NOSPOT=typeof NICHT_BEI_SPOTIFY!=='undefined'?NICHT_BEI_SPOTIFY:[];this.SPOTIFY_IDS=SPOTIFY_IDS;", ctx);
const pruefen = JSON.parse(rd("tools/pruefen.json"));
const NOSPOT = new Set(ctx.NOSPOT), key = s => s[0] + "|" + s[1], q = JSON.stringify;
const UNSICHER = [...new Set([...Object.keys(pruefen.spotify || {}), ...Object.keys(pruefen.jahr || {})])].filter(k => !NOSPOT.has(k)).sort();
const ids = rd("ids.js").replace(/\n?\/\/ Noch in Prüfung[^\n]*\nconst UNSICHER = \[[^\n]*\];\n?/, "\n").replace(/\n?\/\/ Davon Jahr unsicher[^\n]*\nconst UNSICHER_JAHR = \[[^\n]*\];\n?/, "\n");
const UNSICHER_JAHR = Object.keys(pruefen.jahr || {}).filter(k => !NOSPOT.has(k)).sort();
wr("ids.js", ids.replace(/\n*$/, "\n") + "// Noch in Prüfung (Spotify-Version oder Jahr unsicher) – bis dahin in keinem Spiel\nconst UNSICHER = [" + UNSICHER.map(q).join(", ") + "];\n" +
  "// Davon Jahr unsicher – eine eigene Spotify-Korrektur auf dem Handy gibt diese Songs NICHT frei\nconst UNSICHER_JAHR = [" + UNSICHER_JAHR.map(q).join(", ") + "];\n");
// Doppelte Spotify-IDs: zwei Songs mit derselben Aufnahme – einer davon ist falsch
const idOf = s => typeof s[5] === "string" ? s[5] : ctx.SPOTIFY_IDS[key(s)];
const byId = {};
for (const s of ctx.SONGS) { const id = idOf(s); if (id && !NOSPOT.has(key(s))) (byId[id] ??= []).push(key(s)); }
const doppelt = Object.fromEntries(Object.entries(byId).filter(([, l]) => l.length > 1));
if (Object.keys(doppelt).length) pruefen.doppelt = doppelt; else delete pruefen.doppelt;
const [, from, to] = rd("index.html").match(/const DEFAULT_FROM = (\d+), DEFAULT_TO = (\d+)/) || [, 1930, 2026];
const out = new Set(UNSICHER);
// wie in der App: nur mit fester Spotify-ID und geprüftem Jahr spielbar
const ok = ctx.SONGS.filter(s => typeof s[2] === "number" && !NOSPOT.has(key(s)) && !out.has(key(s)) && !ctx.PRUEFEN[key(s)] &&
  (typeof s[5] === "string" || ctx.SPOTIFY_IDS[key(s)]) && ((ctx.MB[key(s)]?.[0] === s[2] && ctx.MB[key(s)][1] != null) || ctx.BEST.has(key(s))));
const luecken = {};
for (const c of ctx.KATEGORIEN.filter(c => c.typ === "main")) {
  const miss = [];
  for (let y = +from; y <= +to; y++) if (!ok.some(s => s[2] === y && s[4].split(/\s+/).includes(c.id))) miss.push(y);
  if (miss.length) luecken[c.id] = miss;
}
pruefen.luecken = luecken;
// Zusatz- und Künstler-Kategorien mit weniger als 20 spielbaren Songs: in der App verborgen → auffüllen
const zuwenig = {};
for (const c of ctx.KATEGORIEN.filter(c => c.typ !== "main")) { const n = ok.filter(s => s[4].split(/\s+/).includes(c.id)).length; if (n < 20) zuwenig[c.id] = n; }
if (Object.keys(zuwenig).length) pruefen.zuwenig = zuwenig; else delete pruefen.zuwenig;
wr("tools/pruefen.json", JSON.stringify(pruefen, null, 1) + "\n");
console.log(JSON.stringify({ unsicher: UNSICHER.length, jahr: UNSICHER_JAHR.length, doppelt: Object.keys(doppelt).length, luecken, zuwenig }));
