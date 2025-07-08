
"use client"

import { useState, useMemo, useEffect, memo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Summarizer } from "@/components/Summarizer"
import type { Statute } from "@/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ExternalLink, BookOpen, Loader2, Sparkles } from "lucide-react"
import { findStatute } from "@/ai/flows/find-statute"
import { generateElementsOfCrime } from "@/ai/flows/generate-elements-flow"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"


type StatuteIndexItem = Omit<Statute, 'description' | 'fullText' | 'practicalSummary' | 'example' | 'elementsOfTheCrime' | 'url'>;


export const StatuteClient = memo(function StatuteClient({
  initialStatuteIndex,
  statutesFullData,
}: {
  initialStatuteIndex: StatuteIndexItem[],
  statutesFullData: Record<string, Statute>,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAiSearching, setIsAiSearching] = useState(false)
  const [aiResult, setAiResult] = useState<Statute | null>(null)
  const [generatedElements, setGeneratedElements] = useState<Record<string, { content: string; isLoading: boolean }>>({})

  const [cachedData, setCachedData] = useState<Record<string, Statute>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>();

  const categories = useMemo(() => {
    const categoryOrder = [
      'Crimes Against Persons',
      'Property Crimes',
      'Drug Offenses',
      'Weapons Offenses',
      'Traffic Offenses',
      'Public Order & Obstruction',
    ];
    const uniqueCategories = [...new Set(initialStatuteIndex.map((s) => s.category))];
    return uniqueCategories.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [initialStatuteIndex]);

  const totalFilteredResults = useMemo(() => {
    if (!searchTerm) return initialStatuteIndex.length;
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialStatuteIndex.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm)
    ).length;
  }, [searchTerm, initialStatuteIndex]);

  useEffect(() => {
    if (searchTerm === "") {
      setAiResult(null);
      setIsAiSearching(false);
      return;
    }
    if (totalFilteredResults > 0) {
      setAiResult(null);
      return;
    }

    const handler = setTimeout(() => {
      const currentSearchTerm = searchTerm;
      setIsAiSearching(true);
      findStatute({ query: currentSearchTerm })
        .then((result) => {
          if (searchTerm === currentSearchTerm) {
            if (result && result.code) {
              const newStatute: Statute = {
                id: result.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
                code: result.code,
                title: result.title || "N/A",
                description:
                  result.description || "No description provided by AI.",
                fullText:
                  result.description ||
                  "No full text available for AI-generated result.",
                degreeOfCharge: result.degreeOfCharge || "N/A",
                practicalSummary:
                  result.description || "No summary provided by AI.",
                elementsOfTheCrime: result.elementsOfTheCrime || null,
                example: result.example || "No example provided by AI.",
                url: `https://www.flsenate.gov/Laws/Statutes/search?search=${encodeURIComponent(
                  result.title || result.code
                )}&context=statutes`,
                category: 'AI Result'
              };
              setAiResult(newStatute);
            } else {
              setAiResult(null);
            }
          }
        })
        .catch((error) => {
          console.error("AI search failed:", error);
          if (searchTerm === currentSearchTerm) {
            setAiResult(null);
          }
        })
        .finally(() => {
          if (searchTerm === currentSearchTerm) {
            setIsAiSearching(false);
          }
        });
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, totalFilteredResults]);
  
  const handleAccordionChange = async (value: string | undefined) => {
    setActiveAccordionItem(value);
    if (!value) return; 
    if (cachedData[value] || loadingId === value) return;

    setLoadingId(value);
    await new Promise(res => setTimeout(res, 300)); // Simulate network delay

    const fullData = statutesFullData[value];
    if (fullData) {
        setCachedData(prev => ({ ...prev, [value]: fullData }));
    }
    setLoadingId(null);
  }

  const handleGenerateElements = async (statute: Statute) => {
    setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: '', isLoading: true } }));
    try {
        const result = await generateElementsOfCrime({
            statuteCode: statute.code,
            statuteTitle: statute.title,
            statuteText: statute.fullText || statute.description,
        });
        setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: result.elements, isLoading: false } }));
    } catch (error) {
        console.error("Failed to generate elements:", error);
        setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: 'Error generating elements.', isLoading: false } }));
    }
  };

  const getFilteredStatutesForCategory = (category: string) => {
    const filteredByCategory = initialStatuteIndex.filter((s) => s.category === category);
    if (!searchTerm) {
      return filteredByCategory;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return filteredByCategory.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm)
    );
  };

  const showNotFound = !isAiSearching && !aiResult && searchTerm.length > 0 && totalFilteredResults === 0;
  
  const FullStatuteContent = ({ statute }: { statute: Statute }) => (
    <div className="border-t pt-4">
      <Accordion type="multiple" collapsible className="w-full space-y-2" defaultValue={['description']}>
          <AccordionItem value="description" className="border-b-0">
          <Card className="bg-muted/50">
              <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                  Official Description
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                  {statute.description}
              </AccordionContent>
          </Card>
          </AccordionItem>
          <AccordionItem value="summary" className="border-b-0">
          <Card className="bg-muted/50">
              <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                  What it Means for Officers
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                  {statute.practicalSummary}
              </AccordionContent>
          </Card>
          </AccordionItem>
          <AccordionItem value="elements" className="border-b-0">
              <Card className="bg-muted/50">
                  <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                      Elements of the Crime
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                      {(() => {
                          const elementState = generatedElements[statute.id];
                          if (elementState?.isLoading) {
                              return <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Generating...</div>
                          }
                          if (elementState?.content) {
                              return <div className="whitespace-pre-wrap">{elementState.content}</div>
                          }
                          return (
                              <Button 
                                  variant="secondary" 
                                  size="sm" 
                                  onClick={() => handleGenerateElements(statute)}
                              >
                                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                                  Generate with AI
                              </Button>
                          )
                      })()}
                  </AccordionContent>
              </Card>
          </AccordionItem>
          <AccordionItem value="example" className="border-b-0">
              <Card className="bg-muted/50">
                  <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                      Real-World Example
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                      {statute.example}
                  </AccordionContent>
              </Card>
          </AccordionItem>
      </Accordion>
      <div className="mt-6 flex items-center gap-2">
          <Summarizer
          documentText={
              statute.fullText ||
              `${statute.practicalSummary} ${statute.example}`
          }
          documentTitle={statute.title}
          />
          <Button asChild variant="secondary">
          <Link href={statute.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Statute
          </Link>
          </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, code, or keyword (e.g. 'DUI')"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setAiResult(null);
          }}
          className="pl-10"
        />
      </div>

      {isAiSearching && (
        <div className="text-center py-16">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h3 className="mt-4 text-lg font-medium">
            AI is searching statutes...
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This may take a moment.
          </p>
        </div>
      )}

      {!isAiSearching && aiResult && (
         <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={aiResult.id}>
            <AccordionItem value={aiResult.id} className="border-b-0">
              <Card className="animate-fade-in-up border-accent/50 shadow-lg shadow-accent/10">
                <AccordionTrigger className="p-4 text-left hover:no-underline">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
                      <p className="font-semibold text-base leading-snug">{aiResult.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {aiResult.code} &bull; {aiResult.degreeOfCharge}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                    <FullStatuteContent statute={aiResult} />
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
      )}

      {showNotFound && (
        <div className="text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Statutes Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
            Your search for "{searchTerm}" did not match any local or
            AI-found statutes.
            </p>
        </div>
      )}

      {!isAiSearching && !aiResult && (searchTerm === "" || totalFilteredResults > 0) && (
        <Tabs defaultValue={categories[0]} className="flex flex-col flex-1 -mr-4">
            <div className="overflow-x-auto pb-2 -mb-2 pr-4">
                <TabsList className="inline-flex h-auto">
                    {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="px-4 py-2 text-sm">
                        {category}
                    </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            
            {categories.map((category) => {
              const filteredStatutes = getFilteredStatutesForCategory(category);
              return (
                <TabsContent key={category} value={category} className="flex-1 mt-4 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                        {filteredStatutes.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full space-y-4" value={activeAccordionItem} onValueChange={handleAccordionChange}>
                                {filteredStatutes.map((statute, index) => (
                                <AccordionItem
                                    value={statute.id}
                                    key={statute.id}
                                    className="border-b-0"
                                >
                                    <Card
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                    <AccordionTrigger className="p-4 text-left hover:no-underline">
                                        <div className="flex-1 text-left">
                                        <p className="font-semibold text-base leading-snug">{statute.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {statute.code} &bull; {statute.degreeOfCharge}
                                        </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 pt-0">
                                      {loadingId === statute.id && (
                                        <div className="pt-4 space-y-4">
                                          <Skeleton className="h-24 w-full" />
                                          <Skeleton className="h-24 w-full" />
                                        </div>
                                      )}
                                      {cachedData[statute.id] && <FullStatuteContent statute={cachedData[statute.id]} />}
                                    </AccordionContent>
                                    </Card>
                                </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">No statutes found in this category for "{searchTerm}".</p>
                            </div>
                        )}
                    </ScrollArea>
                </TabsContent>
              );
            })}
        </Tabs>
      )}
    </div>
  )
})

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number }
  }
}
