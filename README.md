# Mixtape – Das Musik-Zeitreise-Spiel

Eigenes Musik-Zeitstrahl-Spiel mit QR-Jahreskarten und versteckter Spotify-Wiedergabe.

## Dateien

- `index.html` – die App (Mix, Spiel, Extras ohne Karten, Karten drucken, Einstellungen)
- `daten.js` – Kategorien und Songs (SONGS, RETTE_8, KUENSTLER_10, BESTAETIGT, ANZEIGE …)
- `ids.js` – feste Spotify-IDs, Songs ohne Spotify-Version (NICHT_BEI_SPOTIFY) und noch unsichere Songs (UNSICHER) – wird nachts geschrieben
- `geprueft.js` – Ergebnisse der Jahres-Prüfung über MusicBrainz – wird nachts geschrieben
- `changelog.js` – Neuigkeiten in der App
- `regeln.js` – Spielregeln
- `sw.js`, `manifest.json`, `icons/` – installierbare App (PWA)
- `lib/` – QR-Scanner, QR-Generator, JSZip

## Nächtliche Prüfung

1. **GitHub Action** (`.github/workflows/nightly.yml` → `tools/nightly.mjs`, ca. 3 Uhr):
   übernimmt Korrekturen aus der App (Issues „[mixtape-auto] …“), sucht Songs ohne feste ID bei Spotify,
   prüft Jahre über MusicBrainz, schreibt `ids.js`, `geprueft.js`, `tools/pruefen.json`.
   Ändert keine Versionsnummer. Issues werden erst nach erfolgreichem Push geschlossen.
2. **Claude-Auswertung** (geplante Aufgabe, ca. 4:20 Uhr): entscheidet die unsicheren Fälle aus
   `tools/pruefen.json`, sucht Ersatz für Songs ohne Spotify-Version, füllt Lücken in Main-Kategorien
   und setzt bei sichtbaren Änderungen Version und Neuigkeiten.

`node tools/unsicher.mjs` berechnet die Liste UNSICHER (in `ids.js`) und die Lücken (`pruefen.luecken`) neu.
