'use server';
/**
 * @fileOverview An AI flow to get jurisdiction information from geographic coordinates.
 * This flow now uses the Google Maps Geocoding API for accuracy.
 */

import { ai } from '@/ai/genkit';
import {
  GetJurisdictionInputSchema,
  GetJurisdictionOutputSchema,
  type GetJurisdictionInput,
  type GetJurisdictionOutput,
} from '@/ai/schemas/jurisdiction-schemas';

// Helper function to extract address components from Google's response
function getAddressComponent(components: any[], type: string): string {
  const component = components.find(c => c.types.includes(type));
  return component ? component.long_name : 'N/A';
}

// Define the flow
export async function getJurisdictionInfo(
  input: GetJurisdictionInput
): Promise<GetJurisdictionOutput> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error("Google Maps API key is missing.");
  }

  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${input.latitude},${input.longitude}&key=${apiKey}`;

  let locationData;
  try {
    const response = await fetch(geocodingUrl);
    const data = await response.json();
    if (data.status !== 'OK' || !data.results[0]) {
      throw new Error(`Geocoding failed: ${data.status} - ${data.error_message || 'No results found.'}`);
    }
    
    const addressComponents = data.results[0].address_components;
    locationData = {
      city: getAddressComponent(addressComponents, 'locality') || getAddressComponent(addressComponents, 'sublocality'),
      county: getAddressComponent(addressComponents, 'administrative_area_level_2').replace(' County', ''),
      state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
      zipCode: getAddressComponent(addressComponents, 'postal_code'),
    };

  } catch (error) {
    console.error("Geocoding API error:", error);
    throw new Error("Failed to retrieve location data from Google Maps API.");
  }
  
  const prompt = `You are a jurisdictional analyst specializing in Florida. Based on the following confirmed location data, determine the precise jurisdictional information.

CRITICAL INSTRUCTIONS:
1.  **Analyze the Location:** Given the city and county, identify the primary law enforcement agency, the judicial circuit, and the appellate court district.
2.  **Primary LE Agency:** This is usually the City Police Department if inside city limits, or the County Sheriff's Office if in an unincorporated area.
3.  **Strict JSON Output:** Return the information as a single, valid JSON object matching the requested schema.

City: ${locationData.city}
County: ${locationData.county}
State: ${locationData.state}
Zip Code: ${locationData.zipCode}
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
