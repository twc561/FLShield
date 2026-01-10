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
import type { DigitalEvidencePrinciple } from "@/data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export const DigitalEvidenceClient = React.memo(function DigitalEvidenceClient({ data }: { data: DigitalEvidencePrinciple[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((principle, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (LucideIcons as any)[principle.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <AccordionItem value={principle.id} key={principle.id} className="border-b-0">
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
                    <CardTitle>{principle.title}</CardTitle>
                    <CardDescription>{principle.description}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Guidelines
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground mb-4">
                    {principle.guidelines.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  {principle.caseLaw.name !== "N/A" && (
                      <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Relevant Case Law: {principle.caseLaw.name}</AlertTitle>
                      <AlertDescription>
                        {principle.caseLaw.summary}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
})
