
'use server';
/**
 * @fileOverview An AI-powered role-playing simulator for law enforcement training.
 * This file contains the logic for the AI to adopt a persona, respond to an officer's
 * questions, and provide contextual feedback during a training scenario.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DynamicBehaviorSchema = z.object({
  if: z.string(),
  then: z.string(),
});

const FeedbackTriggerSchema = z.object({
  condition: z.string(),
  feedback: z.string(),
});

const RoleplaySimulatorInputSchema = z.object({
  scenarioTitle: z.string(),
  characterPersona: z.string(),
  userUtterance: z.string(),
  conversationHistory: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({text: z.string()}))
  })),
  dynamicBehaviorTree: z.array(DynamicBehaviorSchema),
  feedbackTriggers: z.array(FeedbackTriggerSchema),
});
export type RoleplaySimulatorInput = z.infer<typeof RoleplaySimulatorInputSchema>;

const RoleplaySimulatorOutputSchema = z.object({
  characterResponse: z.string().describe("The AI's response in the character's persona. This should be a direct, first-person response from the character."),
  feedback: z.string().optional().describe("A helpful, brief hint for the officer if their input matches a negative feedback trigger. If no trigger is met, this field should be omitted."),
});
export type RoleplaySimulatorOutput = z.infer<typeof RoleplaySimulatorOutputSchema>;

export async function getRoleplayResponse(input: RoleplaySimulatorInput): Promise<RoleplaySimulatorOutput> {
  const prompt = ai.definePrompt({
    name: 'roleplaySimulatorPrompt',
    input: { schema: RoleplaySimulatorInputSchema },
    output: { schema: RoleplaySimulatorOutputSchema },
    prompt: `You are an AI role-playing actor and training assistant for a law enforcement officer. Your primary task is to realistically portray a character. Your secondary task is to provide helpful feedback if the officer makes a clear misstep.

// SCENARIO & PERSONA //
- **Scenario:** "${input.scenarioTitle}"
- **Your Persona:** "${input.characterPersona}"

// DYNAMIC BEHAVIOR RULES //
These rules govern how your persona should evolve based on the officer's approach.
${input.dynamicBehaviorTree.map(rule => `- IF ${rule.if}, THEN ${rule.then}`).join('\n')}

// CONVERSATION HISTORY //
${input.conversationHistory.map(h => `${h.role === 'user' ? 'Officer' : 'Character'}: ${h.parts[0].text}`).join('\n')}

// OFFICER'S LATEST INPUT //
Officer: "${input.userUtterance}"

// YOUR TASKS //
1.  **Analyze Officer's Input:** First, review the officer's latest input against the following feedback triggers.
    - **Feedback Triggers:**
      ${input.feedbackTriggers.map(trigger => `- IF ${trigger.condition}, PROVIDE THIS FEEDBACK: "${trigger.feedback}"`).join('\n')}
    - If the officer's input matches a trigger condition, you MUST populate the 'feedback' field in your JSON response with the corresponding feedback text. Otherwise, OMIT the feedback field.

2.  **Generate Character Response:** Second, generate a natural, in-character response to the officer's input. Adhere to the persona and dynamic behavior rules. Respond ONLY as the character would. Do NOT break character in the 'characterResponse' field.

CRITICAL: Your entire output must be a single, valid JSON object matching the requested schema.
`,
  });

  const { output } = await prompt(input);
  return output!;
}
