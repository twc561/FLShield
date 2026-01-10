'use server';

/**
 * @fileOverview A live, streaming AI conversational partner for guided debriefing.
 * This flow is designed for real-time, interactive chat sessions.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LiveDebriefInputSchema = z.object({
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ),
});

export type LiveDebriefInput = z.infer<typeof LiveDebriefInputSchema>;

// This is an async generator function, which is what allows streaming.
export async function* streamDebrief(input: LiveDebriefInput) {
  const historyString = input.conversationHistory
    .slice(0, -1)
    .map((h) => `${h.role === 'user' ? 'Officer' : 'Guide'}: ${h.parts[0].text}`)
    .join('\n');

  const latestInput = input.conversationHistory[input.conversationHistory.length - 1].parts[0].text;

  const prompt = `You are a compassionate AI guide trained in Critical Incident Stress Management principles. Your role is to listen, reflect, and gently guide the user through their thoughts and feelings after a stressful event. Ask open-ended questions to encourage them to talk. Never give advice or say 'I understand.' Keep your responses concise and conversational. This is a private space to organize thoughts.

// CONVERSATION HISTORY //
${historyString}

// LATEST INPUT //
Officer: "${latestInput}"

// YOUR TASK //
Generate a brief, supportive, and conversational response.
`;

  try {
    const { stream } = await ai.generateStream({
      model: 'gemini-1.5-pro',
      prompt: prompt,
      config: {
        maxOutputTokens: 8192,
        temperature: 0.7,
        topP: 0.95,
        topK: 50,
      }
    });

    // Yield each chunk of text as it comes in from the stream
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('Live Debrief Error:', error);
    yield 'I apologize, but I encountered an issue. Please try again.';
  }
}
