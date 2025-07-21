
'use server';
/**
 * @fileOverview Enhanced conversational AI agent for realistic role-playing scenarios.
 * Fully optimized for Gemini AI with robust character interactions and dynamic responses.
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

// Enhanced character configurations with personality matrices
const scenarioCharacters = {
  'calm_cooperative': {
    name: 'Cooperative Witness',
    basePersonality: 'helpful, honest, slightly nervous',
    responsePatterns: {
      professional: 'becomes more comfortable and detailed',
      aggressive: 'becomes worried but still tries to help',
      empathetic: 'opens up more, provides better information'
    },
    stressReactions: {
      low: 'relaxed and conversational',
      medium: 'slightly nervous but cooperative',
      high: 'anxious but still trying to help'
    }
  },
  'agitated_uncooperative': {
    name: 'Agitated Individual',
    basePersonality: 'frustrated, defensive, having a bad day',
    responsePatterns: {
      professional: 'gradually calms down with consistent respect',
      aggressive: 'becomes more defensive and argumentative',
      empathetic: 'slowly opens up about underlying issues'
    },
    stressReactions: {
      low: 'mildly irritated but manageable',
      medium: 'clearly frustrated and short-tempered',
      high: 'very agitated, raising voice, gesturing'
    }
  },
  'emotionally_distraught': {
    name: 'Distraught Victim',
    basePersonality: 'overwhelmed, traumatized, seeking help',
    responsePatterns: {
      professional: 'appreciates the structure and clarity',
      aggressive: 'becomes more upset and withdrawn',
      empathetic: 'feels heard and gradually shares more'
    },
    stressReactions: {
      low: 'tearful but able to communicate',
      medium: 'struggling to speak coherently',
      high: 'sobbing, barely able to respond'
    }
  },
  'deceptive_evasive': {
    name: 'Evasive Suspect',
    basePersonality: 'trying to avoid trouble, calculating responses',
    responsePatterns: {
      professional: 'maintains facade but gets nervous',
      aggressive: 'becomes more defensive and evasive',
      empathetic: 'might slip up or show genuine emotion'
    },
    stressReactions: {
      low: 'smooth and evasive',
      medium: 'starting to show cracks in story',
      high: 'making mistakes, contradicting themselves'
    }
  },
  'nervous_citizen': {
    name: 'Nervous Citizen',
    basePersonality: 'law-abiding but anxious around authority',
    responsePatterns: {
      professional: 'gradually relaxes and becomes helpful',
      aggressive: 'becomes more nervous and tongue-tied',
      empathetic: 'feels reassured and opens up'
    },
    stressReactions: {
      low: 'slightly nervous but functional',
      medium: 'visibly anxious, fidgeting',
      high: 'very nervous, stuttering, shaking'
    }
  },
  'language_barrier': {
    name: 'Non-English Speaker',
    basePersonality: 'confused by language barrier, wants to help',
    responsePatterns: {
      professional: 'appreciates patience and clear communication',
      aggressive: 'becomes more confused and scared',
      empathetic: 'feels more comfortable, tries harder'
    },
    stressReactions: {
      low: 'struggling but trying',
      medium: 'frustrated with communication',
      high: 'overwhelmed, mixing languages'
    }
  },
  'domestic_dispute': {
    name: 'Dispute Participant',
    basePersonality: 'defensive about privacy, downplaying issues',
    responsePatterns: {
      professional: 'maintains boundaries but cooperates',
      aggressive: 'becomes more defensive and hostile',
      empathetic: 'might reveal more about the situation'
    },
    stressReactions: {
      low: 'guarded but polite',
      medium: 'clearly defensive and protective',
      high: 'very upset about outside interference'
    }
  },
  'mental_health_crisis': {
    name: 'Person in Crisis',
    basePersonality: 'confused, scared, experiencing mental health emergency',
    responsePatterns: {
      professional: 'responds to calm, clear direction',
      aggressive: 'becomes more agitated and fearful',
      empathetic: 'shows moments of clarity and connection'
    },
    stressReactions: {
      low: 'confused but somewhat coherent',
      medium: 'struggling with reality, paranoid thoughts',
      high: 'very disoriented, potential for panic'
    }
  },
  'hostile_intoxicated': {
    name: 'Intoxicated Person',
    basePersonality: 'impaired judgment, mood swings, argumentative',
    responsePatterns: {
      professional: 'responds to firm but fair treatment',
      aggressive: 'becomes more belligerent and challenging',
      empathetic: 'has moments of clarity and remorse'
    },
    stressReactions: {
      low: 'mildly intoxicated but manageable',
      medium: 'clearly impaired, mood swings',
      high: 'very intoxicated, unpredictable behavior'
    }
  },
  'juvenile_contact': {
    name: 'Teenager',
    basePersonality: 'scared about consequences, worried about parents',
    responsePatterns: {
      professional: 'respects authority but stays guarded',
      aggressive: 'becomes more defiant or shuts down',
      empathetic: 'opens up and shows vulnerability'
    },
    stressReactions: {
      low: 'nervous but trying to act tough',
      medium: 'clearly worried about consequences',
      high: 'very scared, might break down or lash out'
    }
  },
  'elderly_confused': {
    name: 'Elderly Person',
    basePersonality: 'possibly experiencing memory issues, easily confused',
    responsePatterns: {
      professional: 'appreciates clear, patient communication',
      aggressive: 'becomes more confused and distressed',
      empathetic: 'feels comfortable and tries to help'
    },
    stressReactions: {
      low: 'mildly confused but functional',
      medium: 'clearly struggling with comprehension',
      high: 'very disoriented, possibly agitated'
    }
  },
  'business_complaint': {
    name: 'Business Owner',
    basePersonality: 'frustrated with ongoing problems, seeking solutions',
    responsePatterns: {
      professional: 'appreciates action-oriented approach',
      aggressive: 'becomes more frustrated and demanding',
      empathetic: 'feels heard and becomes collaborative'
    },
    stressReactions: {
      low: 'concerned but professional',
      medium: 'clearly frustrated and impatient',
      high: 'very upset about business impact'
    }
  }
};

// Dynamic conversation context builder
function buildConversationContext(history: any[], maxTokens: number = 800): string {
  let context = '';
  let tokenCount = 0;
  
  // Start from most recent and work backwards
  for (let i = history.length - 1; i >= 0; i--) {
    const entry = history[i];
    const entryText = `${entry.role === 'user' ? 'Officer' : 'Character'}: "${entry.parts[0].text}"`;
    
    // Rough token estimation (4 chars = 1 token)
    const entryTokens = entryText.length / 4;
    
    if (tokenCount + entryTokens > maxTokens) break;
    
    context = entryText + '\n' + context;
    tokenCount += entryTokens;
  }
  
  return context.trim();
}

// Enhanced prompt builder for Gemini
function buildGeminiPrompt(
  character: any,
  conversationHistory: any[],
  currentAction: string,
  stressLevel: number,
  officerApproach: string
): string {
  const conversationContext = buildConversationContext(conversationHistory);
  const stressCategory = stressLevel <= 3 ? 'low' : stressLevel <= 6 ? 'medium' : 'high';
  const approachType = determineApproachType(currentAction);
  
  return `You are ${character.name}, a realistic person in a law enforcement interaction. 

PERSONALITY: ${character.basePersonality}
CURRENT STRESS LEVEL: ${stressLevel}/10 (${stressCategory})
RESPONSE TO OFFICER'S APPROACH: ${character.responsePatterns[approachType]}
STRESS BEHAVIOR: ${character.stressReactions[stressCategory]}

RECENT CONVERSATION:
${conversationContext}

OFFICER'S CURRENT ACTION: "${currentAction}"

Respond as ${character.name} would realistically respond. Consider:
- Your stress level affects how you communicate
- Your personality drives your basic reactions
- The officer's approach influences your cooperation level
- Stay in character throughout the response
- Show realistic human emotions and reactions
- Progress the conversation naturally

Respond with ONLY your character's dialogue and actions. Keep it under 100 words.`;
}

// Analyze officer's approach for character response
function determineApproachType(message: string): 'professional' | 'aggressive' | 'empathetic' {
  const lower = message.toLowerCase();
  
  // Empathetic indicators
  if (lower.includes('understand') || lower.includes('help') || lower.includes('listen') || 
      lower.includes('sorry') || lower.includes('concerned') || lower.includes('care')) {
    return 'empathetic';
  }
  
  // Aggressive indicators
  if (lower.includes('!') || lower.includes('need to') || lower.includes('must') ||
      lower.includes('calm down') || lower.includes('stop') || lower.length < 15) {
    return 'aggressive';
  }
  
  // Default to professional
  return 'professional';
}

// Main roleplay function optimized for Gemini
export async function generateRolePlayResponse(input: RolePlayInput): Promise<string> {
  const { systemPrompt, conversationHistory, scenarioType = 'general', currentStressLevel = 5, officerApproach } = input;

  try {
    console.log('Gemini RolePlay Input:', {
      scenarioType,
      historyLength: conversationHistory?.length || 0,
      currentStressLevel
    });

    // Validate inputs
    if (!conversationHistory || conversationHistory.length === 0) {
      throw new Error('Conversation history is required');
    }

    const lastMessage = conversationHistory[conversationHistory.length - 1];
    if (!lastMessage?.parts?.[0]?.text?.trim()) {
      throw new Error('Last message is empty or invalid');
    }

    const currentAction = lastMessage.parts[0].text.trim();

    // Get character configuration
    const character = scenarioCharacters[scenarioType as keyof typeof scenarioCharacters] || {
      name: 'Individual',
      basePersonality: 'neutral demeanor',
      responsePatterns: {
        professional: 'maintains polite interaction',
        aggressive: 'becomes guarded',
        empathetic: 'opens up slightly'
      },
      stressReactions: {
        low: 'calm and collected',
        medium: 'showing some stress',
        high: 'visibly stressed'
      }
    };

    // Build optimized Gemini prompt
    const geminiPrompt = buildGeminiPrompt(character, conversationHistory, currentAction, currentStressLevel, currentAction);

    console.log('Making Gemini AI call...');

    // Use Gemini with optimized settings
    const aiResponse = await ai.generate({
      prompt: geminiPrompt,
      config: {
        temperature: 0.8,  // Higher creativity for character interactions
        maxOutputTokens: 200,  // Shorter responses to avoid token limits
        topP: 0.9,
        topK: 40
      }
    });

    console.log('Raw Gemini Response:', aiResponse);

    // Extract response with multiple fallback methods
    let responseText = '';
    try {
      if (typeof aiResponse.text === 'function') {
        responseText = aiResponse.text()?.trim() || '';
      } else if (aiResponse.message?.content?.[0]?.text) {
        responseText = aiResponse.message.content[0].text.trim();
      } else if (aiResponse.raw?.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = aiResponse.raw.candidates[0].content.parts[0].text.trim();
      }
      
      console.log('Extracted response:', responseText);
    } catch (textError) {
      console.error('Error extracting Gemini response:', textError);
      responseText = '';
    }

    // If we got a response, return it
    if (responseText && responseText.length > 0) {
      return responseText;
    }

    // Enhanced contextual fallback based on character and situation
    return generateEnhancedFallback(character, currentStressLevel, currentAction, conversationHistory.length);

  } catch (error) {
    console.error('Gemini RolePlay Error:', error);
    
    // Get character for error fallback
    const character = scenarioCharacters[scenarioType as keyof typeof scenarioCharacters] || {
      name: 'Individual',
      basePersonality: 'neutral'
    };

    return generateErrorFallback(character, currentStressLevel, scenarioType);
  }
}

// Enhanced fallback with character-specific responses
function generateEnhancedFallback(character: any, stressLevel: number, currentAction: string, conversationTurn: number): string {
  const stressCategory = stressLevel <= 3 ? 'low' : stressLevel <= 6 ? 'medium' : 'high';
  const approachType = determineApproachType(currentAction);
  
  // Character-specific contextual responses based on stress and approach
  const responses = {
    'Cooperative Witness': {
      low: {
        professional: "Of course, officer. I want to help however I can with this situation.",
        aggressive: "Oh... okay, I'll try to answer your questions as best I can.",
        empathetic: "Thank you for being so understanding. This has been really difficult for me."
      },
      medium: {
        professional: "I'm trying to remember everything correctly, officer. It happened so fast.",
        aggressive: "I'm sorry, I'm just a little shaken up. Could you repeat that?",
        empathetic: "I really appreciate your patience. I saw what happened and I want to help."
      },
      high: {
        professional: "*nervously* I'll do my best to tell you what I saw, but I'm still pretty shaken up.",
        aggressive: "*voice trembling* I'm sorry, I'm just really nervous. I've never been through anything like this.",
        empathetic: "*relaxing slightly* Thank you for understanding. I really want to help you figure this out."
      }
    },
    'Agitated Individual': {
      low: {
        professional: "Look, I get that you have a job to do. What do you need to know?",
        aggressive: "Great, just great. What now?",
        empathetic: "*sighs* Sorry, I'm just having a really rough day. What can I tell you?"
      },
      medium: {
        professional: "*frustrated* Fine, fine. I'll cooperate. But this whole thing is ridiculous.",
        aggressive: "Why is everyone hassling me today? I didn't do anything wrong!",
        empathetic: "Look, I know you're just trying to help. I'm just really frustrated right now."
      },
      high: {
        professional: "*agitated* This is insane! But whatever, ask your questions.",
        aggressive: "*raising voice* I'm sick of this! Everyone's treating me like some kind of criminal!",
        empathetic: "*voice breaking* I'm sorry for yelling. I'm just... everything's falling apart today."
      }
    },
    'Person in Crisis': {
      low: {
        professional: "*confused but trying* I... I'll try to answer. Everything feels so strange right now.",
        aggressive: "*backing away slightly* Please don't yell at me. I don't understand what's happening.",
        empathetic: "*tearful* Thank you for being kind. I'm so scared and confused right now."
      },
      medium: {
        professional: "*disoriented* The voices... they keep telling me... what was your question?",
        aggressive: "*becoming agitated* No, no, no! You're one of them too, aren't you?",
        empathetic: "*grasping for connection* You seem nice. Can you help me? I don't know what's real anymore."
      },
      high: {
        professional: "*very distressed* I can't... the thoughts won't stop... what do you want from me?",
        aggressive: "*panicking* Stay away! I know what you're trying to do!",
        empathetic: "*sobbing* Please help me. I don't know what's happening to my mind."
      }
    }
  };

  // Get response or use generic fallback
  const characterResponses = responses[character.name as keyof typeof responses];
  if (characterResponses) {
    return characterResponses[stressCategory][approachType] || 
           `*${character.stressReactions[stressCategory]}* ${character.name}: "I'm listening. What did you need to know?"`;
  }

  // Generic character-aware fallback
  return `*${character.stressReactions[stressCategory]}* ${character.name}: "I'm here. What do you need to discuss?"`;
}

// Error fallback with character awareness
function generateErrorFallback(character: any, stressLevel: number, scenarioType: string): string {
  const errorResponses = {
    'mental_health_crisis': "*looking confused and distressed* I'm sorry, I'm having trouble focusing right now. What did you ask?",
    'hostile_intoxicated': "*swaying slightly* What? I can't... what are you trying to say?",
    'emotionally_distraught': "*wiping tears* I'm sorry, I'm just so overwhelmed. Could you repeat that?",
    'juvenile_contact': "*nervously* I'm sorry, I'm really confused right now. Are you going to call my parents?",
    'elderly_confused': "*looking puzzled* I'm sorry dear, my mind isn't as sharp as it used to be. What was that?",
    'language_barrier': "*struggling with English* Sorry, sorry... no understand good. You speak slow please?",
    'agitated_uncooperative': "*frustrated* This whole day has been a disaster. What exactly do you want from me?",
    'domestic_dispute': "*defensive* Look, can we just handle this quietly? I don't want the whole neighborhood involved."
  };

  return errorResponses[scenarioType as keyof typeof errorResponses] || 
         `${character.name}: "I apologize, I'm having difficulty processing right now. Could you try asking again?"`;
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
  const lowerMessage = message.toLowerCase();
  let tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' = 'professional';
  const techniques: string[] = [];

  // Empathy detection
  if (lowerMessage.includes('understand') || lowerMessage.includes('help') || 
      lowerMessage.includes('listen') || lowerMessage.includes('sorry')) {
    tone = 'empathetic';
    techniques.push('Empathetic language', 'Active listening');
  }

  // Aggression detection
  if (lowerMessage.includes('!') || lowerMessage.includes('need to') || 
      lowerMessage.includes('must') || lowerMessage.includes('calm down')) {
    tone = 'aggressive';
    techniques.push('Commanding tone', 'Direct orders');
  }

  // Professional techniques
  if (lowerMessage.includes('can you') || lowerMessage.includes('would you') || 
      lowerMessage.includes('please')) {
    techniques.push('Polite requests', 'Professional courtesy');
  }

  // Rushed detection
  if (lowerMessage.length < 20 && !lowerMessage.includes('?')) {
    tone = 'rushed';
    techniques.push('Brief communication');
  }

  // De-escalation techniques
  if (lowerMessage.includes('safe') || lowerMessage.includes('calm') || 
      lowerMessage.includes('okay')) {
    techniques.push('De-escalation', 'Reassurance');
  }

  return { tone, techniques };
}
