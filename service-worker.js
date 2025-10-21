/* Cava Gourmet Market — Service Worker
   Estrategias:
   - Precarga (precache) de shell y assets críticos
   - Network-first para HTML (navegación) con fallback offline
   - Stale-while-revalidate para imágenes
   - Cache-first para otros GET estáticos
*/
const VERSION = 'v1.0.0';
const PRECACHE = `cava-precache-${VERSION}`;
const RUNTIME = `cava-runtime-${VERSION}`;

// Ajusta si cambias rutas/archivos
const PRECACHE_URLS = [
  '/NazarethPM/',
  '/NazarethPM/index.html',
  '/NazarethPM/manifest.json',
  '/NazarethPM/robots.txt',
  '/NazarethPM/sitemap.xml',
  '/NazarethPM/humans.txt',
  '/NazarethPM/security.txt',
  '/NazarethPM/offline.html',
  '/NazarethPM/assets/PhotoRoom-20231102_232057.png',
  '/NazarethPM/assets/9b948966-bf54-44e9-8a4d-7a0a9f7643ca.png'
];

// ——— INSTALL: precache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ——— ACTIVATE: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => (k.startsWith('cava-precache-') || k.startsWith('cava-runtime-')) && k !== PRECACHE && k !== RUNTIME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Utilidad: timeout para network-first
const networkWithTimeout = (req, ms = 3000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(req)
      .then(res => { clearTimeout(timer); resolve(res); })
      .catch(err => { clearTimeout(timer); reject(err); });
  });
};

// ——— FETCH: estrategias por tipo
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Sólo caché GET
  if (request.method !== 'GET') return;

  // 1) Navegación/HTML → network-first + fallback offline
  if (request.mode === 'navigate' || (request.destination === '' && request.headers.get('accept')?.includes('text/html'))) {
    event.respondWith((async () => {
      try {
        const res = await networkWithTimeout(request, 3500);
        const cache = await caches.open(RUNTIME);
        cache.put(request, res.clone());
        return res;
      } catch (e) {
        const cache = await caches.open(PRECACHE);
        const cached = await cache.match(request) || await cache.match('/NazarethPM/offline.html');
        return cached;
      }
    })());
    return;
  }

  // 2) Imágenes same-origin → stale-while-revalidate
  if (request.destination === 'image' && url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const cached = await cache.match(request);
      const networkPromise = fetch(request)
        .then(res => { cache.put(request, res.clone()); return res; })
        .catch(() => null);
      return cached || networkPromise || caches.match('/NazarethPM/assets/PhotoRoom-20231102_232057.png');
    })());
    return;
  }

  // 3) Otros GET estáticos (CSS/JS/json/etc.) → cache-first
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const res = await fetch(request);
      // Opcional: sólo cachear 200 y same-origin
      if (res && res.status === 200 && url.origin === self.location.origin) {
        cache.put(request, res.clone());
      }
      return res;
    } catch (e) {
      // fallback genérico si aplica
      return cached || Response.error();
    }
  })());
});
