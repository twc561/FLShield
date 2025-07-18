
'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { interactiveBriefingData, type InteractiveBriefing } from '@/data/daily-briefing'
import { ArrowRight, CheckCircle, Lightbulb, MessageCircleQuestion, XCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DailyBriefingSheet() {
  const [briefingData, setBriefingData] = React.useState<InteractiveBriefing | null>(null)
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null)

  // In a real app, this would fetch data from Firebase based on the current date.
  React.useEffect(() => {
    setBriefingData(interactiveBriefingData)
  }, [])
  
  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  if (!briefingData) {
    // You could return a skeleton loader here
    return null
  }

  const { scenario, knowledgeDive, relatedGuideLink, relatedGuideTitle } = briefingData

  return (
    <Sheet onOpenChange={() => setSelectedOption(null)}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed top-20 right-4 sm:top-6 sm:right-6 z-10">
          <Lightbulb className="mr-2 h-4 w-4 text-accent" />
          Daily Briefing
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md w-full p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle>{briefingData.title}</SheetTitle>
          <SheetDescription>
            A micro-lesson to sharpen your skills.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
            <div className="p-6 space-y-8">
                {/* Section 1: Interactive Scenario */}
                <section>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <MessageCircleQuestion className="h-5 w-5 text-primary" />
                        Interactive Scenario
                    </h3>
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                        <p className="text-sm font-semibold">{scenario.title}</p>
                        <p className="text-sm text-muted-foreground">{scenario.situation}</p>
                        <p className="text-sm font-semibold text-primary">{scenario.question}</p>
                        <div className="space-y-2">
                            {scenario.options.map((option, index) => (
                                <div key={index}>
                                    <Button
                                        variant={selectedOption === index ? "default" : "secondary"}
                                        className="w-full justify-start text-left h-auto py-2"
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        {option.text}
                                    </Button>
                                    {selectedOption === index && (
                                        <div className={cn(
                                            "mt-2 p-2 text-xs rounded-md flex items-start gap-2",
                                            option.isCorrect ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"
                                        )}>
                                            {option.isCorrect ? <CheckCircle className="h-4 w-4 flex-shrink-0" /> : <XCircle className="h-4 w-4 flex-shrink-0" />}
                                            <p>{option.feedback}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: Knowledge Deep Dive */}
                <section>
                     <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Knowledge Deep Dive
                    </h3>
                    <div className="p-4 border rounded-lg bg-card space-y-4">
                        <p className="text-sm font-semibold">{knowledgeDive.title}</p>
                         <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                           {knowledgeDive.takeaways.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="text-xs text-muted-foreground italic">{knowledgeDive.details}</p>
                    </div>
                </section>
            </div>
        </ScrollArea>
        <SheetFooter className="p-6 border-t bg-background">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link href={relatedGuideLink}>
                {relatedGuideTitle}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
