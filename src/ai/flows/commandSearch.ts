
'use server';
/**
 * @fileOverview A flow to handle general AI queries from the command search bar.
 *
 * - commandSearch - A function that takes a user query and returns a tailored response.
 * - CommandSearchInput - The input type for the function.
 * - CommandSearchOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CommandSearchInputSchema = z.object({
  query: z.string().describe('The user\'s question from the search bar.'),
});
export type CommandSearchInput = z.infer<typeof CommandSearchInputSchema>;

const CommandSearchOutputSchema = z.object({
  answer: z.string().describe("The AI's direct, concise, and practical answer to the officer's query."),
});
export type CommandSearchOutput = z.infer<typeof CommandSearchOutputSchema>;

export async function commandSearch(input: CommandSearchInput): Promise<CommandSearchOutput> {
  return commandSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'commandSearchPrompt',
  input: { schema: CommandSearchInputSchema },
  output: { schema: CommandSearchOutputSchema },
  prompt: `You are 'Shield FL,' an AI partner for Florida law enforcement. Your purpose is to provide immediate, clear, and practical answers to questions from front-line patrol officers. The answer should be concise, easy to understand during a high-stakes situation, and grounded in Florida statutes and common police procedures. Do not provide legal advice, but rather operational guidance and factual information. Prioritize officer safety and legal accuracy. Now, answer the following question for an officer on patrol: {{{query}}}`,
  config: {
    model: ai.model('googleai/gemini-2.0-flash'),
  }
});

const commandSearchFlow = ai.defineFlow(
  {
    name: 'commandSearchFlow',
    inputSchema: CommandSearchInputSchema,
    outputSchema: CommandSearchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
