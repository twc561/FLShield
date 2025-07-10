
'use server';
/**
 * @fileOverview Identifies a weapon from an image and provides relevant statutes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyWeaponInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a weapon, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyWeaponInput = z.infer<typeof IdentifyWeaponInputSchema>;

const StatuteLinkSchema = z.object({
    statuteNumber: z.string().describe("The Florida Statute number, e.g., 'F.S. § 790.01'"),
    title: z.string().describe("The common title of the statute, e.g., 'Carrying concealed weapons'"),
});

const IdentifyWeaponOutputSchema = z.object({
  itemType: z.string().describe("The identified type of weapon (e.g., 'Handgun', 'Rifle', 'Switchblade', 'Shotgun', 'Brass Knuckles'). If unknown, return 'Unknown'."),
  notes: z.string().describe("A brief, one-sentence note about the item's general classification or characteristics relevant to law enforcement."),
  relevantStatutes: z.array(StatuteLinkSchema).describe("An array of Florida Statutes potentially relevant to the possession, carry, or use of this item."),
});
export type IdentifyWeaponOutput = z.infer<typeof IdentifyWeaponOutputSchema>;

const identifyWeaponPrompt = ai.definePrompt({
    name: 'identifyWeaponPrompt',
    input: { schema: z.object({ imageDataUri: z.string() }) },
    output: { schema: IdentifyWeaponOutputSchema },
    prompt: `You are an expert in firearm and weapon identification for Florida law enforcement. Your task is to analyze an image, identify the primary item, and provide links to relevant Florida Statutes.

CRITICAL INSTRUCTIONS:
1.  **Identify the primary object in the image.** Classify it into a general category (e.g., "Handgun," "Rifle," "Switchblade," "Shotgun," "Brass Knuckles").
2.  **Provide relevant statutes based on the item type.** Your response must be constrained to the following list:
    *   If "Handgun" or "Firearm": F.S. § 790.01 (Concealed Carry), F.S. § 790.053 (Open Carry), F.S. § 790.23 (Possession by Felon), F.S. § 790.10 (Improper Exhibition).
    *   If "Switchblade": F.S. § 790.01 (Carrying concealed weapons).
    *   If "Brass Knuckles" or other melee weapon: F.S. § 790.01 (Carrying concealed weapons).
3.  **Do not provide legal advice.** The notes should be purely descriptive of the item's classification.
4.  If you cannot identify a weapon in the image, you MUST return "Unknown" for the itemType.

Image: {{media url=imageDataUri}}`
});

export async function identifyWeaponFromImage(input: IdentifyWeaponInput): Promise<IdentifyWeaponOutput> {
  const { output } = await identifyWeaponPrompt({ imageDataUri: input.imageDataUri });

  if (!output) {
      throw new Error("AI weapon identification model failed to return a response.");
  }
  return output;
}
