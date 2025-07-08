"use client"

import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProcedureStep } from "@/data"

export function CrimeSceneManagementClient({ data }: { data: ProcedureStep[] }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((step, index) => {
        const Icon = (LucideIcons as any)[step.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <AccordionItem value={step.id} key={step.id} className="border-b-0">
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
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                    {step.content.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <div className="mt-4 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                    <h4 className="font-semibold mb-2 text-accent-foreground/90">
                      Key Points for Officers
                    </h4>
                    <ul className="space-y-2 list-disc pl-5 text-accent-foreground/80 text-sm">
                      {step.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
