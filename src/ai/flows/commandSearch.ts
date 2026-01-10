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

export const commandSearch = ai.defineFlow(
  {
    name: 'commandSearch',
    inputSchema: CommandSearchInputSchema,
    outputSchema: CommandSearchOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are 'Shield FL,' an AI partner for Florida law enforcement. Your purpose is to provide immediate, clear, and practical answers to questions from front-line patrol officers. The answer should be concise, easy to understand during a high-stakes situation, and grounded in Florida statutes and common police procedures. Do not provide legal advice, but rather operational guidance and factual information. Prioritize officer safety and legal accuracy. Now, answer the following question for an officer on patrol: ${input.query}`,
      model: 'gemini-1.5-pro',
      config: {
        maxOutputTokens: 8192,
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
      },
      output: {
        schema: CommandSearchOutputSchema,
      }
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);