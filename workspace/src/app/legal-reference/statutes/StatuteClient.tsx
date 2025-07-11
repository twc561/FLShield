
"use client";

import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Summarizer } from "@/components/Summarizer";
import type { Statute } from "@/data/statutes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ExternalLink, BookOpen, Loader2, Sparkles, Scale } from "lucide-react";
import { findStatute } from "@/ai/flows/find-statute";
import { generateElementsOfCrime } from "@/ai/flows/generate-elements-flow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

type StatuteIndexItem = Omit<Statute, 'description' | 'fullText' | 'practicalSummary' | 'example' | 'elementsOfTheCrime' | 'url'>;

const popularStatutes = [
  's784-011', 's784-03', 's784-021', 's784-045', 's812-014', 's810-02', 
  's812-13', 's843-01', 's843-02', 's316-193', 's893-13', 's790-23',
];

const FullStatuteContent = memo(function FullStatuteContent({
  statute,
  onGenerateElements,
  generatedElements,
}: {
  statute: Statute;
  onGenerateElements: (statute: Statute) => Promise<void>;
  generatedElements: Record<string, { content: string; isLoading: boolean }>;
}) {
  return (
    <div className="border-t pt-4">
      <Accordion type="multiple" collapsible className="w-full space-y-2" defaultValue={['description']}>
        <AccordionItem value="description" className="border-b-0">
          <Card className="bg-muted/50">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Official Description</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{statute.description}</AccordionContent>
          </Card>
        </AccordionItem>
        <AccordionItem value="summary" className="border-b-0">
          <Card className="bg-muted/50">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">What it Means for Officers</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{statute.practicalSummary}</AccordionContent>
          </Card>
        </AccordionItem>
        <AccordionItem value="elements" className="border-b-0">
          <Card className="bg-muted/50">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Elements of the Crime</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
              {(() => {
                const elementState = generatedElements[statute.id];
                if (elementState?.content) return <div className="whitespace-pre-wrap">{elementState.content}</div>;
                return (
                  <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); onGenerateElements(statute); }} disabled={elementState?.isLoading}>
                    {elementState?.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                    {elementState?.isLoading ? 'Generating...' : 'Generate with AI'}
                  </Button>
                );
              })()}
            </AccordionContent>
          </Card>
        </AccordionItem>
        <AccordionItem value="example" className="border-b-0">
          <Card className="bg-muted/50">
            <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Real-World Example</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{statute.example}</AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
      <div className="mt-6 flex items-center gap-2">
        <Summarizer documentText={statute.fullText || `${statute.practicalSummary} ${statute.example}`} documentTitle={statute.title} />
        <Button asChild variant="secondary">
          <Link href={statute.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> View Full Statute
          </Link>
        </Button>
      </div>
    </div>
  );
});
FullStatuteContent.displayName = 'FullStatuteContent';

