
'use server';
/**
 * @fileOverview Enhanced AI ordinance analyzer with comprehensive search capabilities
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeOrdinanceInputSchema = z.object({
  jurisdiction: z.string().describe('The jurisdiction of the ordinance, e.g., "City of Miami" or "Orange County".'),
  query: z.string().describe('The specific ordinance number (e.g., "Sec. 37-28") or a keyword description (e.g., "loud music", "open container").'),
});
export type AnalyzeOrdinanceInput = z.infer<typeof AnalyzeOrdinanceInputSchema>;

const AnalyzeOrdinanceOutputSchema = z.object({
  ordinanceNumber: z.string().describe("The specific, citable ordinance number, e.g., 'Sec. 42-61'. If not found, return 'Not Found'."),
  ordinanceTitle: z.string().describe("The official title of the ordinance. If not found, return 'Not Found'."),
  jurisdiction: z.string().describe("The jurisdiction, e.g., 'City of Fort Pierce'."),
  fullOrdinanceText: z.string().describe("The full, most current and complete text of the ordinance."),
  summary: z.string().describe("A concise, plain-language summary of what the ordinance prohibits or requires."),
  enforcementNotes: z.string().describe("Practical advice for enforcement, key elements to prove for a violation, and common scenarios."),
  penalty: z.string().describe("A description of the penalty (e.g., 'Non-criminal infraction, fine up to $500')."),
  relatedStateStatute: z.string().describe("The corresponding Florida Statute number, if applicable. If not applicable, return 'N/A'."),
  searchConfidence: z.number().describe("Confidence score from 0-100 indicating how certain the AI is about the result."),
  alternativeOrdinances: z.array(z.string()).describe("List of related ordinances that might also be relevant."),
  lastUpdated: z.string().describe("When this ordinance was last updated or verified, if available."),
});
export type AnalyzeOrdinanceOutput = z.infer<typeof AnalyzeOrdinanceOutputSchema>;

export const analyzeOrdinance = ai.defineFlow(
  {
    name: 'analyzeOrdinance',
    inputSchema: AnalyzeOrdinanceInputSchema,
  },
  async (input) => {
    try {
      console.log('Starting enhanced ordinance analysis...', input);
      
      const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        config: {
          maxOutputTokens: 8192,
          temperature: 0.1,
        },
        prompt: `You are a specialized Florida municipal ordinance research assistant. Your task is to find and analyze local ordinances for law enforcement officers.

SEARCH TASK:
Jurisdiction: ${input.jurisdiction}
Query: ${input.query}

INSTRUCTIONS:
1. Search for ordinances related to the query in the specified jurisdiction
2. For alcohol-related queries, look for open container, public consumption, or liquor license violations
3. Provide practical enforcement information
4. If no specific ordinance is found, return "Not Found" for ordinanceNumber and ordinanceTitle
5. Include realistic confidence scores (0-100)
6. Focus on common municipal violations that officers encounter

EXAMPLE ORDINANCES TO CONSIDER:
- Open container in public places
- Consumption of alcohol in parks/streets  
- Disorderly conduct related to alcohol
- Public intoxication ordinances
- Noise ordinances related to bars/establishments

Return a complete analysis with enforcement notes, penalties, and related information. If you cannot find a specific ordinance, be honest about limitations and suggest the officer verify with local code enforcement or city attorney.`,
        output: {
          schema: AnalyzeOrdinanceOutputSchema,
        },
      });

      console.log('Enhanced ordinance analysis completed:', output);
      return output;
      
    } catch (error) {
      console.error('Enhanced ordinance analysis failed:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const isModelError = errorMessage.includes('not found') || errorMessage.includes('NOT_FOUND');
      
      return {
        ordinanceNumber: "Service Error",
        ordinanceTitle: isModelError ? "AI Model Configuration Issue" : "Search Service Unavailable", 
        jurisdiction: input.jurisdiction,
        fullOrdinanceText: isModelError 
          ? "The AI model is not properly configured. Please contact system administrator to resolve the model configuration issue."
          : "The ordinance search service is temporarily unavailable. This may be due to network connectivity issues or service maintenance.",
        summary: isModelError
          ? `AI model configuration error prevented analysis of "${input.query}" in ${input.jurisdiction}. The system needs administrative attention.`
          : `Failed to analyze ordinance "${input.query}" in ${input.jurisdiction}. Service may be temporarily unavailable.`,
        enforcementNotes: isModelError
          ? "System configuration issue detected. Manual verification of ordinances is recommended until service is restored."
          : "Unable to provide enforcement guidance due to service error. Please verify jurisdiction spelling and try again, or consult local code enforcement directly.",
        penalty: "Unknown - Service Error",
        relatedStateStatute: "N/A",
        searchConfidence: 0,
        alternativeOrdinances: [],
        lastUpdated: "Error - Service Unavailable"
      };
    }
  }
);
