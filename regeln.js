// =====================================================================
//  MIXTAPE – Spielregeln & Spielmodi (eine Quelle für App UND Anleitung)
// ---------------------------------------------------------------------
//  Jeder Modus beschreibt hier sowohl seine Regeln als auch, wie sich die
//  App verhält (Feld "app"). Die Anleitung in der App und das PDF werden
//  direkt aus diesen Daten erzeugt – wer hier etwas ändert, ändert damit
//  automatisch auch die Spielanleitung.
// =====================================================================

const REGELN = {
  untertitel: "Das Musik-Zeitreise-Spiel",
  spieler: "2–10 Musikfans",
  alter: "ab 12 Jahren",
  dauer: "20–45 Minuten",

  worum: [
    "Ein Song läuft – aber aus welchem Jahr stammt er? Bei Mixtape scannt ihr Jahreskarten mit dem Handy, hört einen Song und schätzt, wann er erschienen ist. Welche Musik läuft, entscheidet ihr selbst: Ihr mixt euch vor jeder Partie bis zu vier Kategorien zusammen – von Globalen Hits über Schlager und Hip-Hop bis zu einzelnen Künstlern.",
    "Ob gegeneinander, in Teams oder alle gemeinsam: Mit acht Spielmodi passt Mixtape zu jedem Abend. Hier zählt nicht Expertenwissen, sondern euer Gefühl für Musik.",
  ],

  material: [
    ["Jahreskarten", "Je eine Karte pro Jahr von 1930 bis heute. Vorderseite: QR-Code. Rückseite: die Jahreszahl in der Farbe ihres Jahrzehnts."],
    ["Smartphone mit Mixtape", "Die App spielt die Songs ab, ohne Titel oder Interpret zu verraten, und führt die Punktetafel."],
    ["Spotify Premium", "Die Musik kommt aus eurem Spotify-Konto. Die Spotify-App muss auf dem Handy installiert sein."],
    ["Marker (nur für einige Modi)", "Für „Punktejagd“ braucht jedes Team einen eigenen Marker – zum Beispiel eine Münze, einen Kronkorken oder einen Spielstein."],
  ],

  vorbereitung: [
    "Öffnet Mixtape. Beim ersten Mal unter „Daten“ die Spotify-Verbindung einrichten und unter „Spiel“ mit Spotify verbinden.",
    "Wählt unter „Spiel“ zuerst den Spielmodus und tragt eure Namen bzw. Teams ein.",
    "Mixt dann eure Playlist: Wählt bis zu 4 Kategorien. Mindestens eine davon muss eine Main-Kategorie sein.",
    "Mischt die Jahreskarten und legt sie mit dem QR-Code nach oben bereit. Die Jahreszahl darf vor dem Auflösen niemand sehen.",
    "Tippt auf „Los geht's“ – damit beginnt eine neue Runde und die Punktetafel startet von vorn. Falls Spotify gerade schläft, öffnet Mixtape die Spotify-App kurz von selbst – einfach zurück zu Mixtape wechseln.",
  ],

  kategorien: [
    ["Main-Kategorien", "Globale Hits, Hits in Deutschland sowie Film & Soundtrack. Jede Main-Kategorie hat zu jedem Jahr auf den Karten passende Songs und ist deshalb auch allein spielbar. Ihr braucht immer mindestens eine."],
    ["Support-Kategorien", "Zum Beispiel Rock, Schlager, Hip-Hop, Country, Eurovision, One-Hit-Wonder oder Weihnachtslieder. Sie geben eurem Mix seine Würze."],
    ["Künstler", "Einzelne Künstler wie ABBA, Queen, Coldplay oder Herbert Grönemeyer."],
    ["So wird gemischt", "Gibt es zum gescannten Jahr einen Song aus euren Support- oder Künstler-Kategorien, kommt er bevorzugt dran – wie stark, stellt ihr mit dem Regler ein. Sonst springt der Main-Mix ein. Ihr müsst also nie eine Karte neu ziehen."],
  ],

  jahr: [
    "Es zählt das Jahr, in dem dieser Song von diesem Interpreten zum ersten Mal offiziell veröffentlicht wurde – egal ob als Single oder auf einem Album.",
    "Coverversionen sind eigene Songs: Whitney Houstons „I Will Always Love You“ zählt mit 1992, Dolly Partons Original mit 1974.",
    "Remaster, Neuauflagen oder spätere Neuaufnahmen desselben Interpreten ändern das Jahr nicht.",
    "Das Herkunftsland ist das Land, aus dem der Interpret bzw. die Band stammt.",
  ],

  sieg: [
    ["Punkteziel", "Bis wie viele Punkte ihr spielt, legt ihr beim Start fest. In jedem Modus ist ein Ziel vorgeschlagen – für einen kurzen Abend nehmt ihr weniger, für eine lange Partie mehr."],
    ["Gleich viele Züge", "Erreicht ein Team das Ziel, ist das Spiel noch nicht sofort vorbei: Die Runde wird zu Ende gespielt. Alle Teams, die bis dahin einen Zug weniger hatten, ziehen nach – so hatte am Ende jedes Team gleich viele Züge."],
    ["Wer gewinnt?", "Nach dem Nachziehen gewinnt das Team mit den meisten Punkten – auch wenn es dabei über das Ziel hinausgeht."],
    ["Gleichstand", "Liegen danach mehrere Teams punktgleich vorn, geht es in die Verlängerung: Jedes dieser Teams spielt noch einen Zug, bis nach einer vollen Runde ein Team allein vorn liegt. In Modi ohne feste Reihenfolge (Intro-Sprint) entscheidet ein Stechen: noch ein Song, bis ein Team vorn liegt."],
  ],

  zug: [
    ["Scannen", "Tippt im Spiel-Bildschirm auf „Scanner starten“ und haltet die Kamera auf den QR-Code. Der Song startet automatisch – Titel und Interpret bleiben verborgen."],
    ["Hören & raten", "Mit „Pause“ und „Nochmal von vorn“ könnt ihr den Song steuern. Je nach Modus ratet ihr Jahr, Jahrzehnt, Titel oder Interpret."],
    ["Auflösen", "Ein Tipp auf „Auflösen“ zeigt Jahr, Titel, Interpret, Herkunftsland und die Kategorie. Dreht dann auch die Karte um – Karte und App zeigen dasselbe Jahr."],
    ["Punkte vergeben", "Nach dem Auflösen zeigt Mixtape passende Knöpfe – zum Beispiel „+1 Team A“ oder „Volltreffer +2“. Ein zweiter Tipp nimmt die Vergabe zurück. Mit dem Stift an der Punktetafel lässt sich jeder Stand von Hand korrigieren."],
  ],

  tipps: [
    ["Nicht aufs Handy schielen", "Der Sperrbildschirm und die Benachrichtigungsleiste des Handys zeigen den Spotify-Titel. Legt das Handy während des Hörens am besten mit dem Display nach unten hin."],
    ["Spotify schläft", "Läuft kein Song, tippt auf „Spotify wecken & abspielen“. Mixtape öffnet Spotify kurz; wechselt zurück und der Song startet von selbst."],
    ["Neue Runde", "Jede Runde beginnt mit der Wahl von Modus, Teams, Punkteziel und Mix. Mit „Los geht's“ startet die Punktetafel von vorn. Eine laufende Runde könnt ihr unter „Spiel“ jederzeit fortsetzen."],
    ["Mix geheim halten", "Mit dem Auge neben „Mix“ im Scan-Bildschirm blendet ihr die gewählten Kategorien aus – praktisch, wenn ein Team den Mix heimlich zusammengestellt hat."],
    ["Wiederholen sich Songs?", "Mixtape merkt sich auch über mehrere Abende, welche Songs schon gelaufen sind, und spielt zu einem Jahr zuerst die anderen. Sind alle Songs eines Jahres in eurem Mix durch, kommen sie automatisch wieder in den Topf."],
    ["Karten nachdrucken", "Unter „Karten“ könnt ihr jederzeit neue Jahreskarten drucken: beidseitig, an der langen Kante spiegeln, 100 % Größe, dann entlang der Linien schneiden."],
  ],
};

