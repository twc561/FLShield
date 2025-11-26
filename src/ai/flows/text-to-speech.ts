'use server';

/**
 * @fileOverview Converts text to speech using a Genkit AI flow, with customizable voice parameters.
 *
 * - textToSpeech - A function that takes text and voice options and returns a playable audio data URI.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import { config } from 'dotenv';
config();

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';


const TextToSpeechInputSchema = z.object({
  text: z.string().describe("The text to synthesize."),
  voiceName: z.string().optional().describe("The voice model name, e.g., 'Algenib'"),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;


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

    let bufs: any[] = [];
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


export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: input.voiceName || 'Algenib' },
            },
          },
        },
        prompt: input.text,
      });

      if (!media?.url) {
        throw new Error('Text-to-speech generation failed to return valid audio data.');
      }
      
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      
      const wavBase64 = await toWav(audioBuffer);
    
      return {
        media: `data:audio/wav;base64,${wavBase64}`,
      };
}
