
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/dashboard')
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, router])

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Subscription Confirmed!"
        description="Thank you for your support."
      />
      
      <div className="max-w-md mx-auto">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200 text-2xl">
              Welcome to Shield FL Pro!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your subscription is now active and all premium features are unlocked.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Redirecting in {countdown} seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
