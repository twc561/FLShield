
"use client"

import { useState, useMemo, memo, useCallback } from "react"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Summarizer } from "@/components/Summarizer"
import { type CaseLaw } from "@/data/case-law"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Gavel } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type CaseLawIndexItem = {
  id: string;
  title: string;
  citation: string;
  category: string;
  icon: string;
  tags: string[];
}

export const CaseLawClient = memo(function CaseLawClient({ 
  initialCaseIndex,
  caseLawsFullData,
}: { 
  initialCaseIndex: CaseLawIndexItem[],
  caseLawsFullData: Record<string, CaseLaw>
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | undefined>();
  const [cachedData, setCachedData] = useState<Record<string, CaseLaw>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const categoryOrder = useMemo(() => {
    const order = [
      'Use of Force & Arrest',
      'Search & Seizure',
      'Custodial Interrogation',
      'Traffic & DUI',
      'K-9 Operations',
      'Crisis Intervention',
      'General Constitutional Law',
    ];
    const uniqueCategories = [...new Set(initialCaseIndex.map((c) => c.category))];
    return uniqueCategories.sort((a, b) => {
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [initialCaseIndex]);

  const filteredCaseIndex = useMemo(() => {
    if (!searchTerm) {
      return initialCaseIndex;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialCaseIndex.filter(c => 
      c.title.toLowerCase().includes(lowercasedTerm) ||
      c.citation.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, initialCaseIndex]);

  const handleAccordionChange = useCallback(async (value: string | undefined) => {
    setActiveAccordionItem(value);
    if (!value) return; 
    if (cachedData[value] || loadingId === value) return; 

    setLoadingId(value);
    await new Promise(res => setTimeout(res, 300)); // Simulate network delay

    const fullData = caseLawsFullData[value];
    if (fullData) {
        setCachedData(prev => ({ ...prev, [value]: fullData }));
    }
    setLoadingId(null);
  }, [cachedData, loadingId, caseLawsFullData]);

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search cases by title or citation..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
        </div>

        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-6">
            {categoryOrder
              .filter(category => Array.isArray(filteredCaseIndex) && filteredCaseIndex.some(c => c.category === category))
              .map(category => (
                <div key={category}>
                  <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
                  <Accordion type="single" collapsible className="w-full space-y-2" value={activeAccordionItem} onValueChange={handleAccordionChange}>
                    {Array.isArray(filteredCaseIndex) && filteredCaseIndex
                      .filter(c => c.category === category)
                      .map(c => {
                        const Icon = (LucideIcons as any)[c.icon] || Gavel;
                        return (
                          <AccordionItem value={c.id} key={c.id} className="border rounded-md bg-card">
                            <AccordionTrigger className="p-4 hover:no-underline">
                              <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="font-semibold text-base text-card-foreground">{c.title}</p>
                                  <p className="text-xs text-muted-foreground">{c.citation}</p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="border-t pt-4 space-y-4">
                                  {loadingId === c.id && (
                                    <div className="space-y-3">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                  )}
                                  {cachedData[c.id] && (
                                    <>
                                      <p className="text-sm font-medium text-foreground/90">
                                          {cachedData[c.id].summary}
                                      </p>
                                      <p className="text-sm text-muted-foreground mt-4">
                                          <span className="font-semibold text-foreground/80">What it Means for Officers:</span> {cachedData[c.id].meaning}
                                      </p>
                                        <p className="text-sm text-muted-foreground mt-3 border-l-2 border-accent pl-3 italic">
                                          <span className="font-semibold text-foreground/80 not-italic">Real-World Example:</span> {cachedData[c.id].example}
                                      </p>
                                      <div className="flex flex-wrap gap-2 mt-4">
                                          {Array.isArray(cachedData[c.id].tags) && cachedData[c.id].tags.map(tag => (
                                          <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                                              {tag}
                                          </span>
                                          ))}
                                      </div>
                                      <div className="mt-4">
                                        <Summarizer
                                          documentText={`${cachedData[c.id].summary}\n\nWhat it Means for Officers:\n${cachedData[c.id].meaning}\n\nExample:\n${cachedData[c.id].example}`}
                                          documentTitle={c.title}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })
                    }
                  </Accordion>
                </div>
              ))
            }
            {Array.isArray(filteredCaseIndex) && filteredCaseIndex.length === 0 && searchTerm && (
                <div className="text-center py-16">
                  <Gavel className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Cases Found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Your search did not match any cases.</p>
                </div>
              )}
          </div>
        </ScrollArea>
    </div>
  );
})

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