// ---------------------------------------------------------------------
//  SPIELMODI
//  app.typ:  "standard" | "sprint" | "staffel" | "sabotage"
//  app.ziel: Punkte bzw. Karten zum Sieg (für die Punktetafel), 0 = kein Ziel
//  app.marken: Name eines zweiten Zählers (z. B. Klau-Marken) oder null
//  app.koop: true = alle spielen gemeinsam (Punktetafel zählt geschaffte Level)
//  app.handkarten: [Start-Team, andere] = Tafel zählt Handkarten, 0 = Sieg
//  app.runden: feste Kartenzahl (App zählt mit) · app.zug "reihum" = App wechselt den Zug
//  app.aktionen: Knöpfe zum Punktevergeben nach dem Auflösen.
//     jeder:true -> ein Knopf pro Team (p Punkte / m Marken; p:"stufe" = Punkte der Sprint-Stufe)
//     eff:[[wer, p, m], …] mit wer = "aktiv" (am Zug) | "andere" (nächstes Team); m:"level" = Level-Stapel abziehen
//  Platzhalter im Text: {ziel} {start} {max} {runden} {s1} {p1} … werden aus "app" eingesetzt
// ---------------------------------------------------------------------
const SPIELMODI = [
  {
    id: "duell", name: "Duell-Zeitstrahl", spieler: "2 Personen", neu: true, empfohlen: true,
    kurz: "Jeder baut seinen eigenen Zeitstrahl. Mit Klau-Marken schnappt ihr euch die Fehler des anderen.",
    app: { typ: "standard", ziel: 10, startPunkte: 1, marken: "Klau-Marken", markenStart: 2, markenMax: 5, teams: [2, 2], zug: "reihum", namen: "Spieler",
      aktionen: [ { label: "Richtig gelegt", eff: [["aktiv", 1, 0]] }, { label: "Geklaut!", eff: [["andere", 1, -1]] }, { label: "Klau daneben", eff: [["andere", 0, -1]] }, { label: "Titel & Interpret (+1 Marke)", jeder: true, m: 1 } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Mischt die Jahreskarten. Jede Person bekommt eine Karte und legt sie mit der Jahreszahl nach oben vor sich: der Start des eigenen Zeitstrahls.",
      "Legt die übrigen Karten als Nachziehstapel mit dem QR-Code nach oben bereit.",
      "Jede Person startet mit {start} Klau-Marken – die Punktetafel in der App zählt sie für euch.",
    ],
    ablauf: [
      "Wer am Zug ist, scannt die oberste Karte und legt sie mit dem QR-Code nach oben an die Stelle im eigenen Zeitstrahl, an die sie gehört.",
      "Klauen: Bevor aufgelöst wird, darf die andere Person für eine Klau-Marke „Klau!“ rufen und sagen, an welche Stelle die Karte im Zeitstrahl des anderen eigentlich gehört.",
      "Löst auf. Richtig gelegt: Die Karte bleibt liegen. Ein Klau-Versuch ist dann verloren.",
      "Falsch gelegt: Hat die andere Person geklaut und die richtige Stelle genannt, legt sie die Karte richtig in ihren eigenen Zeitstrahl. Sonst kommt die Karte aus dem Spiel.",
      "Marken verdienen: Wer vor dem Auflösen Titel und Interpret richtig nennt, bekommt eine Klau-Marke (höchstens {max}).",
      "Danach ist die andere Person am Zug.",
    ],
    ende: "Wer zuerst {ziel} Karten im eigenen Zeitstrahl hat, gewinnt.",
    beispiel: "Dein Zeitstrahl: 1972 · 1990 · 2008. Du legst den Song zwischen 1990 und 2008. Deine Partnerin ruft „Klau! Zwischen 1972 und 1990!“ – der Song ist von 1986. Sie bekommt die Karte.",
  },
  {
    id: "frueher", name: "Früher oder später", spieler: "2 Teams, gegeneinander", empfohlen: true,
    kurz: "Ein Team schätzt das Jahr, das andere wettet: früher oder später?",
    app: { typ: "standard", ziel: 10, marken: null, teams: [2, 2], zug: "reihum", namen: "Team",
      aktionen: [ { label: "Punkt", jeder: true, p: 1 }, { label: "Volltreffer", jeder: true, p: 2 } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Teilt euch in 2 Teams auf und bestimmt ein Start-Team (Team A).",
      "Mischt die Jahreskarten und legt sie als Stapel mit dem QR-Code nach oben in die Mitte.",
    ],
    ablauf: [
      "Team A scannt die oberste Karte. Beide Teams hören sich den Song an.",
      "Team A nennt das Jahr, in dem der Song erschienen ist.",
      "Team B entscheidet: Ist der Song in Wahrheit früher oder später erschienen als von Team A geschätzt?",
      "Löst auf. Lag Team B richtig, bekommt Team B einen Punkt. Lag Team B falsch, bekommt Team A einen Punkt.",
      "Volltreffer: Nennt Team A das Jahr exakt, bekommt Team A 2 Punkte – egal, was Team B gesagt hat.",
      "Danach wechseln die Rollen: Jetzt scannt und schätzt Team B, Team A wettet.",
    ],
    ende: "Das erste Team mit {ziel} Punkten gewinnt.",
    beispiel: "Team A schätzt 1985. Team B sagt „später“. Der Song ist von 1987 – Team B bekommt einen Punkt. Danach schätzt Team B.",
  },
  {
    id: "sabotage", name: "Sabotage", spieler: "2 Teams, gegeneinander", neu: true,
    kurz: "Das gegnerische Team entscheidet, aus welcher Kategorie euer nächster Song kommt.",
    app: { typ: "sabotage", ziel: 15, marken: null, teams: [2, 2], zug: "reihum", namen: "Team",
      aktionen: [ { label: "Jahr exakt +3", eff: [["aktiv", 3, 0]] }, { label: "≤ 2 Jahre +2", eff: [["aktiv", 2, 0]] }, { label: "≤ 5 Jahre +1", eff: [["aktiv", 1, 0]] }, { label: "Titel +1", eff: [["aktiv", 1, 0]] }, { label: "Interpret +1", eff: [["aktiv", 1, 0]] } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Teilt euch in 2 Teams auf und bestimmt ein Start-Team.",
      "Mischt die Jahreskarten und legt sie mit dem QR-Code nach oben bereit.",
    ],
    ablauf: [
      "Bevor ein Team scannt, wählt das gegnerische Team in der App eine Kategorie für den nächsten Song – gern eine, mit der sich das andere Team schwertut.",
      "Das aktive Team scannt die oberste Karte und hört den Song aus der gewählten Kategorie. Hat diese Kategorie für das Jahr keinen Song, „verpufft“ die Sabotage und ein Song aus eurem Mix läuft.",
      "Das aktive Team nennt das Jahr: genau richtig 3 Punkte, höchstens 2 Jahre daneben 2 Punkte, höchstens 5 Jahre daneben 1 Punkt.",
      "Zusätzlich gibt es je einen Bonuspunkt für den richtigen Titel und den richtigen Interpreten.",
      "Danach wechseln die Rollen: Jetzt sabotiert das andere Team.",
    ],
    ende: "Das erste Team mit {ziel} Punkten gewinnt.",
    varianten: [
      "Fair Play: Jede Kategorie darf pro Team höchstens zweimal gewählt werden.",
    ],
  },
  {
    id: "staffel", name: "Staffel", spieler: "2–4 Teams mit je 2–3 Personen", neu: true,
    kurz: "Jahrzehnt, Jahr, Titel: Jede Person im Team läuft eine Etappe – fällt der Staffelstab, ist der Zug vorbei.",
    app: { typ: "staffel", ziel: 20, marken: null, teams: [2, 4], zug: "reihum", namen: "Team",
      aktionen: [ { label: "Jahrzehnt +1", eff: [["aktiv", 1, 0]] }, { label: "Jahr exakt +2", eff: [["aktiv", 2, 0]] }, { label: "1 Jahr daneben +1", eff: [["aktiv", 1, 0]] }, { label: "Titel +1", eff: [["aktiv", 1, 0]] }, { label: "Interpret +1", eff: [["aktiv", 1, 0]] } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Teilt euch in Teams mit 2–3 Personen auf. Legt in jedem Team eine Reihenfolge fest: erste, zweite und dritte Etappe.",
      "Mischt die Jahreskarten und legt sie mit dem QR-Code nach oben bereit.",
    ],
    ablauf: [
      "Das aktive Team scannt die oberste Karte und hört den Song.",
      "Etappe 1: Die erste Person nennt das Jahrzehnt. Tippt auf „Jahrzehnt aufdecken“. Richtig: 1 Punkt, weiter zu Etappe 2.",
      "Etappe 2: Die zweite Person nennt das genaue Jahr. Tippt auf „Jahr aufdecken“. Genau richtig: 2 Punkte, ein Jahr daneben: 1 Punkt – dann weiter zu Etappe 3.",
      "Etappe 3: Die dritte Person (bei 2er-Teams wieder die erste) nennt Titel oder Interpret. Tippt auf „Titel & Interpret aufdecken“. Je richtigem Teil 1 Punkt.",
      "Der Staffelstab fällt: Liegt eine Etappe falsch, ist der Zug sofort vorbei – die späteren Etappen bringen keine Punkte mehr.",
      "Danach ist das nächste Team an der Reihe.",
    ],
    ende: "Das erste Team mit {ziel} Punkten gewinnt. Pro Zug sind höchstens 5 Punkte möglich.",
  },
  {
    id: "zeitstrahl", name: "Zeitstrahl", spieler: "2–5 Teams, gegeneinander",
    kurz: "Wer seine Handkarten zuerst richtig in den gemeinsamen Zeitstrahl gelegt bekommt, gewinnt.",
    app: { typ: "standard", ziel: 0, marken: null, teams: [2, 5], handkarten: [6, 5], zug: "reihum", namen: "Team",
      aktionen: [ { label: "Richtig eingeordnet", eff: [["aktiv", -1, 0]] }, { label: "Falsch eingeordnet (Strafkarte)", eff: [["aktiv", -1, 0], ["andere", 1, 0]] }, { label: "Länder-Bonus", eff: [["andere", -1, 0]] } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Teilt euch in 2–5 Teams zu je 1–2 Personen auf und bestimmt ein Start-Team (Team A).",
      "Mischt die Jahreskarten. Das Start-Team bekommt 6 Karten, alle anderen Teams 5 Karten. Haltet eure Handkarten mit dem QR-Code nach oben vor den anderen Teams geheim.",
      "Legt die übrigen Karten als Nachziehstapel bereit. Dreht die oberste Karte auf die Jahresseite und legt sie in die Mitte: Das ist der Beginn des gemeinsamen Zeitstrahls.",
    ],
    ablauf: [
      "Team A wählt eine seiner Handkarten und scannt sie. Achtet darauf, dass das nächste Team im Uhrzeigersinn (Team B) die Jahreszahl nicht sieht.",
      "Team B legt die Karte mit dem QR-Code nach oben an die Stelle im Zeitstrahl, an die sie seiner Meinung nach gehört, und dreht sie dann um.",
      "Richtig einsortiert: Die Karte bleibt liegen.",
      "Falsch einsortiert: Die Karte kommt aus dem Spiel und Team B zieht eine Strafkarte vom Nachziehstapel auf die Hand.",
      "Danach ist Team B an der Reihe und wählt eine Karte aus der eigenen Hand für das nächste Team.",
    ],
    ende: "Das erste Team ohne Handkarten gewinnt.",
    varianten: [
      "Einfacher: Hat der Zeitstrahl 13 Karten, nimmt das Team mit dem Handy eine beliebige Karte heraus. Der Zeitstrahl wird so nie länger als 13 Karten.",
      "Länder-Bonus: Nennt Team B vor dem Auflösen zusätzlich das richtige Herkunftsland, darf es eine eigene Handkarte unter den Nachziehstapel legen.",
    ],
  },
  {
    id: "punktejagd", name: "Punktejagd", spieler: "2–5 Teams, alle gleichzeitig",
    kurz: "Jeder Song, alle Teams: Setzt euren Marker an die richtige Stelle im Zeitstrahl.",
    app: { typ: "standard", ziel: 0, marken: null, teams: [2, 5], runden: 18, namen: "Team",
      aktionen: [ { label: "Richtige Stelle", jeder: true, p: 1 }, { label: "Land", jeder: true, p: 1 } ] },
    material: ["Jahreskarten", "ein Marker pro Team"],
    vorbereitung: [
      "Teilt euch in 2–5 Teams auf. Jedes Team bekommt einen eigenen Marker.",
      "Mischt die Jahreskarten. Legt 2 Karten mit der Jahreszahl nach oben in die Mitte: Das ist der Start des gemeinsamen Zeitstrahls.",
      "Zählt {runden} Karten als Nachziehstapel ab (QR-Code nach oben). Die übrigen Karten werden nicht gebraucht.",
    ],
    ablauf: [
      "In jeder Runde spielen alle Teams mit. Scannt die oberste Karte des Nachziehstapels und hört euch den Song an.",
      "Alle Teams legen ihren Marker an die Stelle im Zeitstrahl, an der sie das Erscheinungsjahr vermuten. Zwei Teams dürfen dieselbe Stelle wählen.",
      "Löst auf. Jedes Team, dessen Marker an der richtigen Stelle liegt, bekommt einen Punkt.",
      "Länder-Bonus: Wer vor dem Auflösen das Herkunftsland des Interpreten richtig ansagt, bekommt einen Extrapunkt. Jedes Team darf einmal pro Runde tippen.",
      "Legt die Karte mit der Jahreszahl nach oben an die richtige Stelle in den Zeitstrahl und scannt die nächste Karte.",
    ],
    ende: "Sind alle {runden} Karten gespielt, gewinnt das Team mit den meisten Punkten. Bei Gleichstand teilt ihr euch den Sieg.",
    varianten: [
      "Einfacher: Hat der Zeitstrahl 13 Karten, nimmt das Team mit dem Handy eine beliebige Karte heraus.",
    ],
  },
  {
    id: "sprint", name: "Intro-Sprint", spieler: "2–10 Personen oder Teams", neu: true,
    kurz: "Erst {s1} Sekunden, dann {s2}, dann {s3}: Wer früher richtig liegt, bekommt mehr Punkte.",
    app: { typ: "sprint", ziel: 15, marken: null, teams: [2, 10], stufen: [ [3, 3], [7, 2], [15, 1] ], namen: "Team",
      aktionen: [ { label: "Erkannt", jeder: true, p: "stufe" }, { label: "Jahr exakt", jeder: true, p: 1 } ] },
    material: ["alle Jahreskarten"],
    vorbereitung: [
      "Spielt einzeln oder in Teams. Mischt die Jahreskarten und legt sie mit dem QR-Code nach oben bereit.",
    ],
    ablauf: [
      "Scannt die oberste Karte. Mixtape spielt nur die ersten {s1} Sekunden des Songs und stoppt dann.",
      "Wer Titel oder Interpret zu erkennen glaubt, ruft die Antwort. Richtig nach {s1} Sekunden: {p1} Punkte.",
      "Hat niemand richtig geraten, tippt auf „Weiter“: Der Song läuft von vorn {s2} Sekunden – richtig jetzt: {p2} Punkte. Danach {s3} Sekunden – richtig jetzt: {p3} Punkt.",
      "Jede Person bzw. jedes Team darf pro Stufe einmal antworten. Wer falsch liegt, setzt für den Rest dieses Songs aus.",
      "Jahres-Bonus: Wer zum Schluss das Erscheinungsjahr exakt nennt, bekommt einen Extrapunkt.",
      "Löst auf und scannt die nächste Karte.",
    ],
    ende: "Wer zuerst {ziel} Punkte hat, gewinnt.",
  },
  {
    id: "gemeinsam", name: "Gemeinsam gegen die Zeit", spieler: "alle gemeinsam",
    kurz: "Ihr spielt zusammen gegen das Spiel und arbeitet euch durch 9 Level.",
    app: { typ: "standard", ziel: 9, marken: "Nachziehstapel", markenStart: 25, koop: true, teams: [1, 1], namen: "Wir alle",
      aktionen: [ { label: "Richtig – Level geschafft", eff: [["aktiv", 1, 0]] }, { label: "Falsch – Level wiederholen", eff: [["aktiv", 0, "level"]] } ] },
    material: ["79 Jahreskarten"],
    vorbereitung: [
      "Ihr spielt alle zusammen in einem Team.",
      "Mischt die Jahreskarten (QR-Code nach oben) und legt 9 Level-Stapel aus: Level 1 hat 2 Karten, Level 2 hat 3 Karten … Level 9 hat 10 Karten.",
      "Zählt {start} weitere Karten als Nachziehstapel ab. Die übrigen Karten kommen zurück in die Schachtel.",
    ],
    ablauf: [
      "Beginnt mit Level 1. Scannt die oberste Karte des Level-Stapels und hört euch den Song an.",
      "Mischt dann alle Karten dieses Level-Stapels (QR-Code nach oben) und dreht sie anschließend alle auf die Jahresseite.",
      "Entscheidet gemeinsam, welche der Jahreszahlen zum gehörten Song passt.",
      "Löst in der App auf. Richtig: Der Level-Stapel kommt in die Schachtel und ihr macht mit dem nächsten Level weiter.",
      "Falsch: Der Level-Stapel kommt in die Schachtel. Zieht so viele Karten vom Nachziehstapel, wie der Level-Stapel hatte, und spielt das Level noch einmal.",
    ],
    ende: "Ihr gewinnt gemeinsam, wenn ihr alle {ziel} Level geschafft habt. Ihr verliert gemeinsam, wenn der Nachziehstapel nicht mehr reicht, um ein Level zu wiederholen.",
    beispiel: "Level 3 besteht aus 4 Karten: 1962, 1979, 1994, 2011. Der Song klingt nach Disco – ihr tippt auf 1979.",
  },
  {
    id: "tv", name: "TV-Quiz", spieler: "2–10 Personen oder Teams", neu: true,
    kurz: "Keine Jahreszahlen, nur Fernsehen: Erkennt ihr die Serie zur Titelmelodie?",
    app: { typ: "tv", ziel: 10, marken: null, teams: [2, 10], namen: "Team", ohneKarten: true,
      aktionen: [ { label: "Serie erkannt", jeder: true, p: 1 }, { label: "Bonus: Song oder Interpret", jeder: true, p: 1 } ] },
    material: ["nur das Handy – Jahreskarten braucht ihr hier nicht"],
    vorbereitung: [
      "Spielt einzeln oder in Teams. Wählt unter „Spiel“ den Modus „TV-Quiz“ – ein Mix ist nicht nötig, die Titelmelodien kommen aus allen Jahrzehnten.",
    ],
    ablauf: [
      "Tippt auf „Nächste Titelmelodie“. Mixtape spielt die Titelmusik einer Serie – ohne Namen, ohne Bild.",
      "Wer die Serie erkennt, ruft ihren Namen. Die erste richtige Antwort bekommt einen Punkt.",
      "Wer falsch rät, ist für diese Melodie raus. Weiß es niemand, hilft „Nochmal von vorn“.",
      "Tippt auf „Auflösen“: Mixtape zeigt die Serie, den Song bzw. Komponisten, das Startjahr und das Land.",
      "Bonus: Wer vor dem Auflösen zusätzlich den Songtitel oder den Interpreten nennt, bekommt einen Extrapunkt.",
    ],
    ende: "Wer zuerst {ziel} Punkte hat, gewinnt. Bei Gleichstand entscheidet ein Stechen mit einer weiteren Melodie.",
    beispiel: "Nach zwei Takten Synthesizer ruft Lena „Stranger Things!“ – Punkt. Ben weiß noch „Kyle Dixon & Michael Stein“ – Bonuspunkt.",
  },
];
