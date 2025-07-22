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

export const useSubscription = () => {
  const { user } = useAuthState(auth);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Track mounting state to prevent hydration issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return { subscription, loading, isPro, mounted, isFeatureFree, requiresSubscription }
}