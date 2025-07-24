
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const EnhancedSuggestChargesInputSchema = z.object({
  narrative: z.string().describe('The detailed incident narrative'),
  evidenceDescriptions: z.array(z.string()).optional().describe('Descriptions of physical evidence from uploaded files'),
  location: z.string().optional().describe('Location details of the incident'),
  timeFactors: z.string().optional().describe('Time-related factors'),
  witnesses: z.array(z.string()).optional().describe('Witness statements or observations'),
  suspectHistory: z.string().optional().describe('Relevant criminal history of the suspect'),
  analysisMode: z.enum(['basic', 'comprehensive', 'court-ready']).describe('Depth of analysis requested'),
});
export type EnhancedSuggestChargesInput = z.infer<typeof EnhancedSuggestChargesInputSchema>;

const EnhancedChargeSuggestionSchema = z.object({
  statuteNumber: z.string().describe('The Florida Statute number'),
  statuteTitle: z.string().describe('The title of the statute'),
  degree: z.string().describe('The degree of the charge (e.g., Third-degree Felony)'),
  justification: z.string().describe('Detailed explanation linking evidence to statutory elements'),
  strengthOfCase: z.enum(['Strong', 'Moderate', 'Weak']).describe('Assessment of case strength'),
  requiredElements: z.array(z.string()).describe('Required elements and how they are met'),
  potentialDefenses: z.array(z.string()).optional().describe('Potential defense arguments to consider'),
  evidenceNeeded: z.array(z.string()).optional().describe('Additional evidence that would strengthen the case'),
  enhancementFactors: z.array(z.string()).optional().describe('Factors that could enhance the charge'),
  prosecutorialNotes: z.string().optional().describe('Notes for prosecutor consideration'),
});

const EnhancedSuggestChargesOutputSchema = z.object({
  primaryCharges: z.array(EnhancedChargeSuggestionSchema).describe('Primary recommended charges'),
  alternativeCharges: z.array(EnhancedChargeSuggestionSchema).optional().describe('Alternative or lesser charges to consider'),
  enhancementOpportunities: z.array(z.string()).optional().describe('Sentence enhancement opportunities'),
  investigationRecommendations: z.array(z.string()).optional().describe('Additional investigative steps'),
  courtReadyPackage: z.object({
    elementsMatrix: z.array(z.object({
      element: z.string(),
      evidence: z.string(),
      strength: z.enum(['Proven', 'Likely', 'Questionable'])
    })).optional(),
    witnessStrategy: z.array(z.string()).optional(),
    evidenceChainOfCustody: z.array(z.string()).optional(),
    motionAnticipation: z.array(z.string()).optional(),
  }).optional().describe('Court-ready prosecution package'),
  riskAssessment: z.object({
    flightRisk: z.enum(['Low', 'Medium', 'High']).optional(),
    publicSafetyRisk: z.enum(['Low', 'Medium', 'High']).optional(),
    recommendedBond: z.string().optional(),
  }).optional().describe('Risk assessment for booking/bond decisions'),
});
export type EnhancedSuggestChargesOutput = z.infer<typeof EnhancedSuggestChargesOutputSchema>;

export const suggestChargesEnhanced = ai.defineFlow(
  {
    name: 'suggestChargesEnhanced',
    inputSchema: EnhancedSuggestChargesInputSchema,
    outputSchema: EnhancedSuggestChargesOutputSchema,
  },
  async (input) => {
    const contextualPrompt = buildContextualPrompt(input);
    
    const { output } = await ai.generate({
      prompt: contextualPrompt,
      output: {
        schema: EnhancedSuggestChargesOutputSchema,
      },
      config: {
        maxOutputTokens: 16384,
        temperature: 0.2,
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

    return output || { primaryCharges: [], alternativeCharges: [] };
  }
);

function buildContextualPrompt(input: EnhancedSuggestChargesInput): string {
  let prompt = `You are an elite Florida criminal law AI prosecutor and legal strategist with decades of experience. Your task is to provide ${input.analysisMode} charging analysis.

INCIDENT NARRATIVE:
${input.narrative}`;

  if (input.evidenceDescriptions?.length) {
    prompt += `\n\nPHYSICAL EVIDENCE ANALYSIS:
${input.evidenceDescriptions.join('\n')}`;
  }

  if (input.location) {
    prompt += `\n\nLOCATION FACTORS:
${input.location}`;
  }

  if (input.timeFactors) {
    prompt += `\n\nTIME-RELATED FACTORS:
${input.timeFactors}`;
  }

  if (input.witnesses?.length) {
    prompt += `\n\nWITNESS INFORMATION:
${input.witnesses.join('\n')}`;
  }

  if (input.suspectHistory) {
    prompt += `\n\nSUSPECT CRIMINAL HISTORY:
${input.suspectHistory}`;
  }

  switch (input.analysisMode) {
    case 'basic':
      prompt += `\n\nPROVIDE BASIC ANALYSIS: Focus on the most obvious charges with clear justifications.`;
      break;
    case 'comprehensive':
      prompt += `\n\nPROVIDE COMPREHENSIVE ANALYSIS: Include primary charges, alternatives, enhancements, potential defenses, and investigative recommendations.`;
      break;
    case 'court-ready':
      prompt += `\n\nPROVIDE COURT-READY PROSECUTION PACKAGE: Include all comprehensive elements plus detailed elements matrix, witness strategy, evidence chain requirements, anticipated defense motions, and risk assessment for booking decisions.`;
      break;
  }

  prompt += `\n\nAnalyze every aspect systematically. Consider charge stacking opportunities, sentence enhancements, and potential plea negotiations. Your analysis should be prosecution-minded but fair and accurate.`;

  return prompt;
}
