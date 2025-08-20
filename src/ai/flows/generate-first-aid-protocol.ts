'use server';
/**
 * @fileOverview Generates first aid protocols for common field injuries.
 *
 * - generateFirstAidProtocol - A function that returns a list of protocols.
 * - GenerateFirstAidProtocolOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const InjuryProtocolSchema = z.object({
  injuryType: z.string().describe("The common name of the injury, e.g., 'Severe Bleeding (Extremity)'"),
  priority: z.enum(["Critical", "High", "Medium"]).describe("The urgency of the intervention."),
  treatmentSteps: z.array(z.string()).describe("A numbered, step-by-step list of treatment actions for a first responder."),
});

const GenerateFirstAidProtocolOutputSchema = z.array(InjuryProtocolSchema);
export type GenerateFirstAidProtocolOutput = z.infer<typeof GenerateFirstAidProtocolOutputSchema>;

export async function generateFirstAidProtocol(): Promise<GenerateFirstAidProtocolOutput> {
  const { output } = await ai.generate({
    prompt: `You are a Tactical Medical Specialist AI. Generate a quick-reference first aid guide for a law enforcement officer covering at least 6 common traumatic injuries based on TECC/TCCC principles. The output must be an array of 'Injury Protocol' objects. Include protocols for Severe Bleeding (Extremity), Sucking Chest Wound, Burns, Seizure, Opioid Overdose (Naloxone Admin), and Cardiac Arrest (CPR/AED).`,
    output: {
      schema: GenerateFirstAidProtocolOutputSchema,
    },
  });
  
  if (!output) {
    throw new Error('Failed to generate first aid protocol');
  }
  
  return output;
}
