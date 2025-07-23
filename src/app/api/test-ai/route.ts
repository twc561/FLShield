
import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function GET() {
  try {
    // Simple test to verify AI is working
    const { output } = await ai.generate({
      prompt: "Respond with exactly: 'AI system is working correctly'",
    });

    return NextResponse.json({ 
      status: 'success', 
      message: output || 'No response generated',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('AI Test Error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
