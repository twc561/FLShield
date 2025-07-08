'use server';
/**
 * @fileOverview Analyzes a local ordinance using AI.
 *
 * - analyzeOrdinance - A function that fetches and parses a local ordinance.
 * - AnalyzeOrdinanceInput - The input type for the function.
 * - AnalyzeOrdinanceOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeOrdinanceInputSchema = z.object({
  jurisdiction: z.string().describe('The jurisdiction of the ordinance, e.g., "City of Miami" or "Orange County".'),
  ordinance_number: z.string().describe('The specific ordinance number, e.g., "Sec. 37-28".'),
});
export type AnalyzeOrdinanceInput = z.infer<typeof AnalyzeOrdinanceInputSchema>;

const AnalyzeOrdinanceOutputSchema = z.object({
  ordinanceNumber: z.string().describe("The specific ordinance number, e.g., 'Sec. 42-61'"),
  ordinanceTitle: z.string().describe("The official title of the ordinance."),
  jurisdiction: z.string().describe("The jurisdiction, e.g., 'City of Fort Pierce'."),
  fullOrdinanceText: z.string().describe("The full, most current and complete text of the ordinance."),
  summary: z.string().describe("A concise, plain-language summary of what the ordinance prohibits or requires."),
  enforcementNotes: z.string().describe("Practical advice, key elements, and common scenarios for a law enforcement officer related to this ordinance."),
  penalty: z.string().describe("A description of the penalty (e.g., 'Non-criminal infraction, fine up to $500', 'Second-degree misdemeanor')."),
  relatedStateStatute: z.string().describe("The corresponding Florida Statute number, if applicable (e.g., 'F.S. § 316.1925'). If not directly applicable, return 'N/A'."),
});
export type AnalyzeOrdinanceOutput = z.infer<typeof AnalyzeOrdinanceOutputSchema>;


export async function analyzeOrdinance(input: AnalyzeOrdinanceInput): Promise<AnalyzeOrdinanceOutput> {
  return analyzeOrdinanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeOrdinancePrompt',
  input: { schema: AnalyzeOrdinanceInputSchema },
  output: { schema: AnalyzeOrdinanceOutputSchema },
  prompt: `You are an expert local government legal analyst AI specializing in Florida municipal and county codes. Your task is to provide a detailed, structured analysis of a specific local ordinance from any city or county in Florida for a law enforcement officer. For the given ordinance number and jurisdiction, retrieve the most current and complete text of the law. Then, parse this information and return it ONLY as a single, well-formed JSON object adhering strictly to the following schema.

Jurisdiction: {{{jurisdiction}}}
Ordinance Number: {{{ordinance_number}}}`,
});

const analyzeOrdinanceFlow = ai.defineFlow(
  {
    name: 'analyzeOrdinanceFlow',
    inputSchema: AnalyzeOrdinanceInputSchema,
    outputSchema: AnalyzeOrdinanceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
