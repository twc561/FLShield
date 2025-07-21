'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
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

// Initialize Gemini directly
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

// Enhanced character configurations
const scenarioCharacters = {
  'calm_cooperative': {
    name: 'Alex',
    basePersonality: 'respectful, helpful, and straightforward',
    stressResponses: {
      low: 'relaxed and conversational',
      medium: 'slightly nervous but cooperative', 
      high: 'anxious but still trying to help'
    }
  },
  'agitated_uncooperative': {
    name: 'Jordan',
    basePersonality: 'frustrated, defensive, having a bad day',
    stressResponses: {
      low: 'mildly irritated but manageable',
      medium: 'clearly frustrated and short-tempered',
      high: 'very agitated, raising voice'
    }
  },
  'emotionally_distraught': {
    name: 'Sam',
    basePersonality: 'overwhelmed, traumatized, seeking help',
    stressResponses: {
      low: 'tearful but able to communicate',
      medium: 'struggling to speak coherently',
      high: 'sobbing, barely able to respond'
    }
  },
  'deceptive_evasive': {
    name: 'Casey',
    basePersonality: 'trying to avoid trouble, calculating responses',
    stressResponses: {
      low: 'smooth and evasive',
      medium: 'starting to show cracks in story',
      high: 'making mistakes, contradicting themselves'
    }
  },
  'nervous_citizen': {
    name: 'Taylor',
    basePersonality: 'law-abiding but anxious around authority',
    stressResponses: {
      low: 'slightly nervous but functional',
      medium: 'visibly anxious, fidgeting',
      high: 'very nervous, stuttering'
    }
  },
  'language_barrier': {
    name: 'Maria',
    basePersonality: 'confused by language barrier, wants to help',
    stressResponses: {
      low: 'struggling but trying',
      medium: 'frustrated with communication',
      high: 'overwhelmed, mixing languages'
    }
  },
  'domestic_dispute': {
    name: 'Riley',
    basePersonality: 'defensive about privacy, downplaying issues',
    stressResponses: {
      low: 'guarded but polite',
      medium: 'clearly defensive and protective',
      high: 'very upset about interference'
    }
  },
  'mental_health_crisis': {
    name: 'Morgan',
    basePersonality: 'confused, scared, experiencing mental health emergency',
    stressResponses: {
      low: 'confused but somewhat coherent',
      medium: 'struggling with reality',
      high: 'very disoriented, potential panic'
    }
  },
  'hostile_intoxicated': {
    name: 'Dakota',
    basePersonality: 'impaired judgment, mood swings, argumentative',
    stressResponses: {
      low: 'mildly intoxicated but manageable',
      medium: 'clearly impaired, mood swings',
      high: 'very intoxicated, unpredictable'
    }
  },
  'juvenile_contact': {
    name: 'Jamie',
    basePersonality: 'scared about consequences, worried about parents',
    stressResponses: {
      low: 'nervous but trying to act tough',
      medium: 'clearly worried about consequences',
      high: 'very scared, might break down'
    }
  },
  'elderly_confused': {
    name: 'Margaret',
    basePersonality: 'possibly experiencing memory issues, easily confused',
    stressResponses: {
      low: 'mildly confused but functional',
      medium: 'clearly struggling with comprehension',
      high: 'very disoriented, possibly agitated'
    }
  },
  'business_complaint': {
    name: 'Chris',
    basePersonality: 'frustrated with ongoing problems, seeking solutions',
    stressResponses: {
      low: 'concerned but professional',
      medium: 'clearly frustrated and impatient',
      high: 'very upset about business impact'
    }
  }
};

function getStressCategory(level: number): 'low' | 'medium' | 'high' {
  if (level <= 3) return 'low';
  if (level <= 6) return 'medium';
  return 'high';
}

function analyzeOfficerTone(message: string): 'professional' | 'aggressive' | 'empathetic' {
  const lower = message.toLowerCase();

  if (lower.includes('understand') || lower.includes('help') || 
      lower.includes('listen') || lower.includes('sorry') || 
      lower.includes('concerned')) {
    return 'empathetic';
  }

  if (lower.includes('!') || lower.includes('need to') || 
      lower.includes('must') || lower.includes('calm down') || 
      lower.includes('stop')) {
    return 'aggressive';
  }

  return 'professional';
}

