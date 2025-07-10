'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { generateReportNarrative } from "@/ai/flows/generate-report-narrative"
import { Loader2, Sparkles, Clipboard, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  offense: z.string().min(1, { message: "Primary offense is required." }),
  notes: z.string().min(10, { message: "Please provide some notes about the incident." }),
})

export default function AiReportWriterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [narrative, setNarrative] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offense: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setNarrative("")
    try {
      const result = await generateReportNarrative(values)
      setNarrative(result.narrative)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Generating Narrative",
        description: "The AI model failed to generate a response. Please try again.",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(narrative)
    setCopied(true)
    toast({ title: "Narrative copied to clipboard!" })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Report Assistant"
        description="Provide key facts and let the AI generate a formal, structured incident report narrative."
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Incident Details</CardTitle>
                <CardDescription>
                  Enter the primary offense and your rough notes. Do NOT include real names, PII, or CJI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="offense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Offense</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Burglary to a Conveyance, F.S. 810.02'" {...field} rows={1} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Field Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., 'Responded to 123 Main St. Saw smashed car window. Victim said laptop was stolen. No witnesses.'" 
                          {...field} 
                          className="min-h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                 <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    )}
                    {isLoading ? "Generating..." : "Generate Narrative"}
                  </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI-Generated Narrative</CardTitle>
            <CardDescription>
              Review the generated text below. Copy and paste it into your official report after verifying its accuracy.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow bg-muted/50 rounded-md p-4 min-h-[200px]">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && narrative && (
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{narrative}</p>
            )}
            {!isLoading && !narrative && (
                <div className="text-center text-muted-foreground pt-10">
                    Your generated narrative will appear here.
                </div>
            )}
          </CardContent>
          {narrative && (
            <CardFooter className="flex-col items-start gap-4">
               <Button variant="outline" onClick={handleCopy}>
                {copied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="mr-2 h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Narrative"}
              </Button>
               <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Verify All Information</AlertTitle>
                <AlertDescription>
                  The AI-generated narrative is a draft. You are responsible for ensuring all facts, names, and details are accurate before submitting your official report.
                </AlertDescription>
              </Alert>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
