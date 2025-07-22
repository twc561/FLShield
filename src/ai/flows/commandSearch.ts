'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Initialize Gemini directly like the roleplay simulator
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
  return `You are 'Shield FL,' an AI partner for Florida law enforcement. Your purpose is to provide immediate, clear, and practical answers to questions from front-line patrol officers. 

The answer should be:
- Concise and easy to understand during high-stakes situations
- Grounded in Florida statutes and common police procedures
- Focused on operational guidance and factual information
- Prioritizing officer safety and legal accuracy
- NOT legal advice, but rather practical guidance

OFFICER'S QUESTION: "${query}"

Your response as Shield FL:`;
}

export async function* streamCommandSearch(input: CommandSearchInput) {
  try {
    console.log('Command Search streaming call:', {
      queryLength: input.query.length
    });

    const prompt = createCommandSearchPrompt(input.query);

    // Use Gemini Pro with robust streaming like role-play simulator
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.4,
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
    console.error('Command Search streaming error:', error);
    yield "I'm having difficulty processing that command right now. Please try again or rephrase your question.";
  }
}

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<CommandSearchOutput> {
  try {
    const prompt = createCommandSearchPrompt(input.query);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return { answer: text.trim() };
    }

    return { answer: "I'm having difficulty processing that question right now. Please try rephrasing it." };

  } catch (error) {
    console.error('Command Search error:', error);
    return { answer: "I'm experiencing technical difficulties. Please try your question again." };
  }
}

export const commandSearch = async (input: CommandSearchInput) => {
  return await getCommandSearchResponse(input);
};