// A network-first, falling back to cache service worker
// The version of the cache. Every time you change assets, you need to update this version.
const CACHE_VERSION = 1;
const CACHE_NAME = `florida-shield-cache-v${CACHE_VERSION}`;

// A list of essential files to be pre-cached.
const PRECACHE_ASSETS = [
    '/offline.html',
    '/manifest.json',
    'https://placehold.co/192x192.png',
    'https://placehold.co/512x512.png'
];

// On install, pre-cache the essential assets.
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} forces the browser to fetch a fresh copy of the assets from the network.
    await cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
  })());
  self.skipWaiting();
});

// On activate, clean up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.map((name) => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
      })
    );
    await clients.claim();
  })());
});

// The core logic: Network falling back to cache.
self.addEventListener('fetch', (event) => {
  // We only want to handle navigation requests (i.e., for HTML pages).
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // First, try to fetch the request from the network.
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // If the network fetch fails (i.e., offline), open the cache.
        const cache = await caches.open(CACHE_NAME);
        // Respond with the pre-cached offline page.
        const cachedResponse = await cache.match('/offline.html');
        return cachedResponse;
      }
    })());
  }
});
