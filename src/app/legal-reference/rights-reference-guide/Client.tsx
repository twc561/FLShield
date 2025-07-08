
"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RightsInfo } from "@/data/legal-reference/rights-reference"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Gavel, ShieldCheck, HelpCircle } from "lucide-react"

export const RightsReferenceClient = React.memo(function RightsReferenceClient({ data }: { data: RightsInfo[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={data[0]?.id}>
      {data.map((item, index) => {
        return (
          <AccordionItem value={item.id} key={item.id} className="border-b-0">
            <Card 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                    <Gavel className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.legalSource}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4 space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm text-muted-foreground">{item.plainLanguageSummary}</p>
                    </div>

                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-3"><HelpCircle className="h-5 w-5"/>{item.legalTriggers.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{item.legalTriggers.explanation}</p>
                            {item.legalTriggers.definitions.map(def => (
                                <div key={def.term} className="p-3 bg-background/50 rounded-md">
                                    <h4 className="font-semibold text-foreground/90">{def.term}</h4>
                                    <p className="text-sm text-muted-foreground">{def.definition}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                     <Alert className="bg-accent/20 border-accent/50">
                        <ShieldCheck className="h-4 w-4 text-accent" />
                        <AlertTitle>{item.keyPrinciples.title}</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                {item.keyPrinciples.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </AlertDescription>
                    </Alert>

                     <div>
                        <h3 className="font-semibold mb-2">Key Case</h3>
                        <div className="p-3 bg-muted/50 rounded-md">
                            <p className="font-semibold">{item.keyCase.caseName} <span className="text-muted-foreground font-normal">({item.keyCase.citation})</span></p>
                            <p className="text-sm text-muted-foreground mt-1 italic">"{item.keyCase.holding}"</p>
                        </div>
                    </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
})
