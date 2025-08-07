"use client"

import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Zap, MessageSquare, Calendar, TrendingUp, Shield, Clock, Target } from "lucide-react"
import { SubscriptionGate } from "@/components/SubscriptionGate"

interface UsageData {
  // Legacy format
  aiQueries: number
  featuresUsed: number
  activeDays: number
  mostUsedFeatures: Array<{ feature: string; count: number }>
  usageTrends: Array<{ date: string; queries: number; features: number }>
  
  // Enhanced format
  currentUsage: {
    aiRequests: number
    searchQueries: number
    reportGenerations: number
    documentsAccessed: number
    voiceCommands: number
    totalRequests: number
    activeDays: number
    featureBreakdown: { [feature: string]: number }
  }
  quotaLimits: {
    aiRequests: number
    searchQueries: number
    reportGenerations: number
    documentsAccessed: number
    voiceCommands: number
  }
  usagePercentages: {
    aiRequests: number
    searchQueries: number
    reportGenerations: number
    documentsAccessed: number
    voiceCommands: number
  }
  subscriptionPlan: string
  summary: {
    totalQueries: number
    uniqueFeatures: number
    activeDays: number
    averageQueriesPerDay: number
  }
  billingCycle: {
    daysUntilReset: number
  }
}

function UsageAnalyticsContent() {
  const [user] = useAuthState(auth!)
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('current')

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/usage?userId=${user.uid}&period=${selectedPeriod}`, {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setUsageData(data)
        } else {
          console.error('Failed to fetch usage data')
        }
      } catch (error) {
        console.error('Error fetching usage data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsageData()
  }, [user, selectedPeriod])

  const formatFeatureName = (feature: string) => {
    return feature
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/Ai /g, 'AI ')
  }

  if (isLoading) {
    return (
      <SubscriptionGate>
        <div className="animate-fade-in-up">
          <PageHeader
            title="Usage Analytics"
            description="Loading your usage data..."
          />
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SubscriptionGate>
    )
  }

  return (
    <SubscriptionGate>
      <div className="animate-fade-in-up">
        <PageHeader
          title="Usage Analytics"
          description="Track your AI query usage, feature utilization, and activity patterns."
        />
        
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="w-4 h-4" />
                  Total Queries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usageData?.summary?.totalQueries || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Avg {usageData?.summary?.averageQueriesPerDay || 0}/day
                </p>
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
                  {usageData?.summary?.uniqueFeatures || 0}
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
                  {usageData?.summary?.activeDays || 0}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-4 h-4" />
                  Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">
                  {usageData?.subscriptionPlan || 'Free'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Resets in {usageData?.billingCycle?.daysUntilReset || 0} days
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="quotas">Quotas</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Usage Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your activity across different feature categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">AI Requests</span>
                        <Badge variant="secondary">
                          {usageData?.currentUsage?.aiRequests || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Search Queries</span>
                        <Badge variant="secondary">
                          {usageData?.currentUsage?.searchQueries || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Report Generations</span>
                        <Badge variant="secondary">
                          {usageData?.currentUsage?.reportGenerations || 0}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Documents Accessed</span>
                        <Badge variant="secondary">
                          {usageData?.currentUsage?.documentsAccessed || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Voice Commands</span>
                        <Badge variant="secondary">
                          {usageData?.currentUsage?.voiceCommands || 0}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotas" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Monthly Quotas
                  </CardTitle>
                  <CardDescription>
                    Your usage against monthly limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {usageData?.quotaLimits && Object.entries(usageData.quotaLimits).map(([key, limit]) => {
                    const current = usageData.currentUsage?.[key as keyof typeof usageData.currentUsage] as number || 0
                    const percentage = usageData.usagePercentages?.[key as keyof typeof usageData.usagePercentages] || 0
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {current} / {limit}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {percentage}% used ({limit - current} remaining)
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Used Features</CardTitle>
                  <CardDescription>
                    Your top tools and their usage frequency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usageData?.mostUsedFeatures?.slice(0, 10).map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                            #{index + 1}
                          </div>
                          <span className="font-medium">
                            {formatFeatureName(feature.feature)}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {feature.count} uses
                        </Badge>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        No feature usage data available yet. Start using tools to see analytics here.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SubscriptionGate>
  )
}

export default function UsageAnalyticsPage() {
    if (!isFirebaseConfigured) {
        return <div>Firebase not configured</div>
    }
    return <UsageAnalyticsContent />
}
