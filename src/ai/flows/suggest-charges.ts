
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestChargesInputSchema = z.object({
  narrative: z.string().describe('The incident narrative describing the facts and circumstances'),
});
export type SuggestChargesInput = z.infer<typeof SuggestChargesInputSchema>;

const ChargeSuggestionSchema = z.object({
  statuteNumber: z.string().describe('The Florida Statute number, e.g., "812.014"'),
  statuteTitle: z.string().describe('The title of the statute, e.g., "Theft"'),
  justification: z.string().describe('Detailed explanation of why this charge applies based on the narrative facts'),
});

const SuggestChargesOutputSchema = z.object({
  suggestions: z.array(ChargeSuggestionSchema).describe('Array of suggested charges with justifications'),
});
export type SuggestChargesOutput = z.infer<typeof SuggestChargesOutputSchema>;

export const suggestCharges = ai.defineFlow(
  {
    name: 'suggestCharges',
    inputSchema: SuggestChargesInputSchema,
    outputSchema: SuggestChargesOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an expert Florida law enforcement legal analyst specializing in criminal charge recommendations. Your task is to analyze the provided incident narrative and suggest appropriate Florida criminal charges based on the facts presented.

INSTRUCTIONS:
1. Carefully analyze the narrative for criminal elements
2. Match facts to specific Florida Statutes
3. Only suggest charges where there is clear evidence in the narrative
4. Provide detailed justifications linking narrative facts to statutory elements
5. Focus on the most appropriate and prosecutable charges
6. If no clear criminal activity is described, return an empty suggestions array

INCIDENT NARRATIVE:
${input.narrative}

Analyze this narrative and suggest appropriate Florida criminal charges. Be thorough but only suggest charges that are clearly supported by the facts presented.`,
      output: {
        schema: SuggestChargesOutputSchema,
      },
      config: {
        maxOutputTokens: 8192, // Increased token limit significantly
        temperature: 0.3, // Lower temperature for more consistent legal analysis
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
        ],
        stopSequences: [], // Remove any stop sequences that might truncate output
      },
    });

    // Validate output and provide fallback
    if (!output || !output.suggestions) {
      return {
        suggestions: []
      };
    }

    return output;
  }
);
