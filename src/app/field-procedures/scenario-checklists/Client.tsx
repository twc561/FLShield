"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Scenario } from "@/data"
import * as LucideIcons from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioWalkthrough } from "./ScenarioWalkthrough"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ScenarioChecklistsClient = React.memo(function ScenarioChecklistsClient({
  initialScenarios,
  groupedScenarios,
  categoryOrder,
}: {
  initialScenarios: Scenario[]
  groupedScenarios: Record<string, Scenario[]>
  categoryOrder: string[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedScenario, setSelectedScenario] = React.useState<Scenario | null>(null)
  const [openAccordionItem, setOpenAccordionItem] = React.useState<string | undefined>(undefined)

  const filteredScenarios = React.useMemo(() => {
    if (!searchTerm) {
      return initialScenarios
    }
    return initialScenarios.filter(
      (scenario) =>
        scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.goal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, initialScenarios])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search scenarios (e.g., DUI, Theft...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-2"
        value={openAccordionItem}
        onValueChange={setOpenAccordionItem}
      >
        {categoryOrder
          .filter(category => 
            filteredScenarios.some(s => s.category === category)
          )
          .map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
              {filteredScenarios
                .filter(s => s.category === category)
                .map((scenario) => {
                  const Icon = (LucideIcons as any)[scenario.icon] || LucideIcons.HelpCircle
                  return (
                    <AccordionItem value={scenario.id} key={scenario.id} className="border rounded-md mb-2 bg-card">
                      <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-base text-card-foreground">{scenario.name}</p>
                            <p className="text-xs text-muted-foreground">{scenario.subtitle}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4">
                           <Tabs defaultValue="interactive" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="interactive">Interactive Guide</TabsTrigger>
                                <TabsTrigger value="static">Static Checklist</TabsTrigger>
                              </TabsList>
                              <TabsContent value="interactive" className="mt-4">
                                <ScenarioWalkthrough scenario={scenario} />
                              </TabsContent>
                              <TabsContent value="static" className="mt-4">
                                 <div className="space-y-4">
                                    {scenario.staticChecklist?.map((section, index) => {
                                        const SectionIcon = (LucideIcons as any)[section.icon] || Check
                                        return (
                                            <Card key={index} className="bg-muted/50">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-3 text-base">
                                                        <SectionIcon className="w-5 h-5 text-primary" />
                                                        {section.section}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-3">
                                                        {section.items.map((item, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                                <span className="text-muted-foreground">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        )
                                    }) || (
                                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                                        <p className="text-muted-foreground">No static checklist available for this scenario.</p>
                                      </div>
                                    )}
                                </div>
                              </TabsContent>
                            </Tabs>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
            </div>
          ))}
      </Accordion>
    </div>
  )
})