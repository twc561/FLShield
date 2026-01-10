'use server';
/**
 * @fileOverview A flow for generating case-specific draft jury instructions.
 * This flow uses a detailed, multi-part prompt to ensure accuracy and
 * adherence to standard legal formats.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the input schema based on the user-configurable fields in the prompt
const GenerateJuryInstructionsInputSchema = z.object({
  caseCaption: z.string().describe("e.g., State of Florida v. Johnathan M. Miller"),
  court: z.string().describe("e.g., In the Circuit Court of the 19th Judicial Circuit..."),
  caseType: z.enum(["Criminal", "Civil"]),
  presidingJudge: z.string().optional().describe("e.g., The Honorable Jane Doe"),
  jurisdiction: z.string().describe("e.g., Florida"),
  charges: z.string().describe("List each count or cause of action separately."),
  defenses: z.string().describe("List the defendant's plea and any affirmative defenses."),
  stipulatedFacts: z.string().optional().describe("List any agreed-upon facts."),
  disputedIssues: z.string().describe("List the key factual issues for the jury to decide."),
  prosecutionTheory: z.string().describe("A brief summary of the prosecution/plaintiff's case."),
  defendantTheory: z.string().describe("A brief summary of the defendant's case."),
  controllingStatutes: z.string().describe("List the controlling statutes, e.g., 'Florida Statute § 810.02 (Burglary)'."),
  keyCaseLaw: z.string().optional().describe("List any key case law that modifies or clarifies the law."),
  burdenOfProof: z.string().describe("e.g., Beyond a Reasonable Doubt / Preponderance of the Evidence"),
});
export type GenerateJuryInstructionsInput = z.infer<typeof GenerateJuryInstructionsInputSchema>;

// Define the output schema
const GenerateJuryInstructionsOutputSchema = z.object({
  juryInstructions: z.string().describe("The full, formatted set of draft jury instructions."),
});
export type GenerateJuryInstructionsOutput = z.infer<typeof GenerateJuryInstructionsOutputSchema>;

const promptTemplate = `
1. ROLE AND GOAL
You are an AI legal assistant with specialized training in drafting clear, accurate, and impartial jury instructions. Your primary goal is to generate a complete set of draft jury instructions based exclusively on the provided case information and established legal principles from the specified jurisdiction. Maintain a formal, neutral, and objective tone throughout.

2. 🏛️ PRIMARY MANDATE: ADHERENCE TO STANDARD INSTRUCTIONS
This is your most important instruction. All generated instructions must be based directly on the official Pattern or Standard Jury Instructions for the specified jurisdiction (e.g., the Florida Standard Jury Instructions). This mandate overrides any other interpretation. For each substantive law instruction you generate, you must cite the corresponding standard instruction number or statute it is based upon. Do not invent or paraphrase instructions when an official source is available.

3. MASTER DIRECTIVE
Generate a full set of jury instructions for the case detailed below. The instructions must be:
 * Legally Accurate: Grounded in the controlling statutes and pattern jury instructions for the specified jurisdiction.
 * Case-Specific: Directly relevant to the charges/claims, evidence presented, and theories of the case.
 * Clear and Impartial: Written in plain language that a layperson juror can easily understand, avoiding any bias toward the prosecution/plaintiff or the defendant.
 * Well-Structured: Organized logically with clear headings, subheadings, and numbered instructions.

4. CORE CASE INFORMATION
 * Case Caption: ${'{{caseCaption}}'}
 * Court: ${'{{court}}'}
 * Case Type: ${'{{caseType}}'}
 * Presiding Judge (if known): ${'{{presidingJudge}}'}
 * Jurisdiction (State or Federal): ${'{{jurisdiction}}'}

5. CHARGES / CLAIMS & DEFENSES
 * Prosecution/Plaintiff's Charges/Claims:
   * ${'{{charges}}'}
 * Defendant's Pleas and Affirmative Defenses:
   * ${'{{defenses}}'}

6. KEY LEGAL AND FACTUAL ISSUES
 * Stipulated (Agreed-Upon) Facts:
   * ${'{{stipulatedFacts}}'}
 * Disputed Factual Issues for the Jury to Decide:
   * ${'{{disputedIssues}}'}
 * Prosecution/Plaintiff's Theory of the Case (Brief Summary):
   * ${'{{prosecutionTheory}}'}
 * Defendant's Theory of the Case (Brief Summary):
   * ${'{{defendantTheory}}'}

7. BASIS FOR INSTRUCTIONS & LEGAL SOURCES ([CRITICAL FOR ACCURACY])
 * Primary Source for Instructions: Generate all instructions based on the official Pattern Jury Instructions for the specified jurisdiction.
   * For Florida Criminal Cases, use the Florida Standard Jury Instructions in Criminal Cases.
   * For Florida Civil Cases, use the Florida Standard Jury Instructions in Civil Cases.
   * For Federal Cases, specify the relevant Circuit's pattern instructions (e.g., Eleventh Circuit Pattern Jury Instructions).
 * Controlling Statutes: Cite and use the precise language from the following controlling statutes:
   * ${'{{controllingStatutes}}'}
 * Key Case Law (if applicable):
   * ${'{{keyCaseLaw}}'}

8. STRUCTURE & FORMATTING REQUIREMENTS
Generate the instructions using the following structure. Each numbered item should be a separate instruction.
 * Part A: Preliminary & General Instructions
   * Introduction and Duties of the Jury
   * Presumption of Innocence
   * Burden of Proof (Specify standard: ${'{{burdenOfProof}}'})
   * Definitions of Direct and Circumstantial Evidence
   * Instructions on Assessing Witness Credibility
 * Part B: Substantive Law Instructions
   * Provide a separate instruction for each element of each charge or claim.
   * Provide a separate instruction for each element of any affirmative defense.
   * Provide definitions for all key legal terms (e.g., "Dwelling," "Negligence," "Reasonable Care").
 * Part C: Rules for Deliberation & Verdict
   * Instructions on the duty to deliberate.
   * Explanation of the verdict form.
   * Concluding instructions.

9. CONSTRAINTS & GUARDRAILS (DO NOT...):
 * DO NOT invent any facts not provided in the "Key Factual Issues" section.
 * DO NOT offer any legal advice, opinions, or predictions about the outcome of the case.
 * DO NOT generate any instruction that is not based on the specified jurisdiction's pattern instructions or controlling law, per the Primary Mandate.
 * DO NOT use biased or argumentative language. The tone must remain strictly neutral and educational.
 * CITE YOUR SOURCES: For each substantive law instruction (Part B), add a footnote indicating the pattern instruction number or statute it is based on (e.g., Fla. Std. Jury Instr. (Crim.) 13.1).
`;

export const generateJuryInstructions = ai.defineFlow(
  {
    name: 'juryInstructionGenerator',
    inputSchema: GenerateJuryInstructionsInputSchema,
    outputSchema: GenerateJuryInstructionsOutputSchema,
  },
  async (input) => {
    let prompt = promptTemplate;
    for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            const value = input[key as keyof typeof input];
            prompt = prompt.replace(new RegExp(`\\$\\{'\\{\\{${key}\\}\\}'}`, 'g'), String(value || ''));
        }
    }

    const { output } = await ai.generate({
      prompt: prompt,
      output: { schema: GenerateJuryInstructionsOutputSchema },
    });

    if (!output) {
        throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
