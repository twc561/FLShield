'use server';
/**
 * @fileOverview A confidential, AI-powered active listening chatbot for wellness support.
 * This file contains the logic for the AI to adopt a supportive, non-judgmental persona
 * and respond to an officer's inputs using reflective listening techniques.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Read the prompt template from the .txt file
const templatePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'active-listener.txt');
const activeListenerPromptTemplate = fs.readFileSync(templatePath, 'utf8');


const ActiveListenerInputSchema = z.object({
  userUtterance: z.string(),
  conversationHistory: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({text: z.string()}))
  })),
});
export type ActiveListenerInput = z.infer<typeof ActiveListenerInputSchema>;

const ActiveListenerOutputSchema = z.object({
  characterResponse: z.string().describe("The AI's empathetic, non-judgmental, and reflective response."),
});
export type ActiveListenerOutput = z.infer<typeof ActiveListenerOutputSchema>;

export const activeListener = ai.defineFlow(
  {
    name: 'activeListener', 
    inputSchema: ActiveListenerInputSchema,
    config: {
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7,
        topP: 0.95,
        topK: 50,
      }
    }
  },
  async (input) => {
  const prompt = ai.definePrompt({
    name: 'activeListenerPrompt',
    input: { schema: ActiveListenerInputSchema },
    output: { schema: ActiveListenerOutputSchema },
    prompt: activeListenerPromptTemplate,
  });

  const { output } = await prompt(input);
  return output!;
}
);
export async function getActiveListeningResponse(input: ActiveListenerInput): Promise<ActiveListenerOutput> {
  const { output } = await activeListener(input);
  return output!;
}