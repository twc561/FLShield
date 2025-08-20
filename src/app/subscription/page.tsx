
'use client'

import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Shield, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [user] = useAuthState(auth!)

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Payment Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    "Unlimited AI-powered legal queries",
    "Advanced report generation tools", 
    "Priority customer support",
    "Offline access to key resources",
    "Custom department integrations",
    "Advanced analytics dashboard",
    "Real-time statute updates",
    "Enhanced security features"
  ]

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Shield FL Pro"
        description="Unlock the full potential of your digital partner with advanced features designed for professional law enforcement."
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <Card className="border-muted">
            <CardHeader className="text-center pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Shield className="w-5 h-5 text-primary" />
                Shield FL Pro Monthly
              </CardTitle>
              <CardDescription>
                Flexible monthly billing
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-3xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <Button 
                onClick={() => handleSubscribe(process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!)}
                disabled={isLoading}
                size="lg" 
                className="w-full mb-6"
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Start Monthly
                  </>
                )}
              </Button>

              <div className="grid gap-2 text-left text-sm">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className="border-primary/20 bg-primary/5 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-600 hover:bg-green-700">
                <Star className="w-3 h-3 mr-1" />
                Save 37%
              </Badge>
            </div>
            <CardHeader className="text-center pb-2 pt-6">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Shield className="w-5 h-5 text-primary" />
                Shield FL Pro Annual
              </CardTitle>
              <CardDescription>
                Best value for dedicated officers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-2">
                <span className="text-3xl font-bold">$75</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <div className="text-sm text-green-600 font-medium mb-4">
                Save $45 compared to monthly billing
              </div>
              
              <Button 
                onClick={() => handleSubscribe('price_1RmglBCWSU7hrW1YLWyxasnn')}
                disabled={isLoading}
                size="lg" 
                className="w-full mb-6"
              >
                {isLoading ? (
                  <>
                    <CreditCard className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Start Annual
                  </>
                )}
              </Button>

              <div className="grid gap-2 text-left text-sm">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Features List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Complete Feature Set (Both Plans)</CardTitle>
            <CardDescription>
              All premium features included with your Shield FL Pro subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>1. Choose your preferred billing cycle</li>
              <li>2. Complete secure checkout with Stripe</li>
              <li>3. Get instant access to all Pro features</li>
              <li>4. Cancel anytime from your account settings</li>
            </ol>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Why Choose Annual?</h3>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Save $45 annually (37% discount)</li>
              <li>• Lock in current pricing for 12 months</li>
              <li>• One payment, year of uninterrupted service</li>
              <li>• Perfect for career officers and supervisors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
