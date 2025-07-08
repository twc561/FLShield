'use server';
/**
 * @fileOverview Answers questions about FWC regulations.
 *
 * - queryFwcRegulations - A function that answers a user's question.
 * - QueryFwcRegulationsInput - The input type for the function.
 * - QueryFwcRegulationsOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { 
  fishingRegulations, 
  invertebrateRegulations,
  gearRegulations,
  huntingRegulations,
  trappingRegulations,
  firearmsMethodsGuide,
  boatingTopics,
  boatingSafetyEquipment,
  protectedSpeciesInfo,
  licenseData
} from "@/data/specialized-enforcement/fwc-regulations";

const QueryFwcRegulationsInputSchema = z.object({
  question: z.string().describe('The user\'s question about FWC regulations.'),
});
export type QueryFwcRegulationsInput = z.infer<typeof QueryFwcRegulationsInputSchema>;

const QueryFwcRegulationsOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type QueryFwcRegulationsOutput = z.infer<typeof QueryFwcRegulationsOutputSchema>;

const fwcDataContext = JSON.stringify({
  fishingRegulations,
  invertebrateRegulations,
  gearRegulations,
  huntingRegulations,
  trappingRegulations,
  firearmsMethodsGuide,
  boatingTopics,
  boatingSafetyEquipment,
  protectedSpeciesInfo,
  licenseData
});

export async function queryFwcRegulations(
  input: QueryFwcRegulationsInput
): Promise<QueryFwcRegulationsOutput> {
  return queryFwcRegulationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'queryFwcRegulationsPrompt',
  input: { schema: QueryFwcRegulationsInputSchema },
  output: { schema: QueryFwcRegulationsOutputSchema },
  prompt: `You are an expert AI assistant on Florida Fish and Wildlife Conservation Commission (FWC) regulations. Your knowledge base is the provided JSON data. Answer the user's question concisely and directly based *only* on the provided data. If a rule is violated, state the rule and why it is a violation.

Knowledge Base:
${fwcDataContext}

User's Question:
"{{{question}}}"

Provide the direct answer now.`,
});

const queryFwcRegulationsFlow = ai.defineFlow(
  {
    name: 'queryFwcRegulationsFlow',
    inputSchema: QueryFwcRegulationsInputSchema,
    outputSchema: QueryFwcRegulationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
