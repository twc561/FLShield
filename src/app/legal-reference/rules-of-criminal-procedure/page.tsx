"use client"

import * as LucideIcons from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { rulesOfCriminalProcedureData } from "@/data/legal-reference/rules-of-criminal-procedure"
import { Summarizer } from "@/components/Summarizer"
import { Badge } from "@/components/ui/badge"

export default function RulesOfCriminalProcedurePage() {
  const pageContent = rulesOfCriminalProcedureData.map(item => 
    `${item.title} (${item.ruleNumber}): ${item.summary}. Officer Impact: ${item.officerImpact}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Rules of Criminal Procedure"
          description="Searchable access to the Florida Rules of Criminal Procedure."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Rules of Criminal Procedure Summary"
        />
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {rulesOfCriminalProcedureData.map((item, index) => {
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
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
