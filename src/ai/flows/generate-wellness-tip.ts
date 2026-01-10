'use server';

/**
 * @fileOverview Generates a wellness tip for law enforcement officers.
 *
 * - generateWellnessTip - A function that generates a contextual wellness tip.
 * - GenerateWellnessTipInput - The input type for the generateWellnessTip function.
 * - GenerateWellnessTipOutput - The return type for the generateWellnessTip function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateWellnessTipInputSchema = z.object({
  topic: z.string().optional().describe('An optional topic for the wellness tip (e.g., stress, sleep, nutrition).'),
});
export type GenerateWellnessTipInput = z.infer<typeof GenerateWellnessTipInputSchema>;

const GenerateWellnessTipOutputSchema = z.object({
  tip: z.string().describe('The generated wellness tip.'),
  topic: z.string().describe('The topic of the generated tip.'),
});
export type GenerateWellnessTipOutput = z.infer<typeof GenerateWellnessTipOutputSchema>;

export const generateWellnessTip = ai.defineFlow(
  {
    name: 'generateWellnessTip',
    inputSchema: GenerateWellnessTipInputSchema,
    outputSchema: GenerateWellnessTipOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an expert on occupational health and wellness for law enforcement officers, with specific knowledge of the unique challenges faced by officers in Florida. These challenges include high heat and humidity, hurricane season preparedness and response, interactions with a large tourist population, and specific regional crime trends.

Generate a single, actionable, and concise wellness tip for a Florida law enforcement officer.
The tip should be practical and easy to implement during or after a shift.
${input.topic ? `The tip should be related to the topic of: ${input.topic}.` : 'The tip can be about any of the following topics: stress management, physical fitness, nutrition, sleep hygiene, mental resilience, or peer support.'}

Return the tip and the general topic it falls under (e.g., Stress Management, Nutrition, Sleep).`,
      output: {
        schema: GenerateWellnessTipOutputSchema,
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
