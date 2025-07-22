
'use server';
/**
 * @fileOverview An AI-powered tool to proofread and analyze anonymized police report narratives.
 *
 * - proofreadReport - A function that provides structured feedback on a report.
 * - ProofreadReportInput - The input type for the function.
 * - ProofreadReportOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ProofreadReportInputSchema = z.object({
  primaryOffense: z.string().describe("The primary offense and statute number for context, e.g., 'Burglary - F.S. § 810.02'"),
  anonymizedNarrative: z.string().describe("The anonymized police report narrative to be analyzed."),
});
export type ProofreadReportInput = z.infer<typeof ProofreadReportInputSchema>;

const ProofreadReportOutputSchema = z.object({
  articulatingElements_feedback: z.string().describe("Analyzes if the narrative contains language supporting the key elements of the specified offense. If not, suggests what's missing."),
  objectiveLanguage_feedback: z.string().describe("Identifies any subjective or weak 'weasel words' (e.g., 'seemed,' 'appeared') and suggests more objective, professional alternatives (e.g., 'I observed')."),
  clarityAndChronology_feedback: z.string().describe("Comments on the logical flow and clarity of the narrative. Identifies any confusing sentences or chronological gaps."),
  grammarAndSpelling_suggestions: z.array(z.string()).describe("A list of any specific spelling or grammatical errors found."),
});
export type ProofreadReportOutput = z.infer<typeof ProofreadReportOutputSchema>;

export const proofreadReportFlow = ai.defineFlow(
  {
    name: 'proofreadReport',
    inputSchema: ProofreadReportInputSchema,
    outputSchema: ProofreadReportOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an AI Police Report Writing Instructor, specializing in Florida law. Your task is to review the following anonymized narrative and provide concise, constructive feedback to help the officer improve their report. Do not comment on the facts of the case. Your analysis must focus exclusively on the quality of the writing and its legal sufficiency based on the specified offense.

Primary Offense: ${input.primaryOffense}
Anonymized Narrative:
${input.anonymizedNarrative}

Provide your feedback ONLY as a structured JSON object with the following structure:
- articulatingElements_feedback: Analysis of elements support
- objectiveLanguage_feedback: Identification of subjective language
- clarityAndChronology_feedback: Comments on flow and clarity  
- grammarAndSpelling_suggestions: Array of specific errors found

Focus on constructive, actionable feedback to improve report quality and legal sufficiency.`,
      output: {
        schema: ProofreadReportOutputSchema,
      },
    });
    return output!;
  }
);

export async function proofreadReport(input: ProofreadReportInput): Promise<ProofreadReportOutput> {
  return await proofreadReportFlow(input);
}
