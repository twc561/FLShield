'use server';
/**
 * @fileOverview Generates a list of common HAZMAT placard data.
 *
 * - lookupHazmatPlacards - A function that returns a list of placard details.
 * - LookupHazmatPlacardsOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PlacardSchema = z.object({
  placardID: z.string().describe("The 4-digit UN/NA number on the placard."),
  materialName: z.string().describe("The proper shipping name of the material."),
  hazardClass: z.string().describe("The hazard class and name, e.g., '3 (Flammable Liquid)'."),
  ergGuideNumber: z.string().describe("The corresponding guide number from the Emergency Response Guidebook (ERG)."),
  publicSafetyInfo: z.string().describe("Key information for public safety, including initial isolation distances and protective actions."),
  emergencyResponse: z.string().describe("Primary actions for first responders, especially regarding fire and spill control."),
});

const LookupHazmatPlacardsOutputSchema = z.array(PlacardSchema);
export type LookupHazmatPlacardsOutput = z.infer<typeof LookupHazmatPlacardsOutputSchema>;

export async function lookupHazmatPlacards(): Promise<LookupHazmatPlacardsOutput> {
  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-pro',
    prompt: `You are a Hazardous Materials Specialist AI. Generate a database of at least 10-15 common HAZMAT placards found on North American roadways based on the DOT ERG. The output must be an array of 'Placard' objects. Include common materials like Gasoline (1203), Diesel Fuel (1993), Propane (1075), Chlorine (1017), Anhydrous Ammonia (1005), and Sulfuric Acid (1830).`,
    output: {
      schema: LookupHazmatPlacardsOutputSchema,
    },
  });
  if (!output) {
    throw new Error("AI model returned a null response for lookupHazmatPlacards.");
  }
  return output;
}
