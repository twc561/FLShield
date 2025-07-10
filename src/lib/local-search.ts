/**
 * @fileOverview A client-side local search service.
 * This service searches the pre-built unifiedSearchIndex to provide
 * fast, accurate results for known content within the application.
 */

import { unifiedSearchIndex, type SearchableItem } from '@/data/search-index';

export type SearchResult = SearchableItem;

// A simple scoring system. Higher is better.
const scoreWeights = {
  title: 10,
  keywords: 5,
  description: 2,
};

export function localSearch(query: string): SearchResult[] {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) return [];

  const resultsWithScores = unifiedSearchIndex.map(item => {
    let score = 0;
    const lowerCaseTitle = item.title.toLowerCase();
    const lowerCaseDescription = item.description.toLowerCase();
    
    // Score based on title match
    if (lowerCaseTitle.includes(lowerCaseQuery)) {
      score += scoreWeights.title;
    }

    // Score based on keywords match
    for (const keyword of item.keywords) {
      if (keyword.toLowerCase().includes(lowerCaseQuery)) {
        score += scoreWeights.keywords;
        break; // Count first keyword match only
      }
    }

    // Score based on description match
    if (lowerCaseDescription.includes(lowerCaseQuery)) {
        score += scoreWeights.description;
    }

    return { item, score };
  });

  // Filter out items with no score and sort by score descending
  const sortedResults = resultsWithScores
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return sortedResults.map(result => result.item);
}
