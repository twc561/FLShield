"use client"

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { FstGuideline, SftsTest } from "@/data/traffic-enforcement/fst"
import * as LucideIcons from "lucide-react"

export function FstImpliedConsentClient({ data }: { data: FstGuideline[] }) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderSftsTest = (test: SftsTest) => (
    <div key={test.id} className="mt-4">
      <h4 className="font-semibold text-foreground/90 mb-2">{test.name}</h4>
      <p className="text-sm text-muted-foreground mb-4">{test.instructions}</p>
      <div className="space-y-2">
        <p className="text-sm font-semibold">Observed Clues:</p>
        {test.clues.map((clue, index) => (
           <div key={`${test.id}-clue-${index}`} className="flex items-center space-x-2">
            <Checkbox 
              id={`${test.id}-clue-${index}`}
              checked={checkedItems[`${test.id}-clue-${index}`] || false}
              onCheckedChange={() => handleCheckboxChange(`${test.id}-clue-${index}`)}
            />
            <Label htmlFor={`${test.id}-clue-${index}`} className="text-sm font-normal text-muted-foreground">
              {clue}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )

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
                  {item.sftsTests && item.sftsTests.map(renderSftsTest)}
                  {item.details && (
                     <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                      {item.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                  )}
                  {item.script && (
                     <Alert className="mt-4">
                      <LucideIcons.FileText className="h-4 w-4" />
                      <AlertTitle>Verbatim Script</AlertTitle>
                      <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
                        {item.script}
                      </AlertDescription>
                    </Alert>
                  )}
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
