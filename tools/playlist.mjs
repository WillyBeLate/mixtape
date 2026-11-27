// Liest Spotify-Playlists aus (Titel, Interpret, Album, Erscheinungsdatum, Spotify-ID) – läuft als GitHub Action.
// Eingabe: tools/playlist-anfrage.txt – eine Playlist-URL oder -ID pro Zeile (Zeilen mit # werden ignoriert).
// Ausgabe: tools/playlists/<id>.json. Bereits ausgelesene Playlists werden neu ausgelesen (aktueller Stand).
import fs from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST",
  headers: { Authorization: "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
  body: "grant_type=client_credentials" });
if (!r.ok) { console.log("Spotify-Anmeldung fehlgeschlagen:", r.status); process.exit(1); }
const tok = (await r.json()).access_token;
async function sp(path){
  for (let k = 0; k < 6; k++) {
    const x = await fetch(path.startsWith("http") ? path : "https://api.spotify.com/v1" + path, { headers: { Authorization: "Bearer " + tok } });
    if (x.status === 429) { await sleep((+(x.headers.get("retry-after") || 10) + 1) * 1000); continue; }
    if (x.status >= 500) { await sleep(3000 * (k + 1)); continue; }
    if (!x.ok) throw new Error("Spotify " + x.status + " " + (await x.text()).slice(0, 200));
    return x.json();
  }
  throw new Error("Spotify antwortet nicht");
}
const lines = fs.existsSync(ROOT + "tools/playlist-anfrage.txt") ? fs.readFileSync(ROOT + "tools/playlist-anfrage.txt", "utf8").split("\n") : [];
const ids = [...new Set(lines.map(l => l.trim()).filter(l => l && !l.startsWith("#")).map(l => (l.match(/playlist[\/:]([A-Za-z0-9]{22})/) || l.match(/^([A-Za-z0-9]{22})$/) || [])[1]).filter(Boolean))];
fs.mkdirSync(ROOT + "tools/playlists", { recursive: true });
const log = [];
for (const id of ids) {
  try {
    const pl = await sp(`/playlists/${id}?market=DE&fields=name,owner(display_name),tracks(total)`);
    const tracks = [];
    let next = `/playlists/${id}/tracks?market=DE&limit=100&fields=next,items(track(id,name,artists(name),album(name,release_date,album_type),duration_ms,is_local))`;
    while (next) {
      const j = await sp(next);
      for (const it of j.items || []) { const t = it.track; if (!t || t.is_local || !t.id) continue;
        tracks.push({ t: t.name, a: t.artists.map(x => x.name).join(", "), album: t.album?.name || "", date: t.album?.release_date || "", typ: t.album?.album_type || "", id: t.id }); }
      next = j.next; await sleep(200);
    }
    fs.writeFileSync(ROOT + `tools/playlists/${id}.json`, JSON.stringify({ id, name: pl.name, owner: pl.owner?.display_name || "", gelesen: new Date().toISOString(), anzahl: tracks.length, tracks }, null, 1) + "\n");
    log.push(`${id}: „${pl.name}“ – ${tracks.length} Songs`);
  } catch(e) { log.push(`${id}: FEHLER ${e.message}`); }
}
fs.writeFileSync(ROOT + "tools/playlists/LETZTER_LAUF.txt", new Date().toISOString() + "\n" + (log.join("\n") || "keine Playlist in der Anfrage") + "\n");
console.log(log.join("\n"));
