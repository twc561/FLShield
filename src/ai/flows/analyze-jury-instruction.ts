
'use server';
/**
 * @fileOverview Analyzes a Florida Standard Jury Instruction using an AI model.
 *
 * - analyzeInstruction - A function that fetches and parses an instruction.
 * - AnalyzeInstructionInput - The input type for the function.
 * - AnalyzeInstructionOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeInstructionInputSchema = z.object({
  instructionId: z.string().describe('The unique ID of the jury instruction to analyze, e.g., "FL_JI_CRIM_8_1".'),
});
export type AnalyzeInstructionInput = z.infer<typeof AnalyzeInstructionInputSchema>;

const ElementToProveSchema = z.object({
    element: z.string().describe("The legal element, e.g., '(Defendant) entered a structure owned by or in the possession of (victim).'"),
    officerActions: z.string().describe("Practical actions an officer must take to gather evidence for this element. e.g., 'Establish and document who the lawful owner/possessor of the property is. Photograph points of entry. Document any signs of forced entry.'")
});

const AnalyzeInstructionOutputSchema = z.object({
  id: z.string().describe("The ID requested, e.g., 'FL_JI_CRIM_8_1'"),
  instructionNumber: z.string().describe("The official instruction number, e.g., '8.1'"),
  instructionTitle: z.string().describe("The common name of the instruction, e.g., 'Burglary'"),
  fullText: z.string().describe("The complete, verbatim text of the jury instruction."),
  plainLanguageSummary: z.string().describe("A concise, easy-to-understand summary of what the instruction tells the jury to consider."),
  elementsToProve: z.object({
    title: z.string().describe("A static title for this section, e.g., 'Evidence Needed to Prove Each Element'"),
    elements: z.array(ElementToProveSchema).describe("An array of objects, one for each element in the instruction."),
  }),
  relatedStatute: z.string().describe("The primary Florida Statute number this instruction is based on. e.g., 'F.S. § 810.02'"),
});
export type AnalyzeInstructionOutput = z.infer<typeof AnalyzeInstructionOutputSchema>;


export async function analyzeInstruction(input: AnalyzeInstructionInput): Promise<AnalyzeInstructionOutput> {
  const { output } = await ai.generate({
    prompt: `You are a Trial Procedure Analyst AI for Florida Law Enforcement. Your task is to provide a detailed, structured analysis of a specific Florida Standard Jury Instruction. For the given ID, retrieve the full text and then parse it into a practical format for a patrol officer focused on case building. Return your analysis ONLY as a single, well-formed JSON object adhering strictly to the following schema.

Instruction ID: ${input.instructionId}`,
    output: {
      schema: AnalyzeInstructionOutputSchema,
    },
  });
  return output;
}
