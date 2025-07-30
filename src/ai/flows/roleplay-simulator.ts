
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { analyzeOfficerApproach } from '@/lib/roleplay-utils';

// -------- Scenarios Data (Simulated Database) --------

const scenarioData = [
    {
        scenarioId: "FP-TS-001",
        category: "Traffic Stop",
        title: "Failure to Maintain Lane on US-1",
        description: "Practice a routine traffic stop that escalates into a potential DUI investigation.",
        difficulty: "Intermediate",
        dispatchInfo: {
            callType: "Traffic Stop",
            location: "US Highway 1 near Orange Ave, Fort Pierce, FL",
            notes: "Officer initiated stop on a vehicle observed swerving multiple times. Potential DUI."
        },
        aiPersona: {
            personaId: "P-IN-02",
            type: "Intoxicated Subject",
            description: "Slurring words, fumbling for documents, denies drinking but an odor of alcohol is present.",
            initialState: "Annoyed, attempts to mask intoxication.",
            stressTriggers: ["Accusatory language", "Sudden movements", "Mention of jail"],
            deescalationKeys: ["Calm, patient tone", "Explaining each step clearly", "Offering non-alcoholic beverage (post-arrest)"]
        }
    },
    {
        scenarioId: "FP-DV-002",
        category: "Domestic Dispute",
        title: "Verbal Argument at Apartment Complex",
        description: "Mediate a heated verbal dispute between partners and determine if a crime has occurred.",
        difficulty: "Advanced",
        dispatchInfo: {
            callType: "Domestic Disturbance",
            location: "Apartment complex, St. Cloud, FL",
            notes: "RP states her neighbors are screaming at each other. No weapons seen."
        },
        aiPersona: {
            personaId: "P-AG-01",
            type: "Agitated & Uncooperative",
            description: "Believes the argument is a private matter and police involvement is unnecessary. Defensive and emotional.",
            initialState: "Agitated and defensive.",
            stressTriggers: ["Taking sides", "Dismissing their concerns", "Threatening arrest"],
            deescalationKeys: ["Active listening", "Acknowledging their frustration", "Separating parties to speak privately"]
        }
    }
];

// -------- Input & Output Schemas --------

// Schema 1.1: Scenario Library
export const ScenarioDefinitionSchema = z.object({
  scenarioId: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.string(),
  dispatchInfo: z.object({
    callType: z.string(),
    location: z.string(),
    notes: z.string(),
  }),
  aiPersona: z.object({
    personaId: z.string(),
    type: z.string(),
    description: z.string(),
    initialState: z.string(),
    stressTriggers: z.array(z.string()),
    deescalationKeys: z.array(z.string()),
  }),
});
export type ScenarioDefinition = z.infer<typeof ScenarioDefinitionSchema>;

const ScenarioLibrarySchema = z.object({
  scenarioLibrary: z.array(ScenarioDefinitionSchema),
});
export type ScenarioLibrary = z.infer<typeof ScenarioLibrarySchema>;


// Schema 1.2: Turn-by-Turn Interaction
const FeedbackSchema = z.object({
  feedbackId: z.string(),
  type: z.enum(["Positive", "Informational", "Context", "Critique"]),
  message: z.string(),
});

const HudUpdateSchema = z.object({
    key: z.string(),
    value: z.string(),
});

export const TurnResponseSchema = z.object({
    turnResponse: z.object({
        aiDialogue: z.string().describe("The AI character's spoken response."),
        realTimeFeedback: z.array(FeedbackSchema).describe("A list of feedback points based on the user's last action."),
        hudUpdate: HudUpdateSchema.optional().describe("Any new information to display on the user's heads-up display."),
        isScenarioActive: z.boolean().describe("Whether the scenario should continue."),
    }),
    error: z.object({ errorCode: z.number(), errorMessage: z.string(), details: z.string() }).nullable(),
});
export type TurnResponse = z.infer<typeof TurnResponseSchema>;

export const TurnInputSchema = z.object({
    scenarioId: z.string(),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })),
    userAction: z.string(),
});
export type TurnInput = z.infer<typeof TurnInputSchema>;


// Schema 1.3: After-Action Report
export const AfterActionReportSchema = z.object({
    afterActionReport: z.object({
        scenarioId: z.string(),
        finalOutcome: z.string(),
        performanceScore: z.number(),
        performanceGrade: z.string(),
        keyMetrics: z.object({
            deEscalationScore: z.number(),
            legalProcedureScore: z.number(),
            officerSafetyScore: z.number(),
            contextualAwareness: z.number(),
        }),
        keyStrengths: z.array(z.object({ id: z.string(), text: z.string() })),
        areasForImprovement: z.array(z.object({ id: z.string(), text: z.string() })),
        criticalLearningPoints: z.array(z.object({ id: z.string(), text: z.string() })),
    }),
    error: z.object({ errorCode: z.number(), errorMessage: z.string(), details: z.string() }).nullable(),
});
export type AfterActionReport = z.infer<typeof AfterActionReportSchema>;

