
"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { generateWellnessTip, type GenerateWellnessTipOutput } from "@/ai/flows/generate-wellness-tip"
import { decompressionSessions } from "@/data/officer-wellness-rights/decompression-sessions"
import { wellnessResources } from "@/data/officer-wellness-rights/wellness-resources"
import Link from "next/link"

import { LifeBuoy, Zap, Shield, PiggyBank, Users, Loader2, MessageSquare, Headphones, Building, RefreshCw } from "lucide-react"

export default function OfficerWellnessPage() {
  const [dailyTip, setDailyTip] = useState<GenerateWellnessTipOutput | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchTip = async () => {
    setIsLoading(true)
    try {
      const tip = await generateWellnessTip({})
      setDailyTip(tip)
    } catch (error) {
      console.error("Failed to generate wellness tip:", error)
      setDailyTip({ tip: "Remember to stay hydrated, especially during long shifts in the heat. Your physical health is paramount to your performance.", topic: "Health Tip" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTip()
  }, [])

  return (
    <div className="animate-fade-in-up">
        <PageHeader
          title="Officer Wellness Hub"
          description="Tools and resources to support your mental and physical well-being."
        />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Active Listener */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary"/>
                <CardTitle>Active Listener Chatbot</CardTitle>
            </div>
            <CardDescription>A confidential, non-judgmental space to talk through anything on your mind. Conversations are not saved or monitored.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {/* Flex grow pushes footer to the bottom */}
          </CardContent>
          <CardFooter>
            <Button asChild>
                <Link href="/wellness/active-listener">Start Conversation</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* AI Daily Tip */}
         <Card className="flex flex-col">
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <LifeBuoy className="w-6 h-6 text-primary"/>
                    <CardTitle>AI Daily Wellness Tip</CardTitle>
                </div>
                <CardDescription>A contextual tip generated just for you.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
            {isLoading ? (
                <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                </div>
            ) : dailyTip ? (
                <div>
                    <p className="text-sm font-semibold text-primary mb-1">{dailyTip.topic}</p>
                    <p className="text-foreground/90">{dailyTip.tip}</p>
                </div>
            ) : null}
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" size="sm" onClick={fetchTip} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    <span className="ml-2">Get New Tip</span>
                </Button>
            </CardFooter>
        </Card>

         {/* Guided Decompression */}
        <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Headphones className="w-6 h-6 text-primary"/>
                    <CardTitle>Guided Decompression</CardTitle>
                </div>
                <CardDescription>Short, guided audio scripts for stress management.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {decompressionSessions.map((session) => (
                    <AccordionItem key={session.id} value={session.id} className="border-b-0">
                        <AccordionTrigger>{session.title}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
                            {session.script}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        {/* Local Resources */}
         <Card className="lg:col-span-3">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-primary"/>
                    <CardTitle>Local Wellness Resources (St. Lucie County Area)</CardTitle>
                </div>
                <CardDescription>Verified local and agency-specific support contacts.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
               {wellnessResources.map((resource) => (
                   <div key={resource.contactName} className="p-4 border rounded-lg bg-muted/50">
                       <h4 className="font-semibold">{resource.resourceType}</h4>
                       <p className="text-sm font-medium">{resource.contactName}</p>
                       <p className="text-sm text-muted-foreground">{resource.description}</p>
                       <Button variant="link" asChild className="p-0 h-auto text-sm mt-1">
                           <Link href={`tel:${resource.phoneNumber}`}>{resource.phoneNumber}</Link>
                       </Button>
                   </div>
               ))}
            </CardContent>
        </Card>

      </div>
    </div>
  )
}
