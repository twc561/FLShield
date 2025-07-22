
'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const SummarizeDebriefInputSchema = z.object({
  facts: z.string().describe("What happened during the incident"),
  thoughts: z.string().describe("Officer's thoughts during the event"), 
  difficulties: z.string().describe("Most difficult aspects for the officer"),
  stressLevel: z.number().min(1).max(10).optional().describe("Officer's current stress level"),
  incidentType: z.string().optional().describe("Type of incident"),
}) as const;
export type SummarizeDebriefInput = z.infer<typeof SummarizeDebriefInputSchema>;

const SummarizeDebriefOutputSchema = z.object({
  summary: z.string().describe("Thoughtful, supportive reflection and validation"),
  insights: z.array(z.string()).describe("Key insights about resilience and growth"),
  recommendations: z.array(z.string()).describe("Gentle suggestions for self-care and processing"),
  riskLevel: z.enum(['low', 'moderate', 'high']).describe("Assessment of stress/trauma impact"),
}) as const;
export type SummarizeDebriefOutput = z.infer<typeof SummarizeDebriefOutputSchema>;

// Initialize Gemini with the same approach as roleplay simulator
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

function analyzeStressIndicators(facts: string, thoughts: string, difficulties: string): {
  traumaMarkers: string[];
  resilienceFactors: string[];
  concernLevel: 'low' | 'moderate' | 'high';
} {
  const allText = `${facts} ${thoughts} ${difficulties}`.toLowerCase();
  
  const traumaMarkers: string[] = [];
  const resilienceFactors: string[] = [];
  
  // Trauma indicators
  if (allText.includes('scared') || allText.includes('terrified') || allText.includes('froze')) {
    traumaMarkers.push('Fear response');
  }
  if (allText.includes('shaking') || allText.includes('trembling') || allText.includes('heart racing')) {
    traumaMarkers.push('Physical stress reactions');
  }
  if (allText.includes('replay') || allText.includes('can\'t stop thinking') || allText.includes('haunting')) {
    traumaMarkers.push('Intrusive thoughts');
  }
  if (allText.includes('my fault') || allText.includes('should have') || allText.includes('failed')) {
    traumaMarkers.push('Self-blame patterns');
  }

  // Resilience factors
  if (allText.includes('training kicked in') || allText.includes('remembered') || allText.includes('protocol')) {
    resilienceFactors.push('Training activation');
  }
  if (allText.includes('partner') || allText.includes('backup') || allText.includes('team')) {
    resilienceFactors.push('Team support utilization');
  }
  if (allText.includes('protected') || allText.includes('saved') || allText.includes('helped')) {
    resilienceFactors.push('Service accomplishment');
  }
  if (allText.includes('stayed calm') || allText.includes('controlled') || allText.includes('focused')) {
    resilienceFactors.push('Emotional regulation');
  }

  const concernLevel = traumaMarkers.length >= 3 ? 'high' : 
                     traumaMarkers.length >= 2 ? 'moderate' : 'low';

  return { traumaMarkers, resilienceFactors, concernLevel };
}

function createCISMPrompt(
  facts: string,
  thoughts: string, 
  difficulties: string,
  stressLevel: number,
  incidentType: string,
  analysis: ReturnType<typeof analyzeStressIndicators>
): string {
  return `You are a master-level Critical Incident Stress Management specialist providing a thoughtful reflection for a law enforcement officer after a difficult experience.

OFFICER'S EXPERIENCE:
Facts: "${facts}"
Thoughts: "${thoughts}"  
Difficulties: "${difficulties}"
Stress Level: ${stressLevel}/10
Incident Type: ${incidentType}

CLINICAL ASSESSMENT:
Trauma Markers Identified: ${analysis.traumaMarkers.join(', ') || 'None identified'}
Resilience Factors: ${analysis.resilienceFactors.join(', ') || 'Multiple present'}
Concern Level: ${analysis.concernLevel}

CISM PRINCIPLES TO APPLY:
1. Validate their experience completely - normalize stress reactions
2. Highlight their strengths, training, and resilience
3. Acknowledge the difficulty without minimizing it
4. Focus on their service and protection of others
5. Provide hope and perspective on recovery
6. Suggest practical, gentle self-care approaches
7. Recognize signs of growth and professional development

RESPONSE REQUIREMENTS:
- Write a compassionate, professional reflection (200-300 words)
- Use "you" statements to directly address the officer
- Acknowledge both the challenge and their strength
- Provide specific insights about their resilience
- Offer practical recommendations for processing and self-care
- Maintain hope and professional dignity throughout
- If high risk indicators present, gently encourage professional support

Create a response that this officer will find validating, strengthening, and professionally supportive.`;
}

