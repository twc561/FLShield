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
import { standardJuryInstructionsData } from "@/data/legal-reference/standard-jury-instructions"
import { Summarizer } from "@/components/Summarizer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export default function StandardJuryInstructionsPage() {
  const pageContent = standardJuryInstructionsData.map(item => 
    `${item.title}: ${item.description}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Standard Jury Instructions"
          description="Access to Florida's standard jury instructions for criminal cases."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Standard Jury Instructions Summary"
        />
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {standardJuryInstructionsData.map((item, index) => {
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
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="border-t pt-4">
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
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
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
