
"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Gavel, Loader2, Sparkles } from "lucide-react"
import { suggestCharges, type SuggestChargesOutput } from "@/ai/flows/suggest-charges"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AiChargeAssistantPage() {
  const [narrative, setNarrative] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SuggestChargesOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSuggestCharges = async () => {
    if (!narrative) return
    setIsLoading(true)
    setResults(null)
    setError(null)

    try {
      const response = await suggestCharges({ narrative })
      setResults(response)
    } catch (e) {
      console.error(e)
      setError("The AI model failed to process the request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Charge Assistant"
        description="Enter key facts and let the AI suggest appropriate Florida statutes to charge."
      />
      <Card>
        <CardHeader>
          <CardTitle>Incident Narrative</CardTitle>
          <CardDescription>
            Provide a brief, factual narrative of the incident. Include key
            actions, observations, and evidence. The AI will analyze this text
            to suggest relevant charges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Example: 'Subject was found inside a locked business at 2 AM with a crowbar and stolen goods in a bag...'"
            className="min-h-[150px] text-base"
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSuggestCharges} disabled={isLoading || !narrative}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
            )}
            {isLoading ? "Analyzing..." : "Suggest Charges"}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <Gavel className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && results.suggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Suggested Charges
          </h2>
          <div className="space-y-4">
            {results.suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle>{suggestion.statuteTitle}</CardTitle>
                  <CardDescription>F.S. § {suggestion.statuteNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                    <h4 className="font-semibold text-accent-foreground/90 mb-2">
                      Justification
                    </h4>
                    <p className="text-accent-foreground/80 text-sm">
                      {suggestion.justification}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
