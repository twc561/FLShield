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
import type { EncounterType } from "@/data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const FieldInterviewClient = React.memo(function FieldInterviewClient({ data }: { data: EncounterType[] }) {
  const getBadgeVariant = (standard: string) => {
    if (standard.includes("Probable Cause")) return "destructive";
    if (standard.includes("Reasonable Suspicion")) return "default";
    return "secondary";
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((encounter, index) => {
        const Icon = (LucideIcons as any)[encounter.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <AccordionItem value={encounter.id} key={encounter.id} className="border-b-0">
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
                    <CardTitle>{encounter.title}</CardTitle>
                    <CardDescription>
                      Legal Standard: <Badge variant={getBadgeVariant(encounter.legalStandard)}>{encounter.legalStandard}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Permissible Officer Actions
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground mb-4">
                    {encounter.officerActions.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>

                  <div className="mb-4 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                    <h4 className="font-semibold mb-2 text-accent-foreground/90">
                      Key Points
                    </h4>
                    <ul className="space-y-2 list-disc pl-5 text-accent-foreground/80 text-sm">
                      {encounter.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  </div>

                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Relevant Case Law: {encounter.caseLaw.name}</AlertTitle>
                    <AlertDescription>
                      {encounter.caseLaw.summary}
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


declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
