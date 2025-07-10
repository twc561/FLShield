'use server';
/**
 * @fileOverview Analyzes a local ordinance using AI based on a jurisdiction and a keyword or ordinance number.
 *
 * - analyzeOrdinance - A function that fetches and parses a local ordinance.
 * - AnalyzeOrdinanceInput - The input type for the function.
 * - AnalyzeOrdinanceOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeOrdinanceInputSchema = z.object({
  jurisdiction: z.string().describe('The jurisdiction of the ordinance, e.g., "City of Miami" or "Orange County".'),
  query: z.string().describe('The specific ordinance number (e.g., "Sec. 37-28") or a keyword description of the ordinance (e.g., "loud music" or "open container").'),
});
export type AnalyzeOrdinanceInput = z.infer<typeof AnalyzeOrdinanceInputSchema>;

const AnalyzeOrdinanceOutputSchema = z.object({
  ordinanceNumber: z.string().describe("The specific, citable ordinance number, e.g., 'Sec. 42-61'. If not found, return 'Not Found'."),
  ordinanceTitle: z.string().describe("The official title of the ordinance. If not found, return 'Not Found'."),
  jurisdiction: z.string().describe("The jurisdiction, e.g., 'City of Fort Pierce'."),
  fullOrdinanceText: z.string().describe("The full, most current and complete text of the ordinance."),
  summary: z.string().describe("A concise, plain-language summary of what the ordinance prohibits or requires."),
  enforcementNotes: z.string().describe("Practical advice for enforcement, key elements to prove for a violation, and common scenarios for a law enforcement officer related to this ordinance."),
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
  prompt: `You are an expert local government legal analyst AI specializing in Florida municipal and county codes. Your primary user is a law enforcement officer who needs to understand and enforce local laws. Your task is to find the single most relevant, chargeable ordinance based on a user's query and provide a detailed, structured analysis for that officer.

CRITICAL INSTRUCTIONS:
1.  **Focus on Enforceable Violations:** Prioritize ordinances that define a specific, chargeable violation that a patrol officer would cite or make an arrest for. Avoid purely administrative or zoning ordinances unless they are directly relevant to a common enforcement action.
2.  **Prioritize Specificity:** If the user's query looks like an ordinance number (e.g., "Sec. 32-101", "16-31"), you MUST find that exact ordinance. Ensure the \`ordinanceNumber\` in the output is the full, precise number.
3.  **Handle Keywords Carefully:** If the user's query is a keyword (e.g., "loud music", "alcohol"), find the single most specific and primary ordinance that directly addresses that keyword for the given jurisdiction. For "alcohol", this is likely the "open container" ordinance.
4.  **Handle 'Not Found' Gracefully**: If after a thorough search you genuinely cannot find a relevant, chargeable ordinance for the user's keyword or number in the specified jurisdiction, you must return a valid JSON object where the 'ordinanceNumber' and 'ordinanceTitle' fields are 'Not Found' and the 'summary' field explains that no specific ordinance could be located for the query. Do not invent an ordinance.

For the given jurisdiction and query, retrieve the most current and complete text of the most relevant law. Then, parse this information and return it ONLY as a single, well-formed JSON object adhering strictly to the required schema.

Jurisdiction: {{{jurisdiction}}}
Query: {{{query}}}`,
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
