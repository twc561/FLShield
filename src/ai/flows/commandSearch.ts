
'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Initialize Gemini with same approach as roleplay simulator
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

const CommandSearchInputSchema = z.object({
  query: z.string().describe('The user\'s question from the search bar.'),
});
export type CommandSearchInput = z.infer<typeof CommandSearchInputSchema>;

const CommandSearchOutputSchema = z.object({
  answer: z.string().describe("The AI's direct, concise, and practical answer to the officer's query."),
});
export type CommandSearchOutput = z.infer<typeof CommandSearchOutputSchema>;

function createCommandSearchPrompt(query: string): string {
  return `You are Shield FL, an AI assistant for Florida law enforcement officers. Provide clear, practical answers about Florida law, procedures, and protocols.

Focus on:
- Florida statutes and legal requirements
- Operational procedures and best practices
- Officer safety and constitutional compliance
- Specific examples and step-by-step guidance

Question: "${query}"

Response:`;
}

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<string> {
  try {
    console.log('Command search call:', {
      queryLength: input.query.length,
      timestamp: new Date().toISOString()
    });

    const prompt = createCommandSearchPrompt(input.query);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return text.trim();
    }

    return "I understand you're looking for information. Could you please rephrase your question or be more specific?";

  } catch (error: any) {
    console.error('Command search error:', error);
    return "I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.";
  }
}

export async function* streamCommandSearch(input: CommandSearchInput) {
  try {
    // Just return the direct response - no complex streaming
    const response = await getCommandSearchResponse(input);
    yield response;
  } catch (error: any) {
    console.error('Command Search error:', error);
    yield "I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.";
  }
}

export const commandSearch = async (input: CommandSearchInput) => {
  const response = await getCommandSearchResponse(input);
  return { answer: response };
};
