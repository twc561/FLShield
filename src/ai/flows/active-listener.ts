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
      content: z.string(),
  })),
});
export type ActiveListenerInput = z.infer<typeof ActiveListenerInputSchema>;

const ActiveListenerOutputSchema = z.object({
  characterResponse: z.string().describe("The AI's empathetic, non-judgmental, and reflective response."),
});
export type ActiveListenerOutput = z.infer<typeof ActiveListenerOutputSchema>;

export async function getActiveListeningResponse(input: ActiveListenerInput): Promise<ActiveListenerOutput> {
  const history = input.conversationHistory.map(h => `${h.role === 'user' ? 'Officer' : 'Listener'}: ${h.content}`).join('\n');
  const prompt = activeListenerPromptTemplate
    .replace('{{history}}', history)
    .replace('{{prompt}}', `Officer: "${input.userUtterance}"`);

  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-pro',
    prompt,
    output: {
        schema: ActiveListenerOutputSchema
    }
  });

  return output!;
}
