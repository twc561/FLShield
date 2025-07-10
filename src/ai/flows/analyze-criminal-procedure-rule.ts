
'use server';
/**
 * @fileOverview Analyzes a Florida Rule of Criminal Procedure using an AI model.
 *
 * - analyzeCriminalProcedureRule - A function that fetches and parses a rule.
 * - AnalyzeRuleInput - The input type for the function.
 * - AnalyzeRuleOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeRuleInputSchema = z.object({
  ruleId: z.string().describe('The unique ID of the rule to analyze, e.g., "FL_CRIM_PRO_3_130".'),
});
export type AnalyzeRuleInput = z.infer<typeof AnalyzeRuleInputSchema>;

const FieldApplicationSchema = z.object({
  title: z.string().describe("e.g., 'What This Rule Means on a Stop' or 'How This Applies to Your Arrest'"),
  points: z.array(z.string()).describe("An array of 2-3 bullet points explaining the practical impact on police procedure."),
});

const KeyCaseExampleSchema = z.object({
  caseName: z.string().describe("The name of a key case that interprets or applies this rule, e.g., 'State v. Johnson'"),
  citation: z.string().describe("The official legal citation for the case, e.g., '123 So. 3d 456 (Fla. 2d DCA 2023)'"),
  holding: z.string().describe("A one-sentence summary of how the case applied the rule and its outcome."),
});

const AnalyzeRuleOutputSchema = z.object({
  id: z.string().describe("The ID requested, e.g., 'FL_CRIM_PRO_3_130'"),
  ruleNumber: z.string().describe("The official rule number, e.g., 'Rule 3.130'"),
  ruleTitle: z.string().describe("The common name of the rule, e.g., 'First Appearance'"),
  fullText: z.string().describe("The complete, verbatim text of the rule."),
  plainLanguageSummary: z.string().describe("A concise, easy-to-understand summary of what the rule requires or governs."),
  fieldApplicationForOfficers: FieldApplicationSchema,
  keyCaseExample: KeyCaseExampleSchema,
});
export type AnalyzeRuleOutput = z.infer<typeof AnalyzeRuleOutputSchema>;


export async function analyzeCriminalProcedureRule(input: AnalyzeRuleInput): Promise<AnalyzeRuleOutput> {
  const { output } = await ai.generate({
    prompt: `You are a Criminal Procedure Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific Florida Rule of Criminal Procedure. For the given ID, retrieve the full text and relevant interpretations, then parse this information into a structured format for a patrol officer. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema.

Rule ID: ${input.ruleId}`,
    output: {
      schema: AnalyzeRuleOutputSchema,
    },
  });
  return output;
}
