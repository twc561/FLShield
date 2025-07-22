
"use client"

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Crown, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSubscription } from "@/hooks/use-subscription"

export default function SubscriptionManagementPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [user] = useAuthState(auth)
  const { isPro, mounted } = useSubscription()

  const handleManageSubscription = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/subscription/manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ userId: user.uid })
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No portal URL received')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Subscription Management"
        description="View your current plan, billing history, and manage payment methods."
      />
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPro ? (
                <>
                  <Crown className="w-5 h-5 text-amber-500" />
                  Shield FL Pro
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Free Plan
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isPro ? "You have access to all premium features" : "Upgrade to unlock advanced features"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPro ? (
              <>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Active Subscription</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Next billing: January 15, 2025</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Pro Annual
                  </Badge>
                </div>
                <Button onClick={handleManageSubscription} disabled={isLoading}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Billing
                </Button>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">Upgrade to Pro for advanced features</p>
                <Button asChild>
                  <a href="/subscription">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Billing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and download your past invoices and payment records.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your credit cards and payment preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
