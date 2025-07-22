"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2, Sparkles, Command } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { dashboardFeatureGroups } from "@/data/dashboard-features";

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  category: string;
  path: string;
  isPremium: boolean;
  relevanceScore?: number;
}

export default function AICommandSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isShortcutPressed, setIsShortcutPressed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open overlay
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        setIsShortcutPressed(true);
        setTimeout(() => setIsShortcutPressed(false), 200);
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      // ESC to close overlay
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery("");
        setResult(null);
        setSearchResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smart search function
  const performSmartSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const queryLower = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    dashboardFeatureGroups.forEach(group => {
      group.features.forEach(feature => {
        let relevanceScore = 0;

        // Title match (highest priority)
        if (feature.title.toLowerCase().includes(queryLower)) {
          relevanceScore += 10;
        }

        // Summary match
        if (feature.summary.toLowerCase().includes(queryLower)) {
          relevanceScore += 5;
        }

        // Category match
        if (feature.category.toLowerCase().includes(queryLower)) {
          relevanceScore += 3;
        }

        if (relevanceScore > 0) {
          results.push({
            id: feature.id,
            title: feature.title,
            summary: feature.summary,
            category: feature.category,
            path: feature.targetPage,
            isPremium: feature.isPremium,
            relevanceScore
          });
        }
      });
    });

    // Sort by relevance score
    results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    setSearchResults(results.slice(0, 8)); // Show top 8 results
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSmartSearch(query);
    }, 150);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleAISearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResult("");

    try {
      const { getCommandSearchResponse } = await import('@/ai/flows/commandSearch');
      const response = await getCommandSearchResponse({ query });
      setResult(response);
    } catch (error: any) {
      console.error("Search failed:", error);
      setResult("I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (item: SearchResult) => {
    // Navigate and close
    setIsOpen(false);
    setQuery("");
    setResult(null);
    setSearchResults([]);
    router.push(item.path);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className={`w-full justify-start gap-2 transition-all duration-200 ${isShortcutPressed ? 'ring-2 ring-accent scale-[1.02]' : ''}`}
      >
        <SearchIcon className="w-4 h-4" />
        <span className="text-muted-foreground">Search everything...</span>
        <div className="ml-auto flex items-center gap-1 text-xs bg-muted px-1.5 py-0.5 rounded">
          <Command className="w-3 h-3" />K
        </div>
      </Button>

      {/* Overlay Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">Command Search</DialogTitle>

          {/* Search Input */}
          <div className="flex-shrink-0 p-4 border-b">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools, procedures, or ask a question..."
                  className="pl-10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading && query.trim()) {
                      if (searchResults.length > 0) {
                        handleItemClick(searchResults[0]);
                      } else {
                        handleAISearch();
                      }
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleAISearch}
                disabled={isLoading || !query.trim()}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4">
              {query ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="p-3 rounded-lg border hover:bg-accent/5 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{item.title}</span>
                              {item.isPremium && (
                                <Badge variant="secondary" className="text-xs">Pro</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No results found for "{query}"
                  </div>
                )
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Start typing to search tools and features...
                </div>
              )}

              {result && (
                <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="whitespace-pre-wrap">{result}</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-2 border-t bg-muted/20 text-xs text-muted-foreground text-center">
            Press Enter to select • Esc to close
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}