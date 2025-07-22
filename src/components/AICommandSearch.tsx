"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2, Sparkles, Command, Keyboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AICommandSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isShortcutPressed, setIsShortcutPressed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsShortcutPressed(true);
        setTimeout(() => setIsShortcutPressed(false), 200);
      }

      // ESC to clear search
      if (event.key === 'Escape') {
        setQuery("");
        setResult(null);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = async () => {
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

  const quickActions = [
    { text: "DUI procedures", category: "Field", path: "/traffic-enforcement/dui-investigation" },
    { text: "Use of force policy", category: "Legal", path: "/reporting-development/use-of-force-wizard" },
    { text: "Miranda rights", category: "Legal", path: "/legal-reference/miranda-warning-guide" },
    { text: "Traffic stop checklist", category: "Field", path: "/field-procedures/scenario-checklists" },
    { text: "Baker Act requirements", category: "Emergency", path: "/emergency-response/baker-act-guide" }
  ];

  const handleQuickActionClick = (path: string) => {
    // Force immediate state cleanup
    setResult(null);
    setQuery("");
    setIsLoading(false);
    
    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => {
      router.push(path);
    }, 0);
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto bg-gradient-to-r from-card/50 to-accent/10 border-border transition-all duration-200 ${isShortcutPressed ? 'ring-2 ring-accent scale-[1.02]' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">AI Command Search</h3>
              <p className="text-sm text-muted-foreground">Ask me anything about Florida law, procedures, or get quick tool recommendations.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-accent bg-accent/20 px-2 py-1 rounded">
            <Keyboard className="w-3 h-3" />
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'What are the elements of battery?' or 'Show me DUI procedures'"
              className="pl-10 bg-background/80 border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && query.trim() && handleSearch()}
            />
            {query && (
              <button
                onClick={() => {setQuery(""); setResult(null)}}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-accent hover:bg-accent/80 transition-all duration-200"
            size="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Thinking...
              </>
            ) : (
              <>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {/* Quick suggestions with better categorization */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Quick Actions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((suggestion) => (
              <Badge
                key={suggestion.text}
                variant="secondary"
                className="cursor-pointer hover:bg-accent/20 hover:text-accent hover:scale-105 transition-all duration-200 flex items-center gap-1 bg-muted text-muted-foreground border-border"
                onClick={() => handleQuickActionClick(suggestion.path)}
              >
                <span className="text-xs opacity-70">{suggestion.category}</span>
                <span>•</span>
                <span>{suggestion.text}</span>
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground opacity-75">
            💡 Try: "What tools do I need for..." or "Show me procedures for..."
          </div>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-md bg-accent/10 border border-accent/20 text-foreground relative">
            <button
              onClick={() => {
                setResult(null);
                setQuery("");
              }}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-sm"
              aria-label="Close result"
            >
              ✕
            </button>
            <div className="pr-6">
              {result}
            </div>
          </div>
        )}</div>
      </CardContent>
    </Card>
  );
}