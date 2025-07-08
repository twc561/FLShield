
'use server';
/**
 * @fileOverview Suggests appropriate Florida Statutes based on a narrative.
 *
 * - suggestCharges - A function that analyzes a narrative and suggests charges.
 * - SuggestChargesInput - The input type for the function.
 * - SuggestChargesOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestChargesInputSchema = z.object({
  narrative: z.string().describe('A factual narrative of a potential crime.'),
});
export type SuggestChargesInput = z.infer<typeof SuggestChargesInputSchema>;

const ChargeSuggestionSchema = z.object({
    statuteNumber: z.string().describe('The specific Florida Statute number (e.g., "810.02").'),
    statuteTitle: z.string().describe('The official title of the statute.'),
    justification: z.string().describe('A brief explanation of which facts from the narrative support this charge.'),
});

const SuggestChargesOutputSchema = z.object({
  suggestions: z.array(ChargeSuggestionSchema).describe('An array of suggested charges.'),
});
export type SuggestChargesOutput = z.infer<typeof SuggestChargesOutputSchema>;

export async function suggestCharges(
  input: SuggestChargesInput
): Promise<SuggestChargesOutput> {
  return suggestChargesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestChargesPrompt',
  input: { schema: SuggestChargesInputSchema },
  output: { schema: SuggestChargesOutputSchema },
  prompt: `You are an expert AI paralegal for Florida law enforcement. Your task is to analyze an incident narrative and suggest the most appropriate Florida Statute(s) to charge. For each suggestion, you must provide the statute number, title, and a brief justification explaining which facts from the narrative support the charge. Return the output as a JSON object containing an array of suggestions.

CRITICAL RULE: Prioritize specific, chargeable offenses over general definitional statutes. Only suggest Florida Statutes. If no charges seem appropriate, return an empty array for the 'suggestions' key.

Narrative:
{{{narrative}}}`,
});

const suggestChargesFlow = ai.defineFlow(
  {
    name: 'suggestChargesFlow',
    inputSchema: SuggestChargesInputSchema,
    outputSchema: SuggestChargesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
