'use server';

/**
 * @fileOverview Summarizes a document using an AI model.
 *
 * - summarizeDocument - A function that summarizes a given document.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const SummarizeDocumentInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to summarize.'),
});
export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the document.'),
});
export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

export async function summarizeDocument(input: SummarizeDocumentInput): Promise<SummarizeDocumentOutput> {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro'),
    prompt: `Summarize the following document, extracting the key information and insights:

${input.documentText}`,
    schema: SummarizeDocumentOutputSchema,
  });
  return object;
}
