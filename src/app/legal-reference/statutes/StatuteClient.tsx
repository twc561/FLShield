
"use client"

import { useState, useMemo, useEffect } from "react"
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

export function StatuteClient({
  initialStatutes,
}: {
  initialStatutes: Statute[]
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAiSearching, setIsAiSearching] = useState(false)
  const [aiResult, setAiResult] = useState<Statute | null>(null)
  const [generatedElements, setGeneratedElements] = useState<Record<string, { content: string; isLoading: boolean }>>({})

  const categories = useMemo(() => {
    const categoryOrder = [
      'Crimes Against Persons',
      'Property Crimes',
      'Drug Offenses',
      'Weapons Offenses',
      'Traffic Offenses',
      'Public Order & Obstruction',
    ];
    const uniqueCategories = [...new Set(initialStatutes.map((s) => s.category))];
    return uniqueCategories.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [initialStatutes]);

  const totalFilteredResults = useMemo(() => {
    if (!searchTerm) return initialStatutes.length;
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialStatutes.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm) ||
        s.description.toLowerCase().includes(lowercasedTerm) ||
        s.practicalSummary.toLowerCase().includes(lowercasedTerm) ||
        s.example.toLowerCase().includes(lowercasedTerm)
    ).length;
  }, [searchTerm, initialStatutes]);

  useEffect(() => {
    if (searchTerm === "" || aiResult) {
        if (searchTerm === "") {
            setAiResult(null)
            setIsAiSearching(false)
        }
        return
    }

    const handler = setTimeout(() => {
      if (
        totalFilteredResults === 0 &&
        !isAiSearching &&
        !aiResult
      ) {
        setIsAiSearching(true)
        findStatute({ query: searchTerm })
          .then((result) => {
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
              }
              setAiResult(newStatute)
            } else {
              setAiResult(null) 
            }
          })
          .catch((error) => {
            console.error("AI search failed:", error)
            setAiResult(null)
          })
          .finally(() => {
            setIsAiSearching(false)
          })
      }
    }, 800) 

    return () => {
      clearTimeout(handler) 
    }
  }, [searchTerm, totalFilteredResults, isAiSearching, aiResult])

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
    const filteredByCategory = initialStatutes.filter((s) => s.category === category);
    if (!searchTerm) {
      return filteredByCategory;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return filteredByCategory.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm) ||
        s.description.toLowerCase().includes(lowercasedTerm) ||
        s.practicalSummary.toLowerCase().includes(lowercasedTerm) ||
        s.example.toLowerCase().includes(lowercasedTerm)
    );
  };

  const showNotFound = !isAiSearching && !aiResult && searchTerm.length > 0 && totalFilteredResults === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, code, or keyword (e.g. 'DUI')"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            if (aiResult) setAiResult(null);
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
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
                      <CardTitle>{aiResult.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {aiResult.code} &bull; {aiResult.degreeOfCharge}
                    </CardDescription>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                       <Accordion type="multiple" collapsible className="w-full space-y-2" defaultValue={['description']}>
                        <AccordionItem value="description" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    Practical Summary for Officers
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {aiResult.description}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                        {aiResult.elementsOfTheCrime && (
                            <AccordionItem value="elements" className="border-b-0">
                                <Card className="bg-muted/50">
                                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                        Elements of the Crime
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {aiResult.elementsOfTheCrime}
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        )}
                        <AccordionItem value="example" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    Real-World Example
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {aiResult.example}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h4 className="font-semibold mb-2 text-destructive-foreground/90">
                          AI Result Disclaimer
                        </h4>
                        <p className="text-destructive-foreground/80 leading-relaxed text-sm">
                          This information was generated by AI and has not been
                          verified. Always consult official sources for legal
                          decisions.
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <Summarizer
                          documentText={
                            aiResult.fullText ||
                            `${aiResult.description} ${aiResult.example}`
                          }
                          documentTitle={aiResult.title}
                        />
                        <Button asChild variant="secondary">
                          <Link href={aiResult.url} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Statute
                          </Link>
                        </Button>
                      </div>
                    </div>
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
                            <Accordion type="single" collapsible className="w-full space-y-4">
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
                                    <AccordionTrigger className="p-6 text-left hover:no-underline">
                                        <div className="flex-1 text-left">
                                        <CardTitle>{statute.title}</CardTitle>
                                        <CardDescription>
                                            {statute.code} &bull; {statute.degreeOfCharge}
                                        </CardDescription>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 pt-0">
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
                                            <Link href={statute.url} target="_blank">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View Full Statute
                                            </Link>
                                            </Button>
                                        </div>
                                        </div>
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
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number }
  }
}
