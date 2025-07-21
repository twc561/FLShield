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

    // Use AI generation with improved configuration
    const aiResponse = await ai.generate({
      prompt: jsonPrompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.9,
        topK: 40
      }
    });

    console.log('Raw AI Response:', aiResponse);

    // Extract response text with better error handling
    let responseText = '';
    try {
      // Try different methods to extract text from the AI response
      if (typeof aiResponse.text === 'function') {
        responseText = aiResponse.text()?.trim() || '';
      } else if (aiResponse.message?.content && aiResponse.message.content.length > 0) {
        // Extract from message content array
        const content = aiResponse.message.content[0];
        responseText = content?.text?.trim() || '';
      } else if (aiResponse.raw?.candidates && aiResponse.raw.candidates.length > 0) {
        // Extract from raw candidates
        const candidate = aiResponse.raw.candidates[0];
        if (candidate.content?.parts && candidate.content.parts.length > 0) {
          responseText = candidate.content.parts[0]?.text?.trim() || '';
        }
      }
      
      console.log('Raw response text:', responseText);
    } catch (textError) {
      console.error('Error extracting text from AI response:', textError);
      responseText = '';
    }

    if (!responseText || responseText.trim().length === 0) {
      console.error('AI response text is empty, generating contextual fallback response');

      // Generate more realistic contextual responses based on scenario and stress level
      const contextualResponses = {
        'elderly_confused': [
          "I'm sorry dear, I'm having trouble following. Could you help me understand?",
          "Oh my, I'm feeling a bit mixed up today. What was your question again?",
          "*looks confused* I'm not sure I understand what you're asking me."
        ],
        'calm_cooperative': [
          "Of course, officer. I'm happy to help however I can.",
          "I understand you're here to help. What information do you need?",
          "Thank you for coming. How can I assist you with this situation?"
        ],
        'agitated_uncooperative': [
          "Look, I've had a really rough day. What exactly do you need from me?",
          "I don't want any problems, okay? Just tell me what this is about.",
          "*sighs heavily* Fine, what do you want to know?"
        ],
        'mental_health_crisis': [
          "I'm really scared right now... I don't know what's happening to me.",
          "*voice shaking* Everything feels so overwhelming. I can't think straight.",
          "I don't understand why this is happening. Can you help me?"
        ],
        'domestic_dispute': [
          "This whole thing is just a misunderstanding, officer.",
          "Look, we were just having a disagreement. It's not what you think.",
          "*defensive* We can handle our own problems. We don't need outside interference."
        ],
        'deceptive_evasive': [
          "I'm not really sure what you're asking about. Could you be more specific?",
          "I don't think I can help you with that. I wasn't really paying attention.",
          "I'm not sure why you'd think I'd know anything about that."
        ],
        'hostile_intoxicated': [
          "*slurring slightly* What's the problem here, officer? I wasn't doing anything wrong.",
          "I'm fine, okay? I don't need anyone telling me what to do.",
          "*swaying slightly* Why are you hassling me? I have rights, you know."
        ],
        'emotionally_distraught': [
          "*wiping tears* I'm sorry, I'm just so upset about everything that happened.",
          "*voice breaking* I can't believe this is real. This can't be happening.",
          "*trying to compose themselves* I'm sorry, I'm having trouble keeping it together."
        ],
        'juvenile_contact': [
          "*nervously* Am I in big trouble? Do my parents have to know about this?",
          "I swear I wasn't doing anything that bad. Please don't call my mom.",
          "*fidgeting* Look, I know I messed up, but can we just forget about it?"
        ],
        'language_barrier': [
          "No English so good... sorry, no understand what you say.",
          "*speaking broken English* I try understand, but very difficult for me.",
          "*looking confused* Sorry, my English not so good. You speak slow please?"
        ],
        'business_complaint': [
          "Officer, I'm so glad you're here. This situation has been getting worse and worse.",
          "Thank you for responding. I really need help dealing with this ongoing problem.",
          "*frustrated* I've been trying to handle this myself, but it's affecting my business."
        ],
        'nervous_citizen': [
          "*nervously* Officer, I hope I'm not wasting your time, but I was really worried about this.",
          "I'm sorry to bother you, but I didn't know who else to call about this situation.",
          "*anxiously* I hope I did the right thing by calling. I just felt like something was wrong."
        ]
      };

      // Get responses for the scenario type, fallback to general if not found
      const responses = contextualResponses[scenarioType as keyof typeof contextualResponses] || [
        "I'm here. How can I help you today?",
        "What did you need to speak with me about?",
        "I'm listening. What's going on?"
      ];

      // Select response based on stress level and some randomization
      const responseIndex = Math.min(Math.floor(currentStressLevel / 4), responses.length - 1);
      responseText = responses[responseIndex];
    }

    console.log('Final response text:', responseText);

    // Try to parse JSON response first
    let jsonResponse;
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanedText = responseText.replace(/```json\s*|\s*```/g, '').trim();
      jsonResponse = JSON.parse(cleanedText);
      
      // Convert JSON response to readable format
      if (jsonResponse.narrator_text && jsonResponse.character_dialogue) {
        const narratorText = jsonResponse.narrator_text;
        const characterName = jsonResponse.character_dialogue.character_name || character.name;
        const dialogue = jsonResponse.character_dialogue.dialogue_text;

        return `${narratorText}\n\n${characterName}: "${dialogue}"`;
      }
    } catch (parseError) {
      console.log('Response is not JSON format, treating as plain text dialogue');
    }

    // If not JSON or JSON parsing failed, treat as plain character dialogue
    if (responseText && responseText.trim().length > 0) {
      // Add some narrator context based on scenario and stress level
      const narratorContexts = {
        high_stress: `${character.name} appears visibly stressed and agitated.`,
        medium_stress: `${character.name} seems somewhat tense but is trying to cooperate.`,
        low_stress: `${character.name} appears calm and receptive to conversation.`
      };
      
      const stressContext = currentStressLevel >= 7 ? 'high_stress' : 
                           currentStressLevel >= 4 ? 'medium_stress' : 'low_stress';
      
      const narratorText = narratorContexts[stressContext];
      
      return `${narratorText}\n\n${character.name}: "${responseText.trim()}"`;
    }

    // Final fallback with contextual response
    return generateContextualFallback(scenarioType, character.name, currentStressLevel);

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

