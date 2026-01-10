'use server';
/**
 * @fileOverview An AI flow to generate a formal police report narrative from informal notes.
 *
 * - generateReportNarrative - A function that takes notes and generates a narrative.
 * - GenerateReportNarrativeInput - The input type for the function.
 * - GenerateReportNarrativeOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateReportNarrativeInputSchema = z.object({
  offense: z.string().describe('The primary offense for the report, e.g., "Burglary - F.S. § 810.02"'),
  notes: z.string().describe('The officer\'s informal, rough notes about the incident.'),
});
export type GenerateReportNarrativeInput = z.infer<typeof GenerateReportNarrativeInputSchema>;

const GenerateReportNarrativeOutputSchema = z.object({
  narrative: z.string().describe('The generated formal, structured police report narrative.'),
});
export type GenerateReportNarrativeOutput = z.infer<typeof GenerateReportNarrativeOutputSchema>;

export const generateReportNarrative = ai.defineFlow(
  {
    name: 'generateReportNarrative',
    inputSchema: GenerateReportNarrativeInputSchema,
    outputSchema: GenerateReportNarrativeOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are an AI assistant for a Florida Law Enforcement Officer. Your task is to transform a set of informal, rough notes into a formal, structured, and professional incident report narrative suitable for an official police report. Write in the first person ("I"). Use clear, objective, and professional language. The narrative must be chronological and easy to follow.

CRITICAL INSTRUCTIONS:
- Do NOT invent facts or details not present in the notes.
- Use placeholders like "[Date]", "[Time]", "[Location]", "[Victim Name]", "[Suspect Name]", and "[Witness Name]" where specific details are missing.
- Ensure the narrative directly addresses the elements of the specified primary offense.

---
Primary Offense: ${input.offense}

Officer's Rough Notes:
${input.notes}
---

Generate the formal incident report narrative now.
`,
      output: {
        schema: GenerateReportNarrativeOutputSchema,
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
