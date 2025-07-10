'use server';

/**
 * @fileOverview A live, streaming AI conversational partner for guided debriefing.
 * This flow is designed for real-time, interactive chat sessions.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
  const prompt = `You are a compassionate AI guide trained in Critical Incident Stress Management principles. Your role is to listen, reflect, and gently guide the user through their thoughts and feelings after a stressful event. Ask open-ended questions to encourage them to talk. Never give advice or say 'I understand.' Keep your responses concise and conversational. This is a private space to organize thoughts.

// CONVERSATION HISTORY //
${input.conversationHistory
  .map((h) => `${h.role === 'user' ? 'Officer' : 'Guide'}: ${h.parts[0].text}`)
  .join('\n')}

// LATEST INPUT //
Officer: "${
    input.conversationHistory[input.conversationHistory.length - 1].parts[0]
      .text
  }"

// YOUR TASK //
Generate a brief, supportive, and conversational response.
`;

  const { stream } = ai.generateStream({
    prompt: prompt,
    history: input.conversationHistory.slice(0, -1), // Pass history excluding the latest prompt
  });

  // Yield each chunk of text as it comes in from the stream
  for await (const chunk of stream) {
    yield chunk.text;
  }
}
