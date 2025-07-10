
'use server';
/**
 * @fileOverview An AI flow to identify a pill from an image.
 * This uses a multi-step process: first, describe the pill's visual
 * characteristics from an image, then use a dedicated tool to search
 * for the pill's identity based on those characteristics.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { lookupPill } from '@/ai/tools/pill-lookup-tool';

// Input for the entire flow
const IdentifyPillInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a pill, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyPillInput = z.infer<typeof IdentifyPillInputSchema>;

// Output for the entire flow
const IdentifyPillOutputSchema = z.object({
  drugName: z.string().describe("The common brand name or generic name of the identified drug. If unknown, return 'Unknown'."),
  visualDescription: z.string().describe("A summary of the visual characteristics used for identification (e.g., 'White, round, imprint E 7')."),
  primaryUse: z.string().describe("A brief, one-sentence description of what the drug is primarily used for. If unknown, state 'Information not available.'"),
  keyWarnings: z.string().describe("A brief summary of the most critical warnings or potential side effects associated with the drug. If unknown, state 'Information not available.'"),
});
export type IdentifyPillOutput = z.infer<typeof IdentifyPillOutputSchema>;

// Intermediate schema for the first AI call (describing the image)
const PillVisualsSchema = z.object({
    imprint: z.string().describe("The letters and/or numbers imprinted on the pill. If not legible, state 'illegible'."),
    color: z.string().describe("The primary color of the pill."),
    shape: z.string().describe("The shape of the pill (e.g., round, oval, capsule).")
});

export async function identifyPillFromImage(input: IdentifyPillInput): Promise<IdentifyPillOutput> {
  // Step 1: Analyze the image to get visual characteristics
  const { output: visualAnalysis } = await ai.generate({
    prompt: `You are a forensic image analyst. Analyze the following image of a pill and extract its key visual characteristics. Describe ONLY the imprint, color, and shape.
    
    Image: {{media url=imageDataUri}}`,
    input: { imageDataUri: input.imageDataUri },
    output: {
      schema: PillVisualsSchema,
    },
  });

  if (!visualAnalysis) {
    throw new Error("AI failed to analyze the pill image.");
  }

  const visualDescriptionText = `${visualAnalysis.color}, ${visualAnalysis.shape}, imprint ${visualAnalysis.imprint}`;

  // Step 2: Use the visual description and the lookupPill tool to identify the pill
  const { output: identificationResult } = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    system: `You are an expert pharmacologist assistant. Your task is to identify a pill based on its visual characteristics.
    
CRITICAL INSTRUCTIONS:
1. You MUST use the 'lookupPill' tool to find information about the pill.
2. Use the 'imprint', 'color', and 'shape' from the user's prompt as inputs for the tool.
3. Once the tool returns the pill's data, summarize the 'drugName', 'primaryUse', and 'keyWarnings' fields into the required output format.
4. If the tool returns 'Unknown' for the drug name, you MUST also return 'Unknown' and 'Information not available' for the other fields. Do not guess or use your general knowledge.`,
    tools: [lookupPill],
    prompt: `Identify the pill with the following characteristics: imprint='${visualAnalysis.imprint}', color='${visualAnalysis.color}', shape='${visualAnalysis.shape}'.`,
    output: {
      schema: z.object({
        drugName: IdentifyPillOutputSchema.shape.drugName,
        primaryUse: IdentifyPillOutputSchema.shape.primaryUse,
        keyWarnings: IdentifyPillOutputSchema.shape.keyWarnings,
      }),
    },
     config: {
      safetySettings: [
          {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE',
          },
      ],
    },
  });

   if (!identificationResult) {
    throw new Error("AI failed to identify the pill from its description.");
  }
  
  return {
    ...identificationResult,
    visualDescription: visualDescriptionText
  };
}
