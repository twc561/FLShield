'use server';

/**
 * @fileOverview Generates a concise summary for a given feature title.
 *
 * - generateFeatureSummary - A function that generates a summary for an application feature.
 * - GenerateFeatureSummaryInput - The input type for the generateFeatureSummary function.
 * - GenerateFeatureSummaryOutput - The return type for the generateFeatureSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateFeatureSummaryInputSchema = z.object({
  title: z.string().describe('The title of the feature to summarize.'),
});
export type GenerateFeatureSummaryInput = z.infer<
  typeof GenerateFeatureSummaryInputSchema
>;

const GenerateFeatureSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('The generated one-sentence summary for the feature.'),
});
export type GenerateFeatureSummaryOutput = z.infer<
  typeof GenerateFeatureSummaryOutputSchema
>;

export async function generateFeatureSummary(
  input: GenerateFeatureSummaryInput
): Promise<GenerateFeatureSummaryOutput> {
  const { output } = await ai.generate({
    prompt: `You are an expert in law enforcement tools. Generate a single, concise sentence to summarize a feature named '${input.title}' for the 'Florida Shield' application.`,
    output: {
      schema: GenerateFeatureSummaryOutputSchema,
    },
  });
    if (!output) {
    throw new Error("AI response was empty.");
  }
  return output;
}
