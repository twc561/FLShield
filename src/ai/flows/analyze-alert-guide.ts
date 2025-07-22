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
}) as const;
export type AnalyzeAlertGuideInput = z.infer<typeof AnalyzeAlertGuideInputSchema>;

const AnalyzeAlertGuideOutputSchema = z.object({
  alertType: z.string().describe("The official name of the alert, e.g., 'Florida AMBER Alert'"),
  purpose: z.string().describe("A brief, one-sentence description of the alert's purpose."),
  activationCriteria: z.array(z.string()).describe("The official, numbered list of criteria that must ALL be met to activate the alert."),
  initiationProcedure: z.array(z.string()).describe("The step-by-step procedure for a law enforcement agency to request activation."),
  keyInformationForLEO: z.array(z.string()).describe("A checklist of essential investigative details an officer must have ready before calling MEPIC."),
  contactInfo: z.object({
    agency: z.string().describe("The agency to contact, e.g., 'FDLE Missing Endangered Persons Information Clearinghouse (MEPIC)'"),
    phone: z.string().describe("The direct phone number to call to initiate an alert."),
    website: z.string().describe("The official website for more information.")
  })
});
export type AnalyzeAlertGuideOutput = z.infer<typeof AnalyzeAlertGuideOutputSchema>;


export async function analyzeAlertGuide(input: AnalyzeAlertGuideInput): Promise<AnalyzeAlertGuideOutput> {
  const { output } = await ai.generate({
    prompt: `You are a public safety systems analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured procedural guide for a specific public alert system. For the given ID, retrieve the official FDLE criteria, procedures, and contact information. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema. Ensure the keyInformationForLEO field contains a checklist of essential details an officer needs before making the call.

Alert ID: ${input.alertId}`,
    output: {
      schema: AnalyzeAlertGuideOutputSchema,
    },
  });
  return output;
}
