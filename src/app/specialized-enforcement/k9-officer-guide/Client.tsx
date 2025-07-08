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
import type { K9Topic } from "@/data/specialized-enforcement/k9-guide"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const K9Client = React.memo(function K9Client({ data }: { data: K9Topic[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={data[0].id}>
      {data.map((item, index) => {
        const Icon = (LucideIcons as any)[item.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle
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
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                    {item.points.map((point, i) => (
                      <li key={i}>
                        <span className="font-semibold text-foreground/90">{point.caseName || 'Guideline'}:</span> {point.summary}
                      </li>
                    ))}
                  </ul>
                  <Alert className="mt-6 bg-accent/20 border-accent/50">
                    <LucideIcons.ShieldCheck className="h-4 w-4 text-accent" />
                    <AlertTitle>Handler Takeaway</AlertTitle>
                    <AlertDescription>
                      {item.takeaway}
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
