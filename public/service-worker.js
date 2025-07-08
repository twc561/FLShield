const CACHE_NAME = 'florida-shield-cache-v2';
const OFFLINE_URL = 'offline.html';
const PRECACHE_ASSETS = [
  OFFLINE_URL,
  '/manifest.json',
  'https://placehold.co/192x192.png',
  'https://placehold.co/512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        // 1. Try to fetch from the network
        const networkResponse = await fetch(event.request);
        // If successful, cache the new response for future use
        if (event.request.method === 'GET') {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        // 2. Network failed, try to get it from the cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If it's a navigation request and it's not in the cache, show the offline page
        if (event.request.mode === 'navigate') {
          const offlinePage = await cache.match(OFFLINE_URL);
          return offlinePage;
        }

        // For other failed requests (e.g., images), just fail
        return Response.error();
      }
    })
  );
});
