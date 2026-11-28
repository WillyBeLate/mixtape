Du wertest die nächtliche Prüfung von Willys Musikspiel „Mixtape“ aus (Repo WillyBeLate/mixtape, PWA auf GitHub Pages). Antworte/committe auf Deutsch. Rate nie: Wenn du dir bei einem Fall nicht sicher bist, lass ihn offen (er bleibt in tools/pruefen.json und damit aus dem Spiel).

## Vorbereitung
1. Repo klonen bzw. `git pull --rebase`. Die GitHub Action „Nächtliche Prüfung“ läuft um 3:00 Uhr und hat tools/pruefen.json, ids.js und geprueft.js aktualisiert. Lies tools/pruefen.json.
2. Jahresregel: Es zählt die erste offizielle Veröffentlichung dieses Interpreten. Ein Cover hat sein eigenes Jahr; eine Neuaufnahme oder ein Remaster desselben Interpreten behält das Originaljahr.
3. Prüfe Fakten per Websuche (Discogs, MusicBrainz, Wikipedia, Spotify-Seiten). Nur eindeutige Fälle entscheiden.

## Fälle in tools/pruefen.json
- **spotify** (Status „unsicher“ oder „nicht gefunden“): Passt die gefundene Aufnahme (richtiger Interpret, Originalaufnahme, keine Live-/Remix-/Neuaufnahme)? 
  - Passt: ID in `SPOTIFY_IDS` (ids.js) eintragen, Fall löschen.
  - Passt nicht: Fall NICHT löschen, sondern `status: "neu suchen"` setzen und die falsche ID zusätzlich in `SYNC_FALSCH_IDS` (Liste in ids.js) eintragen. Die Nachtprüfung sucht in der nächsten Nacht neu (abgelehnte IDs stehen in `abgelehnt` und werden übersprungen). Bis dahin bleibt der Song aus allen Spielen.
  - Kennst du die richtige ID sicher (z. B. per Websuche auf open.spotify.com gefunden), trage sie direkt in `SPOTIFY_IDS` ein und lösche den Fall.
  - Gibt es den Song nachweislich nicht bei Spotify: Schlüssel in `NICHT_BEI_SPOTIFY` (ids.js), Fall löschen und unter **ersatz** behandeln.
- **jahr**: Stimmt unser Jahr (daten.js, SONGS-Eintrag `[Titel, Interpret, Jahr, Land, Kategorien, …]`)? Korrigieren oder in `BESTAETIGT` (geprueft.js) aufnehmen, dann Fall löschen. Fälle mit `status` „spätere Veröffentlichung“: MusicBrainz kennt nur eine spätere Ausgabe – prüfen, ob unser (früheres) Jahr wirklich die Erstveröffentlichung ist. Fälle mit `mb: null` hat MusicBrainz gar nicht gefunden – Jahr anhand verlässlicher Quellen (Discogs, Wikipedia, offizielle Diskografie) prüfen; nur bei eindeutigem Ergebnis bestätigen bzw. korrigieren.
- Hinweis: Spielbar ist ein Song nur mit fester Spotify-ID UND geprüftem Jahr. Jede Zusatz- und Künstler-Kategorie braucht mindestens 20 spielbare (= geprüfte) Songs, sonst ist sie in der App verborgen.
- **zuwenig** (`{Kategorie: Anzahl spielbarer Songs}`): Kategorien unter 20. Zählt man die noch ungeprüften Songs dieser Kategorie mit (sie werden in den nächsten Nächten geprüft), und kommt man trotzdem nicht auf mindestens 25, passende Songs mit eindeutig belegtem Jahr in daten.js ergänzen (Kategorie-Regel in KATEGORIEN beachten). Den Block nicht von Hand bearbeiten.
- **doppelt** (`{SpotifyID: [Song-Schlüssel, …]}`): Zwei Songs teilen sich dieselbe Aufnahme – mindestens einer ist falsch. Den falschen Song wie einen abgelehnten Spotify-Fall behandeln (ID aus `SPOTIFY_IDS` entfernen, Fall unter spotify mit `status: "neu suchen"`, `id` und `abgelehnt: [ID]` anlegen). Den Block `doppelt` nicht von Hand bearbeiten – er wird neu berechnet.
- **tv** (Titelmelodien ohne feste ID, Schlüssel „tv:Serie“, „kids:…“, „games:…“, „disney:…“, „film:…“, je bis zu 5 `kandidaten`): Ist ein Kandidat eindeutig die bekannte (deutsche, falls es eine gibt) Titelmelodie bzw. das Hauptthema, trage `"Schlüssel": "ID"` in `TV_IDS` (ids.js) ein und lösche den Fall. Passt keiner, lass den Fall stehen (er wird nicht erneut gesucht) und nenne ihn im Bericht.
- **ersatz** (Songs, die weggefallen sind): Suche einen gleichwertigen Ersatzsong (gleiches Jahr, gleiche Kategorien/Land, falls angegeben gleiche RETTE_8-Jahre bzw. KUENSTLER_10-Künstler) und füge ihn in daten.js ein; dort, wo der alte Song in RETTE_8/KUENSTLER_10 stand, ersetzen. Fall danach löschen.
- **luecken** (Jahre je Hauptkategorie ohne spielbaren Song): Passende, eindeutig datierbare Songs in daten.js ergänzen.

## Abschluss
1. `node tools/unsicher.mjs` ausführen (berechnet UNSICHER, UNSICHER_JAHR, doppelt und luecken neu).
2. Nur wenn sich für Spieler sichtbar etwas geändert hat (daten.js, ids.js, geprueft.js): Version erhöhen – `APP_VERSION` in index.html, alle `?v=`-Parameter der Script-Tags in index.html, `VERSION` "mixtape-vNNN" in sw.js – und oben in changelog.js (CHANGELOG) einen Eintrag ergänzen (Typen neu/change/fix). Reine pruefen.json-Änderungen brauchen keine neue Version.
3. Commit (Nachricht nennt kurz, was übernommen wurde) und `git push` (bei Konflikt `git pull --rebase` und erneut). Commit-Nachricht endet mit:
   Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
4. Kurzer Bericht: was entschieden wurde, was offen bleibt und warum, ggf. neue Versionsnummer.
