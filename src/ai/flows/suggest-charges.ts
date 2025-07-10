
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
  const { output } = await ai.generate({
    prompt: `You are an expert AI paralegal with a specialization in Florida's criminal code, specifically assisting law enforcement officers in the field. Your task is to analyze an incident narrative and identify only the specific, chargeable Florida Statutes that a patrol officer would use.

Your focus must be on chargeable criminal and traffic offenses. Exclude administrative statutes, definitional chapters, or rules of procedure unless they represent a directly chargeable crime.

For each suggestion, provide the statute number, its official title, and a brief justification explaining which facts from the narrative support the charge. Return the output as a JSON object containing an array of suggestions.

CRITICAL RULE: If no charges seem appropriate from the narrative, you MUST return an empty array for the 'suggestions' key.

Narrative:
${input.narrative}`,
    output: {
      schema: SuggestChargesOutputSchema,
    },
  });
  return output!;
}
