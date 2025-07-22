
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
  return `You are 'Shield FL,' a focused AI assistant for Florida law enforcement. Answer the officer's specific question directly and practically.

ANSWER FORMAT:
1. **Direct Answer** - Address their exact question in 1-2 sentences
2. **Key Points** - List 3-4 most important facts they need to know
3. **Practical Example** - Give ONE realistic scenario showing how this applies in the field
4. **Quick Reference** - Include relevant statute numbers or key procedures

RESPONSE RULES:
- Stay laser-focused on their specific question - don't add tangential information
- Use simple, clear language without legal jargon unless necessary  
- Give ONE concrete example that an officer would actually encounter
- Keep response under 2000 characters total
- If the question is vague, interpret it from a patrol officer's perspective

OFFICER'S QUESTION: "${query}"

Your focused, practical response:`;
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

    // Focused fallback responses with examples
    const fallbackResponses = {
      'dui': "**DUI Investigation**\n\nYou need reasonable suspicion for the stop and probable cause for arrest.\n\n**Key Steps:** 1) Initial observations (odor, bloodshot eyes, slurred speech) 2) Field sobriety tests 3) Breath test consideration\n\n**Example:** Driver weaving, smells of alcohol, fails HGN test - you have probable cause under F.S. 316.193\n\n**Reference:** F.S. 316.193 (DUI statute)",
      'miranda': "**Miranda Requirements**\n\nRequired only when suspect is in custody AND you're interrogating them.\n\n**Key Points:** 1) Must be in custody (not free to leave) 2) Must be interrogating (not spontaneous statements) 3) Must be complete warning\n\n**Example:** Suspect in patrol car, cuffed, you ask \"Why did you hit him?\" - Miranda required first\n\n**Reference:** Miranda v. Arizona (1966)",
      'traffic': "**Traffic Stop Procedure**\n\nPriority is officer safety and clear communication of violation.\n\n**Key Steps:** 1) Safe positioning 2) Approach from rear 3) Identify yourself and reason 4) Request documents\n\n**Example:** \"Good evening, I'm Officer Smith with [Agency]. I stopped you for speeding 45 in a 25 zone. License and registration please.\"\n\n**Reference:** F.S. 316.650 (traffic stops)",
      'force': "**Use of Force**\n\nMust be objectively reasonable based on totality of circumstances.\n\n**Key Test:** 1) Immediate threat level 2) Severity of crime 3) Risk of escape 4) Officer/public safety\n\n**Example:** Subject advancing with knife, ignoring commands - deadly force may be justified under Graham standard\n\n**Reference:** Graham v. Connor (1989), F.S. 776.05"
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
