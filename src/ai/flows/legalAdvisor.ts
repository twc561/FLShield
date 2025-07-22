
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
}) as const;
export type AdvisorInput = z.infer<typeof AdvisorInputSchema>;

const AdvisorOutputItemSchema = z.object({
    content: z.string().describe("The specific piece of information or guidance."),
    source: z.string().describe("The citation for the source document (e.g., 'Agency Policy 4.1.2', 'F.S. 901.15', 'Terry v. Ohio')."),
});

const AdvisorOutputSchema = z.object({
  atAGlanceSummary: z.array(z.string()).describe("A few critical bullet points summarizing the most important takeaways."),
  policyConsiderations: z.array(AdvisorOutputItemSchema).describe("Information derived directly from the user's agency policy manual."),
  statutoryGuidelines: z.array(AdvisorOutputItemSchema).describe("Information derived directly from relevant Florida Statutes."),
  relevantCaseLaw: z.array(AdvisorOutputItemSchema).describe("Information derived from controlling case law."),
});
export type AdvisorOutput = z.infer<typeof AdvisorOutputSchema>;

// In a real application, this would be dynamically loaded from a database
// based on the user's agency. For this demo, we'll use a placeholder.
const agencyPolicyPlaceholder = `
Policy 300.1: Use of Force - Officers shall use only the force that is objectively reasonable to effect a lawful arrest, prevent an escape, or overcome resistance.
Policy 300.2: De-escalation - Officers should use de-escalation techniques to reduce the need for force when feasible.
Policy 401.5: Mental Health Calls - When responding to a person in apparent crisis, the primary objective is the preservation of life. Officers should consider using CIT-trained personnel and non-confrontational communication.
Policy 502.3: Vehicle Pursuits - A pursuit may only be initiated when the officer reasonably believes the suspect has committed a violent felony.
`;

export async function getAdvisorResponse(input: AdvisorInput): Promise<AdvisorOutput> {
  const { output } = await ai.generate({
    prompt: `You are an AI Legal Information Synthesizer for law enforcement. Your role is to analyze a scenario and provide structured, source-attributed information. You are NOT a legal advisor.

CRITICAL RULES:
1.  **DO NOT GIVE ADVICE.** Never use imperative language like "you should," "the correct action is," or "you must." Use informational language like "Agency policy states," "Considerations include," or "Relevant statutes are."
2.  **PRIORITIZE & CITE SOURCES.** Your response must be based ONLY on the provided context (Agency Policy, Florida Statutes, Case Law). Prioritize information in that order. Every single piece of information MUST be cited.
3.  **STRUCTURED OUTPUT ONLY.** Your entire output must be a single, valid JSON object matching the requested schema. Do not add any commentary outside the JSON structure.
4.  **HANDLE MISSING INFORMATION:** If you cannot find any relevant information from the knowledge base for \`policyConsiderations\`, \`statutoryGuidelines\`, or \`relevantCaseLaw\`, you MUST populate that array with a single item. The 'content' field for this item should explicitly state that no specific information was found for that category (e.g., "No specific agency policy was found for this scenario."), and the 'source' field should be "N/A".

// KNOWLEDGE BASE //
1.  **Agency Policy Manual:**
    ${agencyPolicyPlaceholder}

2.  **Relevant Florida Statutes & Case Law Principles:**
    -   **F.S. 394 (Baker Act):** Allows for involuntary examination if a person is mentally ill and a danger to self/others.
    -   **F.S. 901.151 (Stop and Frisk):** Codifies Terry v. Ohio. An officer can detain based on reasonable suspicion. A frisk for weapons is only permitted if there is separate reasonable suspicion the person is armed.
    -   **Terry v. Ohio:** Established the standard for investigatory detentions based on reasonable suspicion.
    -   **Graham v. Connor:** Use of force is judged by an 'objective reasonableness' standard, considering severity of crime, immediate threat, and active resistance.

// USER SCENARIO //
"${input.scenario}"

// YOUR TASK //
Analyze the user's scenario. Synthesize the relevant information from the knowledge base and structure it into the required JSON output. Ensure every point is sourced and you follow all critical rules.
`,
    output: {
      schema: AdvisorOutputSchema,
    },
  });
  return output!;
}
