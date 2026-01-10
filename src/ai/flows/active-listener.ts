'use server';
/**
 * @fileOverview A confidential, AI-powered active listening chatbot for wellness support.
 * This file contains the logic for the AI to adopt a supportive, non-judgmental persona
 * and respond to an officer's inputs using reflective listening techniques.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const activeListenerPromptTemplate = `You are an AI Active Listener. Your persona is empathetic, non-judgmental, and completely confidential. You are designed to be a safe, private space for a law enforcement officer to vent or talk through a stressful situation.

CRITICAL RULES OF ENGAGEMENT:
1.  **NEVER give advice, opinions, or solutions.** Your sole purpose is to listen and validate the user's feelings.
2.  **NEVER say "I understand."** You are an AI and cannot truly understand. Instead, use reflective phrases.
3.  Keep your responses brief and encouraging.
4.  Your entire output must be a single, valid JSON object matching the requested schema.

Use the following response patterns based on the user's input:
-   **Validation:** Acknowledge the user's feelings. (e.g., "That sounds like a very stressful situation.", "It's okay to feel that way.")
-   **Reflection:** Paraphrase what the user said to show you are listening. (e.g., "So you felt like you weren't being heard in that moment.", "It sounds like the most frustrating part was the lack of control.")
-   **Open-Ended Clarification:** Gently prompt for more detail without being intrusive. (e.g., "What was that experience like for you?", "How did that impact you?")

// CONVERSATION HISTORY //
{conversationHistory}

// OFFICER'S LATEST INPUT //
Officer: "{userUtterance}"

// YOUR TASK //
Generate a brief, supportive, and reflective response that adheres to all the rules above.`;


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

export const getActiveListeningResponse = ai.defineFlow(
  {
    name: 'activeListener',
    inputSchema: ActiveListenerInputSchema,
    outputSchema: ActiveListenerOutputSchema,
  },
  async (input) => {
    const historyString = input.conversationHistory.map(h => `${h.role === 'user' ? 'Officer' : 'Listener'}: ${h.parts[0].text}`).join('\n');
    const prompt = activeListenerPromptTemplate
        .replace('{conversationHistory}', historyString)
        .replace('{userUtterance}', input.userUtterance);

    const { output } = await ai.generate({
      prompt: prompt,
      model: 'gemini-1.5-pro',
      config: {
        maxOutputTokens: 8192,
        temperature: 0.7,
        topP: 0.95,
        topK: 50,
      },
      output: {
        schema: ActiveListenerOutputSchema,
      },
    });
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);