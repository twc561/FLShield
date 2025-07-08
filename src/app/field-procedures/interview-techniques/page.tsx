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
import { interviewTechniquesData } from "@/data"
import { Summarizer } from "@/components/Summarizer"

export default function InterviewTechniquesPage() {
  const pageContent = interviewTechniquesData.map(technique =>
    `${technique.title}: ${technique.summary} Best for: ${technique.bestFor}. Phases: ${technique.phases.map(p => p.name).join(', ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Interview Techniques"
          description="Guides on various rapport-based interview and information-gathering methods."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Interview Techniques Summary"
        />
      </div>
      
      {interviewTechniquesData.map((technique, index) => {
        const Icon = (LucideIcons as any)[technique.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <Card 
            key={technique.id} 
            className="mb-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle>{technique.title}</CardTitle>
                  <CardDescription>{technique.summary}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="font-semibold">Best For:</span> {technique.bestFor}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Accordion type="single" collapsible className="w-full">
                {technique.phases.map(phase => (
                  <AccordionItem value={phase.name} key={phase.name}>
                    <AccordionTrigger>{phase.name}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-3">{phase.description}</p>
                      <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                        {phase.officerActions.map((action, i) => <li key={i}>{action}</li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
