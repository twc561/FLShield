'use server';
/**
 * @fileOverview Defines a Genkit tool for searching local application content.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { localSearch } from '@/lib/local-search';

const SearchResultSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    href: z.string(),
    keywords: z.array(z.string()),
});

export const searchAppContent = ai.defineTool(
  {
    name: 'searchAppContent',
    description: 'Searches the application\'s internal knowledge base for statutes, case law, checklists, and procedural guides. Use this first for any informational query about law enforcement topics.',
    inputSchema: z.object({
      query: z.string().describe("The user's search query, e.g., 'DUI procedure' or 'theft statute'"),
    }),
    outputSchema: z.object({
        results: z.array(SearchResultSchema).describe('An array of search results, or an empty array if no results are found.')
    }),
  },
  async (input) => {
    console.log(`[Local Search Tool] Searching for: ${input.query}`);
    const searchResults = localSearch(input.query);
    // Return the top 3 results to keep the context concise for the LLM
    return { results: searchResults.slice(0, 3) };
  }
);
