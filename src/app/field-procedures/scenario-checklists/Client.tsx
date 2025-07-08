"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { Scenario, WalkthroughStep } from "@/data/field-procedures/scenario-checklists"
import { Check, Bot, Milestone, AlertTriangle, Repeat, FileText, Search, Car, Building, Home, ShoppingCart, Siren, UserSearch, KeyRound, HeartPulse, FileBadge, Users, ShieldAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ICONS: { [key: string]: React.ElementType } = {
  Car,
  Search,
  FileText,
  Building,
  Home,
  ShoppingCart,
  Siren,
  UserSearch,
  KeyRound,
  HeartPulse,
  FileBadge,
  Users,
  ShieldAlert,
}

export const ScenarioChecklistsClient = React.memo(function ScenarioChecklistsClient({
  scenario,
}: {
  scenario: Scenario
}) {
  const [currentStepId, setCurrentStepId] = React.useState<string>(scenario.initialStepId)
  const currentStep = scenario.walkthrough[currentStepId]

  const handleChoice = (nextStepId: string) => {
    setCurrentStepId(nextStepId)
  }

  const handleRestart = () => {
    setCurrentStepId(scenario.initialStepId)
  }

  // Effect to reset the walkthrough when the scenario changes
  React.useEffect(() => {
    setCurrentStepId(scenario.initialStepId);
  }, [scenario]);

  if (!currentStep) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="mt-4 text-lg font-semibold">Scenario Error</h3>
        <p className="text-muted-foreground">Could not load the current step. Please try restarting.</p>
        <Button onClick={handleRestart} className="mt-4">
          <Repeat className="mr-2 h-4 w-4" />
          Restart Scenario
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{scenario.name}</CardTitle>
          <CardDescription>{scenario.goal}</CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="walkthrough" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="walkthrough">
            <Milestone className="mr-2" /> Interactive Walkthrough
          </TabsTrigger>
          <TabsTrigger value="checklist">
            <Check className="mr-2" />
            Static Checklist
          </TabsTrigger>
        </TabsList>
        <TabsContent value="walkthrough" className="mt-4">
          <Card className="w-full">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                Phase: {currentStep.phase}
              </Badge>
              <CardTitle>{currentStep.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{currentStep.content}</p>
              
              {currentStep.aiTip && (
                 <div className="p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                    <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-accent-foreground/90">
                        AI Tactical Tip
                        </h4>
                        <p className="text-accent-foreground/80 text-sm">{currentStep.aiTip}</p>
                    </div>
                    </div>
                 </div>
              )}

              {currentStep.aiLegalNote && (
                 <div className="p-3 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                    <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-destructive-foreground/90">
                        Legal Note
                        </h4>
                        <p className="text-destructive-foreground/80 text-sm">{currentStep.aiLegalNote}</p>
                    </div>
                    </div>
                 </div>
              )}

            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2">
                {currentStep.choices?.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextStepId)}
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
              {(currentStep.isEnd || !currentStep.choices) && (
                 <Button onClick={handleRestart} variant="outline">
                    <Repeat className="mr-2 h-4 w-4" />
                    Start Over
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="checklist" className="mt-4">
            <div className="space-y-6">
                {scenario.staticChecklist.map((section, index) => {
                    const Icon = ICONS[section.icon] || Check
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Icon className="w-6 h-6 text-primary" />
                                    {section.section}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {section.items.map((item, i) => (
                                         <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
})
