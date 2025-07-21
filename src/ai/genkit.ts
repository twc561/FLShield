import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  config: {
    maxRetries: 3,
    timeout: 30000, // 30 second timeout
  }
});
