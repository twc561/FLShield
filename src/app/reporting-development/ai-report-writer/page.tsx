
'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { generateReportNarrative } from "@/ai/flows/generate-report-narrative"
import { Loader2, Sparkles, Clipboard, Check, AlertTriangle, FileText, Users, Camera, MapPin, Clock, Shield, Brain, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  reportType: z.string().min(1, { message: "Report type is required." }),
  offense: z.string().min(1, { message: "Primary offense is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  dateTime: z.string().min(1, { message: "Date/time is required." }),
  narrative: z.string().min(10, { message: "Please provide a detailed narrative." }),
  witnesses: z.string().optional(),
  evidence: z.string().optional(),
  injuries: z.string().optional(),
  propertyDamage: z.string().optional(),
  vehicleInfo: z.string().optional(),
  suspectDescription: z.string().optional(),
  officerActions: z.string().optional(),
})

const reportTypes = [
  "Incident Report",
  "Traffic Crash Report", 
  "Use of Force Report",
  "Arrest Report",
  "Supplemental Report",
  "Property/Evidence Report",
  "Missing Person Report",
  "Domestic Violence Report",
  "Burglary Report",
  "Theft Report",
  "Battery/Assault Report",
  "Drug/Narcotics Report",
  "DUI Report"
]

export default function AiReportWriterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [narratives, setNarratives] = useState<{
    formal: string;
    summary: string;
    chronological: string;
    elements: string;
  }>({ formal: "", summary: "", chronological: "", elements: "" })
  const [copied, setCopied] = useState<string>("")
  const [activeTab, setActiveTab] = useState("input")
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "",
      offense: "",
      location: "",
      dateTime: "",
      narrative: "",
      witnesses: "",
      evidence: "",
      injuries: "",
      propertyDamage: "",
      vehicleInfo: "",
      suspectDescription: "",
      officerActions: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setNarratives({ formal: "", summary: "", chronological: "", elements: "" })
    
    try {
      // Compile comprehensive input for AI
      const detailedInput = `
REPORT TYPE: ${values.reportType}
PRIMARY OFFENSE: ${values.offense}
LOCATION: ${values.location}
DATE/TIME: ${values.dateTime}

MAIN NARRATIVE: ${values.narrative}

${values.witnesses ? `WITNESSES: ${values.witnesses}` : ''}
${values.evidence ? `EVIDENCE: ${values.evidence}` : ''}
${values.injuries ? `INJURIES: ${values.injuries}` : ''}
${values.propertyDamage ? `PROPERTY DAMAGE: ${values.propertyDamage}` : ''}
${values.vehicleInfo ? `VEHICLE INFO: ${values.vehicleInfo}` : ''}
${values.suspectDescription ? `SUSPECT DESCRIPTION: ${values.suspectDescription}` : ''}
${values.officerActions ? `OFFICER ACTIONS TAKEN: ${values.officerActions}` : ''}
      `.trim()

      // Generate multiple versions
      const [formal, summary, chronological, elements] = await Promise.all([
        generateReportNarrative({
          offense: values.offense,
          notes: `${detailedInput}\n\nGenerate a formal, professional incident report narrative suitable for official documentation.`
        }),
        generateReportNarrative({
          offense: values.offense,
          notes: `${detailedInput}\n\nGenerate a concise executive summary focusing on key facts and outcomes.`
        }),
        generateReportNarrative({
          offense: values.offense,
          notes: `${detailedInput}\n\nGenerate a chronological timeline narrative emphasizing the sequence of events.`
        }),
        generateReportNarrative({
          offense: values.offense,
          notes: `${detailedInput}\n\nGenerate a narrative that clearly articulates the legal elements of the offense with supporting facts.`
        })
      ])

      setNarratives({
        formal: formal.narrative,
        summary: summary.narrative,
        chronological: chronological.narrative,
        elements: elements.narrative
      })
      
      setActiveTab("results")
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Generating Narratives",
        description: "The AI model failed to generate responses. Please try again.",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    toast({ title: `${type} narrative copied to clipboard!` })
    setTimeout(() => setCopied(""), 2000)
  }

  const downloadReport = (type: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type.toLowerCase()}_narrative_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({ title: `${type} narrative downloaded!` })
  }

  return (
    <div className="animate-fade-in-up max-w-7xl mx-auto">
      <PageHeader
        title="Enhanced AI Report Assistant"
        description="Transform your field notes into professional, comprehensive incident reports with AI-powered analysis and multiple narrative formats."
      />

      {/* CJIS Compliance Disclaimer */}
      <Alert className="border-amber-200 bg-amber-50 text-amber-800 mb-6">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-900">⚠️ CJIS COMPLIANCE NOTICE</AlertTitle>
        <AlertDescription className="text-amber-800">
          <strong>This application is NOT CJIS compliant.</strong> Do not enter any Criminal Justice Information (CJI), 
          Personally Identifiable Information (PII), case numbers, names, addresses, or any sensitive data. 
          Use only anonymized, hypothetical scenarios for training and educational purposes.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Report Input</TabsTrigger>
          <TabsTrigger value="results">Generated Narratives</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Comprehensive Report Details
                  </CardTitle>
                  <CardDescription>
                    Fill out all relevant fields to generate professional incident report narratives. The more detail you provide, the better the AI can assist.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Report Type & Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="reportType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select report type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {reportTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="offense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Offense/Statute</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 'Burglary to a Conveyance, F.S. 810.02'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., '123 Main St, City, FL'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Date & Time
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 'January 15, 2024, 14:30 hours'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Main Narrative */}
                  <FormField
                    control={form.control}
                    name="narrative"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Incident Narrative</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what happened in detail. Include your observations, actions taken, and sequence of events..." 
                            {...field} 
                            className="min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="witnesses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Witnesses/Victims
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List witnesses, victims, and their statements..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="evidence"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Camera className="h-4 w-4" />
                              Evidence Collected
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Photos, physical evidence, documentation..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="injuries"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Injuries/Medical</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any injuries, medical attention provided..." 
                                {...field} 
                                rows={2}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="suspectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Suspect/Person Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Physical description, clothing, behavior..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Make, model, color, license plate, damage..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="propertyDamage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Damage</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description and estimated value of damages..." 
                                {...field} 
                                rows={2}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="officerActions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Officer Actions Taken
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe actions you took, arrests made, citations issued, follow-up needed..." 
                            {...field} 
                            rows={3}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Brain className="mr-2 h-4 w-4 text-accent" />
                    )}
                    {isLoading ? "Generating..." : "Generate Professional Narratives"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {isLoading && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Generating Professional Narratives</p>
                    <p className="text-muted-foreground">Creating multiple versions optimized for different purposes...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && narratives.formal && (
            <div className="grid gap-6">
              {/* Formal Report Narrative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Formal Report Narrative
                    </div>
                    <Badge variant="secondary">Official Use</Badge>
                  </CardTitle>
                  <CardDescription>
                    Professional, structured narrative suitable for official police reports and court documentation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-muted/50 rounded-md p-4">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">{narratives.formal}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => handleCopy("Formal", narratives.formal)}>
                    {copied === "Formal" ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copied === "Formal" ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport("Formal", narratives.formal)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>

              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Executive Summary
                    </div>
                    <Badge variant="outline">Brief Overview</Badge>
                  </CardTitle>
                  <CardDescription>
                    Concise summary highlighting key facts, perfect for supervisory review and case briefings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-muted/50 rounded-md p-4">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">{narratives.summary}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => handleCopy("Summary", narratives.summary)}>
                    {copied === "Summary" ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copied === "Summary" ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport("Summary", narratives.summary)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>

              {/* Chronological Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Chronological Timeline
                    </div>
                    <Badge variant="outline">Sequential Events</Badge>
                  </CardTitle>
                  <CardDescription>
                    Time-ordered narrative emphasizing the sequence of events for clear case understanding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-muted/50 rounded-md p-4">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">{narratives.chronological}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => handleCopy("Chronological", narratives.chronological)}>
                    {copied === "Chronological" ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copied === "Chronological" ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport("Chronological", narratives.chronological)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>

              {/* Legal Elements Narrative */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Legal Elements Analysis
                    </div>
                    <Badge variant="secondary">Prosecution Ready</Badge>
                  </CardTitle>
                  <CardDescription>
                    Narrative focusing on legal elements of the offense with supporting facts for prosecution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-muted/50 rounded-md p-4">
                  <p className="whitespace-pre-wrap text-sm text-foreground/90">{narratives.elements}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => handleCopy("Legal Elements", narratives.elements)}>
                    {copied === "Legal Elements" ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Clipboard className="mr-2 h-4 w-4" />}
                    {copied === "Legal Elements" ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport("Legal_Elements", narratives.elements)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>

              {/* Verification Notice */}
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Verify All Information</AlertTitle>
                <AlertDescription>
                  All AI-generated narratives are drafts requiring officer review. You are responsible for ensuring accuracy, 
                  completeness, and compliance with department policies before submitting any official report.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!isLoading && !narratives.formal && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">No Narratives Generated</p>
                <p className="text-muted-foreground">Return to the Report Input tab to generate professional narratives.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
