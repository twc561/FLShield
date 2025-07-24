
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { generateUofNarrative } from "@/ai/flows/generate-uof-narrative"
import { 
  Loader2, 
  Sparkles, 
  Clipboard, 
  Check, 
  AlertTriangle, 
  Shield, 
  Target,
  Clock,
  Users,
  FileText,
  Camera,
  Mic,
  Download,
  RefreshCw,
  Scale,
  Eye,
  Brain
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  // Incident Context
  incidentType: z.string().min(1, "Incident type is required"),
  location: z.string().min(1, "Location context is required"),
  timeOfDay: z.string().min(1, "Time context is required"),
  witnesses: z.string().min(1, "Witness information is required"),
  
  // Subject Assessment
  subjectAge: z.string().min(1, "Subject age range is required"),
  subjectSize: z.string().min(1, "Subject size comparison is required"),
  subjectCondition: z.string().min(1, "Subject condition is required"),
  subjectBehavior: z.string().min(1, "Subject behavior is required"),
  
  // Graham v. Connor Factors
  crime: z.string().min(1, "Crime severity is required"),
  threat: z.string().min(1, "Threat assessment is required"),
  resistance: z.string().min(1, "Resistance level is required"),
  
  // Force Continuum
  forceLevel: z.string().min(1, "Force level is required"),
  forceUsed: z.string().min(1, "Specific force used is required"),
  forceEffectiveness: z.string().min(1, "Force effectiveness is required"),
  
  // De-escalation & Alternatives
  deescalationAttempts: z.string().min(1, "De-escalation attempts are required"),
  alternativesConsidered: z.string().min(1, "Alternative considerations are required"),
  
  // Outcome & Medical
  subjectInjuries: z.string().min(1, "Injury assessment is required"),
  medicalResponse: z.string().min(1, "Medical response is required"),
})

type FormData = z.infer<typeof formSchema>

interface ForceOption {
  level: number
  name: string
  description: string
  justification: string[]
  considerations: string[]
}

const forceOptions: ForceOption[] = [
  {
    level: 1,
    name: "Officer Presence",
    description: "Uniformed officer presence and verbal identification",
    justification: ["Professional appearance", "Clear identification", "Confident demeanor"],
    considerations: ["May be sufficient for compliant subjects", "Foundation for all interactions"]
  },
  {
    level: 2,
    name: "Verbal Direction/Commands",
    description: "Clear, lawful verbal commands and directions",
    justification: ["Reasonable, lawful commands", "Clear communication", "Opportunity to comply"],
    considerations: ["Must be audible and understandable", "Allow reasonable time to comply"]
  },
  {
    level: 3,
    name: "Empty Hand Control",
    description: "Physical control techniques without weapons",
    justification: ["Active resistance present", "Subject poses threat", "Verbal commands ineffective"],
    considerations: ["Control holds", "Pressure points", "Joint manipulation"]
  },
  {
    level: 4,
    name: "Less-Lethal Tools",
    description: "Taser, baton, OC spray, or other less-lethal options",
    justification: ["Active resistance/aggression", "Risk of injury", "Distance control needed"],
    considerations: ["Environmental factors", "Subject condition", "Backup availability"]
  },
  {
    level: 5,
    name: "Deadly Force",
    description: "Force likely to cause death or great bodily harm",
    justification: ["Imminent threat of death/GBH", "No other reasonable alternatives", "Immediate danger"],
    considerations: ["Backdrop considerations", "Innocent persons present", "Last resort"]
  }
]

