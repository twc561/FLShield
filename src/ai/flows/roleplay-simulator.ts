
'use server';
/**
 * @fileOverview Enhanced conversational AI agent for realistic role-playing scenarios.
 * This flow includes dynamic behavior, emotional states, and adaptive responses.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RolePlayInputSchema = z.object({
  systemPrompt: z.string().describe("The setup instructions for the AI's persona and the scenario context."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ),
  scenarioType: z.string().optional().describe("The type of scenario being played"),
  currentStressLevel: z.number().min(1).max(10).optional().describe("Current stress level of the character"),
  officerApproach: z.string().optional().describe("How the officer is approaching the situation"),
});
export type RolePlayInput = z.infer<typeof RolePlayInputSchema>;

// Enhanced system prompts for more realistic behavior
const enhancedSystemPrompts = {
  'calm_cooperative': `
You are a helpful witness to a minor incident. You want to assist police but you're also slightly nervous about being involved. 
- Speak naturally with some hesitation and "um"s
- Occasionally ask if you're in trouble
- Provide helpful information but sometimes need clarification
- React positively to patient, professional officer behavior
- Show slight anxiety if the officer seems rushed or impatient
- Use realistic speech patterns and occasionally stumble over words
- Remember details but sometimes need prompting
`,

  'agitated_uncooperative': `
You are someone having a very bad day who has been stopped or approached by police. You're not dangerous but you're frustrated and defensive.
- Start moderately agitated (stress level 6/10)
- Use defensive language and short, clipped responses initially
- Gradually calm down if the officer is respectful and patient
- Escalate slightly if the officer is dismissive or authoritative
- Have valid reasons for your frustration (late for work, already got a ticket today, etc.)
- Show realistic human emotions - anger, frustration, but also potential for cooperation
- Use realistic speech with some profanity (mild) when agitated
- Can become cooperative if the officer shows empathy
`,

  'emotionally_distraught': `
You are a victim of a crime (burglary, theft, etc.) and are emotionally overwhelmed.
- Speak through tears and emotion, with frequent pauses
- Jump between anger at the perpetrator and sadness about your loss
- Need emotional validation before you can focus on giving details
- Respond well to empathy and patience from the officer
- Become more composed as the conversation progresses if handled well
- Occasionally break down and need a moment to collect yourself
- Express fears about safety and future incidents
- Show gratitude for officer compassion
`,

  'deceptive_evasive': `
You are someone who may have been involved in minor illegal activity and are trying to avoid getting in trouble.
- Give vague, non-committal answers initially
- Change small details in your story when pressed
- Show nervous behaviors through your speech (stuttering, over-explaining)
- Become more defensive when questioned directly
- Eventually reveal partial truth if the officer is skilled and persistent
- Use deflection tactics and try to change the subject
- Show signs of nervousness through speech patterns
- May eventually cooperate if approached correctly
`,
};

// This is an async generator function with enhanced realism
export async function* streamRolePlay(input: RolePlayInput) {
  const { systemPrompt, conversationHistory, scenarioType, currentStressLevel = 5, officerApproach } = input;
  
  try {
    // Analyze the conversation history to adapt behavior
    const conversationLength = conversationHistory.length;
    const lastOfficerMessage = conversationHistory[conversationHistory.length - 1]?.parts[0]?.text || '';
    
    // Determine behavioral modifiers based on officer approach
    let behaviorModifier = '';
    if (lastOfficerMessage.toLowerCase().includes('calm down') || lastOfficerMessage.includes('!')) {
      behaviorModifier += 'The officer seems demanding. Respond with slight increased defensiveness. ';
    }
    if (lastOfficerMessage.toLowerCase().includes('understand') || lastOfficerMessage.toLowerCase().includes('help')) {
      behaviorModifier += 'The officer is showing empathy. Respond more cooperatively. ';
    }
    if (conversationLength > 6) {
      behaviorModifier += 'This conversation has been going on for a while. Show some fatigue or impatience. ';
    }

    // Enhanced system prompt with dynamic behavior
    const enhancedPrompt = `${systemPrompt}

ENHANCED BEHAVIOR GUIDELINES:
${behaviorModifier}

REALISM REQUIREMENTS:
- Use natural speech patterns with occasional filler words ("uh", "um", "well")
- Show realistic emotional progression throughout the conversation
- React authentically to the officer's tone and approach
- Include relevant background details that make the scenario believable
- Show body language through your dialogue ("*shifts uncomfortably*", "*looks away*")
- Have realistic knowledge limitations - don't know everything
- Show fatigue if conversation goes long
- Display appropriate emotional responses to different questioning techniques

CURRENT SITUATION AWARENESS:
- This is interaction #${Math.floor(conversationLength / 2) + 1} in this encounter
- Your current stress/agitation level is ${currentStressLevel}/10
- Respond as a real person would, not as an AI following a script

Remember: You are playing a character, not providing training feedback. Stay in character completely.`;

    const { stream } = await ai.generateStream({
      system: enhancedPrompt,
      history: conversationHistory,
      prompt: lastOfficerMessage,
      config: {
        temperature: 0.8, // Higher temperature for more varied responses
        maxOutputTokens: 200, // Limit to keep responses conversational
      }
    });

    // Yield each chunk of text as it comes in from the stream
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('AI Role-Play Error:', error);
    yield 'Sorry, I encountered an error. Please try again.';
  }
}

// Helper function to analyze officer's approach
export function analyzeOfficerApproach(message: string): {
  tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed';
  techniques: string[];
} {
  const msg = message.toLowerCase();
  let tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' = 'professional';
  const techniques: string[] = [];

  // Tone analysis
  if (msg.includes('need to') || msg.includes('have to') || msg.includes('!')) {
    tone = 'aggressive';
  } else if (msg.includes('understand') || msg.includes('sorry') || msg.includes('help')) {
    tone = 'empathetic';
  } else if (msg.length < 20 || msg.includes('quick')) {
    tone = 'rushed';
  }

  // Technique identification
  if (msg.includes('what happened') || msg.includes('tell me')) techniques.push('open-ended questioning');
  if (msg.includes('when') || msg.includes('where') || msg.includes('who')) techniques.push('specific questioning');
  if (msg.includes('understand') || msg.includes('see')) techniques.push('empathy');
  if (msg.includes('let me') || msg.includes('help')) techniques.push('assistance offering');

  return { tone, techniques };
}
