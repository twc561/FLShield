
"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { commandSearch } from '@/ai/flows/commandSearch';

const predefinedAnswers: Record<string, string> = {
  "baker act criteria": "To initiate a Baker Act, you need reason to believe the person is mentally ill AND because of that illness they are a danger to self/others OR are self-neglectful. They must also have refused voluntary examination. See Baker Act Guide for full details.",
  "marchman act criteria": "To initiate a Marchman Act, you need evidence the person has lost self-control regarding substance abuse AND as a result, they pose a danger to self/others. See Marchman Act Guide for full details.",
  "dwls with knowledge": "To charge Driving While License Suspended With Knowledge (a criminal offense), you must establish the driver knew their license was suspended. This can be proven by prior citations for DWLS or official DMV mail notifications to their registered address.",
  "graham factors": "The three Graham Factors to judge use of force are: 1. The severity of the crime at issue. 2. Whether the suspect poses an immediate threat to the safety of the officers or others. 3. Whether the suspect is actively resisting arrest or attempting to evade arrest by flight."
};

const AICommandSearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchedQuery(query);
    setResult(null);
    setError(null);
    setIsLoading(true);

    const lowerCaseQuery = query.toLowerCase();
    const predefinedAnswerKey = Object.keys(predefinedAnswers).find(key => lowerCaseQuery.includes(key));

    if (predefinedAnswerKey && predefinedAnswers[predefinedAnswerKey]) {
        setTimeout(() => {
            setResult(predefinedAnswers[predefinedAnswerKey]);
            setIsLoading(false);
        }, 500); // Simulate a quick search
        return;
    }

    try {
      const aiResult = await commandSearch({ query });
      if (aiResult?.answer) {
        setResult(aiResult.answer);
      } else {
        throw new Error("AI returned an empty response.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the AI network. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statutes or case law (e.g., 'Graham v. Connor')"
            className="w-full h-14 pl-6 pr-16 text-lg bg-card/50 border-2 border-border focus:border-primary focus:ring-0 rounded-full outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-transform active:scale-90 disabled:opacity-50"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </form>
       <p className="text-xs text-muted-foreground mt-2 text-center max-w-lg mx-auto">
        For Public Records Only. Do not enter names, license plates, or case numbers.
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
              <p className="mt-2 text-sm">AI is processing your query...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 bg-card/80 border border-border rounded-lg shadow-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-lg text-foreground">AI Briefing for: <span className="italic">"{searchedQuery}"</span></h3>
                </div>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AICommandSearch;