export default function UseOfForceWizardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [narrative, setNarrative] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("assessment")
  const [threatLevel, setThreatLevel] = useState([3])
  const [forceLevel, setForceLevel] = useState([2])
  const [completionProgress, setCompletionProgress] = useState(0)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      location: "",
      timeOfDay: "",
      witnesses: "",
      subjectAge: "",
      subjectSize: "",
      subjectCondition: "",
      subjectBehavior: "",
      crime: "",
      threat: "",
      resistance: "",
      forceLevel: "",
      forceUsed: "",
      forceEffectiveness: "",
      deescalationAttempts: "",
      alternativesConsidered: "",
      subjectInjuries: "",
      medicalResponse: "",
    },
  })

  // Calculate completion progress and auto-adjust threat level
  useEffect(() => {
    const values = form.getValues()
    const totalFields = Object.keys(values).length
    const completedFields = Object.values(values).filter(value => value && value.length > 0).length
    setCompletionProgress((completedFields / totalFields) * 100)
    
    // Auto-adjust threat level based on narrative content
    const narrativeText = `${values.threat} ${values.resistance} ${values.crime}`.toLowerCase()
    const deadlyForceKeywords = [
      'gun', 'weapon', 'knife', 'firearm', 'pistol', 'rifle', 'armed', 'shooting', 'shot',
      'killed', 'murder', 'death', 'deadly', 'life threatening', 'great bodily harm',
      'stabbing', 'stabbed', 'machete', 'sword', 'hatchet', 'axe', 'imminent threat'
    ]
    
    const hasDeadlyForceIndicators = deadlyForceKeywords.some(keyword => 
      narrativeText.includes(keyword)
    )
    
    if (hasDeadlyForceIndicators && threatLevel[0] < 5) {
      setThreatLevel([5])
    }
  }, [form.watch(), threatLevel])

  const getForceRecommendation = () => {
    const currentThreatLevel = threatLevel[0]
    const formValues = form.getValues()
    
    // Check for deadly force indicators in the narrative
    const narrativeText = `${formValues.threat} ${formValues.resistance} ${formValues.crime}`.toLowerCase()
    const deadlyForceKeywords = [
      'gun', 'weapon', 'knife', 'firearm', 'pistol', 'rifle', 'armed', 'shooting', 'shot',
      'killed', 'murder', 'death', 'deadly', 'life threatening', 'great bodily harm',
      'stabbing', 'stabbed', 'machete', 'sword', 'hatchet', 'axe', 'imminent threat'
    ]
    
    const hasDeadlyForceIndicators = deadlyForceKeywords.some(keyword => 
      narrativeText.includes(keyword)
    )
    
    // If deadly force indicators are present, recommend deadly force
    if (hasDeadlyForceIndicators || currentThreatLevel >= 5) {
      return forceOptions.find(f => f.level === 5) // Deadly Force
    }
    
    // For high threat situations without deadly weapons
    if (currentThreatLevel >= 4) {
      return forceOptions.find(f => f.level === 4) // Less-lethal tools
    }
    
    // Standard progression for lower threats
    const recommendedForce = Math.min(currentThreatLevel + 1, 5)
    return forceOptions.find(f => f.level === recommendedForce)
  }

  const getThreatColor = (level: number) => {
    if (level <= 2) return "text-green-600"
    if (level <= 3) return "text-yellow-600" 
    if (level <= 4) return "text-orange-600"
    return "text-red-600"
  }

  const getForceJustification = () => {
    const threat = threatLevel[0]
    const force = forceLevel[0]
    const formValues = form.getValues()
    
    // Check for deadly force scenarios
    const narrativeText = `${formValues.threat} ${formValues.resistance} ${formValues.crime}`.toLowerCase()
    const deadlyForceKeywords = [
      'gun', 'weapon', 'knife', 'firearm', 'pistol', 'rifle', 'armed', 'shooting', 'shot',
      'killed', 'murder', 'death', 'deadly', 'life threatening', 'great bodily harm',
      'stabbing', 'stabbed', 'machete', 'sword', 'hatchet', 'axe', 'imminent threat'
    ]
    
    const hasDeadlyForceIndicators = deadlyForceKeywords.some(keyword => 
      narrativeText.includes(keyword)
    )
    
    // Special handling for deadly force scenarios
    if (hasDeadlyForceIndicators) {
      if (force === 5) {
        return { status: "justified", message: "Deadly force is justified given the imminent threat to life", color: "text-green-600" }
      } else if (force < 5) {
        return { status: "insufficient", message: "Higher force level may be necessary for this threat", color: "text-orange-600" }
      }
    }
    
    // Standard force justification logic
    if (force > threat + 1) {
      return { status: "excessive", message: "Force level may be excessive for threat level", color: "text-red-600" }
    } else if (force === threat + 1 || force === threat) {
      return { status: "justified", message: "Force level appears justified", color: "text-green-600" }
    } else {
      return { status: "minimal", message: "Conservative force application", color: "text-blue-600" }
    }
  }

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    setNarrative("")
    
    try {
      const enhancedInput = `
INCIDENT CONTEXT:
Type: ${values.incidentType}
Location: ${values.location}  
Time: ${values.timeOfDay}
Witnesses: ${values.witnesses}

SUBJECT ASSESSMENT:
Age: ${values.subjectAge}
Size: ${values.subjectSize}
Condition: ${values.subjectCondition}
Behavior: ${values.subjectBehavior}

GRAHAM v. CONNOR FACTORS:
Crime Severity: ${values.crime}
Immediate Threat: ${values.threat}  
Resistance Level: ${values.resistance}

FORCE APPLICATION:
Force Level: ${values.forceLevel}
Specific Force: ${values.forceUsed}
Effectiveness: ${values.forceEffectiveness}

DE-ESCALATION & ALTERNATIVES:
De-escalation Attempts: ${values.deescalationAttempts}
Alternatives Considered: ${values.alternativesConsidered}

OUTCOME:
Subject Injuries: ${values.subjectInjuries}
Medical Response: ${values.medicalResponse}
      `

      const result = await generateUofNarrative({
        crime: values.crime,
        threat: values.threat,
        resistance: values.resistance,
        forceUsed: enhancedInput
      })
      
      setNarrative(result.narrative)
      setActiveTab("narrative")
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

  const downloadReport = () => {
    const reportContent = `
USE OF FORCE REPORT NARRATIVE
Generated: ${new Date().toLocaleString()}

${narrative}

---
This narrative was generated using the FL Shield Use of Force Wizard
and should be reviewed for accuracy and completeness before submission.
    `
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `UoF-Narrative-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const recommendation = getForceRecommendation()
  const justification = getForceJustification()

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Use of Force Decision Support System"
        description="Comprehensive guidance for use of force documentation and analysis based on Graham v. Connor."
      />

      {/* CJIS Compliance Warning */}
      <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-900">⚠️ CJIS COMPLIANCE NOTICE</AlertTitle>
        <AlertDescription className="text-amber-800">
          <strong>This application is NOT CJIS compliant.</strong> Do not enter any Criminal Justice Information (CJI), 
          Personally Identifiable Information (PII), case numbers, names, addresses, or any sensitive data. 
          Use only anonymized, hypothetical scenarios for training purposes.
        </AlertDescription>
      </Alert>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Assessment Progress</CardTitle>
            <Badge variant="outline">{Math.round(completionProgress)}% Complete</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionProgress} className="w-full" />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Assessment
          </TabsTrigger>
          <TabsTrigger value="threat-analysis" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Threat Analysis
          </TabsTrigger>
          <TabsTrigger value="force-selection" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Force Selection
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="narrative" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Narrative
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Situation Assessment Tab */}
            <TabsContent value="assessment" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Incident Context
                    </CardTitle>
                    <CardDescription>Document the situational factors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="incidentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select incident type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="traffic-stop">Traffic Stop</SelectItem>
                              <SelectItem value="domestic-dispute">Domestic Dispute</SelectItem>
                              <SelectItem value="arrest-warrant">Arrest Warrant Service</SelectItem>
                              <SelectItem value="disturbance">Disturbance Call</SelectItem>
                              <SelectItem value="investigation">Investigation</SelectItem>
                              <SelectItem value="pursuit">Vehicle Pursuit</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Context</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public-street">Public Street/Road</SelectItem>
                              <SelectItem value="residential">Residential Area</SelectItem>
                              <SelectItem value="commercial">Commercial Property</SelectItem>
                              <SelectItem value="school">School/Educational Facility</SelectItem>
                              <SelectItem value="confined-space">Confined Space</SelectItem>
                              <SelectItem value="crowded-area">Crowded Public Area</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeOfDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time/Visibility</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time/visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="daylight-clear">Daylight - Clear Visibility</SelectItem>
                              <SelectItem value="daylight-limited">Daylight - Limited Visibility</SelectItem>
                              <SelectItem value="dusk-dawn">Dusk/Dawn</SelectItem>
                              <SelectItem value="night-lit">Night - Well Lit</SelectItem>
                              <SelectItem value="night-dark">Night - Poor Lighting</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="witnesses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Witnesses Present</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select witness situation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-witnesses">No Witnesses Present</SelectItem>
                              <SelectItem value="few-witnesses">Few Witnesses (1-3)</SelectItem>
                              <SelectItem value="multiple-witnesses">Multiple Witnesses (4+)</SelectItem>
                              <SelectItem value="crowd-present">Crowd Present</SelectItem>
                              <SelectItem value="hostile-crowd">Hostile Crowd</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Subject Assessment
                    </CardTitle>
                    <CardDescription>Evaluate the subject's characteristics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="subjectAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject Age Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select age range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="juvenile">Juvenile (Under 18)</SelectItem>
                              <SelectItem value="young-adult">Young Adult (18-25)</SelectItem>
                              <SelectItem value="adult">Adult (26-55)</SelectItem>
                              <SelectItem value="elderly">Elderly (55+)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjectSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size Comparison to Officer</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select size comparison" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="much-smaller">Much Smaller</SelectItem>
                              <SelectItem value="smaller">Smaller</SelectItem>
                              <SelectItem value="similar">Similar Size</SelectItem>
                              <SelectItem value="larger">Larger</SelectItem>
                              <SelectItem value="much-larger">Much Larger</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjectCondition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sober-alert">Sober & Alert</SelectItem>
                              <SelectItem value="impaired-alcohol">Impaired by Alcohol</SelectItem>
                              <SelectItem value="impaired-drugs">Impaired by Drugs</SelectItem>
                              <SelectItem value="mental-health">Mental Health Crisis</SelectItem>
                              <SelectItem value="medical-condition">Medical Condition</SelectItem>
                              <SelectItem value="emotional-distress">Emotional Distress</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjectBehavior"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Behavior</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select behavior" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cooperative">Cooperative</SelectItem>
                              <SelectItem value="nervous-anxious">Nervous/Anxious</SelectItem>
                              <SelectItem value="non-compliant">Non-compliant</SelectItem>
                              <SelectItem value="verbally-aggressive">Verbally Aggressive</SelectItem>
                              <SelectItem value="agitated">Agitated/Hostile</SelectItem>
                              <SelectItem value="violent">Violent/Combative</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setActiveTab("threat-analysis")}>
                  Next: Threat Analysis →
                </Button>
              </div>
            </TabsContent>

            {/* Threat Analysis Tab */}
            <TabsContent value="threat-analysis" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Graham v. Connor Factors</CardTitle>
                    <CardDescription>Analyze the three key constitutional factors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="crime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity of Crime</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the severity of the initial crime or suspected offense..." 
                              {...field} 
                            />
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
                          <FormLabel>Immediate Threat Assessment</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detail the immediate threat to officers, others, or subject..." 
                              {...field} 
                            />
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
                          <FormLabel>Active Resistance/Flight Risk</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the subject's resistance, evasion attempts, or flight risk..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Threat Level Assessment</CardTitle>
                    <CardDescription>Rate the overall threat level</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Current Threat Level: {threatLevel[0]}</label>
                      <Slider
                        value={threatLevel}
                        onValueChange={setThreatLevel}
                        max={5}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Low</span>
                        <span>Critical</span>
                      </div>
                    </div>

                    <Alert>
                      <Target className="h-4 w-4" />
                      <AlertTitle className={getThreatColor(threatLevel[0])}>
                        Threat Level {threatLevel[0]}
                      </AlertTitle>
                      <AlertDescription>
                        {threatLevel[0] <= 2 && "Low threat situation. Officer presence and verbal commands typically sufficient."}
                        {threatLevel[0] === 3 && "Moderate threat. Physical control techniques may be necessary."}
                        {threatLevel[0] === 4 && "High threat. Less-lethal tools (Taser, OC spray) should be considered."}
                        {threatLevel[0] === 5 && "CRITICAL THREAT: Imminent danger of death or great bodily harm. Deadly force is justified."}
                      </AlertDescription>
                    </Alert>

                    {recommendation && (
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertTitle>Recommended Response</AlertTitle>
                        <AlertDescription>
                          <strong>{recommendation.name}</strong><br />
                          {recommendation.description}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("assessment")}>
                  ← Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("force-selection")}>
                  Next: Force Selection →
                </Button>
              </div>
            </TabsContent>

            {/* Force Selection Tab */}
            <TabsContent value="force-selection" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Force Continuum Analysis</CardTitle>
                    <CardDescription>Select and justify force level used</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Force Level Applied: {forceLevel[0]}</label>
                      <Slider
                        value={forceLevel}
                        onValueChange={setForceLevel}
                        max={5}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Presence</span>
                        <span>Deadly Force</span>
                      </div>
                    </div>

                    <Alert>
                      <Scale className="h-4 w-4" />
                      <AlertTitle className={justification.color}>
                        Force Analysis: {justification.status.toUpperCase()}
                      </AlertTitle>
                      <AlertDescription>
                        {justification.message}
                      </AlertDescription>
                    </Alert>

                    {forceOptions.map((option) => (
                      <div key={option.level} className={`p-3 rounded-lg border ${
                        forceLevel[0] === option.level ? 'bg-primary/10 border-primary' : 'bg-muted/50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{option.level}. {option.name}</h4>
                          {forceLevel[0] === option.level && <Badge>Selected</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                        {forceLevel[0] === option.level && (
                          <div className="space-y-2">
                            <div>
                              <h5 className="text-sm font-medium">Justification Factors:</h5>
                              <ul className="text-xs space-y-1">
                                {option.justification.map((factor, idx) => (
                                  <li key={idx}>• {factor}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Considerations:</h5>
                              <ul className="text-xs space-y-1">
                                {option.considerations.map((consideration, idx) => (
                                  <li key={idx}>• {consideration}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Force Documentation</CardTitle>
                    <CardDescription>Document specific force application details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="forceUsed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Force Techniques Used</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detail the exact force techniques, tools, or weapons used..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="forceEffectiveness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Force Effectiveness</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select effectiveness" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediately-effective">Immediately Effective</SelectItem>
                              <SelectItem value="effective-after-multiple">Effective After Multiple Applications</SelectItem>
                              <SelectItem value="partially-effective">Partially Effective</SelectItem>
                              <SelectItem value="ineffective">Ineffective</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deescalationAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>De-escalation Attempts</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any de-escalation techniques attempted before force..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternativesConsidered"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternative Options Considered</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What other force options were available and why were they not used..." 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("threat-analysis")}>
                  ← Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("documentation")}>
                  Next: Documentation →
                </Button>
              </div>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="documentation" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Post-Incident Documentation
                    </CardTitle>
                    <CardDescription>Document injuries and medical response</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="subjectInjuries"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject Injuries</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select injury status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-visible-injuries">No Visible Injuries</SelectItem>
                              <SelectItem value="minor-injuries">Minor Injuries (Abrasions, Bruising)</SelectItem>
                              <SelectItem value="moderate-injuries">Moderate Injuries</SelectItem>
                              <SelectItem value="serious-injuries">Serious Injuries</SelectItem>
                              <SelectItem value="life-threatening">Life-threatening Injuries</SelectItem>
                              <SelectItem value="complaint-of-pain">Complaint of Pain Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="medicalResponse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Response</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select medical response" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-medical-needed">No Medical Attention Needed</SelectItem>
                              <SelectItem value="ems-evaluated-refused">EMS Evaluated - Subject Refused</SelectItem>
                              <SelectItem value="ems-treated-released">EMS Treated & Released</SelectItem>
                              <SelectItem value="transported-hospital">Transported to Hospital</SelectItem>
                              <SelectItem value="medical-clearance">Medical Clearance Required</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Evidence & Reporting
                    </CardTitle>
                    <CardDescription>Complete documentation requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertTitle>Required Documentation</AlertTitle>
                      <AlertDescription>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>✓ Use of Force Report</li>
                          <li>✓ Incident Report</li>
                          <li>✓ Witness Statements</li>
                          <li>✓ Medical Documentation</li>
                          <li>✓ Photo Documentation</li>
                          <li>✓ Supervisor Notification</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-800">Important Reminders</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Complete all reports by end of shift</li>
                          <li>• Notify supervisor immediately</li>
                          <li>• Preserve all evidence</li>
                          <li>• Document any witnesses</li>
                          <li>• Review body camera footage</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setActiveTab("force-selection")}>
                  ← Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Narrative...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Narrative
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Narrative Tab */}
            <TabsContent value="narrative" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Generated Narrative
                  </CardTitle>
                  <CardDescription>
                    Review and refine your use of force narrative
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-muted/50 rounded-md p-4 min-h-[300px]">
                  {isLoading && (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  {!isLoading && narrative && (
                    <p className="whitespace-pre-wrap text-sm text-foreground/90">{narrative}</p>
                  )}
                  {!isLoading && !narrative && (
                    <div className="text-center text-muted-foreground pt-20">
                      Complete the assessment and click "Generate Narrative" to create your use of force documentation.
                    </div>
                  )}
                </CardContent>
                {narrative && (
                  <CardFooter className="flex gap-3">
                    <Button variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Clipboard className="mr-2 h-4 w-4" />
                          Copy Narrative
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={downloadReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                    <Button variant="outline" onClick={() => form.reset()}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Start New Assessment
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}
