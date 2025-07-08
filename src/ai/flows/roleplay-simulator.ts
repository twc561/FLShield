
'use server';
/**
 * @fileOverview An AI-powered role-playing simulator for law enforcement training.
 * This file contains the logic for the AI to adopt a persona and respond to an officer's
 * questions during a training scenario.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

/*
  INTERACTION & FEEDBACK LOGIC BLUEPRINT:

  Interaction Logic: 
  When a simulation begins, the AI will adopt the persona of the keyCharacter. 
  Its responses should be conversational and natural. 
  If the officer's questions are open-ended and build rapport, the persona should 
  become more cooperative and reveal more details. If the questions are leading, 
  aggressive, or confusing, the persona should become more defensive, withdrawn, 
  or confused.

  Post-Simulation Debrief Framework: 
  After the simulation ends, the AI will analyze the transcript of the hypothetical 
  interview and provide a structured review based on these criteria:
  - Rapport Building: "Did the officer use empathetic language?"
  - Questioning Technique: "Rate the use of open-ended vs. closed-ended questions."
  - Information Control: "Did the officer effectively control the flow of the conversation?"
  - Key Information Gathered: "Did the officer successfully obtain all critical information 
    (suspect description, timeline, etc.)?"
*/

// NOTE: The following is a placeholder for the full interactive chat implementation.
// A complete implementation would require more complex state management for the conversation.

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
    // This is a placeholder function. A real implementation would involve a more
    // sophisticated conversational flow.
    const response = await ai.generate({
        prompt: `You are an AI role-playing actor. Your current persona is: "${input.characterPersona}". The scenario is "${input.scenarioTitle}". The user is a police officer interviewing you. Respond to their last question based on your persona. Be natural. If they are kind and ask open questions, be helpful. If they are aggressive, become withdrawn.

        The conversation so far:
        ${input.conversationHistory.map(h => `${h.role}: ${h.parts[0].text}`).join('\n')}

        User's last question: "${input.userUtterance}"

        Your response (as the character):`,
        model: 'googleai/gemini-2.0-flash',
    });
    
    return { characterResponse: response.text };
}
