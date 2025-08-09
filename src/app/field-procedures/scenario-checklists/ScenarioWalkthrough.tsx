
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
import { Button } from "@/components/ui/button"
import type { Scenario } from "@/data/field-procedures/scenario-checklists"
import { Check, Bot, Milestone, AlertTriangle, Repeat } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export const ScenarioWalkthrough = React.memo(function ScenarioWalkthrough({
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
  }, [scenario, scenario.initialStepId]);

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
                    <h4 className="font-semibold text-accent">
                    AI Tactical Tip
                    </h4>
                    <p className="text-accent/90 text-sm">{currentStep.aiTip}</p>
                </div>
                </div>
              </div>
          )}

          {currentStep.aiLegalNote && (
              <div className="p-3 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-destructive">
                    Legal Note
                    </h4>
                    <p className="text-destructive/90 text-sm">{currentStep.aiLegalNote}</p>
                </div>
                </div>
              </div>
          )}

        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          {currentStep.choices && currentStep.choices.length > 0 && (
            <div className="w-full">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                Select your next action:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentStep.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextStepId)}
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(currentStep.isEnd || !currentStep.choices || currentStep.choices.length === 0) && (
            <Button onClick={handleRestart} variant="outline">
              <Repeat className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
})
