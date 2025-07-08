
'use server';
/**
 * @fileOverview Analyzes a hazardous material by its UN/NA ID.
 *
 * - analyzeHazmatPlacard - A function that fetches and parses HAZMAT data from the ERG.
 * - AnalyzeHazmatPlacardInput - The input type for the function.
 * - AnalyzeHazmatPlacardOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeHazmatPlacardInputSchema = z.object({
  unID: z.string().describe("The 4-digit UN/NA ID of the hazardous material to analyze, e.g., '1203'."),
});
export type AnalyzeHazmatPlacardInput = z.infer<typeof AnalyzeHazmatPlacardInputSchema>;

const AnalyzeHazmatPlacardOutputSchema = z.object({
  unID: z.string().describe("The 4-digit ID requested."),
  materialName: z.string().describe("The proper shipping name of the material."),
  ergGuideNumber: z.string().describe("The corresponding guide number from the Emergency Response Guidebook (ERG)."),
  placardInfo: z.object({
    className: z.string().describe("The hazard class and name, e.g., 'Class 3: Flammable Liquid'."),
    graphicDescription: z.string().describe("A textual description of the placard's appearance (color, symbol, number)."),
  }),
  immediateSafetyActions: z.object({
    title: z.string().default("IMMEDIATE ACTIONS: SCENE SAFETY FIRST"),
    checklist: z.array(z.string()).describe("A prioritized checklist of the first things an officer must do."),
  }),
  publicSafetyDistances: z.object({
    title: z.string().default("Public Safety & Isolation Distances"),
    initialIsolation: z.string().describe("The initial isolation distance for a spill or leak."),
    evacuation_Spill: z.string().describe("The downwind evacuation distance for a large spill."),
    evacuation_Fire: z.string().describe("The isolation and evacuation distance if a tank is involved in a fire."),
  }),
  potentialHazards: z.object({
    title: z.string().default("Potential Hazards"),
    health: z.string().describe("A summary of health risks."),
    fireOrExplosion: z.string().describe("A summary of fire or explosion risks."),
  }),
  emergencyResponse: z.object({
    title: z.string().default("Emergency Response Guidance"),
    firstAid: z.string().describe("Key first aid steps for exposure."),
    fireFighting: z.string().describe("Instructions for fire rescue personnel."),
  }),
});
export type AnalyzeHazmatPlacardOutput = z.infer<typeof AnalyzeHazmatPlacardOutputSchema>;


export async function analyzeHazmatPlacard(input: AnalyzeHazmatPlacardInput): Promise<AnalyzeHazmatPlacardOutput> {
  return analyzeHazmatPlacardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHazmatPlacardPrompt',
  input: { schema: AnalyzeHazmatPlacardInputSchema },
  output: { schema: AnalyzeHazmatPlacardOutputSchema },
  prompt: `You are a HAZMAT Response Analyst AI. Your task is to provide a detailed, structured analysis of a specific hazardous material based on its UN/NA ID. Retrieve all relevant information from the latest Emergency Response Guidebook (ERG) and parse it into a practical format for a first responder. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the required schema.

UN/NA ID: {{{unID}}}`,
});

const analyzeHazmatPlacardFlow = ai.defineFlow(
  {
    name: 'analyzeHazmatPlacardFlow',
    inputSchema: AnalyzeHazmatPlacardInputSchema,
    outputSchema: AnalyzeHazmatPlacardOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
