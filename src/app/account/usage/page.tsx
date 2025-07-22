
"use client"

import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Zap, MessageSquare, Calendar } from "lucide-react"
import { SubscriptionGate } from "@/components/SubscriptionGate"

export default function UsageAnalyticsPage() {
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
                <div className="text-2xl font-bold">1,247</div>
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
                <div className="text-2xl font-bold">23</div>
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
                <div className="text-2xl font-bold">18</div>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Legal Advisor</span>
                  <span className="text-sm text-muted-foreground">342 queries</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Report Assistant</span>
                  <span className="text-sm text-muted-foreground">186 queries</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Statute Search</span>
                  <span className="text-sm text-muted-foreground">127 queries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubscriptionGate>
  )
}
