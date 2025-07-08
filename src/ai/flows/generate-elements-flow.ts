'use server';
/**
 * @fileOverview Generates the elements of a crime for a given statute.
 *
 * - generateElementsOfCrime - A function that generates the elements of a crime.
 * - GenerateElementsOfCrimeInput - The input type for the function.
 * - GenerateElementsOfCrimeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateElementsOfCrimeInputSchema = z.object({
  statuteCode: z.string().describe('The code of the statute, e.g., "F.S. § 812.014".'),
  statuteTitle: z.string().describe('The title of the statute, e.g., "Theft".'),
  statuteText: z.string().describe('The full text or a detailed description of the statute.'),
});
export type GenerateElementsOfCrimeInput = z.infer<typeof GenerateElementsOfCrimeInputSchema>;

const GenerateElementsOfCrimeOutputSchema = z.object({
  elements: z.string().describe('A concise, bulleted or numbered list of the essential elements of the crime. If not a criminal statute, it should state that.'),
});
export type GenerateElementsOfCrimeOutput = z.infer<typeof GenerateElementsOfCrimeOutputSchema>;

export async function generateElementsOfCrime(
  input: GenerateElementsOfCrimeInput
): Promise<GenerateElementsOfCrimeOutput> {
  return generateElementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateElementsPrompt',
  input: { schema: GenerateElementsOfCrimeInputSchema },
  output: { schema: GenerateElementsOfCrimeOutputSchema },
  prompt: `You are an expert paralegal specializing in Florida criminal law. Your task is to analyze the provided Florida Statute and extract its essential elements.

Statute Code: {{{statuteCode}}}
Statute Title: {{{statuteTitle}}}
Statute Description: {{{statuteText}}}

Based on the provided information, generate a concise, bulleted or numbered list of the essential elements of the crime that a prosecutor must prove beyond a reasonable doubt.

If the provided statute does not define a criminal offense (e.g., it is a definition or classification statute), simply state that it does not define a specific crime. Do not invent elements.`,
});

const generateElementsFlow = ai.defineFlow(
  {
    name: 'generateElementsFlow',
    inputSchema: GenerateElementsOfCrimeInputSchema,
    outputSchema: GenerateElementsOfCrimeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
