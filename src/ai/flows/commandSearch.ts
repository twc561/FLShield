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

Structure your response in exactly these three sections:

**MUST KNOW:**
- Essential facts, statutes, or procedures every officer should remember
- Critical safety considerations
- Legal requirements or thresholds

**HOW IT APPLIES:**
- Practical application in the field
- When and how to use this information
- Decision-making guidance for officers

**EXAMPLE:**
- Real-world scenario demonstrating the concept
- Step-by-step walkthrough if applicable
- Common situations where this applies

Requirements:
- Keep each section concise but complete
- Focus on Florida law and procedures
- Prioritize officer safety and legal accuracy
- Provide operational guidance, not legal advice

OFFICER'S QUESTION: "${query}"

Your response as Shield FL:`;
}

export async function* streamCommandSearch(input: CommandSearchInput): AsyncGenerator<string, void, unknown> {
  try {
    console.log('Command Search streaming call:', {
      queryLength: input.query.length
    });

    // Validate API key
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.error('Missing GOOGLE_GENAI_API_KEY');
      yield "Configuration error: API key not found. Please check your environment variables.";
      return;
    }

    const prompt = createCommandSearchPrompt(input.query);

    // Use Gemini 2.5 Flash for better performance and reliability
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Updated to 2.5 Flash
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContentStream(prompt);

    let hasContent = false;
    try {
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText && chunkText.trim()) {
          hasContent = true;
          yield chunkText;
        }
      }
    } catch (streamingError) {
      console.error('Error during streaming:', streamingError);
      if (!hasContent) {
        // Fall back to non-streaming if streaming fails
        try {
          const fallbackResult = await model.generateContent(prompt);
          const fallbackResponse = await fallbackResult.response;
          const fallbackText = fallbackResponse.text();
          if (fallbackText && fallbackText.trim()) {
            yield fallbackText.trim();
            hasContent = true;
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      }
    }

    if (!hasContent) {
      yield "I wasn't able to generate a response. Please try rephrasing your question or ask something more specific.";
    }

  } catch (error: any) {
    console.error('Command Search streaming error:', error);
    
    // Provide more specific error messages based on error type
    if (error?.message?.includes('API_KEY')) {
      yield "Authentication error: Please check your API key configuration.";
    } else if (error?.message?.includes('QUOTA') || error?.message?.includes('quota')) {
      yield "API quota exceeded. Please try again later.";
    } else if (error?.message?.includes('SAFETY') || error?.message?.includes('safety')) {
      yield "Content was filtered for safety. Please rephrase your question.";
    } else if (error?.message?.includes('TOKEN') || error?.message?.includes('token')) {
      yield "Your query is too long. Please try asking a shorter, more specific question.";
    } else {
      yield "I'm experiencing technical difficulties. Please try your question again in a moment.";
    }
  }
}

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<CommandSearchOutput> {
  try {
    // Validate API key
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.error('Missing GOOGLE_GENAI_API_KEY');
      return { answer: "Configuration error: API key not found. Please check your environment variables." };
    }

    const prompt = createCommandSearchPrompt(input.query);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Updated to 2.5 Flash
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return { answer: text.trim() };
    }

    return { answer: "I wasn't able to generate a response. Please try rephrasing your question or ask something more specific." };

  } catch (error: any) {
    console.error('Command Search error:', error);
    
    // Provide specific error messages
    if (error?.message?.includes('API_KEY')) {
      return { answer: "Authentication error: Please check your API key configuration." };
    } else if (error?.message?.includes('QUOTA') || error?.message?.includes('quota')) {
      return { answer: "API quota exceeded. Please try again later." };
    } else if (error?.message?.includes('SAFETY') || error?.message?.includes('safety')) {
      return { answer: "Content was filtered for safety. Please rephrase your question." };
    } else if (error?.message?.includes('TOKEN') || error?.message?.includes('token')) {
      return { answer: "Your query is too long. Please try asking a shorter, more specific question." };
    } else {
      return { answer: "I'm experiencing technical difficulties. Please try your question again in a moment." };
    }
  }
}

export const commandSearch = async (input: CommandSearchInput) => {
  return await getCommandSearchResponse(input);
};