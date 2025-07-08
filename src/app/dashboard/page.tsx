
import {
  BookOpen,
  History,
  Lightbulb,
  Newspaper,
  Search,
} from "lucide-react"
import Link from "next/link"

import { dashboardFeatureGroups, dailyBriefingData } from "@/data"
import type { FeatureModule } from "@/types"
import { generateFeatureSummary } from "@/ai/flows/generate-feature-summary"
import { FeatureCard } from "@/components/FeatureCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Helper function to generate summaries for all features
async function generateAllSummaries(groups: typeof dashboardFeatureGroups) {
  const allFeatures = groups.flatMap((group) => group.features)
  const summaryPromises = allFeatures.map((feature) =>
    generateFeatureSummary({ title: feature.title }).catch((e) => {
      console.error(`Failed to generate summary for ${feature.title}:`, e)
      return { summary: feature.summary } // Fallback to default summary
    })
  )

  const summaries = await Promise.all(summaryPromises)

  const featuresWithSummaries = allFeatures.map((feature, index) => ({
    ...feature,
    summary: summaries[index].summary,
  }))

  const featuresById = featuresWithSummaries.reduce((acc, feature) => {
    acc[feature.id] = feature
    return acc
  }, {} as Record<string, FeatureModule>)

  return groups.map((group) => ({
    ...group,
    features: group.features.map((feature) => featuresById[feature.id]),
  }))
}


export default async function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const greeting = `${getGreeting()}, Officer.`;
  
  const featureGroupsWithSummaries = await generateAllSummaries(dashboardFeatureGroups);

  return (
    <div className="animate-fade-in-up space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {greeting}
        </h1>
        <p className="text-muted-foreground">{today}</p>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search all guides & statutes..."
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Core Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
            <CardHeader>
                <CardTitle>Florida Shield Mission</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-muted-foreground">
                Florida Shield is dedicated to providing every officer with immediate, reliable, and actionable information. Our mission is to enhance officer safety, ensure procedural accuracy, and reduce reporting time, allowing you to focus on what matters most: protecting the community.
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                <CardTitle>What's New</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                New Feature Added: The{" "}
                <Link href="/training-development/role-play-simulator" className="font-semibold text-primary hover:underline">
                    AI Role-Play Simulator
                </Link>{" "}
                is now live. Practice your de-escalation skills today!
                </p>
            </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-primary" />
              <CardTitle>Daily Briefing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold text-foreground/90">
              {dailyBriefingData.headline}
            </p>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/daily-briefing">View Full Briefing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Navigator */}
      <div className="space-y-6">
        {featureGroupsWithSummaries.map((group) => ( // Using the new variable here
          <div key={group.category}>
            <h2 className="text-lg font-bold tracking-tight my-4 px-1 flex items-center gap-3">
              <group.icon className="h-5 w-5 text-primary" />
              {group.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {group.features.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  module={feature} // The module now includes the generated summary
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in-up"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Personalized Widgets */}
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <CardTitle>Recently Viewed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <Link href="/legal-reference/statutes?search=784.03" className="block text-center text-xs w-24 shrink-0">
                  <div className="p-4 bg-muted rounded-md flex items-center justify-center mb-1">
                      <BookOpen className="h-8 w-8 text-muted-foreground"/>
                  </div>
                  <p className="truncate text-muted-foreground">F.S. 784.03</p>
              </Link>
               <Link href="/field-procedures/scenario-checklists" className="block text-center text-xs w-24 shrink-0">
                  <div className="p-4 bg-muted rounded-md flex items-center justify-center mb-1">
                      <BookOpen className="h-8 w-8 text-muted-foreground"/>
                  </div>
                  <p className="truncate text-muted-foreground">DUI Checklist</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
          <strong className="font-semibold text-foreground/80">Disclaimer & CJIS Warning:</strong> The Florida Shield application is for informational and training purposes only and is not a substitute for legal advice, agency policy, or certified training. All information should be independently verified. <strong className="text-destructive">This is NOT a CJIS-compliant environment.</strong> Users are strictly prohibited from entering, storing, or transmitting any real Personally Identifiable Information (PII), Criminal Justice Information (CJI), or any other sensitive case-specific details. All user-input fields must be treated as unsecure and for training or note-taking purposes only. Violation of this policy may result in disciplinary action.
        </p>
      </footer>
    </div>
  )
}
