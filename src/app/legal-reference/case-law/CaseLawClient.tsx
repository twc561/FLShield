"use client"

import { useState, useMemo, memo } from "react"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Summarizer } from "@/components/Summarizer"
import type { CaseLaw } from "@/data/case-law"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

type CaseLawIndexItem = {
  id: string;
  title: string;
  citation: string;
  category: string;
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


  const categories = useMemo(() => {
    const categoryOrder = [
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
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [initialCaseIndex]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const getFilteredCasesForCategory = (category: string) => {
    const filtered = initialCaseIndex.filter((c) => c.category === category);
    if (!searchTerm) {
      return filtered;
    }
    return filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.citation.toLowerCase().includes(searchTerm)
    );
  };
  
  const handleAccordionChange = async (value: string | undefined) => {
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
  }

  const FullCaseLawContent = ({ caseData }: { caseData: CaseLaw }) => (
    <>
      <p className="text-sm font-medium text-foreground/90">
          {caseData.summary}
      </p>
      <p className="text-sm text-muted-foreground mt-4">
          <span className="font-semibold text-foreground/80">What it Means for Officers:</span> {caseData.meaning}
      </p>
        <p className="text-sm text-muted-foreground mt-3 border-l-2 border-accent pl-3 italic">
          <span className="font-semibold text-foreground/80 not-italic">Real-World Example:</span> {caseData.example}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
          {caseData.tags.map(tag => (
          <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
              {tag}
          </span>
          ))}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search cases by title or citation..."
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

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
          const filteredCases = getFilteredCasesForCategory(category);
          return (
            <TabsContent key={category} value={category} className="flex-1 mt-4 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                    {filteredCases.length > 0 ? (
                        filteredCases.map((c, index) => (
                        <Card
                            key={c.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                <CardTitle>{c.title}</CardTitle>
                                <CardDescription>{c.citation}</CardDescription>
                                </div>
                                <Summarizer
                                  documentText={cachedData[c.id] ? `${cachedData[c.id].summary}\n\nWhat it Means for Officers:\n${cachedData[c.id].meaning}\n\nExample:\n${cachedData[c.id].example}` : "Loading..."}
                                  documentTitle={c.title}
                                />
                            </div>
                            </CardHeader>
                             <CardContent>
                                {loadingId === c.id && (
                                  <div className="space-y-3">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-full" />
                                  </div>
                                )}
                                {cachedData[c.id] && <FullCaseLawContent caseData={cachedData[c.id]} />}
                             </CardContent>
                        </Card>
                        ))
                    ) : (
                        <div className="text-center py-16">
                        <p className="text-muted-foreground">No cases found matching your search.</p>
                        </div>
                    )}
                    </div>
                </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
})

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
