
'use server';
/**
 * @fileOverview An AI-powered legal information synthesis tool.
 * This flow analyzes a user's scenario against a knowledge base of policy,
 * statutes, and case law to provide a structured, source-attributed summary.
 * It is explicitly designed NOT to give legal advice.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AdvisorInputSchema = z.object({
  scenario: z.string().describe("The user's natural language scenario or question."),
  analysisMode: z.enum(['standard', 'comprehensive']).optional().default('standard').describe("The depth of analysis to perform."),
  includeRiskFactors: z.boolean().optional().default(false).describe("Whether to include risk assessment."),
  includePracticalGuidance: z.boolean().optional().default(false).describe("Whether to include practical guidance."),
}) as const;
export type AdvisorInput = z.infer<typeof AdvisorInputSchema>;

const AdvisorOutputItemSchema = z.object({
    content: z.string().describe("The specific piece of information or guidance."),
    source: z.string().describe("The citation for the source document (e.g., 'Agency Policy 4.1.2', 'F.S. 901.15', 'Terry v. Ohio')."),
});

const AdvisorOutputSchema = z.object({
  atAGlanceSummary: z.array(z.string()).describe("3-5 critical bullet points summarizing the most important takeaways and immediate considerations."),
  statutoryGuidelines: z.array(AdvisorOutputItemSchema).describe("Information derived directly from relevant Florida Statutes."),
  relevantCaseLaw: z.array(AdvisorOutputItemSchema).describe("Information derived from controlling case law."),
  riskFactors: z.array(z.string()).optional().describe("Key risk factors and potential challenges to consider."),
  practicalGuidance: z.array(z.string()).optional().describe("Practical steps and best practices for handling this scenario."),
  confidenceLevel: z.enum(['high', 'medium', 'low']).describe("AI's confidence in the analysis based on available information."),
});
export type AdvisorOutput = z.infer<typeof AdvisorOutputSchema>;

export async function getAdvisorResponse(input: AdvisorInput): Promise<AdvisorOutput> {
  const { output } = await ai.generate({
    prompt: `You are an AI Legal Information Synthesizer for law enforcement. Your role is to analyze a scenario and provide structured, source-attributed information. You are NOT a legal advisor.

ANALYSIS MODE: ${input.analysisMode}
${input.analysisMode === 'comprehensive' ? 'COMPREHENSIVE MODE: Provide detailed analysis with risk factors and practical guidance.' : 'STANDARD MODE: Provide essential information with key considerations.'}

CRITICAL RULES:
1.  **DO NOT GIVE ADVICE.** Never use imperative language like "you should," "the correct action is," or "you must." Use informational language like "Constitutional requirements state," "Considerations include," or "Relevant statutes indicate."
2.  **PRIORITIZE & CITE SOURCES.** Your response must be based ONLY on the provided context (Florida Statutes, Case Law). Every single piece of information MUST be cited.
3.  **STRUCTURED OUTPUT ONLY.** Your entire output must be a single, valid JSON object matching the requested schema. Do not add any commentary outside the JSON structure.
4.  **HANDLE MISSING INFORMATION:** If you cannot find any relevant information from the knowledge base for any category, populate that array with a single item stating no specific information was found, with source "N/A".
5.  **CONFIDENCE ASSESSMENT:** Evaluate your confidence based on the specificity and relevance of available information.

// LEGAL KNOWLEDGE BASE //
**Relevant Florida Statutes & Case Law Principles:**
    -   **F.S. 394 (Baker Act):** Allows for involuntary examination if a person appears to have a mental illness and poses a danger to self, others, or is substantially likely to suffer from neglect.
    -   **F.S. 901.151 (Stop and Frisk):** Codifies Terry v. Ohio. Officer may detain based on reasonable suspicion. Frisk requires separate reasonable suspicion of weapons.
    -   **F.S. 316.1932 (DUI):** Driving under the influence statutes and implied consent laws.
    -   **F.S. 784.03 (Battery):** Intentional touching or striking of another person against their will.
    -   **F.S. 810.02 (Burglary):** Entering a dwelling, structure, or conveyance with intent to commit an offense.
    -   **Terry v. Ohio (1968):** Reasonable suspicion standard for investigatory stops.
    -   **Graham v. Connor (1989):** Objective reasonableness standard for use of force.
    -   **Miranda v. Arizona (1966):** Right to remain silent and right to counsel during custodial interrogation.
    -   **Mapp v. Ohio (1961):** Exclusionary rule - illegally obtained evidence cannot be used in court.
    -   **United States v. Sokolow (1989):** Factors that may contribute to reasonable suspicion.

// USER SCENARIO //
"${input.scenario}"

// ANALYSIS REQUIREMENTS //
- Provide ${input.analysisMode === 'comprehensive' ? '4-5' : '3-4'} key summary points
- Focus on immediate legal considerations and officer responsibilities
- Include constitutional protections and limitations
${input.includeRiskFactors ? '- Analyze potential risks and legal challenges' : ''}
${input.includePracticalGuidance ? '- Provide practical implementation guidance' : ''}

// YOUR TASK //
Analyze the user's scenario against the knowledge base. Structure your response as a JSON object matching the schema. Ensure comprehensive coverage while maintaining legal accuracy and proper source attribution.
`,
    output: {
      schema: AdvisorOutputSchema,
    },
  });
  return output!;
}
