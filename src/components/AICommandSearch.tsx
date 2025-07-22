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
    // Placeholder for actual search logic
    setIsLoading(true);
    setTimeout(() => {
      setResult("This is a dummy result for: " + query);
      setIsLoading(false);
    }, 1500);
  };

  const quickActions = [
    { text: "DUI procedures", category: "Field", path: "/traffic-enforcement/dui-investigation" },
    { text: "Use of force policy", category: "Legal", path: "/reporting-development/use-of-force-wizard" },
    { text: "Miranda rights", category: "Legal", path: "/legal-reference/miranda-warning-guide" },
    { text: "Traffic stop checklist", category: "Field", path: "/field-procedures/scenario-checklists" },
    { text: "Baker Act requirements", category: "Emergency", path: "/emergency-response/baker-act-guide" }
  ];

  return (
    <Card className={`w-full max-w-4xl mx-auto bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 transition-all duration-200 ${isShortcutPressed ? 'ring-2 ring-blue-500 scale-[1.02]' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">AI Command Search</h3>
              <p className="text-sm text-slate-600">Ask me anything about Florida law, procedures, or get quick tool recommendations.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
            <Keyboard className="w-3 h-3" />
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'What are the elements of battery?' or 'Show me DUI procedures'"
              className="pl-10 bg-white/80 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && query.trim() && handleSearch()}
            />
            {query && (
              <button
                onClick={() => {setQuery(""); setResult(null)}}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
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
            <span className="text-xs font-medium text-slate-700">Quick Actions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((suggestion) => (
              <Badge
                key={suggestion.text}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 hover:scale-105 transition-all duration-200 flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200"
                onClick={() => router.push(suggestion.path)}
              >
                <span className="text-xs opacity-70">{suggestion.category}</span>
                <span>•</span>
                <span>{suggestion.text}</span>
              </Badge>
            ))}
          </div>
          <div className="text-xs text-slate-600 opacity-75">
            💡 Try: "What tools do I need for..." or "Show me procedures for..."
          </div>
        </div>

        {result && (
          <div className="mt-4 p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}