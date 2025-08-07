
'use server';
/**
 * @fileOverview Analyzes a Florida Administrative Code rule using an AI model.
 *
 * - analyzeFacRule - A function that fetches and parses an F.A.C. rule.
 * - AnalyzeFacRuleInput - The input type for the function.
 * - AnalyzeFacRuleOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeFacRuleInputSchema = z.object({
  ruleId: z.string().describe('The unique ID of the F.A.C. rule to analyze, e.g., "FAC_61A-3_0141".'),
});
export type AnalyzeFacRuleInput = z.infer<typeof AnalyzeFacRuleInputSchema>;

const EnforcementGuidanceSchema = z.object({
    title: z.string().describe("A static title for this section, e.g., 'Guidance for Law Enforcement'"),
    points: z.array(z.string()).describe("An array of 2-3 bullet points explaining how to enforce this rule."),
});

const AnalyzeFacRuleOutputSchema = z.object({
  id: z.string().describe("The ID requested, e.g., 'FAC_61A-3_0141'"),
  ruleNumber: z.string().describe("The official rule number, e.g., '61A-3.0141'"),
  ruleTitle: z.string().describe("The official title of the rule."),
  governingAgency: z.string().describe("e.g., 'Department of Business and Professional Regulation'"),
  fullText: z.string().describe("The complete, verbatim text of the administrative rule."),
  plainLanguageSummary: z.string().describe("A concise, easy-to-understand summary of the rule's purpose and what it regulates."),
  enforcementGuidance: EnforcementGuidanceSchema,
  relatedStateStatute: z.string().describe("The primary Florida Statute number that gives this rule its authority, if applicable. e.g., 'F.S. § 561.20'"),
});
export type AnalyzeFacRuleOutput = z.infer<typeof AnalyzeFacRuleOutputSchema>;


export async function analyzeFacRule(input: AnalyzeFacRuleInput): Promise<AnalyzeFacRuleOutput> {
  const { output } = await ai.generate({
    prompt: `You are a Regulatory Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific rule from the Florida Administrative Code. For the given ID, retrieve the full text and then parse it into a practical format for a patrol officer. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the following schema.

F.A.C. Rule ID: ${input.ruleId}`,
    output: {
      schema: AnalyzeFacRuleOutputSchema,
    },
  });
  if (!output) {
    throw new Error("Failed to generate F.A.C. rule analysis.");
  }
  return output;
}
