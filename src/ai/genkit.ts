import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  config: {
    maxRetries: 5,
    timeout: 120000, // 2 minute timeout for complex responses
  }
});
