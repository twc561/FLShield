
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

export async function getCommandSearchResponse(input: CommandSearchInput): Promise<string> {
  try {
    console.log('Direct Gemini command search call:', {
      queryLength: input.query.length,
      timestamp: new Date().toISOString()
    });

    const prompt = createCommandSearchPrompt(input.query);

    if (!genAI) {
      throw new Error('AI service not initialized');
    }

    // Use same model configuration as roleplay simulator for consistency
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096, // Use proven working token limit
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Direct Gemini command search response:', text.substring(0, 100));

    if (text && text.trim()) {
      return text.trim();
    }

    // Enhanced fallback responses based on query type
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
    console.error('Direct Gemini command search error:', error);

    // Character-specific error responses like roleplay simulator
    const errorResponses = [
      "I'm having some technical difficulties right now. Please try asking your question in a different way.",
      "I'm experiencing a temporary issue. Could you rephrase your question or try again in a moment?",
      "There's a brief technical problem. Please try your question again or contact support if it persists."
    ];

    return errorResponses[Math.floor(Math.random() * errorResponses.length)];
  }
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

    // Try streaming first, but with robust fallback like roleplay simulator
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
          temperature: 0.3,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 4096, // Use proven working token limit
        },
      });

      const result = await model.generateContentStream(createCommandSearchPrompt(input.query));
      
      let chunkCount = 0;
      let totalContent = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText && chunkText.trim()) {
          chunkCount++;
          totalContent += chunkText;
          yield chunkText;
        }
      }

      console.log('Command Search streaming completed successfully:', { chunkCount, contentLength: totalContent.length });

    } catch (streamError: any) {
      console.error('Streaming failed, falling back to direct response:', streamError);
      
      // Fall back to non-streaming response like roleplay simulator
      const directResponse = await getCommandSearchResponse(input);
      yield directResponse;
    }

  } catch (error: any) {
    console.error('Command Search error:', error);
    
    // Use same robust error handling as roleplay simulator
    const fallbackResponse = "I'm experiencing technical difficulties. Please try rephrasing your question or try again in a moment.";
    yield fallbackResponse;
  }
}

export const commandSearch = async (input: CommandSearchInput) => {
  const response = await getCommandSearchResponse(input);
  return { answer: response };
};
