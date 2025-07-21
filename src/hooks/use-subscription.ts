
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
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
  const [user] = useAuthState(auth)
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only setting mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    if (!user) {
      setSubscription(null)
      setLoading(false)
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
