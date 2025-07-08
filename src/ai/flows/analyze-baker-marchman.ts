'use server';
/**
 * @fileOverview Analyzes and provides trilingual details for Baker and Marchman Acts.
 *
 * - analyzeBakerMarchman - A function that fetches and parses the data.
 * - AnalyzeBakerMarchmanOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TrilingualContentSchema = z.object({
  legalStandard: z.string().describe("The legal standard for involuntary commitment under this act, in the specified language."),
  criteria: z.array(z.string()).describe("The list of criteria that must be met for involuntary commitment, in the specified language."),
  officerTakeaway: z.string().describe("A practical summary for law enforcement officers, in the specified language."),
});

const TrilingualActDetailSchema = z.object({
  title: z.string().describe("The official title of the Act, e.g., 'The Florida Mental Health Act (Baker Act)'"),
  english: TrilingualContentSchema,
  spanish: TrilingualContentSchema,
  haitian_creole: TrilingualContentSchema,
});

const AnalyzeBakerMarchmanOutputSchema = z.object({
  bakerAct: TrilingualActDetailSchema,
  marchmanAct: TrilingualActDetailSchema,
});
export type AnalyzeBakerMarchmanOutput = z.infer<typeof AnalyzeBakerMarchmanOutputSchema>;

export async function analyzeBakerMarchman(): Promise<AnalyzeBakerMarchmanOutput> {
  // This flow doesn't require input, as it always fetches the same data structure.
  return analyzeBakerMarchmanFlow();
}

const prompt = ai.definePrompt({
  name: 'analyzeBakerMarchmanPrompt',
  output: { schema: AnalyzeBakerMarchmanOutputSchema },
  prompt: `You are a Legal Analyst AI specializing in Florida's involuntary commitment laws (F.S. Chapter 394 & 397). Generate a comprehensive guide for law enforcement. 
  
  For both the Baker Act (mental health) and the Marchman Act (substance abuse), you MUST provide the following information in three separate languages: English, Spanish (Español), and Haitian Creole (Kreyòl Ayisyen).
  
  For each language within each act, provide:
  1.  **legalStandard**: A concise statement of the legal basis for commitment.
  2.  **criteria**: A detailed, bulleted list of the specific criteria that must be met for an officer to initiate an involuntary hold.
  3.  **officerTakeaway**: A practical summary of what this means for an officer in the field.

  Your output MUST be a single, valid JSON object adhering strictly to the required schema. The content should be practical and focused on field application for patrol officers.`,
});

const analyzeBakerMarchmanFlow = ai.defineFlow(
  {
    name: 'analyzeBakerMarchmanFlow',
    outputSchema: AnalyzeBakerMarchmanOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
