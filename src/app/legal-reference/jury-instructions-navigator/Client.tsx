
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
import { Loader2, Sparkles, Gavel, FileText, AlertTriangle } from "lucide-react"
import type { AnalyzeInstructionOutput as InstructionDetail } from "@/ai/flows/analyze-jury-instruction"
import { analyzeInstruction } from "@/ai/flows/analyze-jury-instruction"
import type { JuryInstructionIndexItem } from "@/data/legal-reference/jury-instructions-index"

import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

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

  const filteredInstructions = React.useMemo(() => {
    if (!searchTerm) {
      return initialInstructions;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialInstructions.filter(
      (item) =>
        item.instructionTitle.toLowerCase().includes(lowercasedTerm) ||
        item.instructionNumber.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, initialInstructions]);

  const groupedInstructions = React.useMemo(() => {
    const categoryOrder = ["Crimes Against Persons", "Property Crimes", "Drug Offenses", "Inchoate Crimes", "Public Order & Obstruction", "Defenses"];
    const grouped = filteredInstructions.reduce((acc, item) => {
      const { category } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, JuryInstructionIndexItem[]>);

    return categoryOrder
      .map(category => ({ category, items: grouped[category] || [] }))
      .filter(g => g.items.length > 0);

  }, [filteredInstructions]);

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
       <div className="relative">
        <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search instructions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <ScrollArea className="flex-1 -mr-4 pr-4">
        <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
          {groupedInstructions.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
              {items.map(item => {
                const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Gavel;
                return (
                    <AccordionItem value={item.id} key={item.id} className="border rounded-md bg-card">
                      <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-base text-card-foreground">{item.instructionTitle}</p>
                            <p className="text-xs text-muted-foreground">Instruction {item.instructionNumber}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4">
                          {loadingId === item.id && (
                            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <Sparkles className="h-5 w-5 text-accent" />
                              <span>AI is analyzing instruction...</span>
                            </div>
                          )}
                          {error[item.id] && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error[item.id]}</AlertDescription>
                            </Alert>
                          )}
                          {cachedDetails[item.id] && (
                            <InstructionDetailView detail={cachedDetails[item.id]} />
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                )
              })}
            </div>
          ))}
        </Accordion>
        {filteredInstructions.length === 0 && <p className="text-center text-muted-foreground py-8">No instructions found.</p>}
      </ScrollArea>
    </div>
  );
});
