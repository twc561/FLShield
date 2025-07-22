import { gemini15Pro, gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini15Pro,
});

export { ai };

// Export enhanced model configurations with maximum token limits
export const enhancedAI = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: gemini15Pro,
});

// High-capacity configuration for complex scenarios
export const highCapacityConfig = {
  model: gemini15Pro,
  config: {
    maxOutputTokens: 32768, // Increased to maximum available
    temperature: 0.3, // Slightly lower for more focused responses
    topP: 0.95,
    topK: 40,
    candidateCount: 1,
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH', 
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ]
  }
};

// Enhanced configuration specifically for command search with maximum capabilities
export const commandSearchConfig = {
  model: "gemini-1.5-pro-002", // Latest and most capable model
  config: {
    maxOutputTokens: 32768, // Maximum token output for comprehensive responses
    temperature: 0.3, // Lower temperature for more accurate, focused responses
    topP: 0.95,
    topK: 40,
    candidateCount: 1,
  }
};