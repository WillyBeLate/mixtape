// =====================================================================
//  MIXTAPE – Neuigkeiten (Changelog)
//  Neueste Version oben. Art: "neu" = Neu, "change" = Geändert, "fix" = Fix.
//  Bei jeder Änderung an der App hier einen Eintrag ergänzen.
// =====================================================================
const CHANGELOG = [
  { v: "0.9.87", d: "2026-11-25", e: [
    ["change", "Der Neuigkeiten-Hinweis merkt sich pro Gerät jeden Eintrag einzeln: Einmal weggeklickt oder in den Neuigkeiten angeschaut, kommt er nicht wieder – du siehst nur, was für dich wirklich noch neu ist."],
  ]},
  { v: "0.9.86", d: "2026-11-25", e: [
    ["neu", "Sicherung: Unter Einstellungen alles in eine Datei speichern und auf einem neuen Gerät oder nach Neuinstallation wieder laden."],
  ]},
  { v: "0.9.85", d: "2026-11-25", e: [
    ["change", "„Spotify wachhalten“ gilt nur für iPhone/iPad. Auf Android läuft alles wie bisher, ohne stillen Track."],
  ]},
  { v: "0.9.84", d: "2026-11-25", e: [
    ["neu", "„Spotify wachhalten“ (auf dem iPhone automatisch an): Nach jedem Song spielt Spotify unhörbar Stille weiter, damit das iPhone Spotify nicht einfriert."],
  ]},
  { v: "0.9.83", d: "2026-11-25", e: [
    ["fix", "iPhone: Mixtape musste Spotify nach jedem Song neu öffnen, wenn sich die Geräte-Kennung des Handys geändert hatte. Das Handy wird jetzt wiedererkannt."],
  ]},
  { v: "0.9.82", d: "2026-11-25", e: [
    ["fix", "Jahr korrigiert: „Ich find dich scheiße“ (Tic Tac Toe) ist von 1995."],
    ["neu", "„Verpiss' dich“ (Tic Tac Toe, 1996) – auch bei Rette einen Song."],
  ]},
  { v: "0.9.81", d: "2026-11-25", e: [
    ["neu", "Papierkorb bei „Laufende Runde“ im Hauptmenü: angefangene Runde mit einem Tipp verwerfen."],
    ["change", "Beim Zeitstrahl zeigt „Laufende Runde“ keine Punkte mehr an."],
  ]},
  { v: "0.9.80", d: "2026-11-25", e: [
    ["neu", "Neuigkeiten: Diese Liste mit allen Änderungen – nach einem Update zeigt die App kurz an, was neu ist."],
    ["change", "Der letzte Reiter heißt jetzt für alle „Einstellungen“."],
  ]},
  { v: "0.9.79", d: "2026-11-25", e: [
    ["neu", "Knopf „Hauptmenü“ im Scan- und Abspiel-Bildschirm. Die Runde bleibt erhalten und lässt sich mit „Weiterspielen“ fortsetzen."],
  ]},
  { v: "0.9.78", d: "2026-11-25", e: [
    ["change", "Zeitstrahl: keine Punktetafel mehr (die Handkarten zeigen den Stand) – die App zeigt nur, wer für wen scannt."],
    ["change", "Zeitstrahl: Länder-Bonus entfernt."],
  ]},
  { v: "0.9.77", d: "2026-11-25", e: [
    ["change", "Rette einen Song zu zweit: Jahr für Jahr abwechselnd – erst Person 1, dann Person 2. Man sieht, was der andere gerettet hat."],
    ["fix", "Länder werden als kleine Flaggen gezeigt statt als Buchstaben-Kürzel."],
  ]},
  { v: "0.9.75", d: "2026-11-25", e: [
    ["fix", "iPhone: Spotify wird schon beim Tippen auf „Scanner starten“, „Nächste Karte“ usw. geweckt – die Meldung „Spotify schläft“ kommt kaum noch."],
  ]},
  { v: "0.9.74", d: "2026-11-25", e: [
    ["change", "Rette einen Song: 10 prägende Songs pro Jahr, quer durch die Genres und mit deutschen Hits."],
    ["neu", "11 neue Songs, z. B. These Boots Are Made for Walkin', Scatman, Ich find dich scheiße."],
  ]},
  { v: "0.9.73", d: "2026-11-25", e: [
    ["change", "Eigene Neon-Icons für alle Spielmodi, deutlichere Auswahl mit Rahmen und ✓."],
  ]},
  { v: "0.9.72", d: "2026-11-25", e: [
    ["fix", "Musik spielt immer auf dem Handy, auf dem Mixtape läuft – nur wenn gerade schon Musik über einen Lautsprecher (z. B. Alexa) läuft, bleibt sie dort."],
  ]},
  { v: "0.9.71", d: "2026-11-25", e: [
    ["neu", "Wiedergabegerät wählen: „ändern“ neben „Läuft auf …“, über das Spotify-Symbol oder in den Einstellungen."],
  ]},
  { v: "0.9.70", d: "2026-11-25", e: [
    ["change", "Spielmodus-Kacheln neu gestaltet: Gruppenfarben, Figuren mit Spieleranzahl."],
    ["change", "Rette einen Song steht jetzt bei den Extras."],
  ]},
  { v: "0.9.69", d: "2026-11-25", e: [
    ["change", "Rette einen Song: feste Auswahl prägender Songs pro Jahr (1960–2025), keine Kategorie-Auswahl mehr nötig."],
    ["neu", "20 neue Hits, z. B. Take On Me, Africa, Careless Whisper, Personal Jesus, I Want It That Way."],
  ]},
  { v: "0.9.68", d: "2026-11-25", e: [
    ["change", "Extras kombinierbar: mehrere Quiz-Kacheln antippen statt eigener Sonder-Mix-Kachel."],
  ]},
  { v: "0.9.67", d: "2026-11-25", e: [
    ["neu", "Rette einen Song: pro Jahr einen Song retten, am Ende dein Lebens-Mixtape – zu zweit mit Übereinstimmung in Prozent, als Spotify-Playlist speicherbar."],
  ]},
  { v: "0.9.66", d: "2026-11-25", e: [
    ["neu", "Regelheft für die Box (MPC Bi-fold) zum Download unter „Karten“."],
  ]},
  { v: "0.9.61–0.9.65", d: "2026-11-25", e: [
    ["neu", "Box-Design für die Kartendruckerei als PDF, mit 3D-Vorschau."],
    ["change", "Karten auf quadratisch 2,75″ angepasst, „© Willy“ auf Karten, Box und Anleitung."],
  ]},
  { v: "0.9.57–0.9.60", d: "2026-11-25", e: [
    ["neu", "Support-Kategorie „Polnische Hits“ (37 Songs)."],
    ["change", "Druckerei-Export in 600 dpi als JPG."],
  ]},
  { v: "0.9.56", d: "2026-11-25", e: [
    ["change", "Nach dem Neuladen bleibt die App im zuletzt offenen Reiter (außer im Spiel)."],
  ]},
  { v: "0.9.51", d: "2026-11-24", e: [
    ["change", "App startet immer im Hauptmenü, „Weiterspielen“ setzt die Runde samt Karte fort, eine neue Runde verwirft die alte."],
    ["fix", "App-Symbol aktualisiert sich automatisch."],
  ]},
  { v: "0.9.49", d: "2026-11-23", e: [
    ["neu", "Kurzregeln im Spiel (ⓘ an der Punktetafel)."],
    ["neu", "Bild nach dem Auflösen in den Quiz-Modi."],
    ["change", "Einstellungen aufgeräumt, verständliche Fehlermeldungen mit Lösungs-Knopf."],
  ]},
  { v: "0.9.42", d: "2026-11-23", e: [
    ["neu", "Rückgängig an der Punktetafel, Bildschirm bleibt beim Spielen an."],
    ["neu", "Sieg-Popup mit Feierabend-Statistik, Song-Verlauf „Zuletzt gespielt“."],
    ["change", "Kürzlich gespielte Songs kommen seltener dran statt gar nicht."],
  ]},
  { v: "0.9.41", d: "2026-11-23", e: [
    ["neu", "Export der Karten für eine Kartendruckerei (MPC) als ZIP."],
  ]},
  { v: "0.9.33–0.9.39", d: "2026-11-23", e: [
    ["neu", "Über 300 neue Songs aus euren Playlists, Künstler-Kategorien aufgestockt."],
    ["change", "Spielanleitung mit farbigem Seitenrahmen."],
  ]},
  { v: "0.9.32", d: "2026-11-23", e: [
    ["neu", "Disney-Quiz und Filmmusik-Quiz."],
    ["change", "Vollbild blendet die Statusleiste aus."],
  ]},
  { v: "0.9.20–0.9.23", d: "2026-11-23", e: [
    ["neu", "Neues Logo und App-Symbol (Neon-Kassette)."],
    ["neu", "Teamfarben per Tipp wählbar."],
    ["neu", "Main-Kategorie „Balladen & Lovesongs“, mehr Sommerhits und One-Hit-Wonder."],
  ]},
  { v: "0.9.15–0.9.18", d: "2026-11-22", e: [
    ["neu", "Kategorien Sommerhits, Taylor Swift, Udo Jürgens, Finnland, Türkei, Italienisch und das Videospiel-Quiz."],
    ["neu", "Künstlerfotos in der Kategorie-Auswahl."],
    ["change", "Neues Spiel in zwei Schritten (Modus, dann Mix), helleres Design."],
  ]},
  { v: "0.9.0–0.9.1", d: "2026-11-22", e: [
    ["neu", "Wunschkonzert-Modus, Künstler „Die Ärzte“, neue bunte Spielanleitung als PDF."],
  ]},
  { v: "0.8.4–0.8.9", d: "2026-11-22", e: [
    ["neu", "TV-Quiz und Kinderserien-Quiz mit Titelmelodien."],
    ["neu", "Kategorien NDW, Indie & Alternative, Michael Jackson."],
  ]},
  { v: "0.8.0–0.8.2", d: "2026-11-22", e: [
    ["neu", "8 Spielmodi mit Punktetafel, Spielanleitung in der App und als PDF."],
    ["change", "Mix und Spiel in einem Reiter, Punkte per Knopf, Ziel wählbar."],
  ]},
  { v: "0.6.0–0.7.6", d: "2026-11-22", e: [
    ["neu", "Über 850 Songs, viele neue Kategorien (Schlager, Hip-Hop, Country, Weihnachten …)."],
    ["neu", "Main-Kategorien „Hits in Deutschland“ und „Film & Soundtrack“."],
    ["change", "Spotify wird bei Bedarf automatisch geweckt."],
  ]},
  { v: "0.5", d: "2026-11-22", e: [
    ["neu", "Mixtape ist da: Karten scannen, Song hören, Jahr raten."],
    ["fix", "Scanner, Pause und Wiedergabe-Prüfung (0.5.1–0.5.7)."],
  ]},
];
