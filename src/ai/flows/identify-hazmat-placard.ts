
'use server';
/**
 * @fileOverview Identifies a HAZMAT placard from an image and provides ERG info.
 * This flow uses a multi-step process: first, describe the placard's visual
 * characteristics from an image, then use that description to find the UN ID,
 * and finally retrieve the detailed ERG data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { analyzeHazmatPlacard, AnalyzeHazmatPlacardOutputSchema } from './analyze-hazmat-placard';

// Input for the entire flow
const IdentifyHazmatPlacardInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a HAZMAT placard, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyHazmatPlacardInput = z.infer<typeof IdentifyHazmatPlacardInputSchema>;

export type IdentifyHazmatPlacardOutput = z.infer<typeof AnalyzeHazmatPlacardOutputSchema>;

// Intermediate schema for the first AI call (identifying the UN ID)
const UnIdSchema = z.object({
    unID: z.string().describe("The 4-digit UN/NA number identified from the placard image. If no number is clearly visible, return '0000'."),
});

const identifyPlacardPrompt = ai.definePrompt(
    {
        name: 'identifyPlacardPrompt',
        input: { schema: IdentifyHazmatPlacardInputSchema },
        output: { schema: UnIdSchema },
        prompt: `You are an expert HAZMAT placard recognition system. Analyze the following image of a placard and extract ONLY the 4-digit UN/NA number. Disregard any other numbers like the hazard class at the bottom. The number is the most important piece of information.
    
      Image: {{media url=imageDataUri}}`,
    }
);

export const identifyHazmatPlacardFromImage = ai.defineFlow(
  {
    name: 'identifyHazmatPlacardFromImage',
    inputSchema: IdentifyHazmatPlacardInputSchema,
    outputSchema: AnalyzeHazmatPlacardOutputSchema,
  },
  async (input) => {
    // Step 1: Analyze the image to get the UN/NA ID
    const { output: idAnalysis } = await identifyPlacardPrompt(input);

    if (!idAnalysis || !idAnalysis.unID || idAnalysis.unID === '0000') {
      // Return a structured error response if no ID could be found.
      return {
          unID: "N/A",
          materialName: "Invalid or Unknown ID",
          ergGuideNumber: "N/A",
          placardInfo: { className: "Not found", graphicDescription: "Not found" },
          immediateSafetyActions: { title: "Not found", checklist: [] },
          publicSafetyDistances: { title: "Not found", initialIsolation: "N/A", evacuation_Spill: "N/A", evacuation_Fire: "N/A" },
          potentialHazards: { title: "Not found", health: "N/A", fireOrExplosion: "N/A" },
          emergencyResponse: { title: "Not found", firstAid: "N/A", fireFighting: "N/A" },
      };
    }

    // Step 2: Use the identified UN ID to get the full ERG analysis
    const ergData = await analyzeHazmatPlacard({ unID: idAnalysis.unID });

    return ergData;
  }
);
