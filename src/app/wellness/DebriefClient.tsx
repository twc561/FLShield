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

  const handleResponseChange = (text: string) => {
    const newResponses = [...responses]
    newResponses[currentStep] = text
    setResponses(newResponses)
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      setError("")
      try {
        const result = await summarizeDebrief({
          facts: responses[0],
          thoughts: responses[1],
          difficulties: responses[2],
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
          {summary ? (
             <div className="p-4 bg-muted/50 rounded-md">
              <h4 className="font-semibold mb-2">AI Reflection:</h4>
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{summary}</p>
            </div>
          ) : isLoading ? (
             <div className="flex flex-col items-center justify-center text-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating reflection...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>{steps[currentStep]}</Label>
              <Textarea
                placeholder="Type your response here..."
                value={responses[currentStep]}
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
             <Button onClick={handleNext} disabled={isLoading || !responses[currentStep]}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {currentStep < steps.length - 1 ? "Next" : "Get Summary"}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
