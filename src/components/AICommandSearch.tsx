
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader, Sparkles, AlertTriangle, FileText, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { commandSearch } from '@/ai/flows/commandSearch';
import { localSearch, type SearchResult } from '@/lib/local-search';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const AICommandSearch = () => {
  const [query, setQuery] = useState('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [localResults, setLocalResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchedQuery(query);
    setLocalResults([]);
    setAiResult(null);
    setError(null);
    setIsLoading(true);

    // Step 1: Perform local search first
    const localMatches = localSearch(query);

    if (localMatches.length > 0) {
      setLocalResults(localMatches.slice(0, 5)); // Show top 5 local results
      setIsLoading(false);
      return;
    }

    // Step 2: If no local results, fall back to AI search
    try {
      const result = await commandSearch({ query });
      if (result?.answer) {
        setAiResult(result.answer);
      } else {
        throw new Error("AI returned an empty response.");
      }
    } catch (err) {
      console.error(err);
      setError("The local search found no matches, and the AI network appears to be unavailable. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setLocalResults([]);
    setAiResult(null);
    setError(null);
    setSearchedQuery('');
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statutes, case law, procedures, or ask the AI..."
            className="w-full h-14 pl-6 pr-16 text-lg bg-card/50 border-2 border-border focus:border-primary focus:ring-0 rounded-full outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-transform active:scale-90 disabled:opacity-50"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <SearchIcon className="w-5 h-5" />}
          </button>
        </div>
      </form>
       <p className="text-xs text-muted-foreground mt-2 text-center max-w-lg mx-auto">
        This is a hybrid search. It checks local guides first, then asks the AI. For Public Records Only.
      </p>

      <div className="mt-6">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center text-muted-foreground py-8"
            >
              <Loader className="w-8 h-8 animate-spin text-primary" />
              <p className="mt-2 text-sm">Searching all sources...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive flex flex-col items-center gap-3"
            >
                <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5" /> <p className="font-semibold">Search Error</p></div>
                <p className='text-center'>{error}</p>
                <Button variant="destructive" onClick={handleReset}>Clear Search</Button>
            </motion.div>
          )}

          {localResults.length > 0 && !isLoading && (
             <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
               <div className="p-4 bg-card/80 border border-border rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg text-foreground mb-4">Top Local Results for: <span className="italic">"{searchedQuery}"</span></h3>
                <div className='space-y-3'>
                    {localResults.map(item => (
                        <Link href={item.href} key={item.id}>
                             <div className="p-3 border rounded-md hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground/90">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Badge variant="secondary">{item.category}</Badge>
                            </div>
                        </Link>
                    ))}
                </div>
                 <div className='text-center mt-4'>
                    <Button variant="ghost" onClick={handleReset}>Clear Search</Button>
                 </div>
              </div>
            </motion.div>
          )}

          {aiResult && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 bg-card/80 border border-border rounded-lg shadow-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">AI Briefing for: <span className="italic">"{searchedQuery}"</span></h3>
                    <p className='text-xs text-muted-foreground'>No local results found. This answer was generated by AI.</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{aiResult}</p>
                <div className='text-center mt-4'>
                    <Button variant="ghost" onClick={handleReset}>Clear Search</Button>
                 </div>
              </div>
            </motion.div>
          )}

          {!isLoading && localResults.length === 0 && !aiResult && searchedQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-muted/50 border rounded-lg text-muted-foreground flex flex-col items-center gap-3 text-center"
              >
                  <FileText className="w-8 h-8" />
                  <p className="font-semibold">No results found for "{searchedQuery}"</p>
                  <p className="text-sm">Please try a different search term.</p>
                  <Button variant="ghost" onClick={handleReset}>Clear Search</Button>
              </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default AICommandSearch;
