'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { usePathname } from 'next/navigation'
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

interface UserSubscription {
  id: string
  status: string
  currentPeriodEnd: Date
  plan: string
}

export function useSubscription() {
  const [user, loading] = useAuthState(auth)
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (loading) return // Wait for auth to complete

    if (!user) {
      console.log("No authenticated user, setting subscription to null")
      setSubscription(null)
      return
    }

    console.log('Checking subscription for user:', user.uid)

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const subscriptionData = data.subscription || null;
          console.log('User subscription data:', subscriptionData)
          
          // Validate subscription data
          if (subscriptionData) {
            const currentPeriodEnd = subscriptionData.currentPeriodEnd?.toDate()
            const isExpired = currentPeriodEnd && new Date() > currentPeriodEnd
            
            if (isExpired && subscriptionData.status === 'active') {
              console.log('Subscription appears expired, should be updated by webhook')
            }
          }
          
          setSubscription(subscriptionData)
        } else {
          console.log('User document does not exist, creating free user status')
          setSubscription(null)
        }
      },
      (error) => {
        console.error('Error listening to subscription changes:', error)
        // Don't set subscription to null on error, keep current state
      }
    )

    return unsubscribe
  }, [user, loading, mounted])

  const isPro = subscription?.status === "active"

  const isFeatureFree = (pathname: string) => {
    const freeFeatures = [
      "/dashboard",
      "/legal-reference/statutes",
      "/field-procedures/scenario-checklists",
    ];
    return freeFeatures.includes(pathname);
  };

  const requiresSubscription = mounted && !isPro && !isFeatureFree(pathname);

  console.log("Subscription status:", {
    isPro,
    subscriptionStatus: subscription?.status,
    pathname,
    isFeatureFree: isFeatureFree(pathname),
    requiresSubscription,
    mounted,
  });

  return { subscription, loading: loading || !mounted, isPro, mounted, isFeatureFree, requiresSubscription };
}