'use server';
/**
 * @fileOverview Generates a use-of-force narrative.
 *
 * - generateUofNarrative - A function that generates a narrative.
 * - GenerateUofNarrativeInput - The input type for the function.
 * - GenerateUofNarrativeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateUofNarrativeInputSchema = z.object({
  crime: z.string().describe('The severity of the initial crime.'),
  threat: z.string().describe('The immediate threat to officers or others.'),
  resistance: z.string().describe('The suspect\'s resistance or evasion.'),
  forceUsed: z.string().describe('The level of force used by the officer.'),
});
export type GenerateUofNarrativeInput = z.infer<typeof GenerateUofNarrativeInputSchema>;

const GenerateUofNarrativeOutputSchema = z.object({
  narrative: z.string().describe('The generated use-of-force narrative.'),
});
export type GenerateUofNarrativeOutput = z.infer<typeof GenerateUofNarrativeOutputSchema>;

export const generateUofNarrative = ai.defineFlow(
  {
    name: 'generateUofNarrative',
    inputSchema: GenerateUofNarrativeInputSchema,
    outputSchema: GenerateUofNarrativeOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an AI assistant for a Florida Law Enforcement Officer, specializing in writing police report narratives. Based on the following points structured around the Graham v. Connor factors, synthesize them into a formal, objective, and chronological narrative paragraph. Write in the passive voice.

- Severity of Initial Crime: ${input.crime}
- Immediate Threat to Officer/Others: ${input.threat}
- Suspect's Resistance/Evasion: ${input.resistance}
- Force Used: ${input.forceUsed}

Generate the narrative paragraph now.`,
      output: {
        schema: GenerateUofNarrativeOutputSchema,
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