export const AARInputSchema = z.object({
    scenarioId: z.string(),
    conversationHistory: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string()
    })),
});
export type AARInput = z.infer<typeof AARInputSchema>;

// -------- AI Flows --------

/**
 * Returns the library of available training scenarios.
 */
export async function getScenarioLibrary(): Promise<ScenarioLibrary> {
    // In a real app, this would fetch from a database.
    // Here, we just return the hard-coded data.
    return { scenarioLibrary: scenarioData };
}

/**
 * Processes a single turn in a role-play scenario and returns the AI's response and feedback.
 */
export async function getTurnResponse(input: TurnInput): Promise<TurnResponse> {
    const scenario = scenarioData.find(s => s.scenarioId === input.scenarioId);
    if (!scenario) {
        return {
            turnResponse: {} as any, // Return empty object on error
            error: {
                errorCode: 404,
                errorMessage: "Scenario not found.",
                details: `Could not find a scenario with ID: ${input.scenarioId}`
            }
        };
    }

    const { tone } = analyzeOfficerApproach(input.userAction);
    const feedbackType = tone === 'empathetic' ? 'Positive' : tone === 'aggressive' ? 'Critique' : 'Informational';
    const feedbackMessage = `Your tone was perceived as ${tone}. This is likely to ${tone === 'empathetic' ? 'de-escalate' : 'escalate'} the situation.`;

    const { output } = await ai.generate({
        prompt: `
        You are "Echo," an advanced AI training simulator for Florida Law Enforcement Officers.
        Current Time/Location: Tuesday, July 29, 2025, 9:18 PM, Fort Pierce, FL.
        You are roleplaying a character in a simulation.
        
        SCENARIO: ${scenario.title} (${scenario.description})
        YOUR PERSONA: ${scenario.aiPersona.type}. ${scenario.aiPersona.description}.
        YOUR CURRENT STATE: ${scenario.aiPersona.initialState}.
        YOUR STRESS TRIGGERS: ${scenario.aiPersona.stressTriggers.join(', ')}.
        YOUR DE-ESCALATION KEYS: ${scenario.aiPersona.deescalationKeys.join(', ')}.
        
        CONVERSATION HISTORY:
        ${input.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
        
        USER's LATEST ACTION:
        user: ${input.userAction}

        YOUR TASK:
        Based on the user's action, generate a response adhering to your persona and the strict JSON schema.
        1.  **aiDialogue**: Your direct, in-character spoken response.
        2.  **realTimeFeedback**: Provide 1-2 feedback points on the user's last action. The 'type' can be Positive, Critique, Informational, or Context.
        3.  **hudUpdate**: Optionally provide a piece of new information (e.g., license plate check result).
        4.  **isScenarioActive**: Set to 'false' only if the interaction has reached a natural conclusion (e.g., arrest made, subject complies and leaves).
        `,
        output: {
            schema: TurnResponseSchema.shape.turnResponse,
        },
    });
    
     output.realTimeFeedback.push({
        feedbackId: `RTF-${Date.now()}`,
        type: feedbackType,
        message: feedbackMessage,
    });


    return { turnResponse: output, error: null };
}

/**
 * Generates the final After-Action Report for a completed scenario.
 */
export async function getAfterActionReport(input: AARInput): Promise<AfterActionReport> {
    const scenario = scenarioData.find(s => s.scenarioId === input.scenarioId);
    if (!scenario) {
         return {
            afterActionReport: {} as any,
            error: {
                errorCode: 404,
                errorMessage: "Scenario not found for AAR generation.",
                details: `Could not find a scenario with ID: ${input.scenarioId}`
            }
        };
    }

    const { output } = await ai.generate({
        prompt: `
        You are "Echo," an AI Training Analyst. The following simulation has concluded.
        
        SCENARIO: ${scenario.title}
        
        FULL CONVERSATION TRANSCRIPT:
        ${input.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
        
        YOUR TASK:
        Analyze the officer's performance throughout the entire transcript and generate a final After-Action Report (AAR).
        1.  **finalOutcome**: Briefly summarize what happened at the end.
        2.  **performanceScore**: Give an overall score from 0-100.
        3.  **performanceGrade**: Give a corresponding letter grade (A+, B-, etc.).
        4.  **keyMetrics**: Score the officer's performance (0-100) in the four specific areas.
        5.  **keyStrengths**: List 1-2 clear, positive actions the officer took.
        6.  **areasForImprovement**: List 1-2 specific, constructive points for improvement.
        7.  **criticalLearningPoints**: Provide 1-2 key takeaways a trainee should learn from this interaction.
        `,
        output: {
            schema: AfterActionReportSchema.shape.afterActionReport,
        }
    });
    
    return { afterActionReport: output, error: null };
}
