
'use server';
/**
 * @fileOverview Generates an instructional first aid image based on a specific protocol.
 *
 * - generateFirstAidProtocolImage - A function that takes an injury type and returns a generated image.
 * - GenerateFirstAidProtocolImageInput - The input type for the function.
 * - GenerateFirstAidProtocolImageOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateFirstAidProtocolImageInputSchema = z.object({
  injuryType: z.string().describe('The type of injury for which to generate an image, e.g., "Severe Bleeding (Extremity)".'),
});
export type GenerateFirstAidProtocolImageInput = z.infer<typeof GenerateFirstAidProtocolImageInputSchema>;

const GenerateFirstAidProtocolImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI, e.g., 'data:image/png;base64,...'"),
});
export type GenerateFirstAidProtocolImageOutput = z.infer<typeof GenerateFirstAidProtocolImageOutputSchema>;

const prompts: Record<string, string> = {
    'Severe Bleeding (Extremity)': 'Generate a high-resolution instructional image for a first aid guide about Severe Bleeding. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should clearly depict one person applying firm, direct pressure with both hands over a thick cloth pad to a wound on another person\'s forearm. The injured arm should be elevated above the level of the heart. The style must be simple and instructional.',
    'Sucking Chest Wound': 'Generate a high-resolution instructional image for a first aid guide about a Sucking Chest Wound. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should show a close-up of a person\'s chest, with a piece of plastic wrap placed over a wound. Three of the four sides of the plastic are secured with tape, leaving one side open to allow air to escape. The style must be a clear and accurate medical diagram.',
    'Burns': 'Generate a high-resolution instructional image for a first aid guide about treating a Thermal Burn. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should depict a person\'s arm with a red, burned area being loosely covered with a clean, sterile, non-stick dressing or cloth. The focus is on the correct action of covering the burn, not on graphic injury detail. The style must be simple and reassuring.',
    'Seizure': 'Generate a high-resolution instructional image for a first aid guide about assisting someone having a Seizure. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should show a person lying on their side in the recovery position. A soft object, like a folded jacket, is placed under their head. The surrounding area is clear of any hazards. The focus is on safety and patient protection, not restraint. The style must be calm and instructional.',
    'Opioid Overdose (Naloxone Admin)': 'Generate a high-resolution instructional image for a first aid guide about administering Naloxone for an Opioid Overdose. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should show a close-up of a person\'s head, tilted back, with another person\'s hand holding a Naloxone nasal spray device and inserting the tip into the patient\'s nostril before depressing the plunger. The style must be a clear, procedural medical diagram.',
    'Cardiac Arrest (CPR/AED)': 'Generate a high-resolution instructional image for a first aid guide about using an AED during Cardiac Arrest. The image must be a clean, minimalist vector illustration with a white background and no text. The illustration should show a person\'s bare torso with the two AED pads correctly placed: one pad on the upper right side of the chest and the other on the lower left side of the chest, below the armpit. The style must be an accurate and easy-to-understand medical diagram.'
};

export const generateFirstAidProtocolImage = ai.defineFlow(
  {
    name: 'generateFirstAidProtocolImage',
    inputSchema: GenerateFirstAidProtocolImageInputSchema,
    outputSchema: GenerateFirstAidProtocolImageOutputSchema,
  },
  async (input) => {
    const promptText = prompts[input.injuryType];
    if (!promptText) {
      throw new Error(`No prompt found for injury type: ${input.injuryType}`);
    }

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: promptText,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a valid image URL.');
    }

    return { imageUrl: media.url };
  }
);
