
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
  identification: PillIdentificationSchema,
  disclaimer: z.string().default('This AI identification is for investigative purposes only. Definitive identification requires laboratory analysis. Always follow proper evidence handling procedures.'),
});
export type IdentifyPillOutput = z.infer<typeof IdentifyPillOutputSchema>;

const identifyPillPrompt = ai.definePrompt({
  name: 'identifyPillPrompt',
  input: { schema: z.object({ imageBase64: z.string(), additionalContext: z.string().optional() }) },
  output: { schema: IdentifyPillOutputSchema },
  prompt: `You are an expert forensic pharmacologist and narcotics identification specialist for Florida law enforcement. Your task is to analyze the provided image of a pill or substance and provide a comprehensive identification assessment.

ANALYSIS REQUIREMENTS:
1. Examine all visible physical characteristics (shape, color, size, markings, texture)
2. Compare against known pharmaceutical and illicit substance databases
3. Consider common street drugs, prescription medications, and counterfeit pills
4. Pay special attention to fentanyl-pressed pills and dangerous substances
5. Provide multiple identification possibilities ranked by likelihood
6. Include detailed safety warnings and handling instructions
7. Reference relevant Florida statutes and controlled substance schedules

CRITICAL FOCUS AREAS:
- Fentanyl-pressed counterfeit pills (extremely dangerous)
- Common prescription medications (Oxycodone, Alprazolam, etc.)
- Street drugs and their common forms
- Pill press characteristics that indicate illicit manufacturing
- Size, shape, color, and imprint analysis
- Safety considerations for officer exposure

ADDITIONAL CONTEXT: {{additionalContext}}

Provide a thorough, detailed analysis that prioritizes officer safety while delivering actionable intelligence for the investigation.

Image: {{media url=imageBase64}}`
});

export const identifyPill = ai.defineFlow(
  {
    name: 'identifyPill',
    inputSchema: IdentifyPillInputSchema,
    outputSchema: IdentifyPillOutputSchema,
  },
  async (input) => {
    const { output } = await identifyPillPrompt({ 
      imageBase64: `data:image/jpeg;base64,${input.imageBase64}`,
      additionalContext: input.additionalContext || 'No additional context provided'
    });

    if (!output || !output.identification) {
      // Provide a safe fallback response
      return {
        identification: {
          primaryIdentification: {
            substanceName: "Unable to identify - requires lab analysis",
            confidence: "Low" as const,
            reasoning: "AI analysis was unable to provide reliable identification from the provided image."
          },
          alternativeIdentifications: [],
          physicalCharacteristics: {
            shape: "Analysis incomplete",
            color: "Analysis incomplete", 
            size: "Analysis incomplete",
            markings: "Analysis incomplete",
            texture: "Analysis incomplete"
          },
          legalClassification: {
            controlledSubstance: false,
            schedule: undefined,
            flStatute: undefined
          },
          fieldSafetyNotes: [
            "Treat all unknown substances as potentially dangerous",
            "Use proper PPE when handling",
            "Avoid direct contact or inhalation"
          ],
          recommendedActions: [
            "Secure evidence properly",
            "Submit for laboratory analysis",
            "Document findings thoroughly"
          ],
          testingRecommendations: {
            fieldTest: "Consult department protocols",
            labAnalysis: true,
            preservationInstructions: "Store in appropriate evidence container, maintain chain of custody"
          },
          warningFlags: ["Unknown substance - exercise extreme caution"]
        },
        disclaimer: "This AI identification is for investigative purposes only. Definitive identification requires laboratory analysis. Always follow proper evidence handling procedures."
      };
    }

    return output;
  }
);

// Export alias for backward compatibility
export const identifyPillFromImage = async (input: { imageDataUri: string; additionalContext?: string }): Promise<IdentifyPillOutput> => {
  // Convert data URI to base64
  const base64data = input.imageDataUri.includes(',') 
    ? input.imageDataUri.split(',')[1] 
    : input.imageDataUri;
  
  return identifyPill({
    imageBase64: base64data,
    additionalContext: input.additionalContext
  });
};
