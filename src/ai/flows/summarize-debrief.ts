'use server';
/**
 * @fileOverview Summarizes a guided debrief session.
 *
 * - summarizeDebrief - A function that summarizes user inputs.
 * - SummarizeDebriefInput - The input type for the function.
 * - SummarizeDebriefOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizeDebriefInputSchema = z.object({
  facts: z.string().describe('The user\'s description of the facts of the event.'),
  thoughts: z.string().describe('The user\'s description of their thoughts during the event.'),
  difficulties: z.string().describe('The user\'s description of the most difficult part of the event.'),
});
export type SummarizeDebriefInput = z.infer<typeof SummarizeDebriefInputSchema>;

const SummarizeDebriefOutputSchema = z.object({
  summary: z.string().describe('The generated non-judgmental summary and recommendation.'),
});
export type SummarizeDebriefOutput = z.infer<typeof SummarizeDebriefOutputSchema>;

export async function summarizeDebrief(
  input: SummarizeDebriefInput
): Promise<SummarizeDebriefOutput> {
  const { output } = await ai.generate({
    model: 'gemini-1.5-flash',
    prompt: `You are a compassionate AI guide trained in Critical Incident Stress Management principles. Your role is to listen and reflect. Never give advice or say 'I understand.'
  
  Based on the user's inputs, provide a brief, non-judgmental summary of what they expressed. Then, conclude with the following recommendation verbatim: "Thank you for sharing. Processing these events is a sign of strength. It is strongly recommended that you speak with a member of your agency's peer support team or a mental health professional. Your wellness is a priority."

  User's Description of Facts: ${input.facts}
  User's Description of Thoughts: ${input.thoughts}
  User's Description of Difficulties: ${input.difficulties}

  Generate the summary and recommendation now.
  `,
    output: {
      schema: SummarizeDebriefOutputSchema,
    },
  });
  return { summary: output!.summary };
}