export const StatuteClient = memo(function StatuteClient({
  initialStatuteIndex,
  statutesFullData,
}: {
  initialStatuteIndex: StatuteIndexItem[];
  statutesFullData: Record<string, Statute>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiResult, setAiResult] = useState<Statute | null>(null);
  const [generatedElements, setGeneratedElements] = useState<Record<string, { content: string; isLoading: boolean }>>({});
  const [cachedData, setCachedData] = useState<Record<string, Statute>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>();

  useEffect(() => {
    const preloadedData: Record<string, Statute> = {};
    popularStatutes.forEach(id => {
      if (statutesFullData[id]) preloadedData[id] = statutesFullData[id];
    });
    setCachedData(prev => ({ ...prev, ...preloadedData }));
  }, [statutesFullData]);

  const categories = useMemo(() => {
    const categoryOrder = [
      'Crimes Against Persons', 'Property Crimes', 'Drug Offenses', 
      'Weapons Offenses', 'Public Order & Obstruction', 'Traffic Offenses',
    ];
    const uniqueCategories = [...new Set(initialStatuteIndex.map((s) => s.category))];
    return uniqueCategories.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      // BUG FIX: Changed 'order' to 'categoryOrder' to prevent runtime crash
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [initialStatuteIndex]);

  const totalFilteredResults = useMemo(() => {
    if (!searchTerm) return initialStatuteIndex.length;
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialStatuteIndex.filter(s =>
      s.title.toLowerCase().includes(lowercasedTerm) || s.code.toLowerCase().includes(lowercasedTerm)
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
        .then(result => {
          if (searchTerm === currentSearchTerm && result?.code && result.code !== 'N/A') {
            const newStatute: Statute = {
              id: result.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
              code: result.code, title: result.title, description: result.description,
              fullText: "N/A", degreeOfCharge: result.degreeOfCharge,
              practicalSummary: result.description, elementsOfTheCrime: result.elementsOfTheCrime,
              example: result.example, category: 'AI Result',
              url: `https://www.flsenate.gov/Laws/Statutes/search?search=${encodeURIComponent(result.title || result.code)}&context=statutes`,
            };
            setAiResult(newStatute);
            setActiveAccordionItem(newStatute.id);
          } else if (searchTerm === currentSearchTerm) {
            setAiResult(null);
          }
        })
        .catch(error => {
          console.error("AI search failed:", error);
          if (searchTerm === currentSearchTerm) setAiResult(null);
        })
        .finally(() => {
          if (searchTerm === currentSearchTerm) setIsAiSearching(false);
        });
    }, 800);
    return () => clearTimeout(handler);
  }, [searchTerm, totalFilteredResults]);

  const handleAccordionChange = useCallback(async (value: string | undefined) => {
    setActiveAccordionItem(value);
    if (!value || cachedData[value] || loadingId === value) return;
    setLoadingId(value);
    await new Promise(res => setTimeout(res, 300));
    const fullData = statutesFullData[value];
    if (fullData) setCachedData(prev => ({ ...prev, [value]: fullData }));
    setLoadingId(null);
  }, [cachedData, loadingId, statutesFullData]);

  const handleGenerateElements = useCallback(async (statute: Statute) => {
    setActiveAccordionItem(statute.id);
    setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: '', isLoading: true } }));
    try {
      const result = await generateElementsOfCrime({
        statuteCode: statute.code, statuteTitle: statute.title,
        statuteText: statute.fullText || statute.description,
      });
      setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: result.elements, isLoading: false } }));
    } catch (error) {
      console.error("Failed to generate elements:", error);
      setGeneratedElements(prev => ({ ...prev, [statute.id]: { content: 'Error generating elements.', isLoading: false } }));
    }
  }, []);

  const getFilteredStatutesForCategory = (category: string) => {
    if (!searchTerm) return initialStatuteIndex.filter(s => s.category === category);
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialStatuteIndex.filter(s =>
      s.category === category && (s.title.toLowerCase().includes(lowercasedTerm) || s.code.toLowerCase().includes(lowercasedTerm))
    );
  };
  
  const showNotFound = !isAiSearching && !aiResult && searchTerm.length > 0 && totalFilteredResults === 0;

  const renderStatute = (statute: Statute, isAiResult = false) => {
    const content = isAiResult ? (
      <FullStatuteContent statute={statute} onGenerateElements={handleGenerateElements} generatedElements={generatedElements} />
    ) : (
      <>
        {loadingId === statute.id && <div className="pt-4 space-y-4 border-t"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>}
        {cachedData[statute.id] && <FullStatuteContent statute={cachedData[statute.id]} onGenerateElements={handleGenerateElements} generatedElements={generatedElements} />}
      </>
    );

    return (
      <AccordionItem value={statute.id} key={statute.id} className={`border rounded-md bg-card ${isAiResult ? 'border-accent/50 shadow-lg shadow-accent/10' : ''}`}>
        <AccordionTrigger className="p-4 hover:no-underline w-full text-left">
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-2 rounded-lg ${isAiResult ? 'bg-accent/10' : 'bg-primary/10'}`}>
              {isAiResult ? <Sparkles className="h-6 w-6 text-accent" /> :