function buildConversationContext(history: any[]): string {
  const recentHistory = history.slice(-10); // Last 10 exchanges
  return recentHistory.map(entry => {
    const speaker = entry.role === 'user' ? 'Officer' : 'You';
    return `${speaker}: "${entry.parts[0].text}"`;
  }).join('\n');
}

function createDetailedPrompt(
  character: any,
  conversationHistory: any[],
  officerMessage: string,
  stressLevel: number
): string {
  const stressCategory = getStressCategory(stressLevel);
  const officerTone = analyzeOfficerTone(officerMessage);
  const conversationContext = buildConversationContext(conversationHistory);

  return `You are roleplaying as ${character.name}, a realistic person in a police interaction.

CHARACTER PROFILE:
- Name: ${character.name}
- Personality: ${character.basePersonality}
- Current stress level: ${stressLevel}/10 (${stressCategory})
- Current state: ${character.stressResponses[stressCategory]}

CONVERSATION SO FAR:
${conversationContext}

CURRENT SITUATION:
The officer just said: "${officerMessage}"
The officer's tone seems: ${officerTone}

ROLEPLAY INSTRUCTIONS:
- Respond ONLY as ${character.name}
- Stay completely in character based on your personality and stress level
- React naturally to the officer's tone and approach
- Keep responses realistic (1-3 sentences)
- Show appropriate emotions and reactions
- Remember everything that has happened in this conversation
- DO NOT break character or narrate actions

Your response as ${character.name}:`;
}

export async function generateRolePlayResponse(input: RolePlayInput): Promise<string> {
  const { 
    systemPrompt, 
    conversationHistory = [], 
    scenarioType = 'general', 
    currentStressLevel = 5, 
    officerApproach = '' 
  } = input;

  try {
    console.log('Direct Gemini roleplay call:', {
      scenarioType,
      historyLength: conversationHistory.length,
      stressLevel: currentStressLevel
    });

    // Get character or create default
    const character = scenarioCharacters[scenarioType as keyof typeof scenarioCharacters] || {
      name: 'Individual',
      basePersonality: 'neutral person in a police interaction',
      stressResponses: {
        low: 'calm and collected',
        medium: 'showing some stress',
        high: 'visibly stressed'
      }
    };

    // Get the last officer message
    let officerMessage = officerApproach;
    if (!officerMessage && conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage?.parts?.[0]?.text) {
        officerMessage = lastMessage.parts[0].text;
      }
    }
    if (!officerMessage) {
      officerMessage = "Hello, I'm Officer Smith. How are you doing today?";
    }

    // Create detailed prompt
    const prompt = createDetailedPrompt(character, conversationHistory, officerMessage, currentStressLevel);

    // Call Gemini directly with maximum context
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Direct Gemini response:', text.substring(0, 100));

    if (text && text.trim()) {
      let cleanResponse = text.trim();

      // Remove any unwanted prefixes or suffixes
      cleanResponse = cleanResponse.replace(/^(You:|Character:|Response:|[A-Za-z\s]+:)\s*/i, '');
      cleanResponse = cleanResponse.replace(/\*\*(.*?)\*\*/g, '$1');

      // Ensure it's a natural response
      if (!cleanResponse.startsWith('"') && !cleanResponse.startsWith('*')) {
        cleanResponse = `"${cleanResponse}"`;
      }

      return cleanResponse;
    }

    // Enhanced fallback responses based on character and scenario
    const fallbackResponses = {
      'calm_cooperative': `"Of course, officer. I'm happy to help with whatever you need."`,
      'agitated_uncooperative': `"Look, I'm having a really bad day. What exactly do you need from me?"`,
      'emotionally_distraught': `*wiping tears* "I'm sorry, I'm just really shaken up right now."`,
      'mental_health_crisis': `*looking confused* "I... I'm not sure what's happening. Everything feels so strange."`,
      'hostile_intoxicated': `*swaying slightly* "What? I didn't do anything wrong, officer."`,
      'juvenile_contact': `*nervously* "Am I in trouble? Are you going to call my parents?"`,
      'elderly_confused': `*looking puzzled* "I'm sorry dear, I'm having trouble understanding. Could you repeat that?"`,
      'language_barrier': `*struggling with English* "Sorry, my English no so good. You speak slow please?"`,
      'domestic_dispute': `*defensive* "Look, this is just a private matter between me and my partner."`,
      'nervous_citizen': `*anxiously* "I'm sorry officer, I'm just really nervous. What did you need to know?"`,
      'business_complaint': `*frustrated* "Officer, I really need help with this ongoing situation at my business."`,
      'deceptive_evasive': `*hesitating* "I'm not really sure what you're asking about, officer."`
    };

    return fallbackResponses[scenarioType as keyof typeof fallbackResponses] || 
           `"I'm here, officer. What did you need to talk to me about?"`;

  } catch (error: any) {
    console.error('Direct Gemini error:', error);

    // Character-specific error responses
    const errorResponses = {
      'mental_health_crisis': `*becoming agitated* "I can't... I can't think straight right now."`,
      'hostile_intoxicated': `*confused* "What the hell... I can't understand what you're saying."`,
      'emotionally_distraught': `*breaking down* "I'm sorry, I just can't handle any more right now."`,
      'elderly_confused': `*very confused* "I'm sorry dear, I don't understand what's happening."`,
      'language_barrier': `*frustrated* "No comprendo... sorry, no understand good."`
    };

    const character = scenarioCharacters[scenarioType as keyof typeof scenarioCharacters];
    return errorResponses[scenarioType as keyof typeof errorResponses] || 
           `${character?.name || 'Individual'}: "I'm sorry, could you repeat that? I'm having trouble understanding."`;
  }
}

