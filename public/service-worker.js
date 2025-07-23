const CACHE_NAME = 'shield-fl-v1'
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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Handle background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered')
})

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  console.log('Push notification received')
})