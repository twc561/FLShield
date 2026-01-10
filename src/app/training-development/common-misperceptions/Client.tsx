
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Misperception } from "@/data/officer-wellness-rights/common-misperceptions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const CommonMisperceptionsClient = React.memo(function CommonMisperceptionsClient({ data }: { data: Misperception[] }) {
  const categoryOrder = ["Search & Seizure", "Interrogation", "Use of Force", "General Procedure"];
  
  const groupedData = data.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, Misperception[]>);

  return (
    <div className="space-y-6">
      {categoryOrder.map(category => {
        if (!groupedData[category]) return null;

        return (
          <div key={category}>
            <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {groupedData[category].map((item, index) => (
                <AccordionItem value={item.id} key={item.id} className="border-b-0">
                  <Card 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <AccordionTrigger className="p-6 text-left hover:no-underline">
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase text-destructive">The Misperception:</p>
                        <CardTitle className="text-lg sm:text-xl">{item.theMisperception}</CardTitle>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <div className="border-t pt-4 space-y-6">
                        <div>
                          <h3 className="font-semibold text-foreground/90">The Reality</h3>
                          <p className="text-muted-foreground mt-1">{item.theReality}</p>
                        </div>

                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-base">{item.tacticalGuidance.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-green-600 flex items-center gap-2"><LucideIcons.CheckCircle className="h-5 w-5"/> Do</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {item.tacticalGuidance.do.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                     <h4 className="font-semibold text-destructive flex items-center gap-2"><LucideIcons.XCircle className="h-5 w-5"/> Don&apos;t</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {item.tacticalGuidance.dont.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Alert>
                          <LucideIcons.Gavel className="h-4 w-4" />
                          <AlertTitle>Controlling Case Law</AlertTitle>
                          <AlertDescription>
                            {item.keyCaseLaw.caseName} ({item.keyCaseLaw.citation})
                          </AlertDescription>
                        </Alert>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )
      })}
    </div>
  )
})
