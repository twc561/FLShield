'use server';

/**
 * @fileOverview Converts text to speech using a Genkit AI flow, with customizable voice parameters.
 *
 * - textToSpeech - A function that takes text and voice options and returns a playable audio data URI.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import { generateSpeech } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe("The text to synthesize."),
  voiceName: z.string().optional().describe("The voice model name, e.g., 'Algenib'"),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
    const { speech } = await generateSpeech({
        model: google.speech('text-to-speech-1'),
        voice: (input.voiceName as any) || 'en-US-Standard-C',
        text: input.text,
    });
  
    const audioBuffer = await speech.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
  
    return {
      media: `data:audio/wav;base64,${base64Audio}`,
    };
  }
