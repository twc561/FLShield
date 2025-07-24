"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Loader2, Sparkles, Fish } from "lucide-react"
import { queryFwcRegulations } from "@/ai/flows/query-fwc-regulations"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FwcQueryClient() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState("")

  const handleQuery = async () => {
    if (!question) return
    setIsLoading(true)
    setAnswer("")
    setError("")

    try {
      const result = await queryFwcRegulations({ question })
      setAnswer(result.answer)
    } catch (e) {
      console.error(e)
      setError("The AI model failed to process your query. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setQuestion("")
      setAnswer("")
      setError("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Ask FWC AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>FWC Interactive Field Query</DialogTitle>
          <DialogDescription>
            Ask a plain-language question about FWC rules. The AI will search the regulations and provide a direct answer.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="e.g., 'Can I keep a 30-inch snook I caught on the gulf coast in October?'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={handleQuery} disabled={isLoading || !question}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Fish className="mr-2 h-4 w-4" />}
            {isLoading ? "Searching..." : "Get Answer"}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {answer && (
            <div className="p-4 bg-muted/50 rounded-md">
              <h4 className="font-semibold mb-2">AI Response:</h4>
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{answer}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}