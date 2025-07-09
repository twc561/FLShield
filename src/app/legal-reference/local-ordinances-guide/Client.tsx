
"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Building,
  Home,
  Dog,
  Car,
  Beer,
  Search,
  Loader2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { analyzeOrdinance } from "@/ai/flows/analyze-ordinance";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const categoryIcons: { [key: string]: React.ElementType } = {
  "Alcohol & Public Behavior": Beer,
  "Property & Code Enforcement": Home,
  "Animal Ordinances": Dog,
  "Traffic & Parking": Car,
  "Business & Licensing": Building,
};

const createUniqueId = (jurisdiction: string, ordinanceNumber: string) => `${jurisdiction}__${ordinanceNumber}`;

const OrdinanceDetailView = React.memo(function OrdinanceDetailView({
  detail,
}: {
  detail: OrdinanceDetail;
}) {
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
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const uniqueInitialDetails = React.useMemo(() => {
    const newCache: Record<string, OrdinanceDetail> = {};
    for (const ordNum in initialDetails) {
        const detail = initialDetails[ordNum];
        newCache[createUniqueId(detail.jurisdiction, detail.ordinanceNumber)] = detail;
    }
    return newCache;
  }, [initialDetails]);
  
  const [activeOrdinanceId, setActiveOrdinanceId] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, OrdinanceDetail>>(uniqueInitialDetails);
  const [loadingOrdinanceId, setLoadingOrdinanceId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  // State for on-demand AI search
  const [customJurisdiction, setCustomJurisdiction] = React.useState("");
  const [customQuery, setCustomQuery] = React.useState("");
  const [isCustomSearching, setIsCustomSearching] = React.useState(false);
  const [customSearchResult, setCustomSearchResult] = React.useState<OrdinanceDetail | null>(null);
  const [customSearchError, setCustomSearchError] = React.useState<string | null>(null);


  const filteredIndex = React.useMemo(() => {
    if (!searchTerm) {
      return initialIndex;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialIndex.filter(
      (ord) =>
        ord.ordinanceNumber.toLowerCase().includes(lowercasedTerm) ||
        ord.ordinanceTitle.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, initialIndex]);

  const groupedOrdinances = React.useMemo(() => {
    return filteredIndex.reduce((acc, ordinance) => {
      const { category } = ordinance;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(ordinance);
      return acc;
    }, {} as Record<string, OrdinancePlaceholder[]>);
  }, [filteredIndex]);

  const handleAccordionChange = async (uniqueId: string | undefined) => {
    setActiveOrdinanceId(uniqueId);
    
    if (!uniqueId) return;
    
    setError(prev => ({ ...prev, [uniqueId]: null }));

    if (cachedDetails[uniqueId] || loadingOrdinanceId === uniqueId) {
      return;
    }

    const [jurisdiction, ordinanceNumber] = uniqueId.split('__');
    if (!jurisdiction || !ordinanceNumber) return;

    setLoadingOrdinanceId(uniqueId);
    try {
      const result = await analyzeOrdinance({
        jurisdiction: jurisdiction,
        query: ordinanceNumber,
      });

      // Add the new result to the cache
      setCachedDetails((prev) => ({ ...prev, [uniqueId]: result }));
    } catch (e) {
      console.error("AI backfall failed:", e);
      setError(prev => ({ ...prev, [uniqueId]: "The AI model failed to retrieve this ordinance. Please try again later." }));
    } finally {
      setLoadingOrdinanceId(null);
    }
  };

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

  const categoryOrder = [
    "Alcohol & Public Behavior",
    "Traffic & Parking",
    "Property & Code Enforcement",
    "Animal Ordinances",
    "Business & Licensing",
  ];

  return (
    <div className="flex flex-col h-full">
      <Card className="mb-6 animate-fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> AI Ordinance Analyst</CardTitle>
          <CardDescription>Look up any ordinance from any city or county in Florida by number or keyword.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCustomSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                placeholder="Jurisdiction (e.g., City of Miami)" 
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
        <Card className="mb-6 animate-fade-in-up">
          <CardHeader>
            <CardTitle>{customSearchResult.ordinanceTitle}</CardTitle>
            <CardDescription>{customSearchResult.ordinanceNumber} ({customSearchResult.jurisdiction})</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdinanceDetailView detail={customSearchResult} />
          </CardContent>
        </Card>
      )}

      <Separator className="my-6" />
      
      <div className="space-y-2 mb-4">
          <h3 className="text-xl font-bold tracking-tight">Common St. Lucie County Area Ordinances</h3>
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search common ordinances by # or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
          </div>
      </div>

      <ScrollArea className="flex-1 -mr-4 pr-4">
        <div className="space-y-6">
          {categoryOrder.map((category) => {
            const ordinancesInCategory = groupedOrdinances[category];
            if (!ordinancesInCategory || ordinancesInCategory.length === 0) {
              return null;
            }
            const CategoryIcon = categoryIcons[category] || Building;

            return (
              <div key={category}>
                <h2 className="text-lg font-bold tracking-tight my-4 px-1 flex items-center gap-3">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                  {category}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                  value={activeOrdinanceId}
                  onValueChange={handleAccordionChange}
                >
                  {ordinancesInCategory.map((ord) => {
                    const uniqueId = createUniqueId(ord.jurisdiction, ord.ordinanceNumber);
                    return (
                        <AccordionItem
                            value={uniqueId}
                            key={uniqueId}
                            className="border rounded-md bg-card"
                        >
                        <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                            <div className="flex-1 text-left">
                            <p>{ord.ordinanceTitle}</p>
                            <p className="text-xs text-muted-foreground font-mono font-normal">
                                {ord.ordinanceNumber} ({ord.jurisdiction})
                            </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                            <div className="border-t pt-4">
                            {loadingOrdinanceId === uniqueId && (
                                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <Sparkles className="h-5 w-5 text-accent" />
                                <span>
                                    AI is analyzing ordinance...
                                </span>
                                </div>
                            )}
                            {error[uniqueId] && (
                                <Alert variant="destructive">
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error[uniqueId]}</AlertDescription>
                                </Alert>
                            )}
                            {cachedDetails[uniqueId] && (
                                <OrdinanceDetailView
                                detail={cachedDetails[uniqueId]}
                                />
                            )}
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    )
                })}
                </Accordion>
              </div>
            );
          })}
           {filteredIndex.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Ordinances Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your search did not match any local ordinances.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
});
