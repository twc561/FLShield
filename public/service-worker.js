// A robust "Network falling back to Cache" strategy for PWA stability.

const CACHE_NAME = 'shieldfl-cache-v2';
const OFFLINE_URL = 'offline.html';
const APP_SHELL_URLS = [
  OFFLINE_URL,
  '/manifest.json',
  'https://placehold.co/192x192.png',
  'https://placehold.co/512x512.png'
];

// 1. On install, pre-cache the offline fallback page and core app shell assets.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching App Shell');
      return cache.addAll(APP_SHELL_URLS);
    })
  );
  self.skipWaiting();
});

// 2. On activation, clean up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. On fetch, implement network-first strategy.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        // Try the network first.
        const networkResponse = await fetch(event.request);
        // If the fetch is successful, cache the response for future offline use.
        if (event.request.method === 'GET') {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        // If the network fails, try to serve from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // If it's a navigation request and it's not in the cache, serve the offline page.
        if (event.request.mode === 'navigate') {
          const offlinePage = await cache.match(OFFLINE_URL);
          return offlinePage;
        }
        // For other failed requests (like API calls or assets not in cache), just let the browser handle the error.
        return new Response(null, { status: 404 });
      }
    })
  );
});