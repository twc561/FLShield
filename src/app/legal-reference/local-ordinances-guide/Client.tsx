"use client";

import * as React from "react";
import * as LucideIcons from "lucide-react";
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
  Building,
} from "lucide-react";
import { analyzeOrdinance } from "@/ai/flows/analyze-ordinance";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

  // State for pre-loaded data
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeAccordionItem, setActiveAccordionItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, OrdinanceDetail>>(initialDetails);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const lowercasedFilter = searchTerm.toLowerCase();

  const filteredIndex = React.useMemo(() => {
    if (!lowercasedFilter) return initialIndex;
    return initialIndex.filter(
      (item) =>
        item.ordinanceTitle.toLowerCase().includes(lowercasedFilter) ||
        item.ordinanceNumber.toLowerCase().includes(lowercasedFilter) ||
        item.jurisdiction.toLowerCase().includes(lowercasedFilter)
    );
  }, [lowercasedFilter, initialIndex]);

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
      console.log('Starting AI ordinance analysis...', { jurisdiction: customJurisdiction, query: customQuery });
      const result = await analyzeOrdinance({
        jurisdiction: customJurisdiction.trim(),
        query: customQuery.trim(),
      });
      console.log('AI ordinance analysis result:', result);
      setCustomSearchResult(result);

      if (result.ordinanceNumber === "Not Found") {
        setCustomSearchError("No specific ordinance found for your query. Please try a different search term or check the jurisdiction spelling.");
      }
    } catch (err) {
      console.error("AI ordinance search failed:", err);
      setCustomSearchError(`The AI analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again or contact support if the issue persists.`);
    } finally {
      setIsCustomSearching(false);
    }
  };

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveAccordionItem(value);
    // Data for pre-loaded ordinances is already in the `cachedDetails` state
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
                placeholder="Jurisdiction (e.g., City of Miami, Orange County)" 
                value={customJurisdiction}
                onChange={(e) => setCustomJurisdiction(e.target.value)}
                disabled={isCustomSearching}
              />
              <Input 
                placeholder="Ordinance # or keyword (e.g., 'Sec. 21-28', 'noise')" 
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                disabled={isCustomSearching}
              />
            </div>
            <Button type="submit" disabled={isCustomSearching || !customJurisdiction.trim() || !customQuery.trim()} className="w-full sm:w-auto">
              {isCustomSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {isCustomSearching ? 'AI Analyzing Ordinance...' : 'Analyze Ordinance'}
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

      <hr />

      <div className="space-y-4">
          <CardHeader className="px-1">
              <CardTitle>Common Ordinance Quick Reference</CardTitle>
              <CardDescription>A pre-loaded list of common ordinances for major jurisdictions.</CardDescription>
          </CardHeader>
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search common ordinances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Accordion type="single" collapsible className="w-full space-y-2" value={activeAccordionItem} onValueChange={handleAccordionChange}>
            {filteredIndex.map(item => {
                const Icon = (LucideIcons as any)[item.icon as keyof typeof LucideIcons] || Building;
                return (
                    <AccordionItem value={item.ordinanceNumber} key={item.ordinanceNumber} className="border rounded-md bg-card">
                        <AccordionTrigger className="p-4 hover:no-underline text-left">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Building className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold text-base text-card-foreground">{item.ordinanceTitle}</p>
                                    <p className="text-xs text-muted-foreground">{item.ordinanceNumber} ({item.jurisdiction})</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                            <div className="border-t pt-4">
                                {loadingId === item.ordinanceNumber ? (
                                    <Skeleton className="h-24 w-full" />
                                ) : cachedDetails[item.ordinanceNumber] ? (
                                    <OrdinanceDetailView detail={cachedDetails[item.ordinanceNumber]} />
                                ) : (
                                    <p>Loading...</p> 
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
          </Accordion>
          {filteredIndex.length === 0 && <p className="text-center text-muted-foreground py-4">No matching common ordinances found.</p>}
      </div>
    </div>
  );
});