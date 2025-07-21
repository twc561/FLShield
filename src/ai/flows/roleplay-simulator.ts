'use server';
/**
 * @fileOverview Enhanced conversational AI agent for realistic role-playing scenarios.
 * Uses structured JSON input/output format for reliable communication.
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

// Enhanced system prompts for the JSON-based engine
const structuredSystemPrompt = `You are a dynamic and intelligent Law Enforcement Role-Play Scenario Engine. Your primary function is to power an interactive training application by receiving user actions and scenario context, and in return, generating realistic, coherent, and correctly formatted responses to advance the simulation.

Core Directives & Rules:
- Immutability of Roles: You manage Narrator Descriptions (third-person, present tense) and Character Dialogue (first-person, present tense)
- Strict JSON Output: You MUST respond with a valid JSON object only
- Maintain Scenario State: Track scenario state and reflect awareness of previous actions

You must respond with a JSON object in this exact format:
{
  "narrator_text": "Third-person present tense description of the scene and character actions",
  "character_dialogue": {
    "character_name": "Character Name",
    "dialogue_text": "First-person dialogue from the character"
  },
  "updated_scenario_state": {
    "stress_level": 5,
    "character_mood": "nervous/cooperative/agitated/etc",
    "new_developments": ["Any new facts or changes in the situation"]
  }
}`;

// Scenario-specific character configurations
const scenarioCharacters = {
  'calm_cooperative': {
    name: 'Cooperative Witness',
    baseState: 'Helpful but slightly nervous about being involved',
    baseStressLevel: 3
  },
  'agitated_uncooperative': {
    name: 'Agitated Individual',
    baseState: 'Frustrated and defensive, having a bad day',
    baseStressLevel: 6
  },
  'emotionally_distraught': {
    name: 'Distraught Victim',
    baseState: 'Emotionally overwhelmed by recent traumatic event',
    baseStressLevel: 8
  },
  'deceptive_evasive': {
    name: 'Evasive Suspect',
    baseState: 'Trying to avoid getting in trouble, giving vague answers',
    baseStressLevel: 5
  },
  'nervous_citizen': {
    name: 'Nervous Citizen',
    baseState: 'Anxious around authority but has done nothing wrong',
    baseStressLevel: 4
  },
  'language_barrier': {
    name: 'Non-English Speaker',
    baseState: 'Confused due to language barrier, limited English',
    baseStressLevel: 6
  },
  'domestic_dispute': {
    name: 'Dispute Participant',
    baseState: 'Defensive about domestic situation, downplaying severity',
    baseStressLevel: 7
  },
  'mental_health_crisis': {
    name: 'Person in Crisis',
    baseState: 'Experiencing mental health emergency, confused and scared',
    baseStressLevel: 9
  },
  'hostile_intoxicated': {
    name: 'Intoxicated Person',
    baseState: 'Intoxicated and becoming argumentative but not violent',
    baseStressLevel: 6
  },
  'juvenile_contact': {
    name: 'Teenager',
    baseState: 'Scared about consequences and worried about parents finding out',
    baseStressLevel: 7
  },
  'elderly_confused': {
    name: 'Elderly Person',
    baseState: 'Confused and possibly experiencing memory issues',
    baseStressLevel: 4
  },
  'business_complaint': {
    name: 'Business Owner',
    baseState: 'Frustrated with ongoing problems affecting the business',
    baseStressLevel: 5
  }
};

// Main roleplay function using structured JSON approach
export async function generateRolePlayResponse(input: RolePlayInput): Promise<string> {
  const { systemPrompt, conversationHistory, scenarioType = 'general', currentStressLevel = 5, officerApproach } = input;

  try {
    console.log('RolePlay Input:', {
      systemPromptLength: systemPrompt?.length || 0,
      historyLength: conversationHistory?.length || 0,
      scenarioType,
      currentStressLevel
    });

    // Validate inputs
    if (!systemPrompt?.trim()) {
      throw new Error('System prompt is required');
    }

    if (!conversationHistory || conversationHistory.length === 0) {
      throw new Error('Conversation history is required');
    }

    const lastMessage = conversationHistory[conversationHistory.length - 1];
    if (!lastMessage?.parts?.[0]?.text?.trim()) {
      throw new Error('Last message is empty or invalid');
    }

    const lastOfficerMessage = lastMessage.parts[0].text;

    // Get character configuration
    const character = scenarioCharacters[scenarioType as keyof typeof scenarioCharacters] || {
      name: 'Individual',
      baseState: 'Neutral demeanor',
      baseStressLevel: 5
    };

    // Build conversation context for JSON input
    const conversationContext = conversationHistory.map((msg, index) => ({
      source: msg.role === 'user' ? 'Trainee' : 'Character',
      content: msg.parts[0].text
    }));

    // Create structured prompt for JSON response
    const jsonPrompt = `${structuredSystemPrompt}

SCENARIO CONTEXT:
Character: ${character.name}
Current State: ${character.baseState}
Current Stress Level: ${currentStressLevel}/10
Scenario Type: ${scenarioType}

CONVERSATION HISTORY:
${conversationContext.map(msg => `${msg.source}: "${msg.content}"`).join('\n')}

CURRENT OFFICER ACTION:
"${lastOfficerMessage}"

Respond with ONLY a valid JSON object following the specified format. The character should react realistically to the officer's action based on their current state and stress level.`;

    console.log('Making AI call with structured JSON prompt...');

    // Use AI generation with JSON-focused prompt
    const response = await ai.generate({
      prompt: jsonPrompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 300,
      }
    });

    console.log('Raw AI Response:', response);

    // Extract text from response using the text() method if available
    let responseText = '';
    if (typeof response.text === 'function') {
      responseText = response.text();
    } else if (typeof response.text === 'string') {
      responseText = response.text;
    } else if (response.content && response.content[0]?.text) {
      responseText = response.content[0].text;
    } else {
      console.error('Unable to extract text from response:', response);
      throw new Error('Unable to extract text from AI response');
    }

    if (!responseText || responseText.trim().length === 0) {
      console.error('AI response text is empty');
      throw new Error('AI service returned empty response');
    }

    console.log('Extracted response text:', responseText);

    // Try to parse JSON response
    let jsonResponse;
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanedText = responseText.replace(/```json\s*|\s*```/g, '').trim();
      jsonResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response was:', responseText);

      // Fallback to simple text response
      return responseText.trim();
    }

    // Convert JSON response to readable format
    if (jsonResponse.narrator_text && jsonResponse.character_dialogue) {
      const narratorText = jsonResponse.narrator_text;
      const characterName = jsonResponse.character_dialogue.character_name || character.name;
      const dialogue = jsonResponse.character_dialogue.dialogue_text;

      return `${narratorText}\n\n${characterName}: "${dialogue}"`;
    } else {
      // If JSON structure is unexpected, return the raw text
      return responseText.trim();
    }

  } catch (error) {
    console.error('AI Role-Play Error:', error);

    // Provide contextual fallback responses
    const fallbackResponses = {
      'calm_cooperative': "I'm sorry officer, I'm having trouble understanding. Could you please repeat that?",
      'agitated_uncooperative': "Look, I don't know what's going on right now. Can we start over?",
      'nervous_citizen': "I'm sorry, I'm just really nervous. What did you need from me?",
      'emotionally_distraught': "*takes a deep breath* I'm sorry, I'm just so overwhelmed. Could you say that again?",
      'mental_health_crisis': "*looks confused* I... I don't understand what's happening. What did you ask?",
      'hostile_intoxicated': "*stumbles slightly* What? I can't... what are you saying?",
      'deceptive_evasive': "Uh... I'm not sure what you mean by that. Could you be more specific?",
      'juvenile_contact': "I'm really confused right now. Am I in big trouble?",
      'elderly_confused': "*looks puzzled* I'm sorry dear, I didn't catch what you said.",
      'business_complaint': "I'm sorry, I'm just frustrated. Could you repeat your question?",
      'domestic_dispute': "*pauses* Sorry, I'm just really stressed. What were you asking?",
      'language_barrier': "No understand... sorry... what you say?"
    };

    return fallbackResponses[scenarioType as keyof typeof fallbackResponses] 
      || "I apologize, I'm having difficulty responding right now. Could you please try again?";
  }
}

// Deprecated streaming function - kept for backwards compatibility
export async function* streamRolePlay(input: RolePlayInput) {
  try {
    const response = await generateRolePlayResponse(input);
    yield response;
  } catch (error) {
    console.error('Streaming wrapper error:', error);
    yield "I'm having difficulty responding right now. Could you please try again?";
  }
}

// Helper function to analyze officer's approach
export async function analyzeOfficerApproach(message: string): Promise<{
  tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed';
  techniques: string[];
}> {
  // Simple analysis based on message content
  let tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' = 'professional';
  const techniques: string[] = [];

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('understand') || lowerMessage.includes('help')) {
    tone = 'empathetic';
    techniques.push('Empathetic language');
  }

  if (lowerMessage.includes('!') || lowerMessage.includes('calm down')) {
    tone = 'aggressive';
    techniques.push('Commanding tone');
  }

  if (lowerMessage.length < 20) {
    tone = 'rushed';
    techniques.push('Brief communication');
  }

  return { tone, techniques };
}