"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardTitle } from "@/components/ui/card"
import type { RuleInfo } from "@/data/legal-reference/rules-of-criminal-procedure"
import { Badge } from "@/components/ui/badge"

export const RulesOfCriminalProcedureClient = React.memo(function RulesOfCriminalProcedureClient({ data }: { data: RuleInfo[] }) {
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
                    <div className="flex justify-between items-center">
                      <CardTitle>{item.title}</CardTitle>
                      <Badge variant="outline">{item.ruleNumber}</Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Summary of the Rule
                  </h4>
                  <p className="text-muted-foreground mb-4">{item.summary}</p>

                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Impact for Officers
                  </h4>
                  <p className="text-muted-foreground">{item.officerImpact}</p>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
})
