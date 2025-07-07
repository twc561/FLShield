"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
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
import { LifeBuoy, Zap, Shield, PiggyBank, Users, Loader2 } from "lucide-react"

const wellnessTopics = [
  {
    title: "Mental Resilience",
    icon: Shield,
    content: "Develop coping strategies for trauma and stress. Practices like mindfulness, controlled breathing, and seeking professional counseling are signs of strength. Resources are available to help you process the difficult aspects of the job.",
  },
  {
    title: "Physical Fitness",
    icon: Zap,
    content: "Maintain a consistent fitness routine to handle the physical demands of the job. Focus on functional strength, cardiovascular health, and flexibility. Proper nutrition and hydration are critical, especially in the Florida heat.",
  },
  {
    title: "Peer Support",
    icon: Users,
    content: "You are not alone. Building strong connections with trusted peers provides a vital support system. Your colleagues understand the unique pressures of the job. Formal peer support programs and informal check-ins are crucial.",
  },
  {
    title: "Financial Wellness",
    icon: PiggyBank,
    content: "Financial stress can impact all areas of your life. Take advantage of financial planning resources offered by your agency or union. Budgeting, saving for retirement, and managing debt are key to long-term security.",
  },
]

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
        description="Resources and tools to support your mental and physical well-being."
      />

      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-primary">AI-Powered Daily Wellness Tip</CardTitle>
              <CardDescription>A new tip generated just for you. Contextual to the challenges of Florida policing.</CardDescription>
            </div>
             <Button variant="ghost" size="icon" onClick={fetchTip} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LifeBuoy className="h-5 w-5" />}
              <span className="sr-only">Get New Tip</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
      </Card>
      
      <h2 className="text-2xl font-bold tracking-tight mb-4">Wellness Resources</h2>
      <Accordion type="single" collapsible className="w-full">
        {wellnessTopics.map((topic, index) => (
          <AccordionItem
            key={topic.title}
            value={`item-${index}`}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="text-lg">
              <div className="flex items-center gap-3">
                <topic.icon className="h-5 w-5 text-accent" />
                {topic.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground px-2">
              {topic.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
