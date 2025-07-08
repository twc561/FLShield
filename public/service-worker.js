
// A "Network falling back to Cache" strategy for PWA stability.

const CACHE_NAME = 'shieldfl-cache-v1';
const OFFLINE_URL = 'offline.html';

// 1. On install, pre-cache the offline fallback page and manifest.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache the offline page, manifest, and essential icons.
      return cache.addAll([
        OFFLINE_URL,
        '/manifest.json',
        'https://placehold.co/192x192.png',
        'https://placehold.co/512x512.png'
      ]);
    })
  );
  self.skipWaiting();
});

// 2. On activation, clean up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

// 3. On fetch, try the network first. If it fails, serve the offline page for navigation requests.
self.addEventListener('fetch', (event) => {
  // We only want to intercept navigation requests (i.e., for HTML pages).
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the network.
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // If the network fails, serve the offline page from the cache.
          console.log('Fetch failed; returning offline page instead.', error);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
  
  // For other requests (images, CSS, etc.), try cache first then network.
  // This is a simple "cache-first" strategy for non-navigation assets.
  // A more robust app might have more complex logic here.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
