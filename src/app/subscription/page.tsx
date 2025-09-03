
'use client'

import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function SubscriptionPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Shield FL Pro"
        description="Your account has full access to all features."
      />
      
      <div className="max-w-md mx-auto">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200 text-2xl">
              Pro Access Enabled
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              All premium features have been unlocked for your account. Thank you for being a user.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild className="w-full">
                <Link href="/dashboard">
                  Back to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
