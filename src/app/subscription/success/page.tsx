
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // Verify the session with your backend
      fetch('/api/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsVerified(true)
        }
      })
      .catch(error => {
        console.error('Error verifying session:', error)
      })
    }
  }, [sessionId])

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Welcome to Shield FL Pro!"
        description="Your subscription has been activated successfully."
      />
      
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              You now have access to all Shield FL Pro features
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Your Pro subscription is now active and you have immediate access to all premium features.
            </p>
            
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/ai-legal-advisor">
                  Try AI Legal Advisor
                </Link>
              </Button>
            </div>

            <div className="bg-background/50 p-4 rounded-lg text-left">
              <h4 className="font-semibold mb-2">What's included in your Pro subscription:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Unlimited AI-powered legal queries</li>
                <li>• Advanced report generation tools</li>
                <li>• Priority customer support</li>
                <li>• Offline access to key resources</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
