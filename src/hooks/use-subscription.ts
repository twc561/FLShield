
'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export interface SubscriptionData {
  id: string
  customerId: string
  status: string
  currentPeriodEnd: Date
  priceId: string
  plan: string
}

export function useSubscription() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
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
      if (!currentUser) {
        setSubscription(null)
        setLoading(false)
      }
    })

    return unsubscribeAuth
  }, [mounted])

  useEffect(() => {
    if (!mounted || !user) {
        if(!user) setLoading(false)
        return
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        const data = doc.data()
        if (data?.subscription) {
          setSubscription({
            ...data.subscription,
            currentPeriodEnd: data.subscription.currentPeriodEnd.toDate()
          })
        } else {
          setSubscription(null)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching subscription:', error)
        // If it's a permission error, user likely doesn't have a subscription
        if (error instanceof Error && error.message.includes('permission')) {
          setSubscription(null)
        } else {
          setSubscription(null)
        }
        setLoading(false)
      }
    )

    return unsubscribe
  }, [user, mounted])

  // Temporarily grant Pro access to all users
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
    "/subscription/success"
  ]
  
  // A feature is considered free if it's a public page OR a page accessible to any logged-in user.
  const isFeatureFree = (path: string) => {
    if (publicPages.includes(path)) return true;

    // These pages require login but not a Pro subscription
    const freeLoggedInPages = [
      '/dashboard',
      '/install',
      '/subscription',
    ];
    
    return freeLoggedInPages.some(freePath => path === freePath || (freePath !== '/' && path.startsWith(freePath)));
  }

  // A feature requires a subscription if it's NOT free and the user is logged in.
  const requiresSubscription = (path: string) => {
    if (!mounted || !user) return false;
    return !isFeatureFree(path)
  }

  return { subscription, loading, isPro, mounted, isFeatureFree, requiresSubscription }
}
