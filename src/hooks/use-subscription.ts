
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
  const [mounted, setMounted] = useState(false);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuthState(auth);
  const pathname = usePathname();

  // Always call hooks in same order
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!user) {
      setLoading(false);
      setSubscription(null);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        try {
          if (doc.exists()) {
            const data = doc.data();
            setSubscription(data.subscription || null);
          } else {
            setSubscription(null);
          }
        } catch (error) {
          console.error('Subscription data parsing error:', error);
          setSubscription(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Subscription fetch error:', error);
        setSubscription(null);
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

  const requiresSubscription = mounted && !isPro && !isFeatureFree(pathname);

  return { 
    subscription, 
    loading: loading || !mounted, 
    isPro, 
    mounted, 
    isFeatureFree, 
    requiresSubscription 
  };
}
