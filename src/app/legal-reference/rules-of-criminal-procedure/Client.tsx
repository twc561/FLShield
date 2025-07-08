
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { RulePlaceholder, RuleDetail } from "@/data/legal-reference/rules-of-criminal-procedure"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Loader2, Sparkles, Gavel } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeCriminalProcedureRule } from "@/ai/flows/analyze-criminal-procedure-rule"

const DetailView = React.memo(({ detail }: { detail: RuleDetail }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Plain Language Summary</h3>
    <p className="text-muted-foreground">{detail.plainLanguageSummary}</p>
    
    <Alert className="bg-accent/20 border-accent/50">
      <ShieldCheck className="h-4 w-4 text-accent" />
      <AlertTitle>{detail.fieldApplicationForOfficers.title}</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 space-y-1">
          {detail.fieldApplicationForOfficers.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </AlertDescription>
    </Alert>

    <h3 className="font-semibold text-lg">Key Case Example</h3>
    <div className="p-3 bg-muted/50 rounded-md">
      <p className="font-semibold">{detail.keyCaseExample.caseName} <span className="text-muted-foreground font-normal">({detail.keyCaseExample.citation})</span></p>
      <p className="text-sm text-muted-foreground mt-1">{detail.keyCaseExample.holding}</p>
    </div>

    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="full-text">
        <AccordionTrigger>View Full Text of Rule</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap text-xs font-mono bg-muted/50 p-3 rounded-md">
          {detail.fullText}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
));

export const RulesOfCriminalProcedureClient = React.memo(function RulesOfCriminalProcedureClient({
  initialPlaceholders,
}: {
  initialPlaceholders: RulePlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, RuleDetail>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeCriminalProcedureRule({ ruleId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load rule analysis. Please try again." }));
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
    }, {} as Record<string, RulePlaceholder[]>);
  }, [initialPlaceholders]);
  
  const categoryOrder = ["Pre-Trial Procedures & Arrest", "First Appearance & Pre-Trial Release", "Search and Seizure", "Discovery & Evidence"];

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
                            <p className="font-semibold text-base text-card-foreground">{placeholder.ruleTitle}</p>
                            <p className="text-xs text-muted-foreground">{placeholder.ruleNumber}</p>
                        </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4">
                        {loadingId === placeholder.id && (
                            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <Sparkles className="h-5 w-5 text-accent" />
                            <span>AI is analyzing rule...</span>
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
