"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import type { RightsInfo } from "@/data/legal-reference/rights-reference"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export const RightsReferenceClient = React.memo(function RightsReferenceClient({ data }: { data: RightsInfo[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((item, index) => {
        const Icon = (LucideIcons as any)[item.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <AccordionItem value={item.id} key={item.id} className="border-b-0">
            <Card 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.whenToUse}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  {item.script !== 'N/A' && (
                      <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-foreground/90">
                          Verbatim Script
                          </h4>
                          <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md italic">"{item.script}"</p>
                      </div>
                  )}
                  <Alert className="bg-accent/20 border-accent/50">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <AlertTitle>Officer Takeaway</AlertTitle>
                    <AlertDescription>
                      {item.officerTakeaway}
                    </AlertDescription>
                  </Alert>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
})
