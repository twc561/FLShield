'use server';
/**
 * @fileOverview A fast, conversational AI agent designed for voice-to-voice interaction.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ConversationalPartnerInputSchema = z.object({
  query: z.string().describe("The user's latest spoken query."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).optional().describe("The history of the conversation so far."),
});
export type ConversationalPartnerInput = z.infer<typeof ConversationalPartnerInputSchema>;

const ConversationalPartnerOutputSchema = z.object({
  response: z.string().describe("The AI's direct, concise, and conversational response."),
});
export type ConversationalPartnerOutput = z.infer<typeof ConversationalPartnerOutputSchema>;

export async function getConversationalResponse(input: ConversationalPartnerInput): Promise<ConversationalPartnerOutput> {
  const { output } = await ai.generate({
    prompt: `You are 'Shield FL,' an AI partner for Florida law enforcement, operating in a hands-free, voice-to-voice mode. Your purpose is to provide immediate, clear, and practical answers to questions from an officer. Keep your responses concise and conversational. Do not provide legal advice, but rather operational guidance and factual information. Now, answer the user's latest query based on the conversation so far.

User's Query: ${input.query}`,
    history: input.conversationHistory,
    output: {
        schema: ConversationalPartnerOutputSchema,
    }
  });
  return output!;
}
