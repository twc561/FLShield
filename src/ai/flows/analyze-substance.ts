
'use server';
/**
 * @fileOverview Analyzes a specific controlled substance using an AI model.
 *
 * - analyzeSubstance - A function that fetches and parses substance data.
 * - AnalyzeSubstanceInput - The input type for the function.
 * - AnalyzeSubstanceOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeSubstanceInputSchema = z.object({
  substanceId: z.string().describe('The unique ID of the substance to analyze, e.g., "cocaine" or "fentanyl".'),
});
export type AnalyzeSubstanceInput = z.infer<typeof AnalyzeSubstanceInputSchema>;

const PenaltyThresholdSchema = z.object({
  offense: z.string().describe("The name of the offense, e.g., 'Possession' or 'Trafficking'"),
  weight: z.string().describe("The weight threshold that triggers this penalty, e.g., 'Less than 28 grams' or '28 grams or more'"),
  penalty: z.string().describe("The statutory penalty for this offense, e.g., 'Third-degree felony' or 'First-degree felony with 3-year minimum mandatory'"),
});

const AnalyzeSubstanceOutputSchema = z.object({
  id: z.string().describe("The ID requested, e.g., 'cocaine'"),
  commonName: z.string().describe("The common name of the substance, e.g., 'Cocaine'"),
  streetNames: z.array(z.string()).describe("A comprehensive list of common slang or street names."),
  legalInfo: z.object({
    schedule: z.string().describe("The legal schedule of the drug under Florida law, e.g., 'Schedule II'"),
    controllingStatute: z.string().describe("The primary Florida Statute number that governs this substance, e.g., 'F.S. § 893.13'"),
  }),
  fieldIdentification: z.object({
    title: z.string().default('Field Identification Cues'),
    appearance: z.string().describe("A robust, detailed textual description of the substance's appearance."),
    packaging: z.string().describe("A description of common packaging methods."),
    paraphernalia: z.string().describe("A list of common paraphernalia associated with the substance."),
    commonAdulterants: z.string().describe("A list of common cutting agents or counter-indicators."),
  }),
  userIndicators: z.object({
    title: z.string().default('Signs of Use & Overdose'),
    signsOfUse: z.array(z.string()).describe("An array of observable signs of current impairment or use."),
    overdoseSigns: z.array(z.string()).describe("An array of critical overdose symptoms requiring immediate medical intervention."),
  }),
  penaltyThresholds: z.object({
    title: z.string().default('Possession & Trafficking Penalties (F.S. 893.13 & 893.135)'),
    thresholds: z.array(PenaltyThresholdSchema).describe("An array of objects detailing penalties by weight."),
  }),
  officerSafetyNotes: z.string().describe("Critical safety information for officers handling this substance."),
});
export type AnalyzeSubstanceOutput = z.infer<typeof AnalyzeSubstanceOutputSchema>;


export const analyzeSubstance = ai.defineFlow(
  {
    name: 'analyzeSubstance',
    inputSchema: AnalyzeSubstanceInputSchema,
    outputSchema: AnalyzeSubstanceOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are a Narcotics Identification and Legal Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific controlled substance according to Florida law. For the given ID, retrieve all relevant data and parse it into a practical format for a patrol officer. Your descriptions must be detailed and textual. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema.

Substance ID: ${input.substanceId}`,
      output: {
        schema: AnalyzeSubstanceOutputSchema,
      },
      config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_NONE',
            },
        ],
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
