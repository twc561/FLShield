
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { OrdinanceDetail, OrdinancePlaceholder } from "@/data";
import {
  Search,
  Loader2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { analyzeOrdinance } from "@/ai/flows/analyze-ordinance";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const OrdinanceDetailView = React.memo(function OrdinanceDetailView({
  detail,
}: {
  detail: OrdinanceDetail;
}) {
  if (detail.ordinanceNumber === "Not Found" || !detail.ordinanceNumber) {
    return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Ordinance Not Found</AlertTitle>
            <AlertDescription>
            The AI could not locate a specific ordinance for your query. Please check your spelling or try a more specific ordinance number or keyword.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground/90">Summary</h4>
      <p className="text-sm text-muted-foreground">{detail.summary}</p>

      <h4 className="font-semibold text-foreground/90">
        Officer Enforcement Notes
      </h4>
      <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
        {detail.enforcementNotes}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-foreground/90 mb-1">Penalty</h4>
          <Badge variant="secondary">{detail.penalty}</Badge>
        </div>
        {detail.relatedStateStatute && detail.relatedStateStatute !== "N/A" && (
          <div>
            <h4 className="font-semibold text-foreground/90 mb-1">
              Related State Statute
            </h4>
            <Badge variant="outline">{detail.relatedStateStatute}</Badge>
          </div>
        )}
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="full-text">
          <AccordionTrigger>View Full Ordinance Text</AccordionTrigger>
          <AccordionContent className="whitespace-pre-wrap text-xs font-mono bg-muted/50 p-3 rounded-md">
            {detail.fullOrdinanceText}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

export const LocalOrdinancesClient = React.memo(function LocalOrdinancesClient({
  initialIndex,
  initialDetails,
}: {
  initialIndex: OrdinancePlaceholder[];
  initialDetails: Record<string, OrdinanceDetail>;
}) {
  // State for on-demand AI search
  const [customJurisdiction, setCustomJurisdiction] = React.useState("");
  const [customQuery, setCustomQuery] = React.useState("");
  const [isCustomSearching, setIsCustomSearching] = React.useState(false);
  const [customSearchResult, setCustomSearchResult] = React.useState<OrdinanceDetail | null>(null);
  const [customSearchError, setCustomSearchError] = React.useState<string | null>(null);

  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customJurisdiction || !customQuery) {
        setCustomSearchError("Please enter both a jurisdiction and a query (ordinance # or keyword).");
        return;
    }
    setIsCustomSearching(true);
    setCustomSearchResult(null);
    setCustomSearchError(null);
    try {
      const result = await analyzeOrdinance({
        jurisdiction: customJurisdiction,
        query: customQuery,
      });
      setCustomSearchResult(result);
    } catch (err) {
      console.error("AI ordinance search failed:", err);
      setCustomSearchError("The AI model failed to retrieve this ordinance. Please check the jurisdiction spelling or try again later.");
    } finally {
      setIsCustomSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> AI Ordinance Analyst</CardTitle>
          <CardDescription>Look up any ordinance from any city or county in Florida by number or keyword.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCustomSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                placeholder="Jurisdiction (e.g., St. Lucie County)" 
                value={customJurisdiction}
                onChange={(e) => setCustomJurisdiction(e.target.value)}
              />
              <Input 
                placeholder="Ordinance # or keyword (e.g., 'loud music')" 
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isCustomSearching || !customJurisdiction || !customQuery}>
              {isCustomSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {isCustomSearching ? 'Analyzing...' : 'Analyze Ordinance'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isCustomSearching && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground my-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>AI is analyzing ordinance... This may take a moment.</span>
        </div>
      )}

      {customSearchError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Analysis Error</AlertTitle>
          <AlertDescription>{customSearchError}</AlertDescription>
        </Alert>
      )}

      {customSearchResult && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>{customSearchResult.ordinanceTitle || "Analysis Result"}</CardTitle>
            <CardDescription>{customSearchResult.ordinanceNumber} ({customSearchResult.jurisdiction})</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdinanceDetailView detail={customSearchResult} />
          </CardContent>
        </Card>
      )}
    </div>
  );
});
