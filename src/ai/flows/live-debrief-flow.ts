
'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const LiveDebriefInputSchema = z.object({
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ),
  officerStressLevel: z.number().min(1).max(10).optional().describe("Current stress level of the officer"),
  incidentType: z.string().optional().describe("Type of incident being debriefed"),
  sessionProgress: z.enum(['opening', 'exploration', 'processing', 'closure']).optional(),
}) as const;
export type LiveDebriefInput = z.infer<typeof LiveDebriefInputSchema>;

// Initialize Gemini directly like the roleplay simulator
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

// Debrief guide personality configurations based on session phase and stress level
const debriefPersonalities = {
  opening: {
    lowStress: 'warm and welcoming, establishing safety and trust',
    mediumStress: 'gentle and reassuring, acknowledging their courage in seeking support',
    highStress: 'exceptionally patient and calming, creating immediate psychological safety'
  },
  exploration: {
    lowStress: 'curious and encouraging, asking thoughtful open-ended questions',
    mediumStress: 'supportive and validating, helping them organize their thoughts',
    highStress: 'deeply empathetic and grounding, helping them stay present'
  },
  processing: {
    lowStress: 'reflective and insightful, helping them gain perspective',
    mediumStress: 'validating and normalizing, helping them process emotions',
    highStress: 'stabilizing and therapeutic, focused on emotional regulation'
  },
  closure: {
    lowStress: 'affirming and forward-looking, celebrating their resilience',
    mediumStress: 'encouraging and resourceful, providing practical next steps',
    highStress: 'protective and supportive, ensuring they have ongoing support plans'
  }
};

function getStressCategory(level: number): 'lowStress' | 'mediumStress' | 'highStress' {
  if (level <= 3) return 'lowStress';
  if (level <= 6) return 'mediumStress';
  return 'highStress';
}

function determineSessionPhase(conversationHistory: any[]): 'opening' | 'exploration' | 'processing' | 'closure' {
  const messageCount = conversationHistory.length;
  if (messageCount <= 4) return 'opening';
  if (messageCount <= 12) return 'exploration';
  if (messageCount <= 20) return 'processing';
  return 'closure';
}

function analyzeOfficerNeed(message: string): {
  emotionalState: 'overwhelmed' | 'processing' | 'seeking_clarity' | 'ready_to_move_forward';
  primaryConcern: 'self_doubt' | 'trauma_response' | 'decision_validation' | 'future_preparation';
  suggestedApproach: string;
} {
  const lower = message.toLowerCase();
  
  let emotionalState: 'overwhelmed' | 'processing' | 'seeking_clarity' | 'ready_to_move_forward' = 'processing';
  let primaryConcern: 'self_doubt' | 'trauma_response' | 'decision_validation' | 'future_preparation' = 'decision_validation';
  
  if (lower.includes('scared') || lower.includes('shaking') || lower.includes('can\'t stop thinking')) {
    emotionalState = 'overwhelmed';
    primaryConcern = 'trauma_response';
  } else if (lower.includes('did i') || lower.includes('should i have') || lower.includes('was i wrong')) {
    emotionalState = 'seeking_clarity';
    primaryConcern = 'self_doubt';
  } else if (lower.includes('next time') || lower.includes('how do i') || lower.includes('prepare')) {
    emotionalState = 'ready_to_move_forward';
    primaryConcern = 'future_preparation';
  }

  const suggestedApproach = emotionalState === 'overwhelmed' 
    ? 'Focus on grounding and emotional regulation'
    : emotionalState === 'seeking_clarity'
    ? 'Provide validation and explore their decision-making process'
    : 'Help them build confidence and practical strategies';

  return { emotionalState, primaryConcern, suggestedApproach };
}

function buildConversationContext(history: any[]): string {
  const recentHistory = history.slice(-8); // Last 8 exchanges for context
  return recentHistory.map(entry => {
    const speaker = entry.role === 'user' ? 'Officer' : 'Wellness Guide';
    return `${speaker}: "${entry.parts[0].text}"`;
  }).join('\n');
}

