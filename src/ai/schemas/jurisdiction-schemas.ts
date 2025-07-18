/**
 * @fileOverview Schemas and types for the getJurisdictionInfo flow.
 */
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
