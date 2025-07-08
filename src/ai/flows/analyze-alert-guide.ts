'use server';
/**
 * @fileOverview Analyzes and provides details for a specific public safety alert type.
 *
 * - analyzeAlertGuide - A function that fetches and parses alert criteria.
 * - AnalyzeAlertGuideInput - The input type for the function.
 * - AnalyzeAlertGuideOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeAlertGuideInputSchema = z.object({
  alertId: z.string().describe('The unique ID of the alert to analyze, e.g., "ER_AMBER_ALERT" or "ER_SILVER_ALERT".'),
});
export type AnalyzeAlertGuideInput = z.infer<typeof AnalyzeAlertGuideInputSchema>;

const AnalyzeAlertGuideOutputSchema = z.object({
  alertType: z.string().describe("The official name of the alert, e.g., 'Florida AMBER Alert'"),
  purpose: z.string().describe("A brief, one-sentence description of the alert's purpose."),
  activationCriteria: z.array(z.string()).describe("The official, numbered list of criteria that must ALL be met to activate the alert."),
  initiationProcedure: z.array(z.string()).describe("The step-by-step procedure for a law enforcement agency to request activation."),
});
export type AnalyzeAlertGuideOutput = z.infer<typeof AnalyzeAlertGuideOutputSchema>;


export async function analyzeAlertGuide(input: AnalyzeAlertGuideInput): Promise<AnalyzeAlertGuideOutput> {
  return analyzeAlertGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeAlertGuidePrompt',
  input: { schema: AnalyzeAlertGuideInputSchema },
  output: { schema: AnalyzeAlertGuideOutputSchema },
  prompt: `You are a public safety systems analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured procedural guide for a specific public alert system. For the given ID, retrieve the official FDLE criteria and procedures. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema.

Alert ID: {{{alertId}}}`,
});

const analyzeAlertGuideFlow = ai.defineFlow(
  {
    name: 'analyzeAlertGuideFlow',
    inputSchema: AnalyzeAlertGuideInputSchema,
    outputSchema: AnalyzeAlertGuideOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
