
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
    config: {
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1,
        topP: 0.95,
        topK: 40,
      }
    }
  },
  async (input) => {
    try {
      console.log('Starting enhanced ordinance analysis...', input);
      
      const { output } = await ai.generate({
        model: 'gemini-1.5-pro',
        config: {
          maxOutputTokens: 8192,
          temperature: 0.1,
        },
        prompt: `You are an elite legal research AI specializing in Florida municipal and county ordinances. You have access to comprehensive databases of local government codes and regulations. Your task is to perform a thorough analysis of ordinances for law enforcement officers.

ENHANCED SEARCH METHODOLOGY:
1. **Primary Search Sources:**
   - Official municipal/county websites with searchable codes
   - Municode.com comprehensive database
   - American Legal Publishing (library.amlegal.com)
   - Code Publishing Company databases
   - Franklin Legal Publishing systems
   - General Code LLC platforms

2. **Search Strategy:**
   - For specific ordinance numbers: Find exact match with current text
   - For keywords: Search multiple related terms and synonyms
   - Cross-reference with state statutes for consistency
   - Verify ordinance is current and not repealed
   - Check for recent amendments or updates

3. **Quality Assurance:**
   - Verify the ordinance exists in official sources
   - Ensure text is complete and current
   - Cross-check penalty information
   - Validate enforcement procedures
   - Identify related ordinances

CRITICAL REQUIREMENTS:
- If you cannot find ANY relevant ordinance after exhaustive search, return "Not Found" for ordinanceNumber and ordinanceTitle
- Provide realistic confidence scores based on source quality
- Include alternative ordinances when multiple options exist
- Focus on enforceable violations, not administrative procedures
- Ensure all information is accurate and up-to-date

JURISDICTION: ${input.jurisdiction}
QUERY: ${input.query}

Perform a comprehensive search using all available resources. Return valid JSON matching the schema exactly.`,
        output: {
          schema: AnalyzeOrdinanceOutputSchema,
        },
      });

      console.log('Enhanced ordinance analysis completed:', output);
      return output;
      
    } catch (error) {
      console.error('Enhanced ordinance analysis failed:', error);
      
      return {
        ordinanceNumber: "Analysis Error",
        ordinanceTitle: "Service Unavailable",
        jurisdiction: input.jurisdiction,
        fullOrdinanceText: "The enhanced AI analysis service encountered a technical error and could not retrieve the ordinance information at this time.",
        summary: `Failed to analyze ordinance "${input.query}" in ${input.jurisdiction}. This may be due to network issues, database unavailability, or service overload.`,
        enforcementNotes: "Unable to provide enforcement guidance due to analysis error. Please verify the jurisdiction spelling and ordinance details manually, or try again later.",
        penalty: "Unknown - Analysis Error",
        relatedStateStatute: "N/A",
        searchConfidence: 0,
        alternativeOrdinances: [],
        lastUpdated: "Error - Unable to determine"
      };
    }
  }
);
