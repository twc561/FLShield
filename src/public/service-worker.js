// A robust service worker for a Next.js PWA

const CACHE_NAME = `florida-shield-v${new Date().getTime()}`; // Dynamic versioning for aggressive updates

// List of files to cache on installation
const urlsToCache = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/logo.svg',
  // Add other critical pages and assets here
];

// 1. Installation: Cache the application shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Activation: Clean up old caches and take control
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated and taking control');
      return self.clients.claim(); // Take control of open clients immediately
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// 3. Fetch: Serve from cache or network
self.addEventListener('fetch', event => {
  // For navigation requests (HTML pages), try network first, then cache.
  // This ensures users get the latest pages if they are online.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If the network request is successful, cache it and return it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // If the network fails, serve from cache
          return caches.match(event.request)
            .then(response => {
              return response || caches.match('/'); // Fallback to home page
            });
        })
    );
    return;
  }

  // For all other requests (CSS, JS, images), use a cache-first strategy.
  // This makes the app load fast.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, cache it, and return it
        return fetch(event.request).then(
          networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return networkResponse;
          }
        );
      })
  );
});

// 4. Skip Waiting: Allows a new service worker to activate immediately
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
