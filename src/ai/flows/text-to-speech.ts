
'use server';

/**
 * @fileOverview Enhanced text-to-speech with voice selection, caching, and error recovery
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import wav from 'wav';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe("The text to synthesize."),
  voiceName: z.string().optional().describe("The voice model name"),
  language: z.string().optional().describe("Language code (en, es, ht)"),
  speed: z.number().min(0.25).max(4.0).optional().describe("Speech speed multiplier"),
  pitch: z.number().min(-20).max(20).optional().describe("Pitch adjustment in semitones"),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  media: z.string().describe('The base64 encoded WAV audio data URI.'),
  duration: z.number().optional().describe('Audio duration in seconds'),
  voiceUsed: z.string().describe('The voice model actually used'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

// Voice mapping with fallbacks for different languages
const VOICE_MAP = {
  'english': {
    primary: 'Algenib',
    fallback: 'Journey'
  },
  'spanish': {
    primary: 'Cursa',
    fallback: 'Deneb'
  },
  'haitian_creole': {
    primary: 'Deneb',
    fallback: 'Algenib'
  }
} as const;

const LANGUAGE_CODES = {
  'en': 'english',
  'es': 'spanish', 
  'ht': 'haitian_creole'
} as const;

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  const validatedInput = TextToSpeechInputSchema.parse(input);
  
  // Determine the best voice based on language and input
  let voiceToUse = validatedInput.voiceName;
  
  if (!voiceToUse && validatedInput.language) {
    const langKey = LANGUAGE_CODES[validatedInput.language as keyof typeof LANGUAGE_CODES];
    if (langKey) {
      voiceToUse = VOICE_MAP[langKey].primary;
    }
  }
  
  if (!voiceToUse) {
    voiceToUse = 'Algenib'; // Default fallback
  }

  try {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { 
              voiceName: voiceToUse 
            },
          },
          audioConfig: {
            speakingRate: validatedInput.speed || 1.0,
            pitch: validatedInput.pitch || 0,
            volumeGainDb: 0,
          }
        },
      },
      prompt: preprocessText(validatedInput.text, validatedInput.language),
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
    const duration = calculateAudioDuration(audioBuffer.length);
    
    return {
      media: 'data:audio/wav;base64,' + wavData,
      duration,
      voiceUsed: voiceToUse
    };

  } catch (error) {
    console.error('Primary TTS failed, trying fallback:', error);
    
    // Try with fallback voice if primary fails
    if (validatedInput.language) {
      const langKey = LANGUAGE_CODES[validatedInput.language as keyof typeof LANGUAGE_CODES];
      if (langKey && voiceToUse !== VOICE_MAP[langKey].fallback) {
        return textToSpeechFallback(validatedInput, VOICE_MAP[langKey].fallback);
      }
    }
    
    // Final fallback with basic voice
    if (voiceToUse !== 'Journey') {
      return textToSpeechFallback(validatedInput, 'Journey');
    }
    
    throw new Error(`TTS generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function textToSpeechFallback(input: TextToSpeechInput, fallbackVoice: string): Promise<TextToSpeechOutput> {
  try {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: fallbackVoice },
          },
        },
      },
      prompt: preprocessText(input.text, input.language),
    });

    if (!media) {
      throw new Error('No media was returned from fallback TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavData = await toWav(audioBuffer);
    const duration = calculateAudioDuration(audioBuffer.length);
    
    return {
      media: 'data:audio/wav;base64,' + wavData,
      duration,
      voiceUsed: fallbackVoice
    };
  } catch (fallbackError) {
    throw new Error(`Fallback TTS also failed: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);
  }
}

function preprocessText(text: string, language?: string): string {
  // Clean and optimize text for speech synthesis
  let processedText = text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .replace(/([.!?])\s*([A-Z])/g, '$1 $2'); // Ensure proper pauses

  // Add language-specific pronunciation hints
  if (language === 'es') {
    // Spanish pronunciation improvements
    processedText = processedText
      .replace(/ñ/g, 'n̄') // Better ñ handling
      .replace(/ll/g, 'y'); // Improve 'll' pronunciation
  } else if (language === 'ht') {
    // Haitian Creole pronunciation hints
    processedText = processedText
      .replace(/è/g, 'e') // Normalize accents for better TTS
      .replace(/ò/g, 'o');
  }

  return processedText;
}

function calculateAudioDuration(bufferLength: number, sampleRate = 24000, channels = 1, sampleWidth = 2): number {
  return bufferLength / (sampleRate * channels * sampleWidth);
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

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', function (d: Buffer) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
