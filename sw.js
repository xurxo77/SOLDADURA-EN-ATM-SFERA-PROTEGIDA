// Service worker del Aula-taller: hace la web instalable y deja abrir sin conexión lo ya visitado.
// Siempre intenta la red primero (así llegan los cambios que subes a GitHub) y, si no hay conexión,
// usa la última copia guardada. No toca nada de Google (Classroom, inicio de sesión).
const CACHE = "aula-taller-v1";
const BASICO = ["./", "./profesor.html", "./preparar.html", "./clase.html", "./aula.css", "./aula-datos.js",
  "./acceso.js", "./classroom.js", "./classroom-config.js", "./banco.js", "./manifest.json",
  "./icon-192.png", "./icon-512.png", "./favicon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASICO)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(r, copia)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match("./profesor.html")))
  );
});
