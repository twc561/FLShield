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
    if (!query.trim()) return

    setIsLoading(true)
    setResult("")

    try {
      // Add timeout to prevent hanging
      const searchPromise = (async () => {
        const { streamCommandSearch } = await import('@/ai/flows/commandSearch');
        
        let hasReceivedContent = false;
        try {
          // Ensure we're properly handling the async generator
          const streamGenerator = streamCommandSearch({ query });
          
          // Check if it's actually iterable
          if (streamGenerator && typeof streamGenerator[Symbol.asyncIterator] === 'function') {
            for await (const chunk of streamGenerator) {
              if (chunk && typeof chunk === 'string') {
                hasReceivedContent = true;
                setResult(prev => (prev || '') + chunk);
              }
            }
          } else {
            // Fallback if streaming doesn't work
            const { getCommandSearchResponse } = await import('@/ai/flows/commandSearch');
            const response = await getCommandSearchResponse({ query });
            if (response.answer) {
              hasReceivedContent = true;
              setResult(response.answer);
            }
          }
        } catch (streamError) {
          console.error('Streaming error, falling back to non-streaming:', streamError);
          // Fallback to non-streaming
          const { getCommandSearchResponse } = await import('@/ai/flows/commandSearch');
          const response = await getCommandSearchResponse({ query });
          if (response.answer) {
            hasReceivedContent = true;
            setResult(response.answer);
          }
        }

        // If no content was received, show a fallback message
        if (!hasReceivedContent) {
          setResult("No response received. Please try rephrasing your question or check your internet connection.");
        }
      })();

      // Timeout after 30 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 30000);
      });

      await Promise.race([searchPromise, timeoutPromise]);

    } catch (error) {
      console.error("Search failed:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('timed out')) {
          setResult("Request timed out. Please try a shorter question or try again later.");
        } else if (error.message.includes('fetch')) {
          setResult("Network error: Please check your internet connection and try again.");
        } else if (error.message.includes('import')) {
          setResult("Loading error: Please refresh the page and try again.");
        } else {
          setResult(`Error: ${error.message}. Please try again.`);
        }
      } else {
        setResult("I encountered an unexpected error. Please refresh the page and try again.");
      }
    } finally {
      setIsLoading(false)
    }
  };

  const quickActions = [
    { text: "DUI procedures", category: "Field", path: "/traffic-enforcement/dui-investigation" },
    { text: "Use of force policy", category: "Legal", path: "/reporting-development/use-of-force-wizard" },
    { text: "Miranda rights", category: "Legal", path: "/legal-reference/miranda-warning-guide" },
    { text: "Traffic stop checklist", category: "Field", path: "/field-procedures/scenario-checklists" },
    { text: "Baker Act requirements", category: "Emergency", path: "/emergency-response/baker-act-guide" }
  ];

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
                onClick={() => router.push(suggestion.path)}
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
          <div className="mt-4 p-4 rounded-md bg-accent/10 border border-accent/20 text-foreground">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}