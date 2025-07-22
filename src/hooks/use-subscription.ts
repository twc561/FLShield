
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

export const useSubscription = () => {
  const { user } = useAuthState(auth);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Track mounting state to prevent hydration issues
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || !user) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setSubscription(data.subscription || null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Subscription fetch error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user, mounted]);

  const isPro = subscription?.status === 'active';
  
  const isFeatureFree = (pathname: string) => {
    const freeFeatures = [
      '/dashboard',
      '/legal-reference/statutes',
      '/field-procedures/scenario-checklists'
    ];
    return freeFeatures.includes(pathname);
  };

  const requiresSubscription = !isPro && !isFeatureFree(pathname);

  return { 
    subscription, 
    loading, 
    isPro, 
    mounted, 
    isFeatureFree, 
    requiresSubscription 
  };
}
