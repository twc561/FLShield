
// This is a basic service worker. In a real app, you'd use a library like Workbox.
const CACHE_NAME = 'florida-shield-cache-v1';
const urlsToCache = [
  '/',
  '/dashboard',
  '/styles/globals.css',
  // Add other critical assets here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
