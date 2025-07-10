
'use server';
/**
 * @fileOverview Generates a clinical, evidentiary image of a controlled substance.
 *
 * - generateSubstanceImage - A function that takes substance details and returns a generated image.
 * - GenerateSubstanceImageInput - The input type for the function.
 * - GenerateSubstanceImageOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateSubstanceImageInputSchema = z.object({
  substanceName: z.string().describe('The common name of the substance, e.g., "Cocaine".'),
  physicalForm: z.string().describe('A description of the substance\'s appearance, e.g., "Fine white powder".'),
  quantity: z.string().describe('A description of the quantity to be depicted, e.g., "A small, loose pile, approximately 1 gram".'),
  context: z.string().describe('The context for scale or containment, e.g., "Contained within a small, unsealed, clear plastic evidence baggie, which is laying flat on the neutral surface".'),
});
export type GenerateSubstanceImageInput = z.infer<typeof GenerateSubstanceImageInputSchema>;

const GenerateSubstanceImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a data URI, e.g., 'data:image/png;base64,...'"),
});
export type GenerateSubstanceImageOutput = z.infer<typeof GenerateSubstanceImageOutputSchema>;

export async function generateSubstanceImage(input: GenerateSubstanceImageInput): Promise<GenerateSubstanceImageOutput> {
    const promptText = `
        1. Visual Style:
         * Primary Style: Clinical, photorealistic, macro detail.
         * Lighting: Bright, even, studio lighting. No dramatic shadows.
         * Background: Simple, clean, neutral grey surface (#D3D3D3). No textures or patterns.
         * Composition: Eye-level perspective, subject centered, close-up shot.
        2. Subject Details:
         * Substance Name: ${input.substanceName}
         * Physical Form: ${input.physicalForm}
         * Quantity: ${input.quantity}
         * Context / Scale: ${input.context}
        3. Strict Exclusions (MANDATORY):
         * ABSOLUTELY NO people, hands, or any body parts.
         * ABSOLUTELY NO paraphernalia (e.g., needles, syringes, pipes, spoons, lighters, rolled-up currency, baggies with branding). If a container is needed, it must be a plain, clear plastic evidence bag.
         * NO branding, logos, or text on any surface or object (unless it's part of the scale ruler).
         * NO environmental context (e.g., no tables, floors, or backgrounds that suggest a specific room or location). The setting must remain sterile.
         * The image must NOT glorify, glamorize, or make the substance look appealing. The tone is purely educational and evidentiary.
    `;

    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: promptText,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_NONE',
                },
            ],
        },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to return a valid image URL.');
    }

    return { imageUrl: media.url };
}
