// Mixtape Service Worker
// Strategie "Netz zuerst": Ist das Handy online, wird immer die neueste Version geladen
// (Updates kommen also automatisch). Nur offline wird die gespeicherte Kopie benutzt.
// Bei Änderungen an dieser Datei VERSION hochzählen.
const VERSION = "mixtape-v38";
const FILES = ["./", "index.html", "daten.js", "regeln.js", "geprueft.js", "manifest.json", "lib/html5-qrcode.min.js", "lib/qrcode.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;   // Spotify-Anfragen nie anfassen
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
