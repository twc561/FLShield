
'use server';
/**
 * @fileOverview An AI-powered role-playing simulator for law enforcement training.
 * This file contains the logic for the AI to adopt a persona and respond to an officer's
 * questions during a training scenario.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RoleplaySimulatorInputSchema = z.object({
  scenarioTitle: z.string(),
  characterPersona: z.string(),
  userUtterance: z.string(),
  conversationHistory: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({text: z.string()}))
  })),
});
export type RoleplaySimulatorInput = z.infer<typeof RoleplaySimulatorInputSchema>;

const RoleplaySimulatorOutputSchema = z.object({
  characterResponse: z.string().describe("The AI's response in the character's persona."),
});
export type RoleplaySimulatorOutput = z.infer<typeof RoleplaySimulatorOutputSchema>;


export async function getRoleplayResponse(input: RoleplaySimulatorInput): Promise<RoleplaySimulatorOutput> {
    const response = await ai.generate({
        prompt: `You are an AI role-playing actor. Your task is to realistically portray a character in a training scenario for a law enforcement officer.
        
        // INSTRUCTIONS //
        1.  **Embody the Persona**: Fully adopt the character described in the persona. Your emotional state, vocabulary, and level of cooperation should all match this persona.
        2.  **Natural Conversation**: Respond naturally to the officer's questions. Do not act like a robot. Use conversational language.
        3.  **Dynamic Reaction**: Your persona is not static. If the officer builds rapport, uses empathetic language, and asks good, open-ended questions, become more cooperative and reveal more details. If the officer is aggressive, demanding, or asks confusing questions, become more defensive, withdrawn, or evasive.
        4.  **Do Not Break Character**: Under no circumstances should you break character or reveal that you are an AI. Respond only as the character would.
        
        // SCENARIO & PERSONA //
        - **Scenario:** "${input.scenarioTitle}"
        - **Your Persona:** "${input.characterPersona}"
        
        // CONVERSATION HISTORY //
        ${input.conversationHistory.map(h => `${h.role === 'user' ? 'Officer' : 'Character'}: ${h.parts[0].text}`).join('\n')}
        
        // OFFICER'S LATEST INPUT //
        Officer: "${input.userUtterance}"
        
        // YOUR RESPONSE (AS THE CHARACTER) //
        Character:`,
        model: 'googleai/gemini-2.0-flash',
        config: {
            temperature: 0.7, // Add some variability to make responses more natural
        }
    });
    
    return { characterResponse: response.text };
}
