
'use server';
/**
 * @fileOverview Defines a Genkit tool for looking up pill information
 * based on visual characteristics. This simulates a call to a reliable
 * drug database.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PillLookupInputSchema = z.object({
  imprint: z.string().describe("The letters and/or numbers imprinted on the pill. e.g., 'E 7'"),
  color: z.string().describe("The primary color of the pill. e.g., 'White'"),
  shape: z.string().describe("The shape of the pill. e.g., 'Round'"),
});

const PillLookupOutputSchema = z.object({
  drugName: z.string().describe("The common brand name or generic name of the identified drug. If unknown, return 'Unknown'."),
  primaryUse: z.string().describe("A brief, one-sentence description of what the drug is primarily used for. If unknown, state 'Information not available.'"),
  keyWarnings: z.string().describe("A brief summary of the most critical warnings or potential side effects associated with the drug. If unknown, state 'Information not available.'"),
});

const pillDBPrompt = ai.definePrompt(
  {
    name: "pillDBPrompt",
    input: { schema: PillLookupInputSchema },
    output: { schema: PillLookupOutputSchema },
    prompt: `You are a pill identification database API. Your ONLY function is to take an imprint, color, and shape, and return the corresponding drug information from your internal knowledge base which is sourced from FDA data. Your knowledge base includes all common prescription medications, both controlled and non-controlled substances (e.g., blood pressure medication, antibiotics, pain relievers).
    
CRITICAL RULES:
1. You MUST only use the provided characteristics to find an EXACT match in your database. Identify the pill regardless of whether it is a controlled substance or not.
2. If the combination of imprint, color, and shape does not match a known drug in your database EXACTLY, you MUST return 'Unknown' for 'drugName' and 'Information not available' for all other fields.
3. DO NOT GUESS. DO NOT INFER. DO NOT PROVIDE A 'CLOSEST MATCH'. Your only job is to return exact data or state that it is unknown.

Database query for pill with imprint '{{{imprint}}}', color '{{{color}}}', and shape '{{{shape}}}'.`
  }
);


export const lookupPill = ai.defineTool(
  {
    name: 'lookupPill',
    description: "Looks up a pill in a reliable drug database (e.g., NLM Pillbox, Drugs.com) based on its physical characteristics and returns structured information.",
    inputSchema: PillLookupInputSchema,
    outputSchema: PillLookupOutputSchema,
  },
  async (input) => {
    // In a real application, this would make an external API call to a service like the NLM Pillbox API.
    // For this simulation, we use a highly constrained AI prompt to act like a database.
    console.log(`[Pill Lookup Tool] Looking up pill with characteristics: ${JSON.stringify(input)}`);

    const { output } = await pillDBPrompt(input);

    return output!;
  }
);
