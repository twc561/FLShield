
'use client'

import { useSubscription } from '@/hooks/use-subscription'

// This component is now a pass-through since all users are considered "Pro".
// We keep the component in the tree to avoid having to refactor every page
// that uses it, but it no longer gates any content.
export function SubscriptionGate({ children }: { children: React.ReactNode }) {
  const { isPro } = useSubscription()
  
  // In the future, logic to show a paywall could be re-introduced here.
  // For now, we simply render the children for all users.
  return <>{children}</>
}
