
'use client'

import { useState } from 'react'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Shield, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
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
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </Badge>
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Shield className="w-6 h-6 text-primary" />
                Shield FL Pro
              </CardTitle>
              <CardDescription>
                Professional-grade tools for modern law enforcement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <Button 
                onClick={handleSubscribe}
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
                    Subscribe Now
                  </>
                )}
              </Button>

              <div className="grid md:grid-cols-2 gap-3 text-left">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Click "Subscribe Now" to start the secure checkout process</li>
            <li>2. Complete payment using Stripe's secure payment system</li>
            <li>3. Get instant access to all Pro features</li>
            <li>4. Cancel anytime from your account settings</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
