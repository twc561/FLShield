"use client"

import * as LucideIcons from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { constitutionalLawData } from "@/data/legal-reference/constitutional-law"
import { Summarizer } from "@/components/Summarizer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export default function ConstitutionalLawGuidePage() {
  const pageContent = constitutionalLawData.map(amendment => 
    `${amendment.title}: ${amendment.summary}. Officer Takeaway: ${amendment.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Constitutional Law Guide"
          description="Core constitutional principles and amendments relevant to law enforcement."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Constitutional Law Guide Summary"
        />
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {constitutionalLawData.map((amendment, index) => {
          const Icon = (LucideIcons as any)[amendment.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
          return (
            <AccordionItem value={amendment.id} key={amendment.id} className="border-b-0">
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
                      <CardTitle>{amendment.title}</CardTitle>
                      <CardDescription>{amendment.summary}</CardDescription>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="border-t pt-4">
                    <div className="space-y-4">
                      {amendment.keyPoints.map((point, i) => (
                        <div key={i}>
                          <h4 className="font-semibold">{point.title}</h4>
                          <p className="text-muted-foreground">{point.text}</p>
                        </div>
                      ))}
                    </div>
                    <Alert className="mt-6 bg-accent/20 border-accent/50">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      <AlertTitle>Officer Takeaway</AlertTitle>
                      <AlertDescription>
                        {amendment.officerTakeaway}
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
