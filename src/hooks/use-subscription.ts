
'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useSubscription() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only setting mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle auth state changes
  useEffect(() => {
    if (!mounted) return

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribeAuth
  }, [mounted])

  // All payment logic has been removed. All users are considered "Pro".
  const isPro = true;

  // Define public pages that don't require any authentication.
  const publicPages = [
    "/",
    "/login",
    "/features",
    "/agency-intelligence",
    "/cjis-compliance",
    "/support",
    "/request-demo",
    "/terms-of-use",
    "/privacy-policy",
    "/security",
    "/for-officers",
  ]
  
  // A feature is considered free if it's a public page.
  const isFeatureFree = (path: string) => {
    return publicPages.includes(path)
  }
  
  // No features require a subscription anymore.
  const requiresSubscription = (path: string) => {
    return false
  }

  return { loading, isPro, mounted, isFeatureFree, requiresSubscription }
}
