
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/lib/firebase'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Heart, Code, Zap, Shield, Users } from "lucide-react"
import Link from 'next/link'

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isVerified, setIsVerified] = useState(false)
  const [user] = useAuthState(auth)
  const [countdown, setCountdown] = useState(30)
  const router = useRouter()

  useEffect(() => {
    if (sessionId && user) {
      // Verify the session with your backend
      fetch('/api/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, userId: user.uid }),
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
  }, [sessionId, user])

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Thank You for Supporting Shield FL!"
        description="Your subscription powers the future of law enforcement technology."
      />
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Card */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200 text-2xl">
              Welcome to Shield FL Pro!
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your subscription is now active and all premium features are unlocked
            </CardDescription>
          </CardHeader>
        </Card>

        {/* How Your Subscription Helps */}
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">How Your Support Makes a Difference</CardTitle>
            <CardDescription>
              Your subscription directly contributes to the continuous improvement and expansion of Shield FL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Code className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Feature Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Fund new AI tools, enhanced search capabilities, and advanced reporting features
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Zap className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Performance & Reliability</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain high-performance servers and ensure 24/7 uptime for critical operations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Legal Database Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep statutes, case law, and procedures current with real-time legal updates
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Community Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide dedicated support and training resources for law enforcement professionals
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card>
          <CardHeader>
            <CardTitle>Your Pro Features Are Now Active</CardTitle>
            <CardDescription>
              Start exploring all the premium tools available to you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Unlimited AI-powered legal queries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Advanced report generation tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Priority customer support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Offline access to key resources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Early access to new features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Enhanced AI training scenarios</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="flex-1 max-w-sm">
                <Link href="/dashboard">
                  Back to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="flex-1 max-w-sm">
                <Link href="/ai-legal-advisor">
                  Try AI Legal Advisor
                </Link>
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Automatically redirecting to dashboard in {countdown} seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
