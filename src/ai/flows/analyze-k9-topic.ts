
'use server';
/**
 * @fileOverview Analyzes a specific K-9 topic using an AI model.
 *
 * - analyzeK9Topic - A function that fetches and parses K-9 procedures and case law.
 * - AnalyzeK9TopicInput - The input type for the function.
 * - AnalyzeK9TopicOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeK9TopicInputSchema = z.object({
  topicId: z.string().describe('The unique ID of the K-9 topic to analyze, e.g., "K9_HANDLER_CASELAW_VEHICLE".'),
});
export type AnalyzeK9TopicInput = z.infer<typeof AnalyzeK9TopicInputSchema>;

const KeyCaseSchema = z.object({
    caseName: z.string().describe("The name of the landmark case, e.g., 'Illinois v. Caballes'"),
    citation: z.string().describe("The official legal citation, e.g., '543 U.S. 405 (2005)'"),
    holding: z.string().describe("A one-sentence summary of the court's ruling and its impact on K-9 operations."),
});

const AnalyzeK9TopicOutputSchema = z.object({
  id: z.string().describe("The ID requested."),
  title: z.string().describe("The title of the topic."),
  audience: z.enum(["K-9 Handler", "Patrol Officer"]).describe("The intended audience for this information."),
  plainLanguageSummary: z.string().describe("A concise overview of the topic's importance."),
  proceduralGuidance: z.object({
    title: z.string().default("Key Procedures & Best Practices"),
    points: z.array(z.string()).describe("An array of scannable, actionable bullet points."),
  }),
  legalConsiderations: z.object({
    title: z.string().default("Legal Standards & Case Law"),
    explanation: z.string().describe("A paragraph explaining the controlling legal principle."),
    keyCases: z.array(KeyCaseSchema).describe("An array of 1-2 landmark cases relevant to this specific topic."),
  }),
  fieldScenario: z.object({
    title: z.string().default("Example Scenario"),
    scenario: z.string().describe("A brief, practical example of the topic in action."),
  }),
});
export type AnalyzeK9TopicOutput = z.infer<typeof AnalyzeK9TopicOutputSchema>;


export const analyzeK9Topic = ai.defineFlow(
  {
    name: 'analyzeK9Topic',
    inputSchema: AnalyzeK9TopicInputSchema,
    outputSchema: AnalyzeK9TopicOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are a K-9 Operations & Legal Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific K-9 topic. For the given ID, retrieve the relevant procedures and case law, then parse this information into a practical format for an officer. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the following schema.

Topic ID: ${input.topicId}`,
      output: {
        schema: AnalyzeK9TopicOutputSchema,
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
