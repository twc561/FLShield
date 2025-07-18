
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function DailyBriefingSheet() {
  const [briefingData, setBriefingData] = React.useState<InteractiveBriefing | null>(null)
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null)

  React.useEffect(() => {
    setBriefingData(interactiveBriefingData)
  }, [])
  
  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  if (!briefingData) {
    return null
  }

  const { scenario, knowledgeDive, relatedGuideLink, relatedGuideTitle } = briefingData

  return (
    <Sheet onOpenChange={() => setSelectedOption(null)}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Lightbulb className="mr-2 h-4 w-4 text-accent" />
          Daily Briefing
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 sm:p-6 pb-4 border-b">
          <SheetTitle>{briefingData.title}</SheetTitle>
          <SheetDescription>
            A micro-lesson to sharpen your skills.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
            <div className="p-4 sm:p-6 space-y-6">
                {/* Section 1: Interactive Scenario */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <MessageCircleQuestion className="h-5 w-5 text-primary" />
                           Interactive Scenario
                        </CardTitle>
                        <CardDescription>{scenario.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{scenario.situation}</p>
                        <p className="text-sm font-semibold text-foreground/90">{scenario.question}</p>
                        <div className="space-y-2">
                            {scenario.options.map((option, index) => (
                                <div key={index}>
                                    <Button
                                        variant={selectedOption === index ? (option.isCorrect ? "default" : "destructive") : "secondary"}
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
                    </CardContent>
                </Card>

                {/* Section 2: Knowledge Deep Dive */}
                <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <FileText className="h-5 w-5 text-primary" />
                           Knowledge Deep Dive
                        </CardTitle>
                        <CardDescription>{knowledgeDive.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                           {knowledgeDive.takeaways.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="text-xs text-muted-foreground italic border-l-2 pl-3">{knowledgeDive.details}</p>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
        <SheetFooter className="p-4 border-t bg-background">
          <SheetClose asChild>
            <Button asChild className="w-full group">
              <Link href={relatedGuideLink}>
                {relatedGuideTitle}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
