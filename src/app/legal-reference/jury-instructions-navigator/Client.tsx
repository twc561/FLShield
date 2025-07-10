
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
import type { InstructionDetail } from "@/data/legal-reference/standard-jury-instructions"
import { analyzeInstruction } from "@/ai/flows/analyze-jury-instruction"
import { identifyCrimeStatute } from "@/ai/flows/identify-crime-statute"
import { instructionMap } from "@/data/legal-reference/instruction-map"
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
  const [searchResult, setSearchResult] = React.useState<InstructionDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    let statuteNumber: string | null = null;
    let crimeName: string | null = null;

    try {
      // Step 1 (Local Lookup): Check common crimes map first for a reliable match.
      setLoadingStep("Checking common crimes list...");
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const commonCrimeMatch = commonCrimesMap.find(crime => crime.keywords.some(kw => lowerCaseSearchTerm.includes(kw)));

      if (commonCrimeMatch) {
        statuteNumber = commonCrimeMatch.statuteNumber;
        crimeName = commonCrimeMatch.crimeName;
      } else {
        // Step 2 (AI Fallback): If no common crime found, use AI to identify the statute.
        setLoadingStep("AI is identifying relevant statute...");
        const statuteResponse = await identifyCrimeStatute({ crimeDescription: searchTerm });
        statuteNumber = statuteResponse.statuteNumber;
        crimeName = statuteResponse.crimeName;
      }
      
      if (!statuteNumber || statuteNumber === "N/A") {
        throw new Error("AI could not identify a relevant statute for the query.");
      }
      
      // Step 3 (Map Lookup): Map the identified statute to a jury instruction ID.
      setLoadingStep("Mapping statute to jury instruction...");
      const mapping = instructionMap.find(m => m.statuteNumber === statuteNumber);
      
      if (!mapping) {
        throw new Error(`No standard jury instruction found for the identified statute: ${statuteNumber} (${crimeName}).`);
      }
      const instructionID = mapping.instructionID;

      // Step 4 (AI Analysis): Analyze the verified instruction.
      setLoadingStep("AI is analyzing instruction details...");
      const analysisResult = await analyzeInstruction({ instructionId: instructionID });
      setSearchResult(analysisResult);

    } catch (e: any) {
        console.error(e);
        setError(e.message || "An unknown error occurred. Please try again.");
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
                        {isLoading ? "Analyzing..." : "Analyze Jury Instruction"}
                    </Button>
                </CardContent>
            </form>
        </Card>

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

        {searchResult && (
            <Card className="animate-fade-in-up">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <div>
                            <CardTitle>Analysis for: {searchResult.instructionTitle}</CardTitle>
                            <CardDescription>Florida Standard Jury Instruction {searchResult.instructionNumber}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <InstructionDetailView detail={searchResult} />
                </CardContent>
            </Card>
        )}
    </div>
  );
});
