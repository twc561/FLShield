
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
import type { ConstitutionalPlaceholder, ConstitutionalDetail } from "@/data/legal-reference/constitutional-law"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Loader2, Sparkles, Landmark } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeConstitution } from "@/ai/flows/analyze-constitution"
import { Skeleton } from "@/components/ui/skeleton"

const DetailView = React.memo(({ detail }: { detail: ConstitutionalDetail }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Plain Language Summary</h3>
    <p className="text-muted-foreground">{detail.plainLanguageSummary}</p>
    
    <Alert className="bg-accent/20 border-accent/50">
      <ShieldCheck className="h-4 w-4 text-accent" />
      <AlertTitle>{detail.testForOfficers.title}</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 space-y-1">
          {detail.testForOfficers.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </AlertDescription>
    </Alert>

    <h3 className="font-semibold text-lg">Landmark Cases</h3>
    <div className="space-y-3">
      {detail.landmarkCases.map(c => (
        <div key={c.caseName} className="p-3 bg-muted/50 rounded-md">
          <p className="font-semibold">{c.caseName} <span className="text-muted-foreground font-normal">({c.citation})</span></p>
          <p className="text-sm text-muted-foreground mt-1">{c.holding}</p>
        </div>
      ))}
    </div>

    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="full-text">
        <AccordionTrigger>View Full Text</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap text-xs font-mono bg-muted/50 p-3 rounded-md">
          {detail.fullText}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
));

export const ConstitutionalLawClient = React.memo(function ConstitutionalLawClient({
  initialPlaceholders,
}: {
  initialPlaceholders: ConstitutionalPlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, ConstitutionalDetail>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeConstitution({ provisionId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load constitutional analysis. Please try again." }));
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
    }, {} as Record<string, ConstitutionalPlaceholder[]>);
  }, [initialPlaceholders]);
  
  const categoryOrder = ["U.S. Constitution", "Florida Constitution"];

  return (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <div className="space-y-6">
        {categoryOrder.map(category => (
          <div key={category}>
            <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
            <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
              {groupedPlaceholders[category].map(placeholder => (
                <AccordionItem value={placeholder.id} key={placeholder.id} className="border rounded-md bg-card">
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Landmark className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-base text-card-foreground">{placeholder.title}</p>
                        <p className="text-xs text-muted-foreground">{placeholder.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <div className="border-t pt-4">
                      {loadingId === placeholder.id && (
                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <Sparkles className="h-5 w-5 text-accent" />
                          <span>AI is analyzing provision...</span>
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
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});
