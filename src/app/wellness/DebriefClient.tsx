"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, BrainCircuit } from "lucide-react"
import { summarizeDebrief } from "@/ai/flows/summarize-debrief"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

const steps = [
  "Just the facts: what happened?",
  "What were your thoughts during the event?",
  "What was the most difficult part of this for you?",
]

export function DebriefClient() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<string[]>(["", "", ""])
  const [summary, setSummary] = useState("")
  const [stressLevel, setStressLevel] = useState(5)
  const [incidentType, setIncidentType] = useState("")

  const handleResponseChange = (text: string) => {
    if (currentStep > 0) {
      const newResponses = [...responses]
      newResponses[currentStep - 1] = text
      setResponses(newResponses)
    }
  }

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      setError("")
      try {
        const result = await summarizeDebrief({
          facts: responses[0],
          thoughts: responses[1],
          difficulties: responses[2],
          stressLevel: stressLevel,
          incidentType: incidentType,
        })
        setSummary(result.summary)
      } catch (e) {
        console.error(e)
        setError("The AI model failed to generate a summary. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset state on close
      setTimeout(() => {
        setCurrentStep(0)
        setResponses(["", "", ""])
        setSummary("")
        setError("")
        setIsLoading(false)
      }, 300) // Delay to allow dialog to animate out
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Start Guided Debrief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>AI-Guided Stress Debrief</DialogTitle>
          <DialogDescription>
            A private space to organize your thoughts. This session is not saved or recorded.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 min-h-[20rem]">
          {currentStep === 0 && !summary && (
            <div className="space-y-4">
              <div>
                <Label>Current stress level (1-10):</Label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">10</span>
                  <span className="ml-2 font-medium">{stressLevel}</span>
                </div>
              </div>
              <div>
                <Label>Type of incident (optional):</Label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option value="">General incident</option>
                  <option value="use_of_force">Use of Force</option>
                  <option value="traumatic_incident">Traumatic Incident</option>
                  <option value="officer_involved_shooting">Officer Involved Shooting</option>
                  <option value="death_investigation">Death Investigation</option>
                  <option value="child_abuse">Child Abuse Case</option>
                  <option value="domestic_violence">Domestic Violence</option>
                  <option value="workplace_stress">Workplace Stress</option>
                  <option value="critical_incident">Critical Incident</option>
                </select>
              </div>
            </div>
          )}
          {summary ? (
             <div className="p-4 bg-muted/50 rounded-md">
              <h4 className="font-semibold mb-2">Professional Reflection:</h4>
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{summary}</p>
            </div>
          ) : isLoading ? (
             <div className="flex flex-col items-center justify-center text-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating reflection...</p>
            </div>
          ) : currentStep > 0 ? (
            <div className="space-y-2">
              <Label>{steps[currentStep - 1]}</Label>
              <Textarea
                placeholder="Type your response here..."
                value={responses[currentStep - 1]}
                onChange={(e) => handleResponseChange(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          )}
           {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          {summary ? (
             <Button variant="outline" onClick={() => handleOpenChange(false)}>Close</Button>
          ) : (
             <Button onClick={handleNext} disabled={isLoading || (currentStep > 0 && !responses[currentStep - 1])}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {currentStep === 0 ? "Begin Debrief" : currentStep < steps.length ? "Next" : "Get Professional Reflection"}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
