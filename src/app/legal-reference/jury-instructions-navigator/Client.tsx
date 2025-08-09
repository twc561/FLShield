
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, Gavel, FileText, AlertTriangle, Search as SearchIcon } from "lucide-react"
import type { AnalyzeInstructionOutput as InstructionDetail } from "@/ai/flows/analyze-jury-instruction"
import { analyzeInstruction } from "@/ai/flows/analyze-jury-instruction"
import { findJuryInstruction, FindJuryInstructionOutput } from "@/ai/flows/find-jury-instruction";
import { JuryInstructionIndexItem } from "@/data/legal-reference/jury-instructions-index"

import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const InstructionDetailView = React.memo(({ detail }: { detail: InstructionDetail }) => {
    if (!detail.id) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Instruction Not Found</AlertTitle>
                <AlertDescription>
                    The AI could not locate a specific jury instruction. This may be because it's a non-criminal statute or a complex crime without a standard instruction.
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
InstructionDetailView.displayName = 'InstructionDetailView';


export const JuryInstructionsClient = React.memo(function JuryInstructionsClient({
  initialInstructions,
}: {
  initialInstructions: JuryInstructionIndexItem[];
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, InstructionDetail>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const [isAiSearching, setIsAiSearching] = React.useState(false);
  const [aiSearchResult, setAiSearchResult] = React.useState<FindJuryInstructionOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsAiSearching(true);
    setAiSearchResult(null);
    setActiveItem(undefined);

    try {
        const result = await findJuryInstruction({ query: searchTerm });
        setAiSearchResult(result);
        // If a single definitive ID is returned, automatically open it.
        if (result.instructionID) {
            handleAccordionChange(result.instructionID);
        }
    } catch (err) {
        setError(prev => ({...prev, 'ai-search': err instanceof Error ? err.message : 'An unknown error occurred.' }));
    } finally {
        setIsAiSearching(false);
    }
  }

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeInstruction({ instructionId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load instruction analysis. Please try again." }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
       <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for a crime (e.g., 'Burglary', 'ROWV')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </form>
      
      <ScrollArea className="flex-1 -mr-4 pr-4">
        {isAiSearching && (
            <div className="flex items-center justify-center space-x-2 text-muted-foreground py-8">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>AI is searching for the best match...</span>
            </div>
        )}

        {aiSearchResult && (
            <div>
                <h2 className="text-lg font-bold tracking-tight my-4 px-1">AI Search Results for "{searchTerm}"</h2>
                {aiSearchResult.disambiguationOptions && aiSearchResult.disambiguationOptions.length > 0 && (
                     <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
                        {aiSearchResult.disambiguationOptions.map(item => (
                             <AccordionItem value={item.instructionID} key={item.instructionID} className="border rounded-md bg-card">
                                <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                                    {item.instructionTitle}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 pt-0">
                                    <div className="border-t pt-4">
                                        {loadingId === item.instructionID && <div className="flex items-center justify-center space-x-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /><Sparkles className="h-5 w-5 text-accent" /><span>AI is analyzing instruction...</span></div>}
                                        {error[item.instructionID] && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error[item.instructionID]}</AlertDescription></Alert>}
                                        {cachedDetails[item.instructionID] && <InstructionDetailView detail={cachedDetails[item.instructionID]} />}
                                    </div>
                                </AccordionContent>
                             </AccordionItem>
                        ))}
                     </Accordion>
                )}
                 {aiSearchResult.instructionID && (
                      <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
                          <AccordionItem value={aiSearchResult.instructionID} className="border rounded-md bg-card">
                            <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                                Definitive Match Found
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="border-t pt-4">
                                    {loadingId === aiSearchResult.instructionID && <div className="flex items-center justify-center space-x-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /><Sparkles className="h-5 w-5 text-accent" /><span>AI is analyzing instruction...</span></div>}
                                    {error[aiSearchResult.instructionID] && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error[aiSearchResult.instructionID]}</AlertDescription></Alert>}
                                    {cachedDetails[aiSearchResult.instructionID] && <InstructionDetailView detail={cachedDetails[aiSearchResult.instructionID]} />}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                 )}
            </div>
        )}

      </ScrollArea>
    </div>
  );
});
InstructionDetailView.displayName = 'InstructionDetailView';
JuryInstructionsClient.displayName = 'JuryInstructionsClient';

