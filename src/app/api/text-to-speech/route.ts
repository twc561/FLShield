'use server';

import { textToSpeech } from '@/ai/flows/text-to-speech';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'nodejs',
  dynamic: 'force-dynamic',
};

export async function POST(req: Request) {
  try {
    const { text, voiceName } = await req.json();
    const result = await textToSpeech({ text, voiceName });
    return NextResponse.json(result);
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Failed to synthesize speech.' }, { status: 500 });
  }
}
