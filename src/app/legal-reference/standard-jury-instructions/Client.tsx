
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { InstructionPlaceholder, InstructionDetail } from "@/data/legal-reference/standard-jury-instructions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Loader2, Sparkles, Gavel, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeInstruction } from "@/ai/flows/analyze-jury-instruction"
import { Badge } from "@/components/ui/badge"

const DetailView = React.memo(({ detail }: { detail: InstructionDetail }) => (
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
));

export const StandardJuryInstructionsClient = React.memo(function StandardJuryInstructionsClient({
  initialPlaceholders,
}: {
  initialPlaceholders: InstructionPlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, InstructionDetail>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

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

  const groupedPlaceholders = React.useMemo(() => {
    return initialPlaceholders.reduce((acc, placeholder) => {
      if (!acc[placeholder.category]) {
        acc[placeholder.category] = [];
      }
      acc[placeholder.category].push(placeholder);
      return acc;
    }, {} as Record<string, InstructionPlaceholder[]>);
  }, [initialPlaceholders]);
  
  const categoryOrder = ["Crimes Against Persons", "Property Crimes", "Drug Offenses", "Anticipatory Crimes", "Defenses"];

  return (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <div className="space-y-6">
        {categoryOrder.map(category => (
          <div key={category}>
            <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
            <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
              {groupedPlaceholders[category]?.map(placeholder => {
                const Icon = (LucideIcons as any)[placeholder.icon] || Gavel;
                return (
                    <AccordionItem value={placeholder.id} key={placeholder.id} className="border rounded-md bg-card">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-4 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-base text-card-foreground">{placeholder.instructionTitle}</p>
                            <p className="text-xs text-muted-foreground">Instruction {placeholder.instructionNumber}</p>
                        </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4">
                        {loadingId === placeholder.id && (
                            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <Sparkles className="h-5 w-5 text-accent" />
                            <span>AI is analyzing instruction...</span>
                            </div>
                        )}
                        {error[placeholder.id] && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error[placeholder.id]}</AlertDescription>
                            </Alert>
                        )}
                        {cachedDetails[placeholder.id] && (
                            <DetailView detail={cachedDetails[placeholder.id]} />
                        )}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});
