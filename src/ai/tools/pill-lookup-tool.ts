
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

export const lookupPill = ai.defineTool(
  {
    name: 'lookupPill',
    description: "Looks up a pill in a local, hard-coded database based on its physical characteristics. This tool is deterministic and accurate for its known data set.",
    inputSchema: PillLookupInputSchema,
    outputSchema: PillLookupOutputSchema,
  },
  async (input) => {
    console.log(`[Pill Lookup Tool] Searching local DB for pill with characteristics: ${JSON.stringify(input)}`);

    const lowercasedInput = {
      imprint: input.imprint.toLowerCase(),
      color: input.color.toLowerCase(),
      shape: input.shape.toLowerCase(),
    };

    const foundPill = pillDatabase.find(pill => 
        pill.imprint.toLowerCase() === lowercasedInput.imprint &&
        pill.color.toLowerCase() === lowercasedInput.color &&
        pill.shape.toLowerCase() === lowercasedInput.shape
    );

    if (foundPill) {
      console.log(`[Pill Lookup Tool] Found match: ${foundPill.drugName}`);
      return {
        drugName: foundPill.drugName,
        primaryUse: foundPill.primaryUse,
        keyWarnings: foundPill.keyWarnings,
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
