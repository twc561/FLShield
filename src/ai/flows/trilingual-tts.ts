
'use server';

/**
 * @fileOverview Converts text to speech in multiple languages using Genkit AI.
 *
 * - trilingualTextToSpeech - A function that takes text and a language code,
 *   and returns a playable audio data URI.
 * - TrilingualTextToSpeechInput - The input schema for the flow.
 * - TrilingualTextToSpeechOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import wav from 'wav';

// Define the supported language codes
const supportedLanguages = z.enum(['es-US', 'ht-HT']);

export const TrilingualTextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  language: supportedLanguages.describe('The language of the text.'),
});
export type TrilingualTextToSpeechInput = z.infer<typeof TrilingualTextToSpeechInputSchema>;

export const TrilingualTextToSpeechOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type TrilingualTextToSpeechOutput = z.infer<typeof TrilingualTextToSpeechOutputSchema>;

export async function trilingualTextToSpeech(
  input: TrilingualTextToSpeechInput
): Promise<TrilingualTextToSpeechOutput> {
  const { media } = await ai.generate({
    model: googleAI.model('gemini-2.5-flash-preview-tts'),
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          // Use a standard, high-quality voice. The model is capable of
          // detecting the language from the prompt text (Spanish/Haitian Creole)
          // and generating the appropriate audio.
          prebuiltVoiceConfig: { voiceName: 'Algenib' },
        },
      },
    },
    prompt: input.text,
  });

  if (!media) {
    throw new Error('No media was returned from the TTS model.');
  }

  // The raw data from Gemini is PCM, so we need to encode it into a WAV container
  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );

  const wavData = await toWav(audioBuffer);
  return {
    media: 'data:audio/wav;base64,' + wavData,
  };
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
