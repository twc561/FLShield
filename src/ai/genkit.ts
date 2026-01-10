import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const apiKey = process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDzhOTzCGZ3YXHhMaKQ5X0fEtOjpShxKhM';

const ai = genkit({
  plugins: [
    googleAI({
      apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-pro',
});

export { ai };

// Export enhanced model configurations with maximum token limits
export const enhancedAI = genkit({
  plugins: [
    googleAI({
      apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-pro',
});

// High-capacity configuration for complex scenarios
export const highCapacityConfig = {
  model: 'googleai/gemini-1.5-pro',
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
