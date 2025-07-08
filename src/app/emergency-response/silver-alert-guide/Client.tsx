"use client"

import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import type { AlertGuideline } from "@/data/emergency-response/alert-guides"
import { Button } from "@/components/ui/button"

export function SilverAlertClient({ data }: { data: AlertGuideline }) {
  const Icon = (LucideIcons as any)[data.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <CardTitle>{data.title} Criteria</CardTitle>
                <CardDescription>Official FDLE standards for issuing a Silver Alert.</CardDescription>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4">
              <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                {data.criteria.map((item, i) => (
                  <li key={i}>
                    <span className="font-semibold text-foreground/90">{item.title}:</span> {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button>
                  <LucideIcons.Phone className="mr-2 h-4 w-4" />
                  Initiate Silver Alert (Call FDLE)
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">This will call the FDLE Missing Endangered Persons Information Clearinghouse.</p>
              </div>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  )
}
