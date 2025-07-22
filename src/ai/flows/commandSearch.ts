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

RESPONSE GUIDELINES:
- Provide comprehensive but digestible information
- Structure responses with clear sections when appropriate (Overview, Key Points, Procedures, etc.)
- Ground answers in Florida statutes and established police procedures
- Focus on operational guidance and factual information
- Prioritize officer safety and legal accuracy
- Include relevant statute numbers or case law when applicable
- Provide practical examples when helpful
- Note when something is NOT legal advice, but operational guidance

OFFICER'S QUESTION: "${query}"

Your comprehensive response as Shield FL:`;
}

export async function* streamCommandSearch(input: CommandSearchInput) {
  try {
    console.log('Command Search streaming call:', {
      queryLength: input.query.length,
      timestamp: new Date().toISOString()
    });

    const prompt = createCommandSearchPrompt(input.query);

    // Use Gemini Pro with increased token limits for comprehensive responses
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    // Add timeout wrapper
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000); // 30 second timeout
    });

    const streamPromise = model.generateContentStream(prompt);
    
    const result = await Promise.race([streamPromise, timeoutPromise]) as any;

    let chunkCount = 0;
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText && chunkText.trim()) {
        chunkCount++;
        yield chunkText;
      }
    }

    console.log('Command Search completed:', { chunkCount });

  } catch (error: any) {
    console.error('Command Search streaming error:', error);
    
    if (error.message === 'Request timeout') {
      yield "The request is taking longer than expected. Please try a more specific question or try again in a moment.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      yield "I'm experiencing high demand right now. Please try again in a few moments.";
    } else {
      yield "I'm having difficulty processing that command right now. Please try again or rephrase your question.";
    }
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
        maxOutputTokens: 8192,
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