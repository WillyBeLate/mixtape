// Gleicht ids.js (UNSICHER) und tools/pruefen.json (luecken) mit dem aktuellen Stand ab.
// Aufruf nach jeder Bearbeitung von pruefen.json:  node tools/unsicher.mjs
// Ausgabe: verbleibende Lücken je Main-Kategorie (Jahre ohne spielbaren Song).
import fs from "fs";
import vm from "vm";
const ROOT = new URL("..", import.meta.url).pathname;
const rd = f => fs.readFileSync(ROOT + f, "utf8"), wr = (f, t) => fs.writeFileSync(ROOT + f, t);
const ctx = {}; vm.createContext(ctx);
vm.runInContext(rd("daten.js") + rd("ids.js") + ";this.SONGS=SONGS;this.KATEGORIEN=KATEGORIEN;this.PRUEFEN=typeof PRUEFEN!=='undefined'?PRUEFEN:{};" +
  "this.NOSPOT=typeof NICHT_BEI_SPOTIFY!=='undefined'?NICHT_BEI_SPOTIFY:[];", ctx);
const pruefen = JSON.parse(rd("tools/pruefen.json"));
const NOSPOT = new Set(ctx.NOSPOT), key = s => s[0] + "|" + s[1], q = JSON.stringify;
const UNSICHER = [...new Set([...Object.keys(pruefen.spotify || {}), ...Object.keys(pruefen.jahr || {})])].filter(k => !NOSPOT.has(k)).sort();
const ids = rd("ids.js").replace(/\n?\/\/ Noch in Prüfung[^\n]*\nconst UNSICHER = \[[^\n]*\];\n?/, "\n");
wr("ids.js", ids.replace(/\n*$/, "\n") + "// Noch in Prüfung (Spotify-Version oder Jahr unsicher) – bis dahin in keinem Spiel\nconst UNSICHER = [" + UNSICHER.map(q).join(", ") + "];\n");
const [, from, to] = rd("index.html").match(/const DEFAULT_FROM = (\d+), DEFAULT_TO = (\d+)/) || [, 1930, 2026];
const out = new Set(UNSICHER);
const ok = ctx.SONGS.filter(s => typeof s[2] === "number" && !NOSPOT.has(key(s)) && !out.has(key(s)) && !ctx.PRUEFEN[key(s)]);
const luecken = {};
for (const c of ctx.KATEGORIEN.filter(c => c.typ === "main")) {
  const miss = [];
  for (let y = +from; y <= +to; y++) if (!ok.some(s => s[2] === y && s[4].split(/\s+/).includes(c.id))) miss.push(y);
  if (miss.length) luecken[c.id] = miss;
}
pruefen.luecken = luecken;
wr("tools/pruefen.json", JSON.stringify(pruefen, null, 1) + "\n");
console.log(JSON.stringify({ unsicher: UNSICHER.length, luecken }));
