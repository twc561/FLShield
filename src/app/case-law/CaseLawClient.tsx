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
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const CaseLawClient = memo(function CaseLawClient({ initialCases }: { initialCases: CaseLaw[] }) {
  const [searchTerm, setSearchTerm] = useState("")

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
    const uniqueCategories = [...new Set(initialCases.map((c) => c.category))];
    // Sort categories based on the predefined order for better UX
    return uniqueCategories.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [initialCases]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const getFilteredCasesForCategory = (category: string) => {
    const filtered = initialCases.filter((c) => c.category === category);
    if (!searchTerm) {
      return filtered;
    }
    return filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.citation.toLowerCase().includes(searchTerm) ||
        c.summary.toLowerCase().includes(searchTerm) ||
        c.meaning.toLowerCase().includes(searchTerm) ||
        c.example.toLowerCase().includes(searchTerm) ||
        c.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search cases in the selected category..."
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
                                documentText={`${c.summary}\n\nWhat it Means for Officers:\n${c.meaning}\n\nExample:\n${c.example}`}
                                documentTitle={c.title}
                                />
                            </div>
                            </CardHeader>
                            <CardContent>
                            <p className="text-sm font-medium text-foreground/90">
                                {c.summary}
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <span className="font-semibold text-foreground/80">What it Means for Officers:</span> {c.meaning}
                            </p>
                             <p className="text-sm text-muted-foreground mt-3 border-l-2 border-accent pl-3 italic">
                                <span className="font-semibold text-foreground/80 not-italic">Real-World Example:</span> {c.example}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {c.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                                    {tag}
                                </span>
                                ))}
                            </div>
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
