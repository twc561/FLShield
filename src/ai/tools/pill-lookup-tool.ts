
'use server';
/**
 * @fileOverview Defines a Genkit tool for looking up pill information
 * based on visual characteristics. This simulates a call to a reliable
 * drug database.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PillLookupInputSchema = z.object({
  imprint: z.string().describe("The letters and/or numbers imprinted on the pill. e.g., 'E 7'"),
  color: z.string().describe("The primary color of the pill. e.g., 'White'"),
  shape: z.string().describe("The shape of the pill. e.g., 'Round'"),
});

const PillLookupOutputSchema = z.object({
  drugName: z.string().describe("The common brand name or generic name of the identified drug. If unknown, return 'Unknown'."),
  primaryUse: z.string().describe("A brief, one-sentence description of what the drug is primarily used for. If unknown, state 'Information not available.'"),
  keyWarnings: z.string().describe("A brief summary of the most critical warnings or potential side effects associated with the drug. If unknown, state 'Information not available.'"),
});

export const lookupPill = ai.defineTool(
  {
    name: 'lookupPill',
    description: "Looks up a pill in a reliable drug database (e.g., NLM Pillbox, Drugs.com) based on its physical characteristics and returns structured information.",
    inputSchema: PillLookupInputSchema,
    outputSchema: PillLookupOutputSchema,
  },
  async (input) => {
    // In a real application, this would make an external API call to a service like the NLM Pillbox API.
    // For this simulation, we'll use an AI call that is heavily constrained to act like a database.
    console.log(`[Pill Lookup Tool] Looking up pill with characteristics: ${JSON.stringify(input)}`);

    const { output } = await ai.generate({
        system: "You are a pill identification database API. Your only function is to take an imprint, color, and shape, and return the corresponding drug information from the FDA's database. Your knowledge is limited to publicly available drug data. If the provided characteristics do not match a known drug, you MUST return 'Unknown' and 'Information not available'. Do not guess or infer. Provide only factual data.",
        prompt: `Database query for pill with imprint '${input.imprint}', color '${input.color}', and shape '${input.shape}'.`,
        output: {
            schema: PillLookupOutputSchema,
        },
        config: {
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_NONE',
                },
            ],
        }
    });

    return output!;
  }
);
