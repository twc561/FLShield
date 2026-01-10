"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { generateUofNarrative } from "@/ai/flows/generate-uof-narrative"
import { Loader2, Sparkles, Clipboard, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  crime: z.string().min(1, { message: "This field is required." }),
  threat: z.string().min(1, { message: "This field is required." }),
  resistance: z.string().min(1, { message: "This field is required." }),
  forceUsed: z.string().min(1, { message: "This field is required." }),
})

export default function UseOfForceWizardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [narrative, setNarrative] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crime: "",
      threat: "",
      resistance: "",
      forceUsed: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setNarrative("")
    try {
      const result = await generateUofNarrative(values)
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
        title="Use of Force Wizard"
        description="Articulate your use of force based on the Graham v. Connor factors."
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Justification Factors</CardTitle>
            <CardDescription>
              Provide brief notes for each factor. The AI will synthesize them into a formal narrative.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="crime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity of Initial Crime</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Armed robbery, a violent felony.'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="threat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Immediate Threat to Officer/Others</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Suspect was non-compliant and reaching for waistband where a weapon was believed to be.'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resistance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suspect&apos;s Resistance/Evasion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Actively resisted arrest by pulling arms away and attempting to flee.'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="forceUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Force Used</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Taser deployment.'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    )}
                    {isLoading ? "Generating..." : "Generate Narrative"}
                  </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI-Generated Narrative</CardTitle>
            <CardDescription>
              Review the generated text below. Copy and paste it into your official report.
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
            <CardFooter>
              <Button variant="outline" onClick={handleCopy}>
                {copied ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <Clipboard className="mr-2 h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Narrative"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
