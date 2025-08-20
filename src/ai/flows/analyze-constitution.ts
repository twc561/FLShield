
'use server';
/**
 * @fileOverview Analyzes a constitutional provision using an AI model.
 *
 * - analyzeConstitution - A function that fetches and parses a constitutional provision.
 * - AnalyzeConstitutionInput - The input type for the function.
 * - AnalyzeConstitutionOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeConstitutionInputSchema = z.object({
  provisionId: z.string().describe('The unique ID of the constitutional provision to analyze, e.g., "US_AMENDMENT_4" or "FL_ARTICLE_1_SEC_12".'),
});
export type AnalyzeConstitutionInput = z.infer<typeof AnalyzeConstitutionInputSchema>;

const LandmarkCaseSchema = z.object({
  caseName: z.string().describe("The name of the landmark case, e.g., 'Terry v. Ohio'"),
  citation: z.string().describe("The official legal citation, e.g., '392 U.S. 1 (1968)'"),
  holding: z.string().describe("A one-sentence summary of the court's ruling and its impact on police procedure."),
});

const AnalyzeConstitutionOutputSchema = z.object({
  id: z.string().describe("The ID requested, e.g., 'US_AMENDMENT_4'"),
  title: z.string().describe("The common name of the provision, e.g., 'Fourth Amendment'"),
  fullText: z.string().describe("The complete, verbatim text of the amendment or section."),
  plainLanguageSummary: z.string().describe("A concise, easy-to-understand summary of what the provision means."),
  testForOfficers: z.object({
    title: z.string().describe("The name of the legal standard or test officers must apply, e.g., 'The Reasonable Expectation of Privacy Test'"),
    points: z.array(z.string()).describe("An array of strings explaining the key components of the test."),
  }),
  landmarkCases: z.array(LandmarkCaseSchema).describe("An array of 2-3 landmark cases that define this provision's interpretation."),
});
export type AnalyzeConstitutionOutput = z.infer<typeof AnalyzeConstitutionOutputSchema>;


export async function analyzeConstitution(input: AnalyzeConstitutionInput): Promise<AnalyzeConstitutionOutput> {
   const { output } = await ai.generate({
    prompt: `You are a Constitutional Law Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific constitutional provision. For the given ID, retrieve the full text and leading case law, then parse this information into a structured format for a patrol officer. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema.

Provision ID: ${input.provisionId}`,
    output: {
      schema: AnalyzeConstitutionOutputSchema,
    },
   });
   
   if (!output) {
     throw new Error('Failed to generate constitutional analysis');
   }
   
   return output;
}
