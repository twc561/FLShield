
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
- Keep responses comprehensive but concise (under 3000 characters)

OFFICER'S QUESTION: "${query}"

Your comprehensive response as Shield FL:`;
}

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<string> {
  try {
    console.log('Command search direct call:', {
      queryLength: input.query.length,
      timestamp: new Date().toISOString()
    });

    const prompt = createCommandSearchPrompt(input.query);

    if (!genAI) {
      throw new Error('AI service not initialized');
    }

    // Use same proven configuration as roleplay simulator
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048, // Reduced for reliability
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Command search response received:', text.substring(0, 100));

    if (text && text.trim()) {
      return text.trim();
    }

    // Enhanced fallback responses
    const fallbackResponses = {
      'dui': "**DUI Investigation Overview**\n\nFor DUI investigations in Florida, follow these key steps:\n1. Establish reasonable suspicion for the stop\n2. Observe signs of impairment\n3. Conduct Field Sobriety Tests if appropriate\n4. Consider breath/blood testing per F.S. 316.193\n\nRefer to your department's DUI investigation procedures for specific protocols.",
      'miranda': "**Miranda Warning Requirements**\n\nMiranda warnings are required when:\n1. The person is in custody AND\n2. You intend to interrogate them\n\nThe warning must include the right to remain silent, that statements can be used against them, right to an attorney, and right to appointed counsel if indigent.",
      'traffic': "**Traffic Stop Procedures**\n\nKey steps for traffic stops:\n1. Signal your intent and find a safe location\n2. Approach with officer safety in mind\n3. Identify yourself and state the reason for the stop\n4. Request license, registration, and insurance\n5. Explain any citation or warning given",
      'force': "**Use of Force Guidelines**\n\nUse of force must be:\n1. Objectively reasonable\n2. Necessary under the circumstances\n3. Proportional to the threat\n\nDocument all use of force incidents thoroughly and notify supervisors as required by policy."
    };

    // Check for keyword matches in query
    const queryLower = input.query.toLowerCase();
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (queryLower.includes(keyword)) {
        return response;
      }
    }

    return "I understand you're looking for information about law enforcement procedures. Could you please rephrase your question or be more specific about what you need help with?";

  } catch (error: any) {
    console.error('Command search direct error:', error);
    return "I'm having some technical difficulties right now. Please try asking your question in a different way.";
  }
}

export async function* streamCommandSearch(input: CommandSearchInput) {
  try {
    // Robust input validation
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

    // Use direct response instead of streaming to avoid ResponseAborted errors
    const directResponse = await getCommandSearchResponse(input);
    
    // Simulate streaming by yielding the complete response
    yield directResponse;

    console.log('Command Search completed successfully via direct response');

  } catch (error: any) {
    console.error('Command Search streaming error:', error);
    yield "I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.";
  }
}

export const commandSearch = async (input: CommandSearchInput) => {
  const response = await getCommandSearchResponse(input);
  return { answer: response };
};
