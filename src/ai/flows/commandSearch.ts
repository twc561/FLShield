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
  return `You are 'Shield FL,' an advanced AI partner for Florida law enforcement. Your purpose is to provide immediate, comprehensive, and practical answers to questions from front-line patrol officers.

RESPONSE GUIDELINES:
- Provide thorough, well-structured, and digestible information
- Use clear sections with headers (Overview, Key Points, Legal Framework, Procedures, Examples, etc.)
- Ground all answers in Florida statutes, case law, and established police procedures
- Focus on operational guidance while maintaining legal accuracy
- Prioritize officer safety and constitutional compliance in all recommendations
- Include specific statute numbers, case citations, and procedural references
- Provide multiple practical examples and scenarios when relevant
- Address potential complications or edge cases
- Include step-by-step procedures where applicable
- Note when something is operational guidance vs. legal advice
- Provide context about why certain procedures exist
- Include relevant department policy considerations
- Address both immediate tactical needs and long-term case building

ENHANCED CAPABILITIES:
With increased response capacity, provide:
- Detailed explanations of legal principles
- Multiple scenario applications
- Comprehensive procedure walkthroughs  
- Related statute cross-references
- Best practice recommendations
- Common pitfalls to avoid
- Documentation requirements
- Follow-up considerations

OFFICER'S QUESTION: "${query}"

Your comprehensive, detailed response as Shield FL:`;
}

export async function* streamCommandSearch(input: CommandSearchInput) {
  try {
    // Validate input
    if (!input || !input.query || typeof input.query !== 'string') {
      yield "Please provide a valid question.";
      return;
    }

    if (input.query.trim().length === 0) {
      yield "Please enter a question to search.";
      return;
    }

    console.log('Command Search streaming call:', {
      queryLength: input.query.length,
      timestamp: new Date().toISOString()
    });

    const prompt = createCommandSearchPrompt(input.query);

    if (!genAI) {
      throw new Error('AI service not initialized');
    }

    // Use latest Gemini Pro with supported token limits for comprehensive responses
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192, // Use supported token limit
      },
    });

    const result = await model.generateContentStream(prompt);

    let chunkCount = 0;
    let totalContent = '';
    
    try {
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText && chunkText.trim()) {
          chunkCount++;
          totalContent += chunkText;
          yield chunkText;
        }
      }
    } catch (streamError: any) {
      console.error('Stream interrupted:', streamError);
      
      // If we got substantial content before the interruption, that's okay
      if (totalContent.length > 100) {
        console.log('Stream was interrupted but substantial content was delivered:', { 
          chunkCount, 
          contentLength: totalContent.length 
        });
        return; // Don't yield error message if we got substantial content
      }
      
      // Only yield error if we got very little or no content
      console.error('Stream failed with minimal content:', { 
        contentLength: totalContent.length,
        error: streamError.message 
      });
      throw streamError;
    }

    console.log('Command Search completed successfully:', { chunkCount, contentLength: totalContent.length });

  } catch (error: any) {
    console.error('Command Search streaming error:', error);
    
    // Handle specific error types with more helpful messages
    if (error.message?.includes('timeout') || error.code === 'DEADLINE_EXCEEDED') {
      yield "The request is taking longer than expected. Please try a more specific question or try again in a moment.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit') || error.code === 'RESOURCE_EXHAUSTED') {
      yield "I'm experiencing high demand right now. Please try again in a few moments.";
    } else if (error.name === 'ResponseAborted' || error.message?.includes('aborted')) {
      yield "The connection was interrupted. Please try your question again.";
    } else if (error.message?.includes('API key')) {
      yield "There's an issue with the AI service configuration. Please contact support.";
    } else {
      yield "I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.";
    }
  }
}

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<CommandSearchOutput> {
  try {
    const prompt = createCommandSearchPrompt(input.query);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192, // Use supported token limit
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