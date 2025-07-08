
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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, AlertTriangle, CheckCircle,Languages, ListOrdered, CaseSensitive  } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { proofreadReport, type ProofreadReportOutput } from "@/ai/flows/proofread-report"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ReportProofreaderClient() {
  const { toast } = useToast()
  const [narrative, setNarrative] = React.useState("")
  const [offense, setOffense] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<ProofreadReportOutput | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!narrative || !offense) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both the primary offense and the narrative.",
      })
      return
    }

    setIsLoading(true)
    setResults(null)
    try {
      const response = await proofreadReport({
        primaryOffense: offense,
        anonymizedNarrative: narrative,
      })
      setResults(response)
    } catch (err) {
      console.error(err)
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "The AI model could not process your request. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const feedbackItems = results ? [
    {
      value: "elements",
      title: "Articulating Offense Elements",
      icon: CheckCircle,
      content: results.articulatingElements_feedback,
    },
    {
      value: "language",
      title: "Objective Language",
      icon: Languages,
      content: results.objectiveLanguage_feedback,
    },
    {
      value: "clarity",
      title: "Clarity & Chronology",
      icon: ListOrdered,
      content: results.clarityAndChronology_feedback,
    },
    {
      value: "grammar",
      title: "Grammar & Spelling",
      icon: CaseSensitive,
      content: results.grammarAndSpelling_suggestions.length > 0
        ? <ul>{results.grammarAndSpelling_suggestions.map((s, i) => <li key={i} className="list-disc ml-4">{s}</li>)}</ul>
        : "No specific errors found.",
    },
  ] : []

  return (
    <>
      <Card>
        <form onSubmit={handleAnalyze}>
          <CardHeader>
            <CardTitle>Anonymous Report Proofreader</CardTitle>
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>🔴 CRITICAL: ANONYMIZE YOUR TEXT</AlertTitle>
              <AlertDescription>
                Before pasting, you MUST remove all names, dates of birth, case numbers, addresses, and any other personally identifiable information.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="offense" className="text-sm font-medium">Primary Offense (e.g., Burglary - F.S. § 810.02)</label>
              <Input 
                id="offense"
                placeholder="Enter the primary offense and statute..." 
                value={offense}
                onChange={(e) => setOffense(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="narrative" className="text-sm font-medium">Anonymized Narrative</label>
              <Textarea
                id="narrative"
                placeholder="Paste your anonymized report narrative here..."
                className="min-h-[200px]"
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
              )}
              {isLoading ? "Analyzing..." : "Analyze Narrative"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {results && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Analysis Results</h2>
          <Accordion type="multiple" className="w-full space-y-2" defaultValue={['elements', 'language']}>
            {feedbackItems.map(item => {
              const Icon = item.icon
              return (
                <AccordionItem value={item.value} key={item.value} className="border rounded-md bg-card">
                  <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <div className="border-t pt-4 text-muted-foreground">{item.content}</div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      )}
    </>
  )
}
