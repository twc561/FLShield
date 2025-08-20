
'use server';
/**
 * @fileOverview Analyzes a specific legal update using an AI model.
 *
 * - analyzeLegalUpdate - A function that fetches and parses a legal update.
 * - AnalyzeLegalUpdateInput - The input type for the function.
 * - AnalyzeLegalUpdateOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeLegalUpdateInputSchema = z.object({
  updateID: z.string().describe('The unique ID of the legal update to analyze, e.g., "CASELAW_SC24_5678" or "STATUTE_FS316_2025_UPDATE".'),
});
export type AnalyzeLegalUpdateInput = z.infer<typeof AnalyzeLegalUpdateInputSchema>;

const AnalyzeLegalUpdateOutputSchema = z.object({
    updateID: z.string().describe("The ID requested."),
    headline: z.string().describe("The short, attention-grabbing headline for the update."),
    sourceInfo: z.object({
        sourceName: z.string().describe("e.g., 'Jones v. State' or 'Florida Statute § 776.012'"),
        citation: z.string().describe("e.g., 'SC24-5678 (Fla. 2025)' or 'Effective July 1, 2025'"),
        sourceType: z.enum(["Case Law", "Statutory Change"]).describe("The type of legal update."),
    }),
    plainLanguageSummary: z.string().describe("A clear summary of the case's holding or the nature of the statutory change."),
    tacticalImpactForOfficers: z.object({
        title: z.string().describe("A static title for this section, e.g., 'What This Changes For You in the Field'"),
        points: z.array(z.string()).describe("An array of 2-4 bullet points explaining the practical impact on police procedure."),
    }),
    keyQuoteOrText: z.string().describe("A powerful, impactful quote from the court's opinion or the specific changed text of the statute."),
});
export type AnalyzeLegalUpdateOutput = z.infer<typeof AnalyzeLegalUpdateOutputSchema>;


export async function analyzeLegalUpdate(input: AnalyzeLegalUpdateInput): Promise<AnalyzeLegalUpdateOutput> {
  const { output } = await ai.generate({
    prompt: `You are a Legal Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific legal update (either a court decision or a statutory change). For the given ID, retrieve the full source document, then parse it into a practical format for a patrol officer. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the following schema.

Update ID: ${input.updateID}`,
    output: {
      schema: AnalyzeLegalUpdateOutputSchema,
    },
  });
  
  if (!output) {
    throw new Error('Failed to generate legal update analysis');
  }
  
  return output;
}
