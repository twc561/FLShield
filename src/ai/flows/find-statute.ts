
'use server';

/**
 * @fileOverview Finds a Florida statute using an AI model.
 *
 * - findStatute - A function that finds a statute based on a user query.
 * - FindStatuteInput - The input type for the findStatute function.
 * - FindStatuteOutput - The return type for the findStatute function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FindStatuteInputSchema = z.object({
  query: z
    .string()
    .describe('The natural language query to find a statute for.'),
});
export type FindStatuteInput = z.infer<typeof FindStatuteInputSchema>;

const FindStatuteOutputSchema = z.object({
  code: z
    .string()
    .describe(
      'The official Florida Statute number (e.g., "F.S. § 812.014"). If not found, return "N/A".'
    ),
  title: z
    .string()
    .describe('The official title of the statute. If not found, return "N/A".'),
  description: z
    .string()
    .describe(
      'A practical summary for a law enforcement officer explaining what this statute means, what constitutes a violation, and key points to be aware of. If not found, return "Information not available.".'
    ),
  degreeOfCharge: z
    .string()
    .describe(
      'The typical degree of the charge (e.g., "Varies (by value)", "Misdemeanor", "Third-degree felony"). If not found, return "N/A".'
    ),
  elementsOfTheCrime: z
    .string()
    .describe(
      'A concise, bulleted or numbered list of the essential elements of the crime that must be proven. If not a criminal statute, return "This statute does not define a criminal offense.".'
    ),
  example: z
    .string()
    .describe(
      'A real-world example of the statute being applied. If not found, return "No example available.".'
    ),
});
export type FindStatuteOutput = z.infer<typeof FindStatuteOutputSchema>;

export async function findStatute(
  input: FindStatuteInput
): Promise<FindStatuteOutput> {
  return findStatuteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findStatutePrompt',
  input: { schema: FindStatuteInputSchema },
  output: { schema: FindStatuteOutputSchema },
  prompt: `You are an expert paralegal specializing in Florida law, with deep knowledge of the Florida Statutes. Your task is to find the single most relevant Florida Statute based on a user's query. The user is a law enforcement officer, so practical summaries and examples are crucial.

Your search should be broad and conceptual. Interpret the user's query loosely to find the most practically relevant statute, not just a literal keyword match. For example, if a user searches for "credit card", you should find the statute for "credit card fraud". If they search for "fight", consider statutes for "Assault", "Battery", and "Affray" and return the most fitting one.

The search should prioritize criminal statutes, particularly those found within Title XLVI (Crimes) and Title XLVII (Criminal Procedure and Corrections), as well as traffic laws in Title XXIII (Motor Vehicles). Avoid purely civil, administrative, or procedural statutes unless they directly pertain to an officer's authority or a common criminal offense.

Search for the Florida Statute that best answers the following query:
"{{{query}}}"

CRITICAL RULE: Every key in the required JSON schema MUST be present in your response. If you cannot determine the information for a specific field, you MUST return a specific placeholder string like 'Information not available' or 'No specific case law found', not null or an empty string. The statute code must be in the format "F.S. § [number]".

- The 'description' field MUST be a practical summary tailored for a law enforcement officer. It should explain what the statute means, what constitutes a violation, and key points for an officer to know. DO NOT provide a dry, official summary here.
- If the statute defines a crime, you must populate the 'elementsOfTheCrime' field with a clear, concise list of the elements that must be proven.
- If you cannot find a single, highly relevant statute, return "N/A" for all fields. Do not guess or invent statutes.`,
});

const findStatuteFlow = ai.defineFlow(
  {
    name: 'findStatuteFlow',
    inputSchema: FindStatuteInputSchema,
    outputSchema: FindStatuteOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
