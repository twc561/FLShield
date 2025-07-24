"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2, Sparkles, Command, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [contextualSuggestions, setContextualSuggestions] = useState<string[]>([]);
  const [smartShortcuts, setSmartShortcuts] = useState<{key: string, title: string, href: string}[]>([]);
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);
  const [aiSuggestionsOpen, setAiSuggestionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const generateContextualSuggestions = () => {
      const hour = new Date().getHours()
      let suggestions: string[] = []

      if (hour >= 6 && hour < 10) {
        suggestions = ['Daily briefing', 'Field interview', 'Traffic stop', 'Report writing']
      } else if (hour >= 10 && hour < 14) {
        suggestions = ['Evidence collection', 'Suspect interview', 'Legal research', 'Case documentation']
      } else if (hour >= 14 && hour < 18) {
        suggestions = ['Incident response', 'Use of force', 'Emergency protocols', 'Arrest procedures']
      } else if (hour >= 18 && hour < 22) {
        suggestions = ['Domestic violence', 'DUI investigation', 'Mental health crisis', 'Night patrol']
      } else {
        suggestions = ['Baker Act', 'Emergency response', 'Backup protocols', 'Officer safety']
      }

      setContextualSuggestions(suggestions)
    }

    const generateSmartShortcuts = () => {
      // Get usage data from localStorage
      try {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}')
        const recent = JSON.parse(localStorage.getItem('recentTools') || '[]')

        // Get top 4 most used features
        const topUsed = Object.entries(usage)
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .slice(0, 4)
          .map(([id]) => id)

        // Find corresponding features
        const shortcuts = topUsed
          .map(id => {
            return dashboardFeatureGroups
              .flatMap(group => group.features)
              .find(feature => feature.id === id)
          })
          .filter(Boolean)
          .map((feature, index) => ({
            title: feature!.title,
            href: feature!.targetPage,
            shortcut: index + 1
          }))

        // If we don't have enough usage data, use default shortcuts
        if (shortcuts.length < 4) {
          const defaultShortcuts = [
            { title: 'AI Legal Advisor', href: '/ai-legal-advisor', shortcut: 1 },
            { title: 'Field Scenarios', href: '/field-procedures/scenario-checklists', shortcut: 2 },
            { title: 'Statute Search', href: '/legal-reference/statutes', shortcut: 3 },
            { title: 'Emergency Protocols', href: '/emergency-response/baker-act-guide', shortcut: 4 }
          ]
          setSmartShortcuts(defaultShortcuts)
        } else {
          setSmartShortcuts(shortcuts)
        }
      } catch (error) {
        console.error('Error loading shortcuts:', error)
        // Fallback to default shortcuts
        const defaultShortcuts = [
          { title: 'AI Legal Advisor', href: '/ai-legal-advisor', shortcut: 1 },
          { title: 'Field Scenarios', href: '/field-procedures/scenario-checklists', shortcut: 2 },
          { title: 'Statute Search', href: '/legal-reference/statutes', shortcut: 3 },
          { title: 'Emergency Protocols', href: '/emergency-response/baker-act-guide', shortcut: 4 }
        ]
        setSmartShortcuts(defaultShortcuts)
      }
    }

    generateContextualSuggestions();
    generateSmartShortcuts();
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

      // Smart shortcuts
      if ((event.metaKey || event.ctrlKey) && ['1', '2', '3', '4'].includes(event.key)) {
        event.preventDefault();
        const shortcutIndex = parseInt(event.key) - 1;
        if (smartShortcuts[shortcutIndex]) {
          router.push(smartShortcuts[shortcutIndex].href);
        }
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
  }, [router, smartShortcuts]);

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
        className={`w-full justify-start gap-2 transition-all duration-300 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30 border-gradient-to-r border-blue-200/50 dark:border-blue-800/50 hover:from-blue-100/70 hover:via-purple-100/50 hover:to-pink-100/70 dark:hover:from-blue-900/50 dark:hover:via-purple-900/30 dark:hover:to-pink-900/50 hover:shadow-lg hover:shadow-blue-200/25 dark:hover:shadow-blue-900/25 ${isShortcutPressed ? 'ring-2 ring-blue-400/50 dark:ring-blue-600/50 scale-[1.02] shadow-xl shadow-blue-200/30 dark:shadow-blue-900/30' : ''}`}
      >
        <SearchIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span className="text-muted-foreground bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent font-medium">Search everything...</span>
        <div className="ml-auto flex items-center gap-1">
          {/* Small shortcuts */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground mr-2">
            <kbd className="px-1 py-0.5 bg-gradient-to-br from-blue-100/80 to-purple-100/60 dark:from-blue-900/60 dark:to-purple-900/40 rounded text-[10px] border border-blue-200/50 dark:border-blue-700/50">⌘1</kbd>
            <kbd className="px-1 py-0.5 bg-gradient-to-br from-purple-100/80 to-pink-100/60 dark:from-purple-900/60 dark:to-pink-900/40 rounded text-[10px] border border-purple-200/50 dark:border-purple-700/50">⌘2</kbd>
            <kbd className="px-1 py-0.5 bg-gradient-to-br from-pink-100/80 to-blue-100/60 dark:from-pink-900/60 dark:to-blue-900/40 rounded text-[10px] border border-pink-200/50 dark:border-pink-700/50">⌘3</kbd>
          </div>
          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-100/90 to-purple-100/70 dark:from-blue-900/70 dark:to-purple-900/50 px-1.5 py-0.5 rounded border border-blue-300/40 dark:border-blue-700/40">
            <Command className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">K</span>
          </div>
        </div>
      </Button>

      {/* Overlay Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20 border-gradient-to-br border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
          <DialogTitle className="sr-only">Command Search</DialogTitle>

          {/* Search Input */}
          <div className="flex-shrink-0 p-4 border-b border-gradient-to-r border-blue-200/30 dark:border-blue-800/30 bg-gradient-to-r from-white/80 via-blue-50/40 to-purple-50/30 dark:from-gray-900/80 dark:via-blue-950/40 dark:to-purple-950/30 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400 h-4 w-4" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools, procedures, or ask a question..."
                  className="pl-10 bg-gradient-to-r from-white/90 to-blue-50/60 dark:from-gray-800/90 dark:to-blue-950/60 border-blue-200/50 dark:border-blue-700/50 focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-600/50 focus:border-transparent transition-all duration-200"
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
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-300/60 dark:hover:shadow-blue-800/40 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none"
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
          <div className="flex-1 overflow-y-auto min-h-0 bg-gradient-to-b from-transparent via-blue-50/10 to-purple-50/20 dark:via-blue-950/10 dark:to-purple-950/20">
            <div className="p-4">
              {query ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 bg-gradient-to-r hover:shadow-lg backdrop-blur-sm ${
                          index % 3 === 0
                            ? 'from-blue-50/60 to-purple-50/40 dark:from-blue-950/40 dark:to-purple-950/30 border-blue-200/30 dark:border-blue-800/30 hover:from-blue-100/80 hover:to-purple-100/60 dark:hover:from-blue-900/60 dark:hover:to-purple-900/40 hover:shadow-blue-200/30 dark:hover:shadow-blue-900/20'
                            : index % 3 === 1
                            ? 'from-purple-50/60 to-pink-50/40 dark:from-purple-950/40 dark:to-pink-950/30 border-purple-200/30 dark:border-purple-800/30 hover:from-purple-100/80 hover:to-pink-100/60 dark:hover:from-purple-900/60 dark:hover:to-pink-900/40 hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20'
                            : 'from-pink-50/60 to-blue-50/40 dark:from-pink-950/40 dark:to-blue-950/30 border-pink-200/30 dark:border-pink-800/30 hover:from-pink-100/80 hover:to-blue-100/60 dark:hover:from-pink-900/60 dark:hover:to-blue-900/40 hover:shadow-pink-200/30 dark:hover:shadow-pink-900/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">{item.title}</span>
                              {item.isPremium && (
                                <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/50 dark:to-amber-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-300/50 dark:border-yellow-700/50">Pro</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                            <Badge variant="outline" className="text-xs bg-gradient-to-r from-white/60 to-gray-50/40 dark:from-gray-800/60 dark:to-gray-700/40 border-gray-300/50 dark:border-gray-600/50">
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-950/30 rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                    No results found for "{query}"
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  {/* Smart Shortcuts - Collapsible */}
                  <Collapsible open={quickAccessOpen} onOpenChange={setQuickAccessOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 dark:hover:from-blue-950/30 dark:hover:to-purple-950/20 rounded-md transition-all duration-200 backdrop-blur-sm">
                      <h3 className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Quick Access</h3>
                      {quickAccessOpen ? (
                        <ChevronDown className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {smartShortcuts.map((shortcut, index) => (
                          <div
                            key={shortcut.key}
                            onClick={() => {
                              setIsOpen(false);
                              router.push(shortcut.href);
                            }}
                            className={`p-2 rounded-md border cursor-pointer transition-all duration-200 flex items-center justify-between bg-gradient-to-r backdrop-blur-sm hover:shadow-md ${
                              index % 2 === 0
                                ? 'from-blue-50/60 to-purple-50/40 dark:from-blue-950/40 dark:to-purple-950/30 border-blue-200/40 dark:border-blue-800/40 hover:from-blue-100/80 hover:to-purple-100/60 dark:hover:from-blue-900/60 dark:hover:to-purple-900/40'
                                : 'from-purple-50/60 to-pink-50/40 dark:from-purple-950/40 dark:to-pink-950/30 border-purple-200/40 dark:border-purple-800/40 hover:from-purple-100/80 hover:to-pink-100/60 dark:hover:from-purple-900/60 dark:hover:to-pink-900/40'
                            }`}
                          >
                            <span className="text-sm truncate font-medium bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">{shortcut.title}</span>
                            <kbd className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-white/80 to-gray-50/60 dark:from-gray-700/80 dark:to-gray-600/60 rounded flex-shrink-0 border border-gray-200/50 dark:border-gray-600/50 font-medium text-gray-700 dark:text-gray-300">{shortcut.key}</kbd>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* AI Suggestions - Collapsible */}
                  <Collapsible open={aiSuggestionsOpen} onOpenChange={setAiSuggestionsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/30 dark:hover:from-purple-950/30 dark:hover:to-pink-950/20 rounded-md transition-all duration-200 backdrop-blur-sm">
                      <h3 className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Smart Recommendations</h3>
                      {aiSuggestionsOpen ? (
                        <ChevronDown className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-pink-500 dark:text-pink-400" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {contextualSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => setQuery(suggestion)}
                          className={`p-2 rounded-md border-dashed border cursor-pointer transition-all duration-200 bg-gradient-to-r backdrop-blur-sm hover:shadow-md ${
                            index % 4 === 0
                              ? 'from-blue-50/50 to-purple-50/30 dark:from-blue-950/30 dark:to-purple-950/20 border-blue-300/50 dark:border-blue-700/50 hover:from-blue-100/70 hover:to-purple-100/50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/30'
                              : index % 4 === 1
                              ? 'from-purple-50/50 to-pink-50/30 dark:from-purple-950/30 dark:to-pink-950/20 border-purple-300/50 dark:border-purple-700/50 hover:from-purple-100/70 hover:to-pink-100/50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/30'
                              : index % 4 === 2
                              ? 'from-pink-50/50 to-blue-50/30 dark:from-pink-950/30 dark:to-blue-950/20 border-pink-300/50 dark:border-pink-700/50 hover:from-pink-100/70 hover:to-blue-100/50 dark:hover:from-pink-900/50 dark:hover:to-blue-900/30'
                              : 'from-green-50/50 to-blue-50/30 dark:from-green-950/30 dark:to-blue-950/20 border-green-300/50 dark:border-green-700/50 hover:from-green-100/70 hover:to-blue-100/50 dark:hover:from-green-900/50 dark:hover:to-blue-900/30'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                            <span className="text-sm bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-300 dark:to-purple-300 bg-clip-text text-transparent font-medium">"{suggestion}"</span>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              {result && (
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-pink-50/40 dark:from-blue-950/60 dark:via-purple-950/40 dark:to-pink-950/30 border border-gradient-to-r border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm shadow-lg shadow-blue-200/20 dark:shadow-blue-900/10">
                  <div className="whitespace-pre-wrap bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent leading-relaxed">{result}</div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-2 border-t border-gradient-to-r border-blue-200/30 dark:border-blue-800/30 bg-gradient-to-r from-white/80 via-blue-50/40 to-purple-50/30 dark:from-gray-900/80 dark:via-blue-950/40 dark:to-purple-950/30 backdrop-blur-sm text-xs text-center">
            <span className="bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-400 dark:to-gray-300 bg-clip-text text-transparent font-medium">Press Enter to select • Esc to close</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}