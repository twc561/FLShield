
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyPillInputSchema = z.object({
  imageBase64: z.string().describe('Base64 encoded image of the pill/substance'),
  additionalContext: z.string().optional().describe('Any additional context about where/how the pill was found'),
});
export type IdentifyPillInput = z.infer<typeof IdentifyPillInputSchema>;

const PillIdentificationSchema = z.object({
  primaryIdentification: z.object({
    substanceName: z.string().describe('Most likely substance name'),
    confidence: z.enum(['High', 'Medium', 'Low']).describe('Confidence level in identification'),
    reasoning: z.string().describe('Detailed explanation of identification reasoning'),
  }),
  alternativeIdentifications: z.array(z.object({
    substanceName: z.string(),
    confidence: z.enum(['High', 'Medium', 'Low']),
    reasoning: z.string(),
  })).describe('Other possible identifications in order of likelihood'),
  physicalCharacteristics: z.object({
    shape: z.string().describe('Detailed shape description'),
    color: z.string().describe('Detailed color description'),
    size: z.string().describe('Estimated size'),
    markings: z.string().describe('Any visible markings, imprints, or scores'),
    texture: z.string().describe('Surface texture observations'),
  }),
  legalClassification: z.object({
    controlledSubstance: z.boolean().describe('Whether this appears to be a controlled substance'),
    schedule: z.string().optional().describe('DEA/Florida schedule if controlled'),
    flStatute: z.string().optional().describe('Relevant Florida statute number'),
  }),
  fieldSafetyNotes: z.array(z.string()).describe('Critical safety considerations for officers'),
  recommendedActions: z.array(z.string()).describe('Recommended next steps for the officer'),
  testingRecommendations: z.object({
    fieldTest: z.string().optional().describe('Recommended field test if available'),
    labAnalysis: z.boolean().describe('Whether lab analysis is recommended'),
    preservationInstructions: z.string().describe('How to properly preserve the evidence'),
  }),
  warningFlags: z.array(z.string()).describe('Any red flags or special concerns (fentanyl, etc.)'),
});

const IdentifyPillOutputSchema = z.object({
  drugName: z.string().describe('The identified drug name or "Unknown" if not identifiable'),
  visualDescription: z.string().describe('Detailed visual description of the pill'),
  primaryUse: z.string().describe('Primary medical use of the identified substance'),
  keyWarnings: z.string().describe('Key warnings and safety information'),
});
export type IdentifyPillOutput = z.infer<typeof IdentifyPillOutputSchema>;

export const identifyPill = ai.defineFlow(
  {
    name: 'identifyPill',
    inputSchema: IdentifyPillInputSchema,
    outputSchema: IdentifyPillOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an expert forensic pharmacologist analyzing a pill/substance for law enforcement identification. 

Analyze the image and provide:
1. drugName: The most likely substance name, or "Unknown" if unidentifiable
2. visualDescription: Detailed description of shape, color, size, markings, texture
3. primaryUse: What this substance is typically used for medically
4. keyWarnings: Critical safety information and warnings

Focus on officer safety and accurate identification. If uncertain, state "Unknown" for drugName.

ADDITIONAL CONTEXT: ${input.additionalContext || 'No additional context provided'}`,
      media: {
        url: `data:image/jpeg;base64,${input.imageBase64}`,
      },
      output: {
        schema: IdentifyPillOutputSchema,
      },
      config: {
        maxOutputTokens: 12288, // Significantly increased token limit
        temperature: 0.2, // Low temperature for consistent analysis
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
      },
    });

    if (!output) {
      // Provide a safe fallback response
      return {
        drugName: "Unknown",
        visualDescription: "Unable to analyze the provided image",
        primaryUse: "Information not available",
        keyWarnings: "Unknown substance - exercise extreme caution. Do not ingest. Use proper PPE when handling."
      };
    }

    return output;
  }
);

// Wrapper function that matches the expected interface
export async function identifyPillFromImage(params: { imageDataUri: string }) {
  // Convert data URI to base64
  const base64 = params.imageDataUri.split(',')[1] || params.imageDataUri;
  
  return await identifyPill({
    imageBase64: base64,
    additionalContext: undefined
  });
}
