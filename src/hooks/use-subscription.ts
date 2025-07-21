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
    if (!mounted || !user) return

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
  }, [user])

  const isPro = subscription?.status === 'active' && new Date() < subscription.currentPeriodEnd

  // Define free features that don't require subscription
  const freeFeatures = [
    '/legal-reference/statutes',
    '/legal-reference/case-law',
    '/dashboard',
    '/subscription',
    '/subscription/success',
    '/',
    '/login',
    '/features',
    '/support',
    '/terms-of-use',
    '/privacy-policy',
    '/security',
    '/for-officers',
    '/agency-intelligence',
    '/cjis-compliance',
    '/cjis-compliance',
    '/request-demo'
  ]

  const isFeatureFree = (path: string) => {
    return freeFeatures.some(freePath => path.startsWith(freePath))
  }

  const requiresSubscription = (path: string) => {
    // Only check subscription requirements after mounting to avoid hydration issues
    if (!mounted) return false
    return !isFeatureFree(path) && !!user
  }

  return { subscription, loading, isPro, mounted, isFeatureFree, requiresSubscription }
}