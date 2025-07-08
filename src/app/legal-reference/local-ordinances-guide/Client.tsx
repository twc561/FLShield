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
} from "lucide-react";
import { analyzeOrdinance } from "@/ai/flows/analyze-ordinance";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const categoryIcons: { [key: string]: React.ElementType } = {
  "Alcohol & Public Behavior": Beer,
  "Property & Code Enforcement": Home,
  "Animal Ordinances": Dog,
  "Traffic & Parking": Car,
  "Business & Licensing": Building,
};

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
        {detail.relatedStateStatute && (
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
  const [activeOrdinance, setActiveOrdinance] = React.useState<
    string | undefined
  >();
  const [cachedDetails, setCachedDetails] =
    React.useState<Record<string, OrdinanceDetail>>(initialDetails);
  const [loadingOrdinance, setLoadingOrdinance] = React.useState<
    string | null
  >(null);
  const [error, setError] = React.useState<string | null>(null);

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

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveOrdinance(value);
    setError(null);

    if (!value || cachedDetails[value] || loadingOrdinance === value) {
      return;
    }

    const placeholder = initialIndex.find((p) => p.ordinanceNumber === value);
    if (!placeholder) return;

    setLoadingOrdinance(value);
    try {
      const result = await analyzeOrdinance({
        jurisdiction: placeholder.jurisdiction,
        ordinance_number: placeholder.ordinanceNumber,
      });

      // Add the new result to the cache
      setCachedDetails((prev) => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error("AI backfall failed:", e);
      setError(
        "The AI model failed to retrieve this ordinance. Please try again later."
      );
    } finally {
      setLoadingOrdinance(null);
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
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by ordinance # or keyword (e.g., noise, parking)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
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
                  value={activeOrdinance}
                  onValueChange={handleAccordionChange}
                >
                  {ordinancesInCategory.map((ord) => (
                    <AccordionItem
                      value={ord.ordinanceNumber}
                      key={ord.ordinanceNumber}
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
                          {loadingOrdinance === ord.ordinanceNumber && (
                            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <Sparkles className="h-5 w-5 text-accent" />
                              <span>
                                AI is analyzing ordinance...
                              </span>
                            </div>
                          )}
                          {error && activeOrdinance === ord.ordinanceNumber && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}
                          {cachedDetails[ord.ordinanceNumber] && (
                            <OrdinanceDetailView
                              detail={cachedDetails[ord.ordinanceNumber]}
                            />
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
           {filteredIndex.length === 0 && (
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
