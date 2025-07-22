'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Read the prompt template from the .txt file
const templatePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'active-listener.txt');
const activeListenerPromptTemplate = fs.readFileSync(templatePath, 'utf8');

// Initialize Gemini directly like the roleplay simulator
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

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

function createActiveListenerPrompt(userMessage: string, conversationHistory: any[]): string {
  const recentHistory = conversationHistory.slice(-10); // Last 10 exchanges for context
  const historyContext = recentHistory.map(entry => {
    const speaker = entry.role === 'user' ? 'Officer' : 'Wellness Partner';
    return `${speaker}: "${entry.parts[0].text}"`;
  }).join('\n');

  return `${activeListenerPromptTemplate}

CONVERSATION HISTORY:
${historyContext}

OFFICER'S CURRENT MESSAGE: "${userMessage}"

Your response as a confidential wellness partner:`;
}

export async function* streamActiveListener(input: ActiveListenerInput) {
  try {
    console.log('Active Listener streaming call:', {
      historyLength: input.conversationHistory.length,
      messageLength: input.userUtterance.length
    });

    const prompt = createActiveListenerPrompt(input.userUtterance, input.conversationHistory);

    // Use Gemini Pro with robust token limits like role-play simulator
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield chunkText;
      }
    }

  } catch (error: any) {
    console.error('Active Listener streaming error:', error);
    
    // Provide supportive fallback response
    yield "I'm here to listen and support you. Sometimes technical issues occur, but know that this is still your confidential space to share whatever you're experiencing.";
  }
}

export async function getActiveListeningResponse(input: ActiveListenerInput): Promise<ActiveListenerOutput> {
  try {
    const prompt = createActiveListenerPrompt(input.userUtterance, input.conversationHistory);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return { characterResponse: text.trim() };
    }

    // Fallback response
    return { 
      characterResponse: "I'm here to listen and support you. Take your time - this is your space to process whatever you're experiencing." 
    };

  } catch (error) {
    console.error('Active Listener error:', error);
    return { 
      characterResponse: "I'm here to listen and support you. Sometimes technical issues occur, but know that this is still your confidential space." 
    };
  }
}