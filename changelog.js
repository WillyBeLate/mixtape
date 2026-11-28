// =====================================================================
//  MIXTAPE – Neuigkeiten (Changelog)
//  Neueste Version oben. Art: "neu" = Neu, "change" = Geändert, "fix" = Fix.
//  Bei jeder Änderung an der App hier einen Eintrag ergänzen.
// =====================================================================
const CHANGELOG = [
  { v: "0.19.7", d: "2026-11-28", e: [
    ["change", "Neuigkeiten: Das Label „Neu“ heißt jetzt „New“."],
  ]},
  { v: "0.19.6", d: "2026-11-28", e: [
    ["change", "Neuigkeiten: Das Label „Geändert“ heißt jetzt „Change“."],
  ]},
  { v: "0.19.5", d: "2026-11-28", e: [
    ["neu", "13 weitere Udo-Jürgens-Singles (z. B. „Matador“, „Rot blüht der Mohn“, „Café Größenwahn“) – kommen nach der Nachtprüfung ins Spiel."],
  ]},
  { v: "0.19.4", d: "2026-11-28", e: [
    ["change", "Einstellungen → Kategorien: Ausgeblendete Kategorien stehen weiterhin in der Übersicht, mit kurzem Hinweis, warum sie gerade nicht im Spiel sind."],
  ]},
  { v: "0.19.3", d: "2026-11-28", e: [
    ["change", "Jede Zusatz- und Künstler-Kategorie braucht jetzt mindestens 20 geprüfte Songs, sonst bleibt sie vorerst ausgeblendet. Kategorien unter 20 werden von der Nachtprüfung aufgefüllt."],
    ["fix", "Neue Songs, für die MusicBrainz nur eine spätere Veröffentlichung kennt, werden vor der Freigabe zusätzlich per Quelle geprüft."],
  ]},
  { v: "0.19.2", d: "2026-11-28", e: [
    ["change", "Kategorien mit zu wenigen geprüften Songs bleiben verborgen und erscheinen von selbst, sobald genug Songs die Nachtprüfung bestanden haben (mindestens 20 geprüfte Songs je Kategorie)."],
    ["fix", "Songs, die MusicBrainz gar nicht gefunden hat, gelten nicht mehr als geprüft – ihr Jahr wird erst bestätigt, bevor sie wieder ins Spiel kommen."],
  ]},
  { v: "0.19.1", d: "2026-11-28", e: [
    ["fix", "Neue Songs sind erst spielbar, wenn die Nachtprüfung Spotify-Version und Jahr bestätigt hat – vorher kamen sie schon mit Spotify-Suche ins Spiel."],
  ]},
  { v: "0.19.0", d: "2026-11-28", e: [
    ["neu", "Vier neue Zusatz-Kategorien: Disco & Funk (83 Songs), Electro & EDM (68), K-Pop & J-Pop (82) und Spanisch & Latino (75, nur Songs mit spanischem Text). Die neuen Songs prüft die Nachtprüfung in den nächsten Nächten (Spotify-Version und Jahr)."],
  ]},
  { v: "0.18.1", d: "2026-11-28", e: [
    ["fix", "Namensfeld unter Einstellungen → Online-Spiele sieht jetzt aus wie die anderen Eingabefelder der App."],
  ]},
  { v: "0.18.0", d: "2026-11-28", e: [
    ["neu", "Einladen statt Code abtippen: Im Warteraum eines Online-Spiels siehst du, wer im selben WLAN Mixtape offen hat – und frühere Mitspieler, die gerade online sind. Antippen → beim anderen erscheint eine Einladung, die 20 Sekunden lang angenommen oder abgelehnt werden kann."],
    ["neu", "Einstellungen → Online-Spiele: Namen festlegen, Sichtbarkeit für Einladungen an/aus und frühere Mitspieler verwalten."],
  ]},
  { v: "0.17.6", d: "2026-11-28", e: [
    ["fix", "Der Hinweis „Neu für dich“ verschwindet nicht mehr, wenn sich die App beim Lesen aktualisiert: Solange er aufgeklappt ist, wartet das Update, und er gilt erst nach „Okay, gesehen“ als gelesen."],
  ]},
  { v: "0.17.5", d: "2026-11-28", e: [
    ["fix", "Die Neuigkeiten verschwinden nicht mehr beim Lesen: Ein Update wird erst geladen, wenn du sie wieder zuklappst oder woanders hingehst."],
  ]},
  { v: "0.17.4", d: "2026-11-28", e: [
    ["fix", "Verlauf (welche Songs zuletzt liefen) bleibt jetzt richtig, auch wenn Songs dazukommen oder wegfallen – vorher konnte er auf andere Songs verrutschen."],
    ["fix", "Updates kommen zuverlässiger an: kein unnötiges Neuladen beim ersten Öffnen, Update-Prüfung beim Zurückkehren in die App, sauberer Offline-Speicher."],
    ["fix", "Sicherung: Gerätespezifisches (Spotify-Gerät, offene Online-Räume) wird nicht mehr mitgesichert und beim Laden auf dem Handy behalten."],
    ["change", "Wer einen neuen Online-Raum eröffnet, räumt seinen alten automatisch auf."],
  ]},
  { v: "0.17.3", d: "2026-11-28", e: [
    ["fix", "Zufälliger Startpunkt funktioniert jetzt auch bei Songs mit fester Aufnahme (vorher starteten die immer am Anfang)."],
    ["fix", "„Song nicht abspielbar“ erscheint nicht mehr fälschlich – die App schaut zweimal hin, bevor sie das meldet."],
    ["change", "Ist Spotifys Tageskontingent erschöpft, zieht die App automatisch nur Songs, die ohne Suche laufen – das Spiel geht einfach weiter. Die Geräteprüfung läuft dabei normal weiter."],
  ]},
  { v: "0.17.2", d: "2026-11-28", e: [
    ["fix", "Nachtprüfung: Abgelehnte Spotify-Treffer werden automatisch neu gesucht (der falsche bleibt ausgeschlossen); doppelt vergebene Aufnahmen und Titelmelodien ohne feste Version werden erkannt und zur Prüfung vorgelegt."],
    ["fix", "Eine eigene „Falscher Song“-Korrektur gibt Songs mit unsicherem Jahr nicht mehr frei – die bleiben draußen, bis das Jahr geklärt ist."],
    ["change", "Kaputte Meldungen werden mit Hinweis geschlossen; mehrere Korrekturen zum selben Song: die neueste gewinnt."],
  ]},
  { v: "0.17.1", d: "2026-11-28", e: [
    ["fix", "Sicherheit Online-Spiele: Alles, was aus der Online-Datenbank kommt, wird jetzt beim Empfang bereinigt – niemand kann über einen Raum fremden Code in die App einschleusen. Dazu passende, strengere Datenbank-Regeln."],
    ["fix", "Online-Spiele bleiben nicht mehr hängen, wenn ein Song fehlt oder Daten unvollständig sind."],
  ]},
  { v: "0.17.0", d: "2026-11-28", e: [
    ["neu", "Viele Modi gibt es jetzt auch online – jeder spielt am eigenen Handy, ein Handy spielt die Musik: Punktejagd, Intro-Sprint, Duell-Zeitstrahl, Wunschkonzert, TV-, Kinder-, Spiele-, Disney- und Film-Quiz (Mix-Schritt bzw. vor dem Start „Online“ wählen) sowie Zeit-Poker, Der DJ lügt und Gedächtnis-Mixtape (in ihren Einstellungen „Online“ wählen)."],
    ["neu", "Online-Quizze: Jeder sieht vier Antworten auf seinem Handy – wer zuerst richtig tippt, bekommt den Punkt. Beim Intro-Sprint läuft der Song erst 3, dann 7, dann 15 Sekunden."],
    ["change", "Das Handy-Symbol auf den Kacheln zeigt, welche Modi online spielbar sind."],
  ]},
  { v: "0.16.2", d: "2026-11-28", e: [
    ["change", "Spielmodus-Kacheln aufgeräumt: Stern, Karten- und Online-Symbol stehen immer gleich oben rechts, einzelne Kacheln gehen über die ganze Breite, und die vielen „NEU“-Schilder sind weg – Neues steht im Neu-für-dich-Hinweis."],
  ]},
  { v: "0.16.1", d: "2026-11-28", e: [
    ["change", "Zeitstrahl online steckt jetzt im normalen Zeitstrahl: Im Mix-Schritt wählst du „Mit Jahreskarten“ oder „Online“. Dein Mix gilt dann auch online."],
    ["neu", "Neben dem Karten-Symbol zeigt ein Handy-Symbol, welche Modi sich online mit mehreren Handys spielen lassen."],
    ["change", "Die Gruppe „Extras: ohne Karten“ heißt jetzt einfach „Extras“."],
  ]},
  { v: "0.16.0", d: "2026-11-28", e: [
    ["neu", "Zeitstrahl online: Der Zeitstrahl ganz ohne Karten, jeder am eigenen Handy. Alle sehen denselben Zeitstrahl, jeder hat verdeckte Handkarten. Wer dran ist, hört einen Song aus seiner Hand und legt ihn an die passende Stelle – falsch gelegt heißt: Karte raus, neue Karte ziehen. Wer zuerst keine Karten mehr hat, gewinnt."],
    ["neu", "Favoriten: Tippe auf den Stern einer Spielmodus-Kachel – deine Favoriten stehen dann ganz oben."],
  ]},
  { v: "0.15.8", d: "2026-11-28", e: [
    ["change", "Jahres-Blitz: Punkte gibt es jetzt für jeden – genau richtig 5, ein Jahr daneben 3, bis drei Jahre daneben 1. Bei Punktgleichstand am Ende gewinnt, wer insgesamt schneller getippt hat."],
  ]},
  { v: "0.15.7", d: "2026-11-28", e: [
    ["neu", "Jahres-Blitz ist eingerichtet und spielbereit."],
  ]},
  { v: "0.15.6", d: "2026-11-28", e: [
    ["neu", "Neues Spiel unter Extras: Jahres-Blitz – jeder spielt am eigenen Handy. Ein Handy eröffnet einen Raum und spielt die Musik, die anderen treten mit dem Raum-Code bei und tippen gleichzeitig das Jahr. Am nächsten dran gibt einen Punkt, genau richtig drei, bei Gleichstand gewinnt der Schnellere."],
  ]},
  { v: "0.15.5", d: "2026-11-28", e: [
    ["change", "Schnellerer Start: Der QR-Scanner wird erst kurz nach dem Start im Hintergrund geladen statt sofort."],
  ]},
  { v: "0.15.4", d: "2026-11-28", e: [
    ["change", "Titelmelodien: Eure „Falscher Song?“-Korrekturen im TV-, Kinder-, Spiele-, Disney- und Film-Quiz gehen jetzt wie bei den Songs automatisch an die nächtliche Prüfung und gelten danach auf allen Geräten. Bisherige Korrekturen auf diesem Gerät werden einmal nachgesendet."],
  ]},
  { v: "0.15.3", d: "2026-11-28", e: [
    ["change", "Über 100 Songs mit unklarer Spotify-Version sind geprüft und wieder im Spiel – darunter „Bailando“, „Taki Taki“, „Felicità“, „Heat Wave“ und „1000 und 1 Nacht (Zoom!)“."],
    ["change", "„Herr Sorge“ von den Ärzten und „Weil du nur einmal lebst“ von Peter Fox gibt es bei Spotify nicht – dafür sind jetzt „Ich, am Strand“ und „Ein Auge blau“ dabei. Statt „Ein Augenblick“ läuft „Schüttel deinen Speck“."],
    ["fix", "Jahre korrigiert (erste Veröffentlichung zählt): u. a. „Under the Bridge“ 1991, „What's Up?“ 1992, „Joy to the World“ 1970, „Treasure“ 2012, „The A Team“ 2010, „Picture“ 2001, „Lucille“ 1976, „Mädchen auf dem Pferd“ 2023 und mehrere Helene-Fischer-Songs."],
    ["neu", "Neue Songs füllen Lücken: „Shake Hands“ (Hits in Deutschland 1964), „Battle of the Heroes“ (Film 2005), „Sway“, „World in Motion“ und „Ecuador“ (Sommerhits 1954, 1990, 1997)."],
  ]},
  { v: "0.15.2", d: "2026-11-28", e: [
    ["neu", "Einstellungen → App: Kurze Hilfe, wie das neue App-Icon auf Android und iPhone auf den Startbildschirm kommt."],
    ["change", "Playlist importieren: Bis 100 Songs reicht es, Claude den Link im Chat zu schicken. Den Import braucht ihr nur noch für größere, eigene Playlists – fremde Playlists gibt Spotify seit 2026 nicht mehr heraus."],
  ]},
  { v: "0.15.1", d: "2026-11-28", e: [
    ["fix", "Schnelles Weitertippen startet keinen alten Song mehr. Beim Sprint stoppt ein verspäteter Timer nach „Auflösen“ den Song nicht mehr."],
    ["fix", "iPhone/iPad: Ist ein Song bei Spotify nicht abspielbar und läuft stattdessen nur die Stille, sagt Mixtape das jetzt, statt „Song läuft“ zu zeigen."],
    ["fix", "Klarere Meldungen: Abgelaufene Spotify-Anmeldung zeigt „Neu anmelden“, und nicht jeder Fehler heißt mehr „Keine Internetverbindung“."],
    ["change", "Ist Spotifys Kontingent aufgebraucht, pausiert nur noch die Suche – Abspielen, Pause und Lautstärke gehen weiter."],
    ["change", "Schnellerer Start bei schlechtem Empfang: Nach 3 Sekunden nimmt die App die gespeicherte Version. Nach Updates passen alle Dateien sicher zusammen."],
    ["change", "Spotify wird seltener im Hintergrund abgefragt (spart Akku), der Speicher wird geschont und der Browser gebeten, eure Daten nicht von selbst zu löschen."],
  ]},
  { v: "0.15.0", d: "2026-11-28", e: [
    ["change", "Songs, bei denen die Spotify-Version oder das Jahr noch unsicher ist, sind in keinem Spiel mehr, bis die nächtliche Prüfung sie geklärt hat. Eine eigene „Falscher Song“-Korrektur macht einen Song sofort wieder spielbar."],
    ["neu", "Fehlt einer Main-Kategorie dadurch ein Jahr, ergänzt die nächtliche Prüfung automatisch einen passenden Song."],
    ["change", "Einstellungen → Song-Prüfung zeigt jetzt nur noch kurz den Stand: wie viele Songs noch ohne Jahres-Prüfung, ohne Spotify-ID oder in Prüfung sind. Die alten Prüf-Werkzeuge in der App sind weg – das erledigt alles die Nacht."],
    ["change", "Aufgeräumt: rund 230 Zeilen alter Code entfernt."],
  ]},
  { v: "0.14.6", d: "2026-11-28", e: [
    ["change", "Sicherheit: Die Sicherungsdatei enthält die Spotify-Anmeldung und den GitHub-Schlüssel nicht mehr. Nach dem Laden einer Sicherung auf einem neuen Gerät einmal bei Spotify anmelden und den Schlüssel neu einfügen. Auf dem eigenen Gerät bleibt beides beim Laden erhalten."],
    ["change", "Sicherheit: Cover kommen nur noch direkt von Spotify. Die frühere iTunes-Suche hat fremden Code in die App geladen und ist entfernt."],
  ]},
  { v: "0.14.5", d: "2026-11-28", e: [
    ["fix", "„Alle Neuigkeiten“ im Neu-für-dich-Hinweis öffnet jetzt wirklich die Neuigkeiten."],
    ["fix", "iPhone/iPad: Die verbesserte Spotify-Erkennung aus 0.14.2 greift jetzt auch, wenn auf dem Handy noch kein Gerät gemerkt ist."],
    ["change", "Läuft eine Runde, fragt Mixtape vor dem Moduswechsel, vor +/− Team und vor „Los geht’s“ nach, statt die Punkte still zurückzusetzen."],
    ["fix", "Ein halb getippter Druckbereich unter „Karten“ verstellt nicht mehr die Jahre im Spiel."],
    ["change", "Neue App-Versionen laden erst neu, wenn gerade keine Runde läuft."],
  ]},
  { v: "0.14.4", d: "2026-11-27", e: [
    ["change", "Nächtliche Prüfung läuft jetzt um 3 Uhr. Eure „Falscher Song“-Meldungen gelten erst als erledigt, wenn sie wirklich gespeichert sind – so geht keine Korrektur mehr verloren."],
    ["change", "Die Nachtprüfung zählt keine eigenen Versionen mehr hoch. Neuigkeiten gibt es nur noch, wenn sich für euch etwas ändert (z. B. ein Song ersetzt oder ein Jahr korrigiert)."],
  ]},
  { v: "0.14.3", d: "2026-11-27", e: [
    ["change", "Einstellungen aufgeräumt: Automatische Prüfung, Jahres-Prüfung, Prüfliste, Spotify-Abgleich und Playlist-Import stecken jetzt zusammen unter „Song-Prüfung“."],
    ["change", "Alle Kategorien und Künstler mit ihrer Abdeckung findest du gesammelt unter „Song-Statistik“."],
    ["change", "Sicherung, Song-Verlauf und Cache sind zu „Daten & Sicherung“ zusammengefasst."],
  ]},
  { v: "0.14.2", d: "2026-11-27", e: [
    ["change", "Alle Emojis in der App sind jetzt gezeichnete Neon-Icons im Stil der Spielmodi – in Auswertungen, Einstellungen, Meldungen und Spielen."],
    ["fix", "iPad: Mixtape erkennt das iPad jetzt richtig als iPad (Safari gibt sich dort als Mac aus) und findet Spotify darauf zuverlässiger."],
    ["fix", "iPhone/iPad: Ist Spotify kurz im Hintergrund und fehlt deshalb in der Geräteliste, nimmt Mixtape trotzdem das zuletzt genutzte Handy, statt „Spotify schläft“ zu melden."],
    ["fix", "Yakari: Der Titelsong spielt jetzt eine Version, die nicht mehr hängt."],
  ]},
  { v: "0.14.1", d: "2026-11-27", e: [
    ["change", "Nächtliche Prüfung: Gibt es einen Song bei Spotify nicht, kommt automatisch ein passender Ersatz dazu – gleiches Jahr und gleiche Kategorie. Bei „Rette einen Song“ bleiben es 20 pro Jahr, bei den Künstlern bleibt die Anzahl gleich."],
  ]},
  { v: "0.14.0", d: "2026-11-27", e: [
    ["neu", "Vier neue Spiele ohne Karten unter „Extras“: Blind sortiert, Zeit-Poker, Der DJ lügt und Gedächtnis-Mixtape."],
    ["neu", "Blind sortiert: 5 Songs nacheinander sofort auf 5 Plätze legen – vom ältesten zum neuesten, ohne zu wissen, was noch kommt."],
    ["neu", "Zeit-Poker: Jahr verdeckt tippen und Chips setzen – wer am nächsten dran ist, räumt den Pot ab."],
    ["neu", "Der DJ lügt: Nur der DJ sieht das Jahr und sagt eins an – die anderen tippen „Glaub ich“ oder „Gelogen!“."],
    ["neu", "Gedächtnis-Mixtape: 6 Songs je 15 Sekunden hören, danach Fragen zu Reihenfolge, ältestem und neuestem Song."],
  ]},
  { v: "0.13.2", d: "2026-11-27", e: [
    ["change", "Jahreskarten: Die 2030er bekommen jetzt Pastell von Lavendel zu Rosé, damit sie sich klar von den blauen 2000ern abheben."],
  ]},
  { v: "0.13.1", d: "2026-11-27", e: [
    ["neu", "Jahreskarten: Die 2030er haben schon ihre eigene Farbe – Pastell von Lavendel zu Rosé."],
  ]},
  { v: "0.13.0", d: "2026-11-27", e: [
    ["neu", "Lautstärke direkt in Mixtape: Plus/Minus beim Spielen und bei „Rette einen Song“ – praktisch, wenn die Musik auf der Alexa läuft."],
    ["neu", "Startseite zeigt, ob Spotify bereit ist („Spotify bereit auf …“) – sonst gleich „Jetzt wecken“, bevor der erste Song kommt."],
    ["neu", "Sicherungs-Erinnerung: Ist die letzte Sicherung über eine Woche her, erinnert die Startseite daran. Auf dem iPhone landet die Sicherung über „Teilen → In Dateien sichern“ z. B. in iCloud."],
    ["neu", "Einstellungen → Spiel: Schalter „Große Schrift“."],
    ["change", "Der Bildschirm bleibt jetzt auch bei „Rette einen Song“ und „Zeitsprung“ an."],
    ["change", "Kurze Netz- oder Spotify-Aussetzer werden still wiederholt, statt gleich eine Fehlermeldung zu zeigen."],
    ["change", "Neuigkeiten-Banner: Einmal aufgeklappt und gelesen, ist er beim nächsten Öffnen weg."],
  ]},
  { v: "0.12.7", d: "2026-11-27", e: [
    ["neu", "Eigene Ansicht für iPad und Tablets: breitere Spalte, etwas größere Schrift, drei Spielmodi nebeneinander und bei „Rette einen Song“ die Songs zweispaltig."],
  ]},
  { v: "0.12.6", d: "2026-11-27", e: [
    ["fix", "Die Modus-Icons oben links bei „Rette einen Song“ und „Zeitsprung“ werden jetzt vollständig mit Farbverlauf gezeichnet."],
  ]},
  { v: "0.12.5", d: "2026-11-27", e: [
    ["change", "Rückfragen wie „Neues Mixtape starten?“ erscheinen jetzt als eigenes Fenster im Mixtape-Stil statt als graue Browser-Meldung."],
    ["change", "Rette einen Song: gezeichnete Icons bei „Nach Jahren“ und „Nach Künstlern“; wer gerade wählt, steht jetzt als farbiges Namensschild da; mehr Abstand zwischen Künstler und Namensschild."],
    ["fix", "Rette einen Song: In der Beschreibung stand „${IC_PLAY}“ statt des Play-Symbols. Das Modus-Icon oben links wird nicht mehr abgeschnitten."],
  ]},
  { v: "0.12.4", d: "2026-11-27", e: [
    ["change", "Spielmodi: Ob ihr Jahreskarten braucht, zeigt jetzt nur noch ein kleines Karten-Symbol oben rechts auf der Kachel. Kein Symbol = ohne Karten."],
  ]},
  { v: "0.12.3", d: "2026-11-27", e: [
    ["fix", "Die kleinen ⓘ-Knöpfe der Spielmodi schimmern beim Scrollen nicht mehr durch die Leiste unten."],
  ]},
  { v: "0.12.2", d: "2026-11-27", e: [
    ["change", "Nächtliche Prüfung: 246 Songs spielen jetzt immer die richtige Spotify-Aufnahme, 3 Songs auf das Jahr geprüft."],
  ]},
  { v: "0.12.1", d: "2026-11-27", e: [
    ["change", "Nächtliche Prüfung: 461 Songs auf das Jahr geprüft."],
  ]},
  { v: "0.12.0", d: "2026-11-27", e: [
    ["neu", "Automatische Prüfung: Jede Nacht gleicht Mixtape neue Songs selbstständig mit Spotify und MusicBrainz ab – ohne dass ein Handy laufen muss. Eindeutige Treffer gelten morgens auf allen Geräten."],
    ["neu", "Einstellungen → 🌙 Automatische Prüfung: Mit einem GitHub-Schlüssel gehen eure „Falscher Song“-Korrekturen von selbst an die nächtliche Prüfung."],
  ]},
  { v: "0.11.1", d: "2026-11-27", e: [
    ["neu", "Rette einen Song: Oben rechts gibt es „Falscher Song“. Dort legst du die richtige Spotify-Version fest (suchen, anhören, ✓ – oder Link einfügen) oder markierst, dass es den Song bei Spotify nicht gibt. Dann fliegt er aus allen Spielen."],
    ["change", "Rette einen Song nimmt bevorzugt geprüfte Songs (feste Spotify-Version und geprüftes Jahr). Noch ungeprüfte kommen nur dazu, wenn sonst keine 8 zusammenkommen."],
    ["change", "Deine Korrekturen und „gibt es nicht“-Markierungen landen beim Exportieren im Spotify-Abgleich mit in der Datei."],
  ]},
  { v: "0.11.0", d: "2026-11-27", e: [
    ["neu", "Rette einen Song: große Auswertung – Genre-Profil, Deutsch vs. international mit Flaggen, Mainstream oder Geheimtipp, Lieblingskünstler. Zu zweit außerdem Geschmacks-Match (auch gleicher Künstler/Genre zählt), eure einigste und strittigste Phase und das Jahrzehnt-Duell."],
    ["neu", "Partner-Tipp (zu zweit, im Setup an- und abschaltbar): Nach jedem geretteten Song tippst du, welchen der andere rettet. Am Ende: Wer kennt wen besser?"],
    ["neu", "Auswertung als Bild teilen, z. B. per WhatsApp."],
  ]},
  { v: "0.10.4", d: "2026-11-27", e: [
    ["change", "Rette einen Song: Pro Jahr gibt es jetzt einen Pool von 20 prägenden Songs – jede neue Runde kommen zufällig 8 davon. Auch bei den Künstlern wird jedes Mal neu gemischt."],
    ["neu", "165 neue Songs (u. a. Ray Charles, Marvin Gaye, Pink Floyd, Red Hot Chili Peppers, Spice Girls, Shakira, Bad Bunny) – auch im normalen Quiz in ihren Kategorien."],
  ]},
  { v: "0.10.3", d: "2026-11-27", e: [
    ["neu", "Linkin Park als Künstler-Kategorie (33 Songs von One Step Closer bis The Emptiness Machine) und bei „Rette einen Song – Nach Künstlern“."],
  ]},
  { v: "0.10.2", d: "2026-11-27", e: [
    ["change", "Spielmodi zeigen jetzt klein an, ob ihr die gedruckten Jahreskarten braucht oder ohne Karten spielt."],
  ]},
  { v: "0.10.1", d: "2026-11-27", e: [
    ["neu", "Rette einen Song: Überraschungseffekt – die Songs kommen nacheinander. Der nächste bleibt verdeckt, bis du ihn mit Play aufdeckst (oder „Alle aufdecken“)."],
    ["fix", "Reinhören: Tippt man schnell hintereinander, startet nicht mehr Sekunden später ein vorher angetippter Song. Der Knopf zeigt „lädt …“, bis der Song wirklich läuft, und bremst Spotify gerade, siehst du einen Countdown statt stiller Wartezeit."],
    ["fix", "Songs mit mehreren Künstlern zeigen jetzt alle – z. B. „My Universe“ von Coldplay & BTS, „Under Pressure“ von Queen & David Bowie. „Da Da Da“ von Trio heißt jetzt einfach so."],
    ["change", "Reinhören startet schneller: Das zuletzt benutzte Gerät wird direkt angesprochen, ohne jedes Mal die Geräteliste abzufragen."],
  ]},
  { v: "0.10.0", d: "2026-11-27", e: [
    ["change", "Gezeichnete Icons statt Emojis: Play, Pause, Nochmal, Zurück, Kopieren, Retten und Playlist – überall in der App im gleichen Stil. Der Play-Pfeil sitzt jetzt mittig im Knopf."],
    ["change", "Rette einen Song und Zeitsprung zeigen oben ihr eigenes Modus-Icon."],
    ["fix", "Fehlende Länderflaggen ergänzt (u. a. Puerto Rico, Barbados, Kuba, Nigeria, Kroatien) – statt „PR“ & Co. erscheint jetzt die richtige Flagge."],
  ]},
  { v: "0.9.99", d: "2026-11-27", e: [
    ["fix", "Rette einen Song: Cover erscheinen jetzt sofort – auch bei Songs, die noch nie abgespielt wurden. Die Cover der nächsten Runden werden schon im Hintergrund geladen."],
  ]},
  { v: "0.9.98", d: "2026-11-26", e: [
    ["neu", "191 neue Songs, vor allem für die bisher dünnen Kategorien: Weihnachten (+27), Country (+33), Italienisch (+26), Eurovision (+22), Hip-Hop (80er & Deutschrap), Schlager, NDW, Finnland, Türkei, Polen sowie viele aktuelle Hits aus den 2020ern."],
  ]},
  { v: "0.9.97", d: "2026-11-26", e: [
    ["neu", "Rette einen Song – Nach Künstlern: 26 Künstler (u. a. Coldplay, Grönemeyer, Filow, Rihanna, Lady Gaga) mit je 10 bekannten Songs – du rettest einen. Künstler frei auswählbar oder 10 zufällige, zu zweit abwechselnd."],
    ["neu", "81 neue Songs im Quiz, u. a. Filow (Rasenschach, Jiggy, Turbo …), Helene Fischer, Britney, Katy Perry, Bruno Mars, Toten Hosen und Udo Lindenberg."],
  ]},
  { v: "0.9.96", d: "2026-11-26", e: [
    ["fix", "Kleine Größen des neuen App-Icons korrigiert (der Hintergrund war nur teilweise gefüllt)."],
  ]},
  { v: "0.9.95", d: "2026-11-26", e: [
    ["change", "Neues App-Icon: Neon-Kassette mit MIXTAPE-Schriftzug. Android übernimmt es automatisch (evtl. kurz bestätigen), auf dem iPhone die App einmal neu zum Home-Bildschirm hinzufügen."],
  ]},
  { v: "0.9.94", d: "2026-11-26", e: [
    ["change", "213 weitere Songs spielen jetzt immer die richtige Aufnahme (Spotify-Abgleich), 35 falsche Treffer gesperrt."],
    ["fix", "„Bauch Beine Po“ ist von 2024, nicht 2023."],
  ]},
  { v: "0.9.93", d: "2026-11-26", e: [
    ["change", "Zeitsprung: Schon am Anfang gemischt – auch mal nur wenige Jahre Abstand. Mit jeder Stufe wird es öfter knapp, 20+ Jahre kommen nur noch selten vor."],
  ]},
  { v: "0.9.92", d: "2026-11-26", e: [
    ["change", "Zeitsprung: „Später“ ist jetzt grün, „Früher“ rot – besser zu unterscheiden."],
  ]},
  { v: "0.9.91", d: "2026-11-26", e: [
    ["neu", "Zeitsprung: Higher or Lower mit Jahren, ganz ohne Karten. Ist der neue Song früher oder später? Die Jahre rücken mit jeder richtigen Antwort näher zusammen, 3 Leben pro Person, 1–6 Personen, Rekorde pro Name."],
    ["change", "Die Extras heißen jetzt „Extras: ohne Karten“."],
  ]},
  { v: "0.9.90", d: "2026-11-25", e: [
    ["change", "Der Neuigkeiten-Hinweis im Hauptmenü ist eingeklappt – antippen zeigt die Details."],
  ]},
  { v: "0.9.89", d: "2026-11-25", e: [
    ["neu", "Kleines „i“ an jeder Spielmodus-Kachel: In zwei Sätzen, was diesen Modus von den anderen unterscheidet."],
  ]},
  { v: "0.9.88", d: "2026-11-25", e: [
    ["fix", "iPhone: „Spotify wachhalten“ fand oft keinen langen stillen Track und war dadurch wirkungslos. Jetzt werden auch kurze Stille-Tracks genommen und hintereinander gehängt."],
  ]},
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
