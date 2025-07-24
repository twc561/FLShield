
'use client'

import { useEffect } from 'react'

export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Force update check every 30 seconds
      const updateCheck = setInterval(() => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.update()
          }
        })
      }, 30000)

      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Check for updates immediately
          registration.update()
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  if (confirm('New version available! Refresh to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })

      // Clear cache on app load if needed
      const clearCacheIfNeeded = () => {
        const lastClearTime = localStorage.getItem('lastCacheClear')
        const now = Date.now()
        const oneHour = 60 * 60 * 1000
        
        if (!lastClearTime || (now - parseInt(lastClearTime)) > oneHour) {
          navigator.serviceWorker.ready.then((registration) => {
            if (registration.active) {
              registration.active.postMessage({ type: 'CLEAR_CACHE' })
              localStorage.setItem('lastCacheClear', now.toString())
            }
          })
        }
      }

      clearCacheIfNeeded()

      return () => clearInterval(updateCheck)
    }
  }, [])

  return null
}
