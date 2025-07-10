
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
  make: z.string().optional().describe("If the item is a firearm, its manufacturer (e.g., 'Glock', 'Smith & Wesson'). If unknown, return 'Unknown'."),
  model: z.string().optional().describe("If the item is a firearm, its model (e.g., '19', 'M&P Shield'). If unknown, return 'Unknown'."),
  caliber: z.string().optional().describe("The caliber or gauge of the firearm (e.g., '9mm', '12 Gauge'). If not determinable from the image, return 'Unknown'."),
  standardMagazineCapacity: z.string().optional().describe("The standard round capacity for this model's magazine. If unknown, return 'N/A'."),
  commonVariants: z.array(z.string()).optional().describe("A list of common sub-models or variants (e.g., 'Gen 3', 'Gen 4', 'Compact')."),
  notes: z.string().describe("A brief, one-sentence note about the item's general classification or characteristics relevant to law enforcement."),
  relevantStatutes: z.array(StatuteLinkSchema).describe("An array of Florida Statutes potentially relevant to the possession, carry, or use of this item."),
});
export type IdentifyWeaponOutput = z.infer<typeof IdentifyWeaponOutputSchema>;

const identifyWeaponPrompt = ai.definePrompt({
    name: 'identifyWeaponPrompt',
    input: { schema: z.object({ imageDataUri: z.string() }) },
    output: { schema: IdentifyWeaponOutputSchema },
    prompt: `You are an expert in firearm and weapon identification for Florida law enforcement. Your task is to analyze an image, identify the primary item, and provide a detailed breakdown and links to relevant Florida Statutes.

CRITICAL INSTRUCTIONS:
1.  **Identify the primary object in the image.** First, classify it into a general category (e.g., "Handgun," "Rifle," "Switchblade," "Shotgun," "Brass Knuckles").
2.  **If the item is a firearm, provide a detailed breakdown:**
    *   **Make:** Identify its manufacturer (e.g., "Glock," "Sig Sauer").
    *   **Model:** Identify the specific model (e.g., "17," "P320," "870").
    *   **Caliber:** Identify the caliber or gauge. If not visible or determinable, return "Unknown".
    *   **Standard Capacity:** State the standard magazine capacity for this model.
    *   **Common Variants:** List 1-2 common sub-models or generations if applicable.
3.  **No Guessing:** If you cannot confidently determine a specific detail (like make, model, or caliber), you MUST return "Unknown" for that specific field. Do not guess.
4.  **Provide relevant statutes based on the item type.** Your response must be constrained to the following list:
    *   If "Handgun" or "Firearm": F.S. § 790.01 (Concealed Carry), F.S. § 790.053 (Open Carry), F.S. § 790.23 (Possession by Felon), F.S. § 790.10 (Improper Exhibition).
    *   If "Switchblade": F.S. § 790.01 (Carrying concealed weapons).
    *   If "Brass Knuckles" or other melee weapon: F.S. § 790.01 (Carrying concealed weapons).
5.  **Do not provide legal advice.** The notes should be purely descriptive of the item's classification.
6.  If you cannot identify a weapon in the image, you MUST return "Unknown" for the itemType.

Image: {{media url=imageDataUri}}`
});

export async function identifyWeaponFromImage(input: IdentifyWeaponInput): Promise<IdentifyWeaponOutput> {
  const { output } = await identifyWeaponPrompt({ imageDataUri: input.imageDataUri });

  if (!output) {
      throw new Error("AI weapon identification model failed to return a response.");
  }
  return output;
}