// Helper function to generate contextual fallback responses
function generateContextualFallback(scenarioType: string, characterName: string, stressLevel: number): string {
  const stressDescriptor = stressLevel >= 7 ? 'visibly distressed' : 
                          stressLevel >= 4 ? 'somewhat tense' : 'relatively calm';
  
  const fallbackResponses = {
    'business_complaint': `${characterName} takes a deep breath, looking ${stressDescriptor}.\n\n${characterName}: "Officer, I really appreciate you coming out here. This situation has been going on for weeks and it's really affecting my business."`,
    'elderly_confused': `${characterName} appears ${stressDescriptor} and somewhat disoriented.\n\n${characterName}: "Oh, hello officer. I'm sorry, I'm feeling a bit confused today. Could you help me understand what's happening?"`,
    'agitated_uncooperative': `${characterName} crosses their arms, looking ${stressDescriptor}.\n\n${characterName}: "Look, I've already had a terrible day. What exactly is this about?"`,
    'mental_health_crisis': `${characterName} appears ${stressDescriptor} and struggling to focus.\n\n${characterName}: "I... I'm really scared right now. I don't understand what's happening to me."`,
    'domestic_dispute': `${characterName} seems ${stressDescriptor} and defensive.\n\n${characterName}: "Officer, this is just a misunderstanding between us. We can handle our own problems."`,
    'nervous_citizen': `${characterName} appears ${stressDescriptor} but eager to help.\n\n${characterName}: "Officer, thank you for coming. I hope I'm not wasting your time, but I was really concerned about what I saw."`,
    'juvenile_contact': `The teenager looks ${stressDescriptor} and worried.\n\n${characterName}: "Am I in trouble? Please don't call my parents about this."`,
    'hostile_intoxicated': `${characterName} sways slightly, appearing ${stressDescriptor} and confrontational.\n\n${characterName}: "What's the problem here, officer? I wasn't doing anything wrong."`,
    'language_barrier': `${characterName} looks ${stressDescriptor} and confused by the language barrier.\n\n${characterName}: "Sorry, my English not so good. You speak slow please?"`,
    'emotionally_distraught': `${characterName} is ${stressDescriptor} and fighting back tears.\n\n${characterName}: "I'm sorry, I'm just so upset about what happened. I can barely think straight."`,
    'deceptive_evasive': `${characterName} appears ${stressDescriptor} and evasive.\n\n${characterName}: "I'm not sure what you're asking about. Could you be more specific?"`
  };

  return fallbackResponses[scenarioType as keyof typeof fallbackResponses] || 
         `${characterName} appears ${stressDescriptor}.\n\n${characterName}: "I'm here. How can I help you with this situation?"`;
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