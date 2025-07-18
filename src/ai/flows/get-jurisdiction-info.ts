'use server';
/**
 * @fileOverview An AI flow to get jurisdiction information from geographic coordinates.
 * This flow takes latitude and longitude and returns structured data about the location.
 */

import { ai } from '@/ai/genkit';
import {
  GetJurisdictionInputSchema,
  GetJurisdictionOutputSchema,
  type GetJurisdictionInput,
  type GetJurisdictionOutput,
} from '@/ai/schemas/jurisdiction-schemas';


// Define the flow
export async function getJurisdictionInfo(input: GetJurisdictionInput): Promise<GetJurisdictionOutput> {
  const prompt = `You are a geographic and jurisdictional analyst specializing in Florida. Based on the provided latitude and longitude, determine the precise jurisdictional information.

CRITICAL INSTRUCTIONS:
1.  **Determine Location:** Find the city, county, state, and zip code for the given coordinates.
2.  **Determine Jurisdiction:** Based on that location, identify the primary law enforcement agency, the judicial circuit, and the appellate court district.
3.  **Strict JSON Output:** Return the information as a single, valid JSON object matching the requested schema. If for any reason you cannot determine a piece of information, return "N/A" for that specific field but still return a valid JSON object.

Latitude: ${input.latitude}
Longitude: ${input.longitude}
`;
  
  const { output } = await ai.generate({
    prompt: prompt,
    output: { schema: GetJurisdictionOutputSchema },
  });

  if (!output) {
    throw new Error("AI failed to generate a valid jurisdictional response.");
  }

  return output;
}
