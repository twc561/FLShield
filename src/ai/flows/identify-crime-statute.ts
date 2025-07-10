
'use server';
/**
 * @fileOverview A lean AI flow to identify a Florida Statute number from a plain-language crime description.
 *
 * - identifyCrimeStatute - A function that takes a crime description and returns the most likely statute number.
 * - IdentifyCrimeStatuteInput - The input type for the function.
 * - IdentifyCrimeStatuteOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyCrimeStatuteInputSchema = z.object({
  crimeDescription: z.string().describe('A plain-language description of a crime.'),
});
export type IdentifyCrimeStatuteInput = z.infer<typeof IdentifyCrimeStatuteInputSchema>;

const IdentifyCrimeStatuteOutputSchema = z.object({
  statuteNumber: z.string().describe('The most probable Florida Statute number, formatted as XXX.XX (e.g., "810.02").'),
});
export type IdentifyCrimeStatuteOutput = z.infer<typeof IdentifyCrimeStatuteOutputSchema>;

export async function identifyCrimeStatute(input: IdentifyCrimeStatuteInput): Promise<IdentifyCrimeStatuteOutput> {
  return identifyCrimeStatuteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyCrimeStatutePrompt',
  input: { schema: IdentifyCrimeStatuteInputSchema },
  output: { schema: IdentifyCrimeStatuteOutputSchema },
  prompt: `You are an AI paralegal for Florida law. Your only task is to identify the most probable Florida Statute number based on the following description of a crime. Return only the statute number as a string (e.g., "810.02"). Do not add any other text.
Crime Description: {{{crimeDescription}}}`,
});

const identifyCrimeStatuteFlow = ai.defineFlow(
  {
    name: 'identifyCrimeStatuteFlow',
    inputSchema: IdentifyCrimeStatuteInputSchema,
    outputSchema: IdentifyCrimeStatuteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