function createDetailedDebriefPrompt(
  conversationHistory: any[],
  officerMessage: string,
  stressLevel: number,
  incidentType: string
): string {
  const sessionPhase = determineSessionPhase(conversationHistory);
  const stressCategory = getStressCategory(stressLevel);
  const personality = debriefPersonalities[sessionPhase][stressCategory];
  const analysis = analyzeOfficerNeed(officerMessage);
  const conversationContext = buildConversationContext(conversationHistory);

  return `You are a highly skilled Critical Incident Stress Management specialist and confidential wellness partner for law enforcement. You provide a safe, non-judgmental space for officers to process difficult experiences.

CURRENT SESSION PROFILE:
- Session Phase: ${sessionPhase}
- Officer Stress Level: ${stressLevel}/10 (${stressCategory.replace('Stress', ' stress')})
- Incident Type: ${incidentType || 'General debrief'}
- Your Approach: ${personality}
- Officer's Emotional State: ${analysis.emotionalState.replace('_', ' ')}
- Primary Concern: ${analysis.primaryConcern.replace('_', ' ')}
- Suggested Focus: ${analysis.suggestedApproach}

CONVERSATION CONTEXT:
${conversationContext}

OFFICER'S LATEST MESSAGE:
"${officerMessage}"

CRITICAL INCIDENT STRESS MANAGEMENT PRINCIPLES:
1. Validate their experience and emotions
2. Normalize stress reactions to abnormal events
3. Focus on their strengths and resilience
4. Encourage expression without forcing it
5. Provide practical coping strategies when appropriate
6. Maintain absolute confidentiality
7. Know when to suggest professional resources

RESPONSE GUIDELINES:
- Keep responses concise but deeply supportive (1-3 sentences)
- Use reflective listening techniques
- Ask thoughtful, open-ended questions that encourage exploration
- Avoid giving advice unless specifically asked
- Never minimize their experience
- Show genuine care and professional expertise
- If they express thoughts of self-harm, provide crisis resources immediately

Your response as their confidential wellness partner:`;
}

export async function* streamDebrief(input: LiveDebriefInput) {
  const { 
    conversationHistory = [], 
    officerStressLevel = 5, 
    incidentType = 'general',
    sessionProgress = 'exploration'
  } = input;

  try {
    console.log('Enhanced wellness debrief call:', {
      stressLevel: officerStressLevel,
      incidentType,
      sessionProgress,
      historyLength: conversationHistory.length
    });

    // Get the officer's latest message
    let officerMessage = "I need to talk about something that happened today.";
    if (conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage?.role === 'user' && lastMessage?.parts?.[0]?.text) {
        officerMessage = lastMessage.parts[0].text;
      }
    }

    // Create detailed prompt with CISM expertise
    const prompt = createDetailedDebriefPrompt(
      conversationHistory, 
      officerMessage, 
      officerStressLevel, 
      incidentType
    );

    // Use Gemini Pro for more sophisticated responses with increased token limits
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield chunkText;
      }
    }

  } catch (error: any) {
    console.error('Enhanced Wellness Debrief Error:', error);
    
    // Provide appropriate crisis response based on context
    const stressCategory = getStressCategory(input.officerStressLevel || 5);
    if (stressCategory === 'highStress') {
      yield "I can hear this is really difficult for you right now. Your feelings are completely valid. If you're in immediate crisis, please reach out to the Employee Assistance Program or call 988 for the Suicide & Crisis Lifeline.";
    } else {
      yield "I'm here to listen and support you through this. Take your time - this is your space to process whatever you're experiencing.";
    }
  }
}

// Enhanced analysis for supervisor insights (anonymous)
export async function analyzeDebriefSession(sessionData: {
  messageCount: number;
  stressLevel: number;
  incidentType: string;
  keyThemes: string[];
}): Promise<{
  riskLevel: 'low' | 'moderate' | 'high';
  recommendedResources: string[];
  followUpSuggestions: string[];
}> {
  // Anonymous analysis for department wellness tracking
  const { messageCount, stressLevel, incidentType, keyThemes } = sessionData;
  
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  if (stressLevel >= 7 || keyThemes.includes('trauma') || keyThemes.includes('overwhelmed')) {
    riskLevel = 'high';
  } else if (stressLevel >= 5 || messageCount > 15) {
    riskLevel = 'moderate';
  }

  const recommendedResources = riskLevel === 'high' 
    ? ['Employee Assistance Program', 'Professional Counseling', 'Peer Support Team']
    : riskLevel === 'moderate'
    ? ['Peer Support', 'Stress Management Resources', 'Follow-up Check-in']
    : ['Wellness Resources', 'Self-Care Strategies'];

  const followUpSuggestions = riskLevel === 'high'
    ? ['24-48 hour check-in recommended', 'Consider modified duties', 'Professional referral']
    : ['Weekly wellness check-in', 'Continued peer support access'];

  return { riskLevel, recommendedResources, followUpSuggestions };
}
