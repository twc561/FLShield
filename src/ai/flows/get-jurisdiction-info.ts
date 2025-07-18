
'use server';
/**
 * @fileOverview An AI flow to get jurisdiction information from geographic coordinates.
 * This flow takes latitude and longitude and returns structured data about the location.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the input schema for the flow
export const GetJurisdictionInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type GetJurisdictionInput = z.infer<typeof GetJurisdictionInputSchema>;

// Define the output schema for the flow
export const GetJurisdictionOutputSchema = z.object({
  city: z.string().describe('The city where the coordinates are located.'),
  county: z.string().describe('The county where the coordinates are located.'),
  state: z.string().describe("The state where the coordinates are located, e.g., 'Florida'."),
  zipCode: z.string().describe('The postal code for the area.'),
  lawEnforcementJurisdiction: z.string().describe('The primary law enforcement agency for that location (e.g., "Miami-Dade Police Department", "Orange County Sheriff\'s Office").'),
  judicialCircuit: z.string().describe('The judicial circuit for the location (e.g., "11th Judicial Circuit").'),
  appellateDistrict: z.string().describe('The District Court of Appeal for the location (e.g., "3rd District Court of Appeal").'),
});
export type GetJurisdictionOutput = z.infer<typeof GetJurisdictionOutputSchema>;

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
