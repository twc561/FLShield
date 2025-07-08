"use client"

import * as LucideIcons from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { scenarioChecklistsData } from "@/data"
import { Check } from "lucide-react"
import { Summarizer } from "@/components/Summarizer"

export default function ScenarioChecklistsPage() {
  const pageContent = scenarioChecklistsData.map(scenario => 
    `${scenario.title}: ${scenario.checklist.map(item => item.text).join('. ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Scenario Checklists"
          description="Step-by-step guides for common and critical field scenarios."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Scenario Checklists Summary"
        />
      </div>

      <div className="space-y-6">
        {scenarioChecklistsData.map((scenario, index) => {
          const Icon = (LucideIcons as any)[scenario.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
          return (
            <Card 
              key={scenario.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scenario.checklist.map((item) => (
                    <li key={item.id} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-foreground">{item.text}</span>
                        {item.subItems && (
                          <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground text-sm">
                            {item.subItems.map((sub, i) => <li key={i}>{sub}</li>)}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
