
'use server';
/**
 * @fileOverview A Genkit flow to find nearby law enforcement resources in Florida.
 *
 * - findNearbyResources - A function that takes geographic coordinates and returns a list of relevant resources.
 * - ResourceFinderInput - The input type for the findNearbyResources function.
 * - ResourceFinderOutput - The return type for the findNearbyResources function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// 1. Zod Schemas

const ResourceFinderInputSchema = z.object({
  latitude: z.number().describe("The user's current latitude."),
  longitude: z.number().describe("The user's current longitude."),
});
export type ResourceFinderInput = z.infer<typeof ResourceFinderInputSchema>;

const ResourceSchema = z.object({
  name: z.string().describe("The official name of the resource location."),
  type: z
    .string()
    .describe(
      "The category of the resource (e.g., 'County Sheriff Office', 'Local Police Department', 'County Courthouse', 'Victim Advocacy Center', 'Baker Act Receiving Facility')."
    ),
  address: z.string().describe("The full street address of the resource."),
  phone: z.string().describe("The primary contact phone number for the resource."),
  distance: z.number().optional().describe("The calculated distance in miles from the user."),
});
export type Resource = z.infer<typeof ResourceSchema>;

const ResourceFinderOutputSchema = z.object({
  resources: z.array(ResourceSchema).describe("An array of nearby resources."),
});
export type ResourceFinderOutput = z.infer<typeof ResourceFinderOutputSchema>;


// 2. Resource Data & Haversine Distance Calculation

const sampleResourceData = [
    { name: "Miami-Dade Police Department Headquarters", type: "Local Police Department", address: "9105 NW 25th St, Doral, FL 33172", phone: "(305) 471-1780", lat: 25.8009, lon: -80.3421 },
    { name: "Orange County Sheriff's Office", type: "County Sheriff Office", address: "2500 W Colonial Dr, Orlando, FL 32804", phone: "(407) 254-7000", lat: 28.5524, lon: -81.4116 },
    { name: "Florida Highway Patrol - Troop D", type: "State Highway Patrol Station", address: "133 S Semoran Blvd, Orlando, FL 32807", phone: "(407) 835-4400", lat: 28.5441, lon: -81.3032 },
    { name: "Orange County Courthouse", type: "County Courthouse", address: "425 N Orange Ave, Orlando, FL 32801", phone: "(407) 836-2000", lat: 28.5471, lon: -81.3787 },
    { name: "Victim Service Center of Central Florida", type: "Victim Advocacy Center", address: "211 N Lucerne Cir E, Orlando, FL 32801", phone: "(407) 254-3200", lat: 28.5361, lon: -81.3745 },
    { name: "Aspire Health Partners (Baker Act Facility)", type: "Baker Act Receiving Facility", address: "1800 Mercy Dr, Orlando, FL 32808", phone: "(407) 875-3700", lat: 28.5630, lon: -81.4329 },
    { name: "Hillsborough County Sheriff's Office - District II", type: "County Sheriff Office", address: "2310 N Falkenburg Rd, Tampa, FL 33619", phone: "(813) 247-8000", lat: 27.9691, lon: -82.3422 },
    { name: "Tampa Police Department", type: "Local Police Department", address: "411 N Franklin St, Tampa, FL 33602", phone: "(813) 276-3200", lat: 27.9490, lon: -82.4580 },
    { name: "St. Lucie County Sheriff's Office", type: "County Sheriff Office", address: "4700 W Midway Rd, Fort Pierce, FL 34981", phone: "(772) 462-7300", lat: 27.3995, lon: -80.3957 },
    { name: "Fort Pierce Police Department", type: "Local Police Department", address: "920 S US Hwy 1, Fort Pierce, FL 34950", phone: "(772) 467-6800", lat: 27.4339, lon: -80.3259 },
    { name: "St. Lucie County Courthouse", type: "County Courthouse", address: "218 S 2nd St, Fort Pierce, FL 34950", phone: "(772) 462-6900", lat: 27.4455, lon: -80.3250 },
    { name: "Lawnwood Regional Medical Center (Baker Act Facility)", type: "Baker Act Receiving Facility", address: "1700 S 23rd St, Fort Pierce, FL 34950", phone: "(772) 461-4000", lat: 27.4344, lon: -80.3496 },
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Radius of Earth in miles
  const rlat1 = lat1 * (Math.PI / 180);
  const rlat2 = lat2 * (Math.PI / 180);
  const diff_lat = rlat2 - rlat1;
  const diff_lon = (lon2 - lon1) * (Math.PI / 180);
  const d = 2 * R * Math.asin(Math.sqrt(Math.sin(diff_lat / 2) * Math.sin(diff_lat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(diff_lon / 2) * Math.sin(diff_lon / 2)));
  return d;
}

// 3. Genkit Tool Definition
const findFloridaResources = ai.defineTool(
  {
    name: 'findFloridaResources',
    description: 'Finds the closest law enforcement and victim support resources in Florida based on latitude and longitude.',
    inputSchema: ResourceFinderInputSchema,
    outputSchema: ResourceFinderOutputSchema,
  },
  async (input) => {
    const { latitude, longitude } = input;

    const resourcesWithDistance = sampleResourceData.map(resource => ({
      ...resource,
      distance: haversineDistance(latitude, longitude, resource.lat, resource.lon),
    }));

    resourcesWithDistance.sort((a, b) => a.distance - b.distance);

    const nearbyResources = resourcesWithDistance.slice(0, 5).map(r => ({
        name: r.name,
        type: r.type,
        address: r.address,
        phone: r.phone,
        distance: parseFloat(r.distance.toFixed(1))
    }));

    return { resources: nearbyResources };
  }
);


// 4. Main Genkit Flow
const resourceFinderFlow = ai.defineFlow(
  {
    name: 'resourceFinderFlow',
    inputSchema: ResourceFinderInputSchema,
    outputSchema: ResourceFinderOutputSchema,
  },
  async (input) => {
    // Directly call the tool instead of asking the AI to do it.
    // This is more reliable for deterministic tasks.
    const result = await findFloridaResources(input);
    return result || { resources: [] };
  }
);

export async function findNearbyResources(input: ResourceFinderInput): Promise<ResourceFinderOutput> {
    return resourceFinderFlow(input);
}
