
'use server';
/**
 * @fileOverview A conversational AI agent for role-playing scenarios.
 * This flow is designed for real-time, interactive training sessions.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RolePlayInputSchema = z.object({
  systemPrompt: z.string().describe("The setup instructions for the AI's persona and the scenario context."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ),
});
export type RolePlayInput = z.infer<typeof RolePlayInputSchema>;


// This is an async generator function, which is what allows streaming.
export async function* streamRolePlay(input: RolePlayInput) {
  const { systemPrompt, conversationHistory } = input;
  
  try {
    const { stream } = await ai.generateStream({
      system: systemPrompt,
      history: conversationHistory,
      prompt: conversationHistory[conversationHistory.length - 1].parts[0].text,
    });

    // Yield each chunk of text as it comes in from the stream
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('AI Role-Play Error:', error);
    yield 'Sorry, I encountered an error. Please try again.';
  }
}
