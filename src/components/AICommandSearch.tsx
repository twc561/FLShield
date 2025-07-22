
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2, Sparkles, Command, Keyboard, Clock, Star, TrendingUp, MapPin, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { dashboardFeatureGroups } from "@/data/dashboard-features";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [recentItems, setRecentItems] = useState<SearchResult[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState("search");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent and favorite items from localStorage
  useEffect(() => {
    const loadStoredItems = () => {
      try {
        const recent = JSON.parse(localStorage.getItem('recent-items') || '[]');
        const favorites = JSON.parse(localStorage.getItem('favorite-items') || '[]');
        setRecentItems(recent.slice(0, 5)); // Show last 5
        setFavoriteItems(favorites);
      } catch (error) {
        console.error('Error loading stored items:', error);
      }
    };
    loadStoredItems();
  }, []);

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

        // Keywords match (for common terms)
        const keywords = {
          'dui': ['dui', 'drunk', 'driving', 'alcohol'],
          'domestic': ['domestic', 'dv', 'violence', 'family'],
          'traffic': ['traffic', 'stop', 'vehicle', 'citation'],
          'search': ['search', 'consent', 'warrant', 'seizure'],
          'miranda': ['miranda', 'rights', 'interrogation'],
          'use of force': ['force', 'uof', 'resistance', 'weapon'],
          'mental health': ['baker', 'marchman', 'mental', 'crisis'],
          'evidence': ['evidence', 'chain', 'custody', 'collection']
        };

        Object.entries(keywords).forEach(([key, terms]) => {
          if (terms.some(term => queryLower.includes(term))) {
            if (feature.title.toLowerCase().includes(key) || 
                feature.summary.toLowerCase().includes(key)) {
              relevanceScore += 7;
            }
          }
        });

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
    setActiveTab("ai-response");

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
    // Add to recent items
    const updatedRecent = [item, ...recentItems.filter(r => r.id !== item.id)].slice(0, 5);
    setRecentItems(updatedRecent);
    localStorage.setItem('recent-items', JSON.stringify(updatedRecent));

    // Navigate and close
    setIsOpen(false);
    setQuery("");
    setResult(null);
    router.push(item.path);
  };

  const emergencyQuickActions = [
    { text: "Baker Act", category: "Emergency", path: "/emergency-response/baker-act-guide", icon: "Heart" },
    { text: "HAZMAT Response", category: "Emergency", path: "/emergency-response/hazmat-guide", icon: "AlertTriangle" },
    { text: "DUI Checklist", category: "Field", path: "/traffic-enforcement/dui-investigation", icon: "Car" },
    { text: "Use of Force", category: "Legal", path: "/reporting-development/use-of-force-wizard", icon: "Shield" }
  ];

  const contextualSuggestions = [
    { text: "Miranda Rights", category: "Legal", path: "/legal-reference/miranda-warning-guide", tag: "Most Used" },
    { text: "Evidence Collection", category: "Field", path: "/field-procedures/evidence-management-guide", tag: "Critical" },
    { text: "Traffic Stop Checklist", category: "Procedures", path: "/field-procedures/scenario-checklists", tag: "Popular" },
    { text: "Domestic Violence", category: "Protocols", path: "/field-procedures/domestic-violence-protocol", tag: "Essential" }
  ];

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className={`gap-2 transition-all duration-200 ${isShortcutPressed ? 'ring-2 ring-accent scale-[1.02]' : ''}`}
      >
        <SearchIcon className="w-4 h-4" />
        Search everything...
        <div className="hidden sm:flex items-center gap-1 text-xs bg-muted px-1.5 py-0.5 rounded">
          <Command className="w-3 h-3" />K
        </div>
      </Button>

      {/* Enhanced Overlay Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0 gap-0">
          <DialogTitle className="sr-only">Command Search</DialogTitle>
          
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Shield FL Command Center</h3>
                <p className="text-sm text-muted-foreground">Search tools, ask questions, or browse by category</p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools, procedures, or ask a question..."
                  className="pl-10 bg-background/80 border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isLoading && query.trim()) {
                      if (e.shiftKey) {
                        handleAISearch();
                      } else if (searchResults.length > 0) {
                        handleItemClick(searchResults[0]);
                      }
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleAISearch}
                disabled={isLoading || !query.trim()}
                className="bg-accent hover:bg-accent/80"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="search">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="quick-access">
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Access
                </TabsTrigger>
                <TabsTrigger value="ai-response" disabled={!result}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Response
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 px-6 pb-6">
              <TabsContent value="search" className="mt-4 h-full">
                <ScrollArea className="h-full">
                  {query ? (
                    <div className="space-y-3">
                      {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className="p-3 rounded-lg border border-border hover:bg-accent/5 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium group-hover:text-accent transition-colors">
                                    {item.title}
                                  </h4>
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
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No results found for "{query}"
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Emergency Quick Actions */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2 text-red-600">
                          <Zap className="w-4 h-4" />
                          Emergency Quick Access
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {emergencyQuickActions.map((action) => (
                            <div
                              key={action.path}
                              onClick={() => handleItemClick({
                                id: action.path,
                                title: action.text,
                                summary: "",
                                category: action.category,
                                path: action.path,
                                isPremium: false
                              })}
                              className="p-3 rounded-lg border border-red-200 hover:bg-red-50 cursor-pointer transition-colors text-center"
                            >
                              <div className="font-medium text-red-700">{action.text}</div>
                              <div className="text-xs text-red-600 mt-1">{action.category}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contextual Suggestions */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Popular Tools
                        </h4>
                        <div className="space-y-2">
                          {contextualSuggestions.map((suggestion) => (
                            <div
                              key={suggestion.path}
                              onClick={() => handleItemClick({
                                id: suggestion.path,
                                title: suggestion.text,
                                summary: "",
                                category: suggestion.category,
                                path: suggestion.path,
                                isPremium: false
                              })}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                            >
                              <div>
                                <span className="font-medium">{suggestion.text}</span>
                                <span className="text-xs text-muted-foreground ml-2">• {suggestion.category}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {suggestion.tag}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="recent" className="mt-4 h-full">
                <ScrollArea className="h-full">
                  {recentItems.length > 0 ? (
                    <div className="space-y-2">
                      {recentItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                        >
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.category}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent items
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="quick-access" className="mt-4 h-full">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-2 gap-4">
                    {dashboardFeatureGroups.slice(0, 6).map((group) => (
                      <div key={group.category} className="space-y-2">
                        <h4 className="font-medium text-sm">{group.category}</h4>
                        <div className="space-y-1">
                          {group.features.slice(0, 3).map((feature) => (
                            <div
                              key={feature.id}
                              onClick={() => handleItemClick({
                                id: feature.id,
                                title: feature.title,
                                summary: feature.summary,
                                category: feature.category,
                                path: feature.targetPage,
                                isPremium: feature.isPremium
                              })}
                              className="text-sm p-2 rounded hover:bg-accent/5 cursor-pointer transition-colors"
                            >
                              {feature.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="ai-response" className="mt-4 h-full">
                <ScrollArea className="h-full">
                  {result && (
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="whitespace-pre-wrap">{result}</div>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>Press Enter to select first result • Shift+Enter for AI search • Esc to close</div>
              <div className="flex items-center gap-4">
                <span>Recent: {recentItems.length}</span>
                <span>Results: {searchResults.length}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
