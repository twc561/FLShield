'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Initialize Gemini directly like the roleplay simulator
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

const ConversationalPartnerInputSchema = z.object({
  query: z.string().describe("The user's latest spoken query."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).optional().describe("The history of the conversation so far."),
});
export type ConversationalPartnerInput = z.infer<typeof ConversationalPartnerInputSchema>;

const ConversationalPartnerOutputSchema = z.object({
  response: z.string().describe("The AI's direct, concise, and conversational response."),
});
export type ConversationalPartnerOutput = z.infer<typeof ConversationalPartnerOutputSchema>;

function createConversationalPrompt(query: string, conversationHistory: any[] = []): string {
  const recentHistory = conversationHistory.slice(-10); // Last 10 exchanges
  const historyContext = recentHistory.map(entry => {
    const speaker = entry.role === 'user' ? 'Officer' : 'Shield FL';
    return `${speaker}: "${entry.parts[0].text}"`;
  }).join('\n');

  return `You are 'Shield FL,' an AI partner for Florida law enforcement, operating in a hands-free, voice-to-voice mode. Your purpose is to provide immediate, clear, and practical answers to questions from an officer.

Keep your responses concise and conversational. Do not provide legal advice, but rather operational guidance and factual information. Focus on officer safety and legal accuracy.

CONVERSATION HISTORY:
${historyContext}

OFFICER'S CURRENT QUESTION: "${query}"

Your response as Shield FL:`;
}

export async function* streamConversationalPartner(input: ConversationalPartnerInput) {
  try {
    console.log('Conversational Partner streaming call:', {
      queryLength: input.query.length,
      historyLength: input.conversationHistory?.length || 0
    });

    const prompt = createConversationalPrompt(input.query, input.conversationHistory);

    // Use Gemini Pro with robust streaming like role-play simulator
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 50,
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
    console.error('Conversational Partner streaming error:', error);
    yield "I'm having difficulty processing that request right now. Could you please try rephrasing your question?";
  }
}

export async function getConversationalResponse(input: ConversationalPartnerInput): Promise<ConversationalPartnerOutput> {
  try {
    const prompt = createConversationalPrompt(input.query, input.conversationHistory);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 50,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return { response: text.trim() };
    }

    return { response: "I'm here to help. Could you please rephrase your question?" };

  } catch (error) {
    console.error('Conversational Partner error:', error);
    return { response: "I'm having difficulty processing that request. Please try again." };
  }
}