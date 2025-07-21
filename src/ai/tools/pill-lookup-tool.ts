
'use server';
/**
 * @fileOverview Defines a Genkit tool for looking up pill information
 * based on visual characteristics. This tool now uses a local, hard-coded
 * database to ensure accuracy and prevent AI hallucinations.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { pillDatabase } from '@/data/specialized-enforcement/pill-database';

const PillLookupInputSchema = z.object({
  imprint: z.string().describe("The letters and/or numbers imprinted on the pill. e.g., 'M 25'"),
  color: z.string().describe("The primary color of the pill. e.g., 'White'"),
  shape: z.string().describe("The shape of the pill. e.g., 'Round'"),
});

const PillLookupOutputSchema = z.object({
  drugName: z.string().describe("The common brand name or generic name of the identified drug. If unknown, return 'Unknown'."),
  primaryUse: z.string().describe("A brief, one-sentence description of what the drug is primarily used for. If unknown, state 'Information not available.'"),
  keyWarnings: z.string().describe("A brief summary of the most critical warnings or potential side effects associated with the drug. If unknown, state 'Information not available.'"),
});

// Simple string similarity function
function similarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1: string, s2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[s2.length][s1.length];
}

export const lookupPill = ai.defineTool(
  {
    name: 'lookupPill',
    description: "Looks up a pill in a local database with exact and fuzzy matching capabilities.",
    inputSchema: PillLookupInputSchema,
    outputSchema: PillLookupOutputSchema,
  },
  async (input) => {
    console.log(`[Pill Lookup Tool] Searching local DB for pill with characteristics: ${JSON.stringify(input)}`);

    const lowercasedInput = {
      imprint: input.imprint.toLowerCase().trim(),
      color: input.color.toLowerCase().trim(),
      shape: input.shape.toLowerCase().trim(),
    };

    // First try exact match
    let foundPill = pillDatabase.find(pill => 
        pill.imprint.toLowerCase() === lowercasedInput.imprint &&
        pill.color.toLowerCase() === lowercasedInput.color &&
        pill.shape.toLowerCase() === lowercasedInput.shape
    );

    if (foundPill) {
      console.log(`[Pill Lookup Tool] Exact match found: ${foundPill.drugName}`);
      return {
        drugName: foundPill.drugName,
        primaryUse: foundPill.primaryUse,
        keyWarnings: foundPill.keyWarnings,
      };
    }

    // If no exact match, try fuzzy matching with high threshold
    const matches = pillDatabase.map(pill => ({
      pill,
      imprintScore: similarity(pill.imprint.toLowerCase(), lowercasedInput.imprint),
      colorScore: similarity(pill.color.toLowerCase(), lowercasedInput.color),
      shapeScore: similarity(pill.shape.toLowerCase(), lowercasedInput.shape),
    })).map(match => ({
      ...match,
      totalScore: (match.imprintScore * 0.5) + (match.colorScore * 0.3) + (match.shapeScore * 0.2)
    })).filter(match => match.totalScore > 0.8) // High threshold for safety
      .sort((a, b) => b.totalScore - a.totalScore);

    if (matches.length > 0) {
      foundPill = matches[0].pill;
      console.log(`[Pill Lookup Tool] Fuzzy match found: ${foundPill.drugName} (score: ${matches[0].totalScore.toFixed(2)})`);
      return {
        drugName: `${foundPill.drugName} (Possible Match)`,
        primaryUse: foundPill.primaryUse,
        keyWarnings: `CAUTION: This is a possible match based on similar characteristics. ${foundPill.keyWarnings}`,
      };
    }

    console.log(`[Pill Lookup Tool] No match found.`);
    return {
      drugName: 'Unknown',
      primaryUse: 'Information not available.',
      keyWarnings: 'Could not identify this pill in the local database. Do not ingest. All unknown substances should be handled as potentially hazardous.',
    };
  }
);
