'use server';
/**
 * @fileOverview A confidential, AI-powered active listening chatbot for wellness support.
 * This file contains the logic for the AI to adopt a supportive, non-judgmental persona
 * and respond to an officer's inputs using reflective listening techniques.
 */
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
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
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    system: activeListenerPromptTemplate.replace(
      /{{{conversationHistory\..+}}}/,
      input.conversationHistory.map(h => `${h.role === 'user' ? 'Officer' : 'Listener'}: ${h.content}`).join('\n')
    ),
    prompt: `Officer: "${input.userUtterance}"`,
    schema: ActiveListenerOutputSchema,
  });
  return object;
}
