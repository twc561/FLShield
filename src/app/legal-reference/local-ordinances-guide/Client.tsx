"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdinanceTopic } from "@/data/legal-reference/local-ordinances"

export const LocalOrdinancesClient = React.memo(function LocalOrdinancesClient({ data }: { data: OrdinanceTopic[] }) {
  return (
    <div className="space-y-6">
      {data.map((item, index) => {
        const Icon = (LucideIcons as any)[item.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <Card 
            key={item.id} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle>{item.topic}</CardTitle>
                    <CardDescription>{item.summary}</CardDescription>
                  </div>
                </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="fort-pierce" className="border rounded-md">
                  <AccordionTrigger className="px-4 hover:no-underline">City of Fort Pierce</AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-muted-foreground whitespace-pre-wrap border-t mt-2">
                    {item.fortPierceDetails}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="port-st-lucie" className="border rounded-md">
                  <AccordionTrigger className="px-4 hover:no-underline">City of Port St. Lucie</AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-muted-foreground whitespace-pre-wrap border-t mt-2">
                    {item.portStLucieDetails}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
})
