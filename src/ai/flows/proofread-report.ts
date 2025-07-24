
'use server';
/**
 * @fileOverview An AI-powered tool to proofread and analyze anonymized police report narratives.
 *
 * - proofreadReport - A function that provides structured feedback on a report.
 * - ProofreadReportInput - The input type for the function.
 * - ProofreadReportOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ProofreadReportInputSchema = z.object({
  primaryOffense: z.string().describe("The primary offense and statute number for context, e.g., 'Burglary - F.S. § 810.02'"),
  anonymizedNarrative: z.string().describe("The anonymized police report narrative to be analyzed."),
  analysisDepth: z.enum(['standard', 'comprehensive', 'expert']).optional().default('comprehensive').describe("Depth of analysis to perform"),
  focusArea: z.enum(['all', 'legal', 'writing', 'evidence']).optional().default('all').describe("Primary focus area for analysis"),
  reportType: z.string().optional().describe("Type of report being analyzed (e.g., 'Incident Report', 'Traffic Stop')"),
});
export type ProofreadReportInput = z.infer<typeof ProofreadReportInputSchema>

const ProofreadReportOutputSchema = z.object({
  articulatingElements_feedback: z.string().describe("Analyzes if the narrative contains language supporting the key elements of the specified offense. If not, suggests what's missing."),
  objectiveLanguage_feedback: z.string().describe("Identifies any subjective or weak 'weasel words' (e.g., 'seemed,' 'appeared') and suggests more objective, professional alternatives (e.g., 'I observed')."),
  clarityAndChronology_feedback: z.string().describe("Comments on the logical flow and clarity of the narrative. Identifies any confusing sentences or chronological gaps."),
  grammarAndSpelling_suggestions: z.array(z.string()).describe("A list of any specific spelling or grammatical errors found."),
  legalSufficiency_assessment: z.string().describe("Assessment of whether the report meets legal standards for the specified offense"),
  evidenceDocumentation_feedback: z.string().describe("Analysis of how well evidence is documented and described"),
  proceduralCompliance_feedback: z.string().describe("Comments on adherence to standard police procedures and protocols"),
  trainingOpportunities: z.array(z.string()).describe("Specific areas where additional training could improve report quality"),
  overallScore: z.number().min(0).max(100).describe("Overall quality score from 0-100"),
  strengthAreas: z.array(z.string()).describe("Areas where the report demonstrates strong performance"),
  improvementPriorities: z.array(z.string()).describe("Top 3-5 areas prioritized for improvement"),
});
export type ProofreadReportOutput = z.infer<typeof ProofreadReportOutputSchema>;

export const proofreadReportFlow = ai.defineFlow(
  {
    name: 'proofreadReport',
    inputSchema: ProofreadReportInputSchema,
    outputSchema: ProofreadReportOutputSchema,
  },
  async (input) => {
    const depthInstructions = {
      standard: "Provide basic feedback focusing on major issues",
      comprehensive: "Provide detailed analysis with specific examples and suggestions",
      expert: "Provide expert-level analysis with legal citations and advanced writing techniques"
    };

    const focusInstructions = {
      all: "Analyze all aspects of the report comprehensively",
      legal: "Focus primarily on legal sufficiency and offense elements",
      writing: "Focus primarily on writing quality, clarity, and grammar",
      evidence: "Focus primarily on evidence documentation and procedures"
    };

    const { output } = await ai.generate({
      model: 'gemini-1.5-pro',
      config: {
        maxOutputTokens: 8192,
        temperature: 0.1,
      },
      prompt: `You are an AI Police Report Writing Instructor and Legal Analyst, specializing in Florida law enforcement. You are conducting a ${input.analysisDepth || 'comprehensive'} review with focus on ${input.focusArea || 'all aspects'}.

${depthInstructions[input.analysisDepth || 'comprehensive']}
${focusInstructions[input.focusArea || 'all']}

Your task is to review the following anonymized narrative and provide detailed, constructive feedback to help the officer improve their report. Your analysis must focus exclusively on the quality of the writing and its legal sufficiency based on the specified offense.

REPORT DETAILS:
Primary Offense: ${input.primaryOffense}
${input.reportType ? `Report Type: ${input.reportType}` : ''}

ANONYMIZED NARRATIVE:
${input.anonymizedNarrative}

ANALYSIS REQUIREMENTS:

1. LEGAL ELEMENTS ANALYSIS: Examine whether all required elements of the offense are clearly articulated. Reference specific statutory requirements and identify any missing elements.

2. OBJECTIVE LANGUAGE REVIEW: Identify subjective language, assumptions, or "weasel words" that weaken the report. Suggest stronger, more objective alternatives.

3. CHRONOLOGICAL CLARITY: Assess the logical flow, timeline clarity, and overall narrative structure. Identify any gaps or confusing sequences.

4. GRAMMAR AND MECHANICS: Find specific spelling, grammar, punctuation, and formatting errors.

5. LEGAL SUFFICIENCY: Evaluate whether the report would meet legal standards for prosecution and court presentation.

6. EVIDENCE DOCUMENTATION: Assess how well physical evidence, witness statements, and observations are documented.

7. PROCEDURAL COMPLIANCE: Review adherence to standard police procedures and protocols.

8. TRAINING OPPORTUNITIES: Identify specific skills or knowledge areas where additional training would benefit the officer.

9. OVERALL ASSESSMENT: Provide a numerical score (0-100) based on professional standards.

10. STRENGTHS AND PRIORITIES: Highlight what the officer did well and prioritize areas for improvement.

Provide your analysis as a structured response that is constructive, specific, and actionable. Focus on helping the officer improve their professional writing while ensuring legal sufficiency.`,
      output: {
        schema: ProofreadReportOutputSchema,
      },
    });
    return output!;
  }
);

export async function proofreadReport(input: ProofreadReportInput): Promise<ProofreadReportOutput> {
  return await proofreadReportFlow(input);
}
