
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
  CheckCircle,
  Clock,
  Scale,
  BookOpen,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { analyzeOrdinance } from "@/ai/flows/analyze-ordinance";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

// Enhanced OrdinanceDetail type for the new features
interface EnhancedOrdinanceDetail extends OrdinanceDetail {
  searchConfidence?: number;
  alternativeOrdinances?: string[];
  lastUpdated?: string;
}

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return "text-green-600";
  if (confidence >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getConfidenceBadge = (confidence: number) => {
  if (confidence >= 90) return { variant: "default" as const, text: "High Confidence" };
  if (confidence >= 70) return { variant: "secondary" as const, text: "Medium Confidence" };
  return { variant: "destructive" as const, text: "Low Confidence" };
};

const OrdinanceDetailView = React.memo(function OrdinanceDetailView({
  detail,
}: {
  detail: EnhancedOrdinanceDetail;
}) {
  if (detail.ordinanceNumber === "Not Found" || !detail.ordinanceNumber) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Ordinance Not Found</AlertTitle>
        <AlertDescription>
          The enhanced AI search could not locate a specific ordinance for your query. 
          Please verify the jurisdiction spelling, check the ordinance number format, or try different keywords.
        </AlertDescription>
      </Alert>
    );
  }

  if (detail.ordinanceNumber === "Analysis Error") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Analysis Service Error</AlertTitle>
        <AlertDescription>
          {detail.summary}
        </AlertDescription>
      </Alert>
    );
  }

  const confidence = detail.searchConfidence || 0;
  const confidenceBadge = getConfidenceBadge(confidence);

  return (
    <div className="space-y-6">
      {/* Confidence and Metadata */}
      {confidence > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Search Confidence</p>
              <Progress value={confidence} className="w-32 mt-1" />
            </div>
          </div>
          <Badge variant={confidenceBadge.variant}>{confidenceBadge.text}</Badge>
        </div>
      )}

      {/* Summary */}
      <div>
        <h4 className="font-semibold text-foreground/90 flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4" />
          Summary
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{detail.summary}</p>
      </div>

      {/* Officer Enforcement Notes */}
      <div>
        <h4 className="font-semibold text-foreground/90 flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4" />
          Officer Enforcement Notes
        </h4>
        <div className="text-sm text-muted-foreground p-4 bg-blue-50 dark:bg-blue-950/20 rounded-md border-l-4 border-blue-500">
          {detail.enforcementNotes}
        </div>
      </div>

      {/* Penalty and Related Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-foreground/90 mb-2">Penalty</h4>
          <Badge variant="secondary" className="text-sm px-3 py-1">{detail.penalty}</Badge>
        </div>
        {detail.relatedStateStatute && detail.relatedStateStatute !== "N/A" && (
          <div>
            <h4 className="font-semibold text-foreground/90 mb-2">Related State Statute</h4>
            <Badge variant="outline" className="text-sm px-3 py-1">{detail.relatedStateStatute}</Badge>
          </div>
        )}
      </div>

      {/* Alternative Ordinances */}
      {detail.alternativeOrdinances && detail.alternativeOrdinances.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground/90 mb-2">Related Ordinances</h4>
          <div className="flex flex-wrap gap-2">
            {detail.alternativeOrdinances.map((alt, index) => (
              <Badge key={index} variant="outline" className="text-xs">{alt}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      {detail.lastUpdated && detail.lastUpdated !== "Error - Unable to determine" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last Updated: {detail.lastUpdated}</span>
        </div>
      )}

      {/* Full Text Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="full-text">
          <AccordionTrigger className="text-left">
            <span className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              View Complete Ordinance Text
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="whitespace-pre-wrap text-xs font-mono bg-muted/50 p-4 rounded-md border max-h-96 overflow-y-auto">
              {detail.fullOrdinanceText}
            </div>
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
  // Enhanced state for AI search
  const [customJurisdiction, setCustomJurisdiction] = React.useState("");
  const [customQuery, setCustomQuery] = React.useState("");
  const [isCustomSearching, setIsCustomSearching] = React.useState(false);
  const [customSearchResult, setCustomSearchResult] = React.useState<EnhancedOrdinanceDetail | null>(null);
  const [customSearchError, setCustomSearchError] = React.useState<string | null>(null);
  const [searchHistory, setSearchHistory] = React.useState<Array<{jurisdiction: string, query: string}>>([]);

  // Pre-loaded data state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeAccordionItem, setActiveAccordionItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, OrdinanceDetail>>(initialDetails);

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
    if (!customJurisdiction.trim() || !customQuery.trim()) {
      setCustomSearchError("Please enter both a jurisdiction and a query (ordinance number or keyword).");
      return;
    }

    setIsCustomSearching(true);
    setCustomSearchResult(null);
    setCustomSearchError(null);

    try {
      console.log('Starting enhanced AI ordinance analysis...', { 
        jurisdiction: customJurisdiction.trim(), 
        query: customQuery.trim() 
      });
      
      const result = await analyzeOrdinance({
        jurisdiction: customJurisdiction.trim(),
        query: customQuery.trim(),
      });
      
      console.log('Enhanced AI ordinance analysis result:', result);
      setCustomSearchResult(result as EnhancedOrdinanceDetail);

      // Add to search history
      setSearchHistory(prev => [
        { jurisdiction: customJurisdiction.trim(), query: customQuery.trim() },
        ...prev.slice(0, 4) // Keep last 5 searches
      ]);

      if (result.ordinanceNumber === "Not Found") {
        setCustomSearchError("No specific ordinance found. Try alternative keywords or verify the jurisdiction name.");
      }
    } catch (err) {
      console.error("Enhanced AI ordinance search failed:", err);
      setCustomSearchError(`Analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCustomSearching(false);
    }
  };

  const handleQuickSearch = (jurisdiction: string, query: string) => {
    setCustomJurisdiction(jurisdiction);
    setCustomQuery(query);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Enhanced AI Search Card */}
      <Card className="animate-fade-in-up border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" /> 
            Enhanced AI Ordinance Analyst
          </CardTitle>
          <CardDescription>
            Comprehensive ordinance search powered by advanced AI. Searches official municipal codes, 
            county ordinances, and legal databases across Florida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleCustomSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Jurisdiction</label>
                <Input 
                  placeholder="e.g., City of Miami, Orange County, Town of Davie" 
                  value={customJurisdiction}
                  onChange={(e) => setCustomJurisdiction(e.target.value)}
                  disabled={isCustomSearching}
                  className="transition-all focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Search Query</label>
                <Input 
                  placeholder="e.g., 'Sec. 21-28', 'noise ordinance', 'open container'" 
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  disabled={isCustomSearching}
                  className="transition-all focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isCustomSearching || !customJurisdiction.trim() || !customQuery.trim()} 
              className="w-full sm:w-auto transition-all hover:scale-105"
            >
              {isCustomSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Ordinance
                </>
              )}
            </Button>
          </form>

          {/* Quick Search History */}
          {searchHistory.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Recent Searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSearch(search.jurisdiction, search.query)}
                    className="text-xs"
                  >
                    {search.jurisdiction} - {search.query}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {isCustomSearching && (
        <Card className="animate-pulse">
          <CardContent className="flex items-center justify-center space-x-2 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-medium">AI Analyzing Ordinance...</p>
              <p className="text-sm text-muted-foreground">Searching official databases and legal sources</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {customSearchError && (
        <Alert variant="destructive" className="animate-fade-in-up">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Search Error</AlertTitle>
          <AlertDescription>{customSearchError}</AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      {customSearchResult && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {customSearchResult.ordinanceTitle || "Analysis Result"}
            </CardTitle>
            <CardDescription>
              {customSearchResult.ordinanceNumber} ({customSearchResult.jurisdiction})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrdinanceDetailView detail={customSearchResult} />
          </CardContent>
        </Card>
      )}

      <hr className="border-muted" />

      {/* Quick Reference Section */}
      <div className="space-y-4">
        <CardHeader className="px-1">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Common Ordinance Quick Reference
          </CardTitle>
          <CardDescription>
            Pre-loaded frequently referenced ordinances for immediate access.
          </CardDescription>
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

        <Accordion type="single" collapsible className="w-full space-y-2" value={activeAccordionItem} onValueChange={setActiveAccordionItem}>
          {filteredIndex.map(item => (
            <AccordionItem value={item.ordinanceNumber} key={item.ordinanceNumber} className="border rounded-md bg-card hover:bg-accent/50 transition-colors">
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
                  {cachedDetails[item.ordinanceNumber] ? (
                    <OrdinanceDetailView detail={cachedDetails[item.ordinanceNumber]} />
                  ) : (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {filteredIndex.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No matching ordinances found</p>
          </div>
        )}
      </div>
    </div>
  );
});
