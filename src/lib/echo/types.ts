
import { z } from 'zod';

export const schemaVersion = '1.2';

// Schema 1.1: Scenario Definition
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

// Schema 1.1: System & Scenario Library Load
export const SystemLoadSchema = z.object({
  schemaVersion: z.literal(schemaVersion),
  systemStatus: z.enum(['OK', 'Error']),
  scenarioLibrary: z.array(ScenarioDefinitionSchema),
});
export type SystemLoad = z.infer<typeof SystemLoadSchema>;


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
    narratorText: z.string().describe("Third-person description of the scene or character's actions."),
    aiDialogue: z.string().describe("The AI character's spoken response."),
    realTimeFeedback: z.array(FeedbackSchema).describe("A list of feedback points based on the user's last action."),
    hudUpdate: HudUpdateSchema.optional().describe("Any new information to display on the user's heads-up display."),
    isScenarioActive: z.boolean().describe("Whether the scenario should continue."),
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

// Schema 1.3: Scenario Conclusion ("Report Card")
export const AfterActionReportSchema = z.object({
    scenarioId: z.string(),
    finalOutcome: z.string(),
    performanceScore: z.number().min(0).max(100),
    performanceGrade: z.string(),
    keyMetrics: z.object({
        deEscalationScore: z.number().min(0).max(100),
        legalProcedureScore: z.number().min(0).max(100),
        officerSafetyScore: z.number().min(0).max(100),
        contextualAwareness: z.number().min(0).max(100),
    }),
    keyStrengths: z.array(z.object({ id: z.string(), text: z.string() })),
    areasForImprovement: z.array(z.object({ id: z.string(), text: z.string() })),
    criticalLearningPoints: z.array(z.object({ id: z.string(), text: z.string() })),
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

// Schema 1.4: Structured Error Response
export const ErrorResponseSchema = z.object({
    schemaVersion: z.literal(schemaVersion),
    systemStatus: z.literal('Error'),
    error: z.object({
        errorCode: z.number(),
        errorMessage: z.string(),
        details: z.string().optional(),
    }),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
