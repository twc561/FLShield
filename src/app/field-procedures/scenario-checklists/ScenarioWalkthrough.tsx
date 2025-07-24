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
  onProgress,
  onComplete,
}: {
  scenario: Scenario
  onProgress?: (progress: number) => void
  onComplete?: () => void
}) {
  const [currentStepId, setCurrentStepId] = React.useState(scenario.initialStepId)
  const [visitedSteps, setVisitedSteps] = React.useState<Set<string>>(new Set([scenario.initialStepId]))
  const [decisionHistory, setDecisionHistory] = React.useState<Array<{stepId: string, choice: string}>>([])
  const [startTime] = React.useState(Date.now())
  const [completionTime, setCompletionTime] = React.useState<number | null>(null)

  const currentStep = scenario.walkthrough[currentStepId]
  const totalSteps = Object.keys(scenario.walkthrough).length
  const currentProgress = Math.round((visitedSteps.size / totalSteps) * 100)

  React.useEffect(() => {
    if (onProgress) {
      onProgress(currentProgress)
    }
  }, [currentProgress, onProgress])

  React.useEffect(() => {
    if (currentStep?.isEnd && !completionTime) {
      const endTime = Date.now()
      setCompletionTime(endTime - startTime)
      if (onComplete) {
        onComplete()
      }
    }
  }, [currentStep?.isEnd, completionTime, startTime, onComplete])

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
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {currentStep.phase}
          </Badge>
        </div>
        <CardTitle className="text-xl">{currentStep.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {currentStep.content}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {currentStep.aiTip && (
          <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <strong className="font-medium">AI Tip:</strong> {currentStep.aiTip}
            </div>
          </div>
        )}

        {currentStep.aiLegalNote && (
          <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-100">
              <strong className="font-medium">Legal Note:</strong> {currentStep.aiLegalNote}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="space-y-3">
        {currentStep.choices && (
          <div className="space-y-2 w-full">
            {currentStep.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice.nextStepId)}
                className="w-full text-left justify-start"
                variant="outline"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        {currentStep.isEnd && (
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Scenario Complete</span>
            </div>
            <Button
              onClick={handleRestart}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              <Repeat className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
})