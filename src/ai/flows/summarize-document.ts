'use server';

/**
 * @fileOverview Summarizes a document using an AI model.
 *
 * - summarizeDocument - A function that summarizes a given document.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to summarize.'),
});
export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the document.'),
});
export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

export async function summarizeDocument(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  const { output } = await ai.generate({
    prompt: `Summarize the following document, extracting the key information and insights:

${input.documentText}`,
    output: {
      schema: SummarizeDocumentOutputSchema,
    },
  });
  if (!output) {
    throw new Error("Failed to generate document summary.");
  }
  return output;
}
