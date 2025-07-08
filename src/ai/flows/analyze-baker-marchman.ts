'use server';
/**
 * @fileOverview Analyzes and provides details for Baker and Marchman Acts.
 *
 * - analyzeBakerMarchman - A function that fetches and parses the data.
 * - AnalyzeBakerMarchmanOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ActDetailSchema = z.object({
  title: z.string(),
  legalStandard: z.string(),
  criteria: z.array(z.string()),
  officerTakeaway: z.string(),
});

const LanguageContentSchema = z.object({
  language: z.string(),
  formTitle: z.string(),
  criteriaSummary: z.string(),
  transportExplanation: z.string(),
});

const AnalyzeBakerMarchmanOutputSchema = z.object({
  bakerAct: ActDetailSchema,
  marchmanAct: ActDetailSchema,
  proceduralForms_Trilingual: z.object({
    title: z.string(),
    explanation: z.string(),
    english: LanguageContentSchema,
    spanish: LanguageContentSchema,
    haitian_creole: LanguageContentSchema,
  }),
});
export type AnalyzeBakerMarchmanOutput = z.infer<typeof AnalyzeBakerMarchmanOutputSchema>;

export async function analyzeBakerMarchman(): Promise<AnalyzeBakerMarchmanOutput> {
  // This flow doesn't require input, as it always fetches the same data structure.
  return analyzeBakerMarchmanFlow();
}

const prompt = ai.definePrompt({
  name: 'analyzeBakerMarchmanPrompt',
  output: { schema: AnalyzeBakerMarchmanOutputSchema },
  prompt: `You are a Legal Analyst AI specializing in Florida's involuntary commitment laws (F.S. Chapter 394 & 397). Generate a comprehensive guide for law enforcement. Your output MUST be a single JSON object adhering to the schema, including the trilingual section for key procedural text. The content should be practical and focused on field application for patrol officers.`,
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