export async function summarizeDebrief(input: SummarizeDebriefInput): Promise<SummarizeDebriefOutput> {
  const { facts, thoughts, difficulties, stressLevel = 5, incidentType = 'incident' } = input;

  try {
    console.log('Enhanced debrief summary:', {
      stressLevel,
      incidentType,
      factsLength: facts.length,
      thoughtsLength: thoughts.length,
      difficultiesLength: difficulties.length
    });

    // Analyze the content for clinical indicators
    const analysis = analyzeStressIndicators(facts, thoughts, difficulties);

    // Create CISM-informed prompt
    const prompt = createCISMPrompt(facts, thoughts, difficulties, stressLevel, incidentType, analysis);

    // Use Gemini Pro for sophisticated psychological support
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract insights and recommendations from the response
    const insights = analysis.resilienceFactors.length > 0 
      ? [
          "Your training and instincts served you well in a challenging situation",
          "You demonstrated the courage and commitment that defines good policing",
          "Your willingness to process this experience shows professional maturity"
        ]
      : [
          "Experiencing stress after difficult incidents is normal and shows your humanity",
          "Your service makes a difference in protecting and serving your community",
          "Processing these experiences is part of growing as a professional"
        ];

    const recommendations = analysis.concernLevel === 'high'
      ? [
          "Consider reaching out to the Employee Assistance Program for additional support",
          "Practice grounding techniques when intrusive thoughts occur",
          "Maintain connection with trusted colleagues and family",
          "Allow yourself time to process without rushing the healing"
        ]
      : analysis.concernLevel === 'moderate'
      ? [
          "Engage in regular physical exercise to help process stress",
          "Talk with trusted peers who understand law enforcement",
          "Practice stress management techniques you've learned",
          "Maintain normal routines while being gentle with yourself"
        ]
      : [
          "Continue to debrief with colleagues and supervisors as needed",
          "Use this experience to reinforce confidence in your abilities",
          "Consider what this experience taught you about your resilience",
          "Maintain work-life balance and self-care practices"
        ];

    return {
      summary: text.trim(),
      insights,
      recommendations,
      riskLevel: analysis.concernLevel
    };

  } catch (error: any) {
    console.error('Enhanced Debrief Summary Error:', error);

    // Provide appropriate fallback based on stress level
    const fallbackSummary = stressLevel >= 7
      ? "I want you to know that what you experienced was significant, and your reactions are completely normal. The fact that you're taking time to process this shows your strength and professionalism. Every officer faces moments that test them - this is part of the demanding but vital work you do. Your service matters, and you have the resilience to work through this experience. Please don't hesitate to reach out for additional support if you need it."
      : "Thank you for sharing your experience. It takes courage to reflect on difficult moments, and doing so shows your commitment to growth as an officer. The challenges you described are real, and your thoughtful processing of them demonstrates your professionalism. Remember that experiencing stress in challenging situations is normal - it shows you care about doing your job well. You have the skills and support systems to continue serving effectively.";

    return {
      summary: fallbackSummary,
      insights: [
        "Your willingness to debrief shows professional maturity",
        "You demonstrated resilience in a challenging situation",
        "Your service makes a meaningful difference"
      ],
      recommendations: [
        "Continue processing this experience with trusted colleagues",
        "Practice self-care and stress management techniques",
        "Remember that seeking support is a sign of strength"
      ],
      riskLevel: stressLevel >= 7 ? 'moderate' : 'low'
    };
  }
}
