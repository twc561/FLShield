import { gemini15Pro, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const plugins = [];
if (process.env.GOOGLE_GENAI_API_KEY) {
  plugins.push(googleAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
  }));
} else {
  console.warn("GOOGLE_GENAI_API_KEY is not set. AI features will not function correctly.");
}

const ai = genkit({
  plugins,
  model: gemini15Pro,
});

export { ai };

// Export enhanced model configurations with maximum token limits
export const enhancedAI = genkit({
  plugins,
  model: gemini15Pro,
});

// High-capacity configuration for complex scenarios
export const highCapacityConfig = {
  model: gemini15Pro,
  config: {
    maxOutputTokens: 8192,
    temperature: 0.7,
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
