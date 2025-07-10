
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
  crimeName: z.string().describe('The common name of the crime associated with the statute number.'),
  justification: z.string().describe('A brief justification for why this statute number was chosen based on the crime description.'),
});
export type IdentifyCrimeStatuteOutput = z.infer<typeof IdentifyCrimeStatuteOutputSchema>;

export async function identifyCrimeStatute(input: IdentifyCrimeStatuteInput): Promise<IdentifyCrimeStatuteOutput> {
  return identifyCrimeStatuteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyCrimeStatutePrompt',
  input: { schema: IdentifyCrimeStatuteInputSchema },
  output: { schema: IdentifyCrimeStatuteOutputSchema },
  prompt: `You are an AI paralegal for Florida law. Your task is to identify the single most probable Florida Statute number for the described crime. You must return the statute number, the common crime name, and a brief justification.

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
