
'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSubscription } from '@/hooks/use-subscription'
import { Loader2, Crown, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'

const LoadingScreen = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
)

const SubscriptionRequired = () => (
  <div className="container mx-auto px-4 py-16 max-w-2xl">
    <Card className="text-center">
      <CardHeader className="pb-4">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Premium Feature</CardTitle>
        <CardDescription>
          This feature requires a Shield FL Pro subscription to access.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>Upgrade to unlock all premium tools and features</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/subscription">
              Upgrade to Pro - $9.99/month
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

export function SubscriptionGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isPro, loading, mounted, requiresSubscription } = useSubscription()

  // Prevent hydration issues by not rendering anything until mounted
  if (!mounted) {
    return null
  }

  if (loading) {
    return <LoadingScreen />
  }

  // If this feature requires a subscription and user doesn't have one
  if (requiresSubscription(pathname) && !isPro) {
    return <SubscriptionRequired />
  }

  return <>{children}</>
}
