
"use client"

import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Zap, MessageSquare, Calendar } from "lucide-react"
import { SubscriptionGate } from "@/components/SubscriptionGate"

interface UsageData {
  aiQueries: number
  featuresUsed: number
  activeDays: number
  mostUsedFeatures: Array<{ feature: string; count: number }>
  usageTrends: Array<{ date: string; queries: number }>
}

export default function UsageAnalyticsPage() {
  const [user] = useAuthState(auth)
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/usage?userId=${user.uid}`, {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        })
        
        const data = await response.json()
        setUsageData(data)
      } catch (error) {
        console.error('Error fetching usage data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsageData()
  }, [user])
  return (
    <SubscriptionGate>
      <div className="animate-fade-in-up">
        <PageHeader
          title="Usage Analytics"
          description="Track your AI query usage, feature utilization, and activity patterns."
        />
        
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="w-4 h-4" />
                  AI Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : usageData?.aiQueries || 0}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Zap className="w-4 h-4" />
                  Features Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : usageData?.featuresUsed || 0}
                </div>
                <p className="text-xs text-muted-foreground">Different tools</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="w-4 h-4" />
                  Active Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : usageData?.activeDays || 0}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Usage Trends
              </CardTitle>
              <CardDescription>
                Your activity patterns over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Usage analytics chart would be displayed here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Used Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading...</div>
                ) : (
                  usageData?.mostUsedFeatures?.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{feature.feature}</span>
                      <span className="text-sm text-muted-foreground">{feature.count} queries</span>
                    </div>
                  )) || (
                    <div className="text-sm text-muted-foreground">No usage data available</div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubscriptionGate>
  )
}