// Streaming wrapper for compatibility
const MAX_OUTPUT_TOKENS = 4096;
const MAX_TOKEN_CONFIG = {
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.8,
    topP: 0.95,
};
export async function* streamRolePlay(input: RolePlayInput) {
  try {
    // Use Gemini 1.5 Pro with maximum token limits for robust scenarios
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: MAX_TOKEN_CONFIG
    });

    const prompt = createDetailedPrompt(
        {
            name: 'Individual',
            basePersonality: 'neutral person in a police interaction',
            stressResponses: {
              low: 'calm and collected',
              medium: 'showing some stress',
              high: 'visibly stressed'
            }
          },
        input.conversationHistory || [],
        input.officerApproach || "Hello, I'm Officer Smith. How are you doing today?",
        input.currentStressLevel || 5
    );
    const result = await model.generateContent(prompt);

    if (!result || !result.response || !result.response.text) {
        throw new Error("Failed to generate content.");
    }

    const response = result.response.text();
    yield response;
  } catch (error) {
    console.error('Stream error:', error);
    yield "I'm having difficulty responding right now. Could you please try again?";
  }
}

// Helper function for analysis
export async function analyzeOfficerApproach(message: string): Promise<{
  tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed';
  techniques: string[];
}> {
  const lowerMessage = message.toLowerCase();
  let tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' = 'professional';
  const techniques: string[] = [];

  if (lowerMessage.includes('understand') || lowerMessage.includes('help') || 
      lowerMessage.includes('listen') || lowerMessage.includes('sorry')) {
    tone = 'empathetic';
    techniques.push('Empathetic language', 'Active listening');
  } else if (lowerMessage.includes('!') || lowerMessage.includes('need to') || 
             lowerMessage.includes('must')) {
    tone = 'aggressive';
    techniques.push('Commanding tone', 'Direct orders');
  } else if (lowerMessage.length < 20) {
    tone = 'rushed';
    techniques.push('Brief communication');
  }

  if (lowerMessage.includes('please') || lowerMessage.includes('can you')) {
    techniques.push('Polite requests');
  }

  return { tone, techniques };
}