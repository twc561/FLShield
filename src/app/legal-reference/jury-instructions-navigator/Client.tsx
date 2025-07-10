
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Search, Sparkles, Gavel, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import type { AnalyzeInstructionOutput as InstructionDetail } from "@/ai/flows/analyze-jury-instruction"
import { analyzeInstruction, type AnalyzeInstructionInput } from "@/ai/flows/analyze-jury-instruction"
import { findJuryInstruction, type FindJuryInstructionInput, type FindJuryInstructionOutput } from "@/ai/flows/find-jury-instruction"
import { commonCrimesMap } from "@/data/legal-reference/common-crimes-map"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"


const InstructionDetailView = React.memo(({ detail }: { detail: InstructionDetail }) => {
    if (!detail.id) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Instruction Not Found</AlertTitle>
                <AlertDescription>
                    The AI could not locate a specific jury instruction for your query. This may be because it's a non-criminal statute or a complex crime without a standard instruction.
                </AlertDescription>
            </Alert>
        )
    }
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Plain Language Summary</h3>
      <p className="text-muted-foreground">{detail.plainLanguageSummary}</p>
      
      <Alert className="bg-accent/20 border-accent/50">
        <Gavel className="h-4 w-4 text-accent" />
        <AlertTitle>{detail.elementsToProve.title}</AlertTitle>
        <AlertDescription>
          <div className="space-y-4 mt-2">
              {detail.elementsToProve.elements.map((elem, i) => (
                  <div key={i} className="p-3 bg-background/50 rounded-md">
                      <p className="font-semibold text-foreground/90">Element {i+1}: <span className="text-muted-foreground font-normal italic">"{elem.element}"</span></p>
                      <p className="text-sm text-foreground/80 mt-2"><strong className="text-accent">Officer Actions:</strong> {elem.officerActions}</p>
                  </div>
              ))}
          </div>
        </AlertDescription>
      </Alert>

      <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Related Statute</h3>
          <Badge variant="outline">{detail.relatedStatute}</Badge>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="full-text">
          <AccordionTrigger>View Full Instruction Text</AccordionTrigger>
          <AccordionContent className="whitespace-pre-wrap text-xs font-mono bg-muted/50 p-3 rounded-md">
            {detail.fullText}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
})

export const JuryInstructionsClient = React.memo(function JuryInstructionsClient() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [analysisResult, setAnalysisResult] = React.useState<InstructionDetail | null>(null);
  const [disambiguationOptions, setDisambiguationOptions] = React.useState<FindJuryInstructionOutput['disambiguationOptions']>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  
  const resetSearchState = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setDisambiguationOptions([]);
    setLoadingStep("");
  }
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    resetSearchState();

    const lowercasedQuery = searchTerm.toLowerCase();

    // --- Phase 1: Local Search ---
    setLoadingStep("Searching local index...");

    // Priority 1: Check for exact match of crime name
    const exactMatch = commonCrimesMap.find(crime => crime.crimeName.toLowerCase() === lowercasedQuery);
    if (exactMatch) {
      if (exactMatch.instructionID === "AI_FALLBACK") {
        await performAISearch({ query: searchTerm });
      } else {
        await analyzeAndDisplayInstruction({ instructionId: exactMatch.instructionID });
      }
      return;
    }

    // Priority 2: Check for keyword matches
    const keywordMatches = commonCrimesMap
      .map(crime => {
        const keywords = crime.keywords.map(k => k.toLowerCase());
        let score = 0;
        if (keywords.includes(lowercasedQuery)) {
          score = 50; // High score for exact keyword match
        } else if (crime.crimeName.toLowerCase().includes(lowercasedQuery) || keywords.some(k => lowercasedQuery.includes(k))) {
          score = 20; // Lower score for partial match
        }
        return { ...crime, score };
      })
      .filter(crime => crime.score > 0)
      .sort((a, b) => b.score - a.score);

    if (keywordMatches.length > 0) {
        if (keywordMatches[0].instructionID === "AI_FALLBACK") {
            await performAISearch({ query: searchTerm });
        } else {
            await analyzeAndDisplayInstruction({ instructionId: keywordMatches[0].instructionID });
        }
        return;
    }


    // --- Phase 2: AI Fallback Search ---
    setLoadingStep("No local match found. Consulting AI analyst...");
    await performAISearch({ query: searchTerm });
  }

  const performAISearch = async (input: FindJuryInstructionInput) => {
    try {
        const findResponse = await findJuryInstruction(input);
        
        if (findResponse.disambiguationOptions && findResponse.disambiguationOptions.length > 0) {
          setLoadingStep("Please clarify your search.");
          setDisambiguationOptions(findResponse.disambiguationOptions);
          setIsLoading(false);
        } else if (findResponse.instructionID) {
          await analyzeAndDisplayInstruction({ instructionId: findResponse.instructionID });
        } else {
          throw new Error("The AI analyst could not definitively identify an instruction or provide clarifying options.");
        }
    } catch (e: any) {
        console.error(e);
        setError(e.message || "An unknown error occurred. Please try again.");
        setIsLoading(false);
        setLoadingStep("");
    }
  }

  const analyzeAndDisplayInstruction = async (input: AnalyzeInstructionInput) => {
    setIsLoading(true); // Ensure loading state is active
    setError(null);
    setAnalysisResult(null);
    setDisambiguationOptions([]);
    setLoadingStep("AI is analyzing instruction details...");

    try {
        const analysis = await analyzeInstruction({ instructionId: input.instructionId });
        setAnalysisResult(analysis);
    } catch(e: any) {
        console.error(e);
        setError(e.message || "An unknown error occurred analyzing the instruction.");
    } finally {
        setIsLoading(false);
        setLoadingStep("");
    }
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Crime Description</CardTitle>
                <CardDescription>Enter a crime in plain language (e.g., "Burglary of a home" or "Resisting with violence"). The system will find the correct jury instruction and analyze its elements.</CardDescription>
            </CardHeader>
             <form onSubmit={handleSearch}>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        placeholder="e.g., Grand Theft Auto, Robbery with a firearm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={isLoading || !searchTerm}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                        {isLoading ? (loadingStep || "Analyzing...") : "Analyze Jury Instruction"}
                    </Button>
                </CardContent>
            </form>
        </Card>

        {(isLoading || error || disambiguationOptions.length > 0 || analysisResult) && (
            <div className="mt-6">
                {isLoading && (
                    <div className="text-center py-16">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <h3 className="mt-4 text-lg font-medium">Analyzing...</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{loadingStep}</p>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive" className="my-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Analysis Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {disambiguationOptions.length > 0 && !isLoading && (
                    <Card className="animate-fade-in-up">
                        <CardHeader>
                            <CardTitle>Clarification Needed</CardTitle>
                            <CardDescription>Your search matched multiple results. Please select the most relevant option.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           {disambiguationOptions.map(option => (
                               <Button key={option.instructionID} variant="outline" className="w-full justify-start" onClick={() => analyzeAndDisplayInstruction({ instructionId: option.instructionID })}>
                                   {option.instructionTitle}
                               </Button>
                           ))}
                        </CardContent>
                    </Card>
                )}

                {analysisResult && !isLoading && (
                    <Card className="animate-fade-in-up">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                <div>
                                    <CardTitle>Analysis for: {analysisResult.instructionTitle}</CardTitle>
                                    <CardDescription>Florida Standard Jury Instruction {analysisResult.instructionNumber}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <InstructionDetailView detail={analysisResult} />
                        </CardContent>
                    </Card>
                )}
            </div>
        )}
    </div>
  );
});
