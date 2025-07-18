
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
  illegalModifications: z.array(z.string()).optional().describe("An array of any identified illegal modifications, e.g., ['Machine Gun Conversion Device (Glock Switch)']."),
  notes: z.string().describe("A brief, one-sentence note about the item's general classification or characteristics relevant to law enforcement."),
  relevantStatutes: z.array(StatuteLinkSchema).describe("An array of Florida Statutes potentially relevant to the possession, carry, or use of this item."),
});
export type IdentifyWeaponOutput = z.infer<typeof IdentifyWeaponOutputSchema>;

// Define a schema for the AI model's direct output, without the statutes
const WeaponIdentificationOnlySchema = IdentifyWeaponOutputSchema.omit({ relevantStatutes: true });

const identifyWeaponPrompt = ai.definePrompt({
    name: 'identifyWeaponPrompt',
    input: { schema: z.object({ imageDataUri: z.string() }) },
    output: { schema: WeaponIdentificationOnlySchema }, // AI only outputs the weapon details
    prompt: `You are an expert in firearm and weapon identification for Florida law enforcement. Your task is to analyze an image, identify the primary item, and provide a detailed breakdown.

CRITICAL INSTRUCTIONS:
1.  **Identify the primary object in the image.** First, classify it into a general category (e.g., "Handgun," "Rifle," "Switchblade," "Shotgun," "Brass Knuckles").
2.  **If the item is a firearm, provide a detailed breakdown:**
    *   **Make:** Identify its manufacturer (e.g., "Glock," "Sig Sauer").
    *   **Model:** Identify the specific model (e.g., "17," "P320," "870").
    *   **Caliber & Capacity (IMPORTANT):** Once you identify the model, use your knowledge to determine its most common caliber and standard magazine capacity. **Fill in these fields even if they are not visible in the image.** For example, if you identify a 'Glock 19', you know the caliber is '9mm' and the standard capacity is '15 rounds'. If the caliber cannot be determined from the model, return "Unknown".
    *   **Common Variants:** List 1-2 common sub-models or generations if applicable.
3.  **No Guessing:** If you cannot confidently determine the Make or Model, you MUST return "Unknown" for those fields.
4.  **CHECK FOR ILLEGAL MODIFICATIONS (IMPORTANT):** Carefully examine the firearm for any illegal modifications.
    *   **Specifically, look for a 'Glock switch' or similar auto-sear device**, which is a small component on the back of the slide that allows for fully automatic fire. If you identify such a device, you MUST populate the 'illegalModifications' array with the string 'Machine Gun Conversion Device (Glock Switch)'.
    *   Look for other illegal modifications like a sawed-off barrel on a shotgun/rifle or a vertical foregrip on a pistol.
5.  **Do not provide legal advice.** The notes should be purely descriptive of the item's classification.
6.  If you cannot identify a weapon in the image, you MUST return "Unknown" for the itemType.

Image: {{media url=imageDataUri}}`
});

export async function identifyWeaponFromImage(input: IdentifyWeaponInput): Promise<IdentifyWeaponOutput> {
  // Step 1: Get the weapon identification from the AI model
  const { output: identification } = await identifyWeaponPrompt({ imageDataUri: input.imageDataUri });

  if (!identification) {
      throw new Error("AI weapon identification model failed to return a response.");
  }

  // Step 2: Programmatically determine relevant statutes based on the AI's output
  const relevantStatutes: { statuteNumber: string; title: string }[] = [];
  const itemType = identification.itemType || "Unknown";
  const hasGlockSwitch = identification.illegalModifications?.some(mod => mod.includes("Glock Switch")) || false;

  if (itemType.includes("Handgun") || itemType.includes("Rifle") || itemType.includes("Shotgun") || itemType.includes("Firearm")) {
    relevantStatutes.push(
      { statuteNumber: "F.S. § 790.01", title: "Carrying concealed weapons" },
      { statuteNumber: "F.S. § 790.053", title: "Open carrying of weapons" },
      { statuteNumber: "F.S. § 790.23", title: "Possession of firearm by felon" },
      { statuteNumber: "F.S. § 790.10", title: "Improper exhibition of dangerous weapons" }
    );
  } else if (itemType.includes("Switchblade") || itemType.includes("Brass Knuckles")) {
    relevantStatutes.push({ statuteNumber: "F.S. § 790.01", title: "Carrying concealed weapons" });
  }

  if (hasGlockSwitch) {
    // Add the specific statute for machine guns if a switch is detected
    relevantStatutes.unshift({ statuteNumber: "F.S. § 790.222", title: "Possession of machine guns" });
  }
  
  // Step 3: Combine the AI identification with the determined statutes
  const finalOutput: IdentifyWeaponOutput = {
    ...identification,
    relevantStatutes: relevantStatutes
  };

  return finalOutput;
}
