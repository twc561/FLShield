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
import { riskProtectionOrderData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { Badge } from "@/components/ui/badge"

export default function RiskProtectionOrdersPage() {
  const pageContent = riskProtectionOrderData.map(item => 
    `${item.title}: ${item.description} Details: ${item.details.join(', ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Risk Protection Orders (RPOs)"
          description="Procedures and requirements for obtaining Risk Protection Orders in Florida."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="RPO Summary"
        />
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {riskProtectionOrderData.map((item, index) => {
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
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground mb-4">
                      {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                    <Badge variant="outline">Statute Reference: {item.statuteReference}</Badge>
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
