
'use server';
/**
 * @fileOverview A lean AI flow to identify a Florida Statute number from a plain-language crime description.
 *
 * - identifyCrimeStatute - A function that takes a crime description and returns the most likely statute number.
 * - IdentifyCrimeStatuteInput - The input type for the function.
 * - IdentifyCrimeStatuteOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyCrimeStatuteInputSchema = z.object({
  crimeDescription: z.string().describe('A plain-language description of a crime.'),
});
export type IdentifyCrimeStatuteInput = z.infer<typeof IdentifyCrimeStatuteInputSchema>;

const IdentifyCrimeStatuteOutputSchema = z.object({
  statuteNumber: z.string().describe('The most probable Florida Statute number, formatted as XXX.XX (e.g., "810.02").'),
  crimeName: z.string().describe('The common name of the crime associated with the statute number.'),
  justification: z.string().describe('A brief justification for why this statute number was chosen based on the crime description.'),
});
export type IdentifyCrimeStatuteOutput = z.infer<typeof IdentifyCrimeStatuteOutputSchema>;

export async function identifyCrimeStatute(input: IdentifyCrimeStatuteInput): Promise<IdentifyCrimeStatuteOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-pro',
    prompt: `You are an AI paralegal for Florida law. Your task is to identify the single most probable Florida Statute number for the described crime.

Follow these steps:
1.  **Analyze the user's crime description:** Break down the user's query into its core components (e.g., for "Man hit another man with a bat," the components are unwanted touching, use of a weapon, and causing injury).
2.  **Identify Key Legal Concepts:** Based on the components, determine the key legal concepts. For the example above, this would be "Battery" and "Deadly Weapon."
3.  **Select the Statute:** Search your knowledge of Florida Statutes and select the single most specific statute that matches these concepts. For "Battery" + "Deadly Weapon," the correct statute is Aggravated Battery (843.045).
4.  **Provide Output:** Return the statute number, the common crime name, and a brief justification for your choice in the required JSON format.

Crime Description: ${input.crimeDescription}`,
    output: {
      schema: IdentifyCrimeStatuteOutputSchema,
    },
  });
  if (!output) {
    throw new Error("AI model returned a null response for identifyCrimeStatute.");
  }
  return output;
}
