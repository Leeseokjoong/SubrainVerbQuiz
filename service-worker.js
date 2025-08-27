/* simple PWA service worker */
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `verb-quiz-${CACHE_VERSION}`;
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './service-worker.js',
  // assets
  './audio/correct.mp3',
  './audio/wrong.mp3',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(()=>{})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())));
      await self.clients.claim();
    })()
  );
});

// cache-first for same-origin GET; network fallback; then update cache (SWR-ish)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // only GET & same-origin
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        // put a clone into cache (skip opaque)
        if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
          caches.open(CACHE_NAME).then(cache => cache.put(req, networkRes.clone()));
        }
        return networkRes;
      }).catch(() => cached); // offline fallback to cache
      return cached || fetchPromise;
    })
  );
});
