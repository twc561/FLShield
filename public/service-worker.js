const CACHE_NAME = `shield-fl-v${Date.now()}`
const urlsToCache = [
  '/',
  '/dashboard',
  '/login',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', (event) => {
  // Network-first strategy for API calls and critical data
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('/dashboard') ||
      event.request.url.includes('/_next/static/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If network succeeds, cache the response
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
          }
          return response
        })
        .catch(() => {
          // If network fails, fall back to cache
          return caches.match(event.request)
        })
    )
  } else {
    // Cache-first for static assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response
          }
          return fetch(event.request)
        })
    )
  }
})

// Handle background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered')
})

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  console.log('Push notification received')
})

// Handle manual cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName)
          })
        )
      }).then(() => {
        self.registration.unregister().then(() => {
          self.clients.claim()
        })
      })
    )
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})