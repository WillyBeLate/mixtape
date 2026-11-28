// Mixtape Service Worker
// Strategie "Netz zuerst": Ist das Handy online, wird immer die neueste Version geladen
// (Updates kommen also automatisch). Nur offline wird die gespeicherte Kopie benutzt.
// Bei Änderungen an dieser Datei VERSION hochzählen.
const VERSION = "mixtape-v177";
const FILES = ["./", "index.html", "daten.js", "regeln.js", "changelog.js", "geprueft.js", "ids.js", "manifest.json", "lib/html5-qrcode.min.js", "lib/qrcode.js", "lib/jszip.min.js",
  "icons/icon4-192.png", "icons/icon4-512.png", "icons/icon4-180.png"];

self.addEventListener("install", e => {
  // cache:"reload" → am Browser-Zwischenspeicher vorbei, damit wirklich die neue Version gespeichert wird
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Bibliotheken und Icons ändern sich nie → direkt aus dem Speicher (schneller Start).
// Alles andere: Netz zuerst, aber höchstens 3 s warten, wenn eine gespeicherte Kopie da ist (schlechter Empfang).
const STATIC = /\/(lib|icons)\//;
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;   // Spotify-Anfragen nie anfassen
  // Gespeichert wird ohne ?v=…/?code=… – sonst sammeln sich pro Version neue Kopien an
  const key = url.origin + url.pathname;
  const save = res => { if (res && res.ok && res.type === "basic") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(key, copy)); } return res; };
  if (STATIC.test(url.pathname)) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(save)));
    return;
  }
  e.respondWith((async () => {
    const net = fetch(e.request, { cache: "no-cache" }).then(save);
    const hit = await caches.match(e.request, { ignoreSearch: true });
    if (!hit) return net;
    const timeout = new Promise(ok => setTimeout(() => ok(null), 3000));
    try { return (await Promise.race([net, timeout])) || hit; } catch(err) { return hit; }
  })());
});
