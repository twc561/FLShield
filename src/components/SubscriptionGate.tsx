'use client'

import { useSubscription } from '@/hooks/use-subscription'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionGateProps {
  children: React.ReactNode
}

export function SubscriptionGate({ children }: SubscriptionGateProps) {
  const { isPro, loading, mounted, requiresSubscription } = useSubscription()

  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" suppressHydrationWarning>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (requiresSubscription) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Crown className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Pro Feature
            </CardTitle>
            <CardDescription>
              This feature requires a Shield FL Pro subscription to access.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro to unlock all tools and features designed specifically for Florida law enforcement officers.
            </p>
            <Button asChild className="w-full">
              <Link href="/subscription">
                Upgrade to Pro
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}