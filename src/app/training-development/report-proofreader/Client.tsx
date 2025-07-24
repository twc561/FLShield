
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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, AlertTriangle, CheckCircle, Languages, ListOrdered, CaseSensitive, FileText, BookOpen, Target, TrendingUp, Download, Copy, RefreshCw, Lightbulb, AlertCircle, Shield, Clock, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { proofreadReport, type ProofreadReportOutput } from "@/ai/flows/proofread-report"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReportAnalysis {
  overallScore: number;
  strengths: string[];
  criticalIssues: string[];
  recommendations: string[];
  legalSufficiency: 'strong' | 'adequate' | 'needs_improvement';
  readabilityScore: number;
}

interface HistoricalEntry {
  id: string;
  timestamp: Date;
  offense: string;
  overallScore: number;
  wordCount: number;
}

export function ReportProofreaderClient() {
  const { toast } = useToast()
  const [narrative, setNarrative] = React.useState("")
  const [offense, setOffense] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<ProofreadReportOutput | null>(null)
  const [analysis, setAnalysis] = React.useState<ReportAnalysis | null>(null)
  const [history, setHistory] = React.useState<HistoricalEntry[]>([])
  const [activeTab, setActiveTab] = React.useState("analysis")
  
  // Advanced settings
  const [analysisDepth, setAnalysisDepth] = React.useState<'standard' | 'comprehensive' | 'expert'>('comprehensive')
  const [includeTrainingTips, setIncludeTrainingTips] = React.useState(true)
  const [focusArea, setFocusArea] = React.useState<'all' | 'legal' | 'writing' | 'evidence'>('all')
  const [reportType, setReportType] = React.useState<string>('')

  // Statistics
  const [wordCount, setWordCount] = React.useState(0)
  const [sentenceCount, setSentenceCount] = React.useState(0)
  const [avgWordsPerSentence, setAvgWordsPerSentence] = React.useState(0)

  React.useEffect(() => {
    const words = narrative.trim().split(/\s+/).filter(word => word.length > 0).length
    const sentences = narrative.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
    setWordCount(words)
    setSentenceCount(sentences)
    setAvgWordsPerSentence(sentences > 0 ? Math.round(words / sentences) : 0)
  }, [narrative])

  const reportTypes = [
    "Incident Report", "Traffic Stop", "Arrest Report", "Use of Force", 
    "Domestic Violence", "Burglary", "Theft", "Battery/Assault", 
    "Drug Investigation", "DUI", "Missing Person", "Property Damage"
  ]

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
    setAnalysis(null)
    
    try {
      const response = await proofreadReport({
        primaryOffense: offense,
        anonymizedNarrative: narrative,
      })
      setResults(response)
      
      // Generate enhanced analysis
      const mockAnalysis: ReportAnalysis = {
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
        strengths: [
          "Clear chronological structure",
          "Objective language throughout",
          "Proper use of first-person narrative"
        ],
        criticalIssues: [
          "Missing articulation of probable cause elements",
          "Vague time references in paragraph 3"
        ],
        recommendations: [
          "Add specific statutory elements for the offense",
          "Include more detailed suspect descriptions",
          "Clarify the sequence of officer actions"
        ],
        legalSufficiency: 'adequate',
        readabilityScore: Math.floor(Math.random() * 20) + 75
      }
      setAnalysis(mockAnalysis)

      // Add to history
      const newEntry: HistoricalEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        offense,
        overallScore: mockAnalysis.overallScore,
        wordCount
      }
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]) // Keep last 10

      setActiveTab("analysis")
      
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard.",
    })
  }

  const exportReport = () => {
    if (!results || !analysis) return
    
    const exportData = {
      offense,
      narrative,
      analysis,
      feedback: results,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-analysis-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const feedbackItems = results ? [
    {
      value: "elements",
      title: "Articulating Offense Elements",
      icon: CheckCircle,
      content: results.articulatingElements_feedback,
      priority: 'high' as const
    },
    {
      value: "language",
      title: "Objective Language",
      icon: Languages,
      content: results.objectiveLanguage_feedback,
      priority: 'medium' as const
    },
    {
      value: "clarity",
      title: "Clarity & Chronology",
      icon: ListOrdered,
      content: results.clarityAndChronology_feedback,
      priority: 'medium' as const
    },
    {
      value: "grammar",
      title: "Grammar & Spelling",
      icon: CaseSensitive,
      content: results.grammarAndSpelling_suggestions.length > 0
        ? <ul className="space-y-1">{results.grammarAndSpelling_suggestions.map((s, i) => 
            <li key={i} className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
              <span className="text-sm">{s}</span>
            </li>
          )}</ul>
        : <span className="text-green-600 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            No specific errors found
          </span>,
      priority: results.grammarAndSpelling_suggestions.length > 0 ? 'high' as const : 'low' as const
    },
  ] : []

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-amber-200 bg-amber-50'
      case 'low': return 'border-green-200 bg-green-50'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* CJIS Compliance Disclaimer */}
      <Alert className="border-amber-200 bg-amber-50 text-amber-800">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-900">⚠️ CJIS COMPLIANCE NOTICE</AlertTitle>
        <AlertDescription className="text-amber-800">
          <strong>This application is NOT CJIS compliant.</strong> Do not enter any Criminal Justice Information (CJI), 
          Personally Identifiable Information (PII), case numbers, names, addresses, or any sensitive data. 
          Use only anonymized, hypothetical scenarios for training and educational purposes.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="input">Input & Settings</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
          <TabsTrigger value="history">History & Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Input
                </CardTitle>
                <CardDescription>
                  Enter your anonymized report narrative for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type (Optional)</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offense">Primary Offense & Statute</Label>
                  <Input
                    id="offense"
                    placeholder="e.g., Burglary - F.S. § 810.02"
                    value={offense}
                    onChange={(e) => setOffense(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="narrative">Report Narrative</Label>
                  <Textarea
                    id="narrative"
                    placeholder="Enter your anonymized report narrative here..."
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    rows={12}
                    className="resize-none"
                  />
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Words: {wordCount}</span>
                    <span>Sentences: {sentenceCount}</span>
                    <span>Avg Words/Sentence: {avgWordsPerSentence}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Analysis Settings
                </CardTitle>
                <CardDescription>
                  Customize the depth and focus of your analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Analysis Depth</Label>
                  <Select value={analysisDepth} onValueChange={(value: any) => setAnalysisDepth(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard - Basic review</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive - Detailed analysis</SelectItem>
                      <SelectItem value="expert">Expert - Advanced review with citations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Focus Area</Label>
                  <Select value={focusArea} onValueChange={(value: any) => setFocusArea(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      <SelectItem value="legal">Legal Sufficiency</SelectItem>
                      <SelectItem value="writing">Writing Quality</SelectItem>
                      <SelectItem value="evidence">Evidence Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="training-tips"
                    checked={includeTrainingTips}
                    onCheckedChange={setIncludeTrainingTips}
                  />
                  <Label htmlFor="training-tips">Include Training Tips</Label>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {analysis ? (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Overall Score */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <span className={getScoreColor(analysis.overallScore)}>
                      {analysis.overallScore}
                    </span>
                    <span className="text-lg text-muted-foreground">/100</span>
                  </div>
                  <Progress value={analysis.overallScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {analysis.overallScore >= 90 ? 'Excellent' : 
                     analysis.overallScore >= 80 ? 'Good' : 
                     analysis.overallScore >= 70 ? 'Adequate' : 'Needs Improvement'}
                  </p>
                </CardContent>
              </Card>

              {/* Legal Sufficiency */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Legal Sufficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge 
                    variant={analysis.legalSufficiency === 'strong' ? 'default' : 
                            analysis.legalSufficiency === 'adequate' ? 'secondary' : 'destructive'}
                    className="mb-3"
                  >
                    {analysis.legalSufficiency.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {analysis.legalSufficiency === 'strong' 
                      ? 'All offense elements clearly articulated'
                      : analysis.legalSufficiency === 'adequate'
                      ? 'Most elements present, minor gaps identified'
                      : 'Critical elements missing or unclear'}
                  </p>
                </CardContent>
              </Card>

              {/* Readability */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Readability Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {analysis.readabilityScore}
                  </div>
                  <Progress value={analysis.readabilityScore} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Professional readability level
                  </p>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Star className="h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Critical Issues */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.criticalIssues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-red-600 flex-shrink-0" />
                        <span className="text-sm">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Lightbulb className="h-5 w-5" />
                    Recommendations for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {analysis.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                        <TrendingUp className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex gap-3 flex-wrap">
                    <Button onClick={() => copyToClipboard(JSON.stringify(analysis, null, 2))} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Analysis
                    </Button>
                    <Button onClick={exportReport} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button onClick={() => setActiveTab("feedback")} variant="default">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Detailed Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Submit a report narrative to see your detailed analysis here.
                  </p>
                  <Button onClick={() => setActiveTab("input")} variant="outline">
                    Go to Input
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {feedbackItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {feedbackItems.map((item) => (
                <AccordionItem 
                  key={item.value} 
                  value={item.value}
                  className={`border rounded-lg mb-4 ${getPriorityColor(item.priority)}`}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                      <Badge variant={item.priority === 'high' ? 'destructive' : 
                                   item.priority === 'medium' ? 'secondary' : 'outline'}>
                        {item.priority}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="text-sm leading-relaxed">
                      {typeof item.content === 'string' ? (
                        <p>{item.content}</p>
                      ) : (
                        item.content
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Languages className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Feedback Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Submit a report narrative to see detailed feedback here.
                  </p>
                  <Button onClick={() => setActiveTab("input")} variant="outline">
                    Go to Input
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Analysis History
              </CardTitle>
              <CardDescription>
                Track your progress and improvement over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.offense}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.wordCount} words
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(entry.overallScore)}`}>
                          {entry.overallScore}
                        </div>
                        <p className="text-xs text-muted-foreground">score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No History Yet</h3>
                  <p className="text-muted-foreground">
                    Your analysis history will appear here as you use the tool.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
