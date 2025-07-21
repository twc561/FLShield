
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
  // Try analysis up to 2 times if the first attempt yields "illegible" results
  for (let attempt = 1; attempt <= 2; attempt++) {
    console.log(`[Pill Identification] Attempt ${attempt}/2`);
    
    // Step 1: Analyze the image to get visual characteristics
    const { output: visualAnalysis } = await ai.generate({
    prompt: `You are a forensic pharmaceutical analyst specializing in pill identification. Analyze this pill image with extreme precision:

CRITICAL INSTRUCTIONS:
1. IMPRINT: Look carefully for ANY text, numbers, or symbols on the pill. Common formats include:
   - Letters and numbers (e.g., "M 30", "XANAX 1.0", "OC 80")
   - Single letters (e.g., "V", "E")
   - Numbers only (e.g., "833", "484")
   - Brand names (e.g., "ADDERALL", "SYNTHROID")
   If you cannot clearly read the imprint, state "illegible" - do not guess.

2. COLOR: Identify the PRIMARY color. Common colors: White, Blue, Yellow, Green, Pink, Orange, Purple, Brown, Gray.

3. SHAPE: Be precise about shape. Common shapes: Round, Oval, Capsule-shape, Square, Diamond, Triangle.

Look at the pill from multiple angles if visible. Pay special attention to lighting and shadows that might obscure details.

Image: {{media url=imageDataUri}}`,
    input: { imageDataUri: input.imageDataUri },
    output: {
      schema: PillVisualsSchema,
    },
  });

  if (!visualAnalysis) {
      if (attempt === 2) {
        throw new Error("AI failed to analyze the pill image after multiple attempts.");
      }
      continue;
    }

    // If imprint is illegible and this is the first attempt, try once more
    if (visualAnalysis.imprint === "illegible" && attempt === 1) {
      console.log("[Pill Identification] Imprint illegible, retrying with enhanced analysis");
      continue;
    }

    const visualDescriptionText = `${visualAnalysis.color}, ${visualAnalysis.shape}, imprint ${visualAnalysis.imprint}`;

    // Step 2: Use the local database lookup tool to get a definitive answer.
    const identificationResult = await lookupPill(visualAnalysis);
    
    return {
      ...identificationResult,
      visualDescription: visualDescriptionText
    };
  }
  
  throw new Error("Failed to analyze pill image after multiple attempts.");
}
