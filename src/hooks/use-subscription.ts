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

  // Hardcoded pro access for specific users
  const hardcodedProEmails = ['osorioecat@gmail.com', 'rdc561@gmail.com']
  const hasHardcodedAccess = user?.email && hardcodedProEmails.includes(user.email)
  
  const isPro = hasHardcodedAccess || (subscription?.status === 'active' && new Date() < subscription.currentPeriodEnd)

  // Define ONLY the specific free features that don't require subscription
  const freeFeatures = [
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

  // All premium features that require subscription
  const premiumFeatures = [
    '/legal-reference',
    '/daily-briefing',
    '/ai-tools',
    '/ai-legal-advisor',
    '/emergency-response',
    '/field-procedures',
    '/field-translation-guide',
    '/flowcharts',
    '/officer-wellness-rights',
    '/reporting-development',
    '/reports',
    '/restraint-techniques',
    '/specialized-enforcement',
    '/traffic-enforcement',
    '/training-development',
    '/voice-assistant',
    '/wellness',
    '/notes',
    '/favorites',
    '/install'
  ]

  const isFeatureFree = (path: string) => {
    // Exact match only for free features
    return freeFeatures.some(freePath => path === freePath || (freePath !== '/' && path.startsWith(freePath + '/')))
  }

  const isPremiumFeature = (path: string) => {
    return premiumFeatures.some(premiumPath => path.startsWith(premiumPath))
  }

  const requiresSubscription = (path: string) => {
    // Only check subscription requirements after mounting to avoid hydration issues
    if (!mounted) return false
    
    // If user is not logged in, only allow public marketing pages
    if (!user) {
      const publicPages = ['/', '/features', '/support', '/terms-of-use', '/privacy-policy', '/security', '/for-officers', '/agency-intelligence', '/cjis-compliance', '/request-demo', '/login']
      return !publicPages.includes(path)
    }
    
    // If user is logged in, check if it's a premium feature and user doesn't have pro access
    return isPremiumFeature(path) && !isPro
  }

  return { subscription, loading, isPro, mounted, isFeatureFree, requiresSubscription }
}