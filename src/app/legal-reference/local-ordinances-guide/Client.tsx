"use client"

import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import type { OrdinanceInfo } from "@/data/legal-reference/local-ordinances"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export function LocalOrdinancesClient({ data }: { data: OrdinanceInfo[] }) {
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
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-foreground/90">
                    Common Examples
                  </h4>
                  <ul className="space-y-2 list-disc pl-5 text-muted-foreground mb-6">
                    {item.examples.map((detail, i) => <li key={i}>{detail}</li>)}
                  </ul>
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
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
