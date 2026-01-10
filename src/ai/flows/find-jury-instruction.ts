
'use server';
/**
 * @fileOverview A robust AI flow to find the correct Florida Jury Instruction ID
 * using semantic search and disambiguation.
 *
 * - findJuryInstruction - Analyzes a user query and returns a definitive instruction ID or disambiguation options.
 * - FindJuryInstructionInput - The input type for the function.
 * - FindJuryInstructionOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { commonCrimesMap } from '@/data/legal-reference/common-crimes-map';

// This represents the corpus of documents we would search in a real vector database.
const instructionDatabase = commonCrimesMap.map(item => ({
    id: item.instructionID,
    text: `ID: ${item.instructionID}, Crime: ${item.crimeName}, Statute: ${item.statuteNumber}, Keywords: ${item.keywords.join(', ')}`,
    title: item.crimeName,
}));

const FindJuryInstructionInputSchema = z.object({
  query: z.string().describe('The user\'s plain-language crime description or colloquial term.'),
});
export type FindJuryInstructionInput = z.infer<typeof FindJuryInstructionInputSchema>;

const DisambiguationOptionSchema = z.object({
    instructionID: z.string().describe("The specific instruction ID for this option."),
    instructionTitle: z.string().describe("The human-readable title for this instruction option."),
});

const FindJuryInstructionOutputSchema = z.object({
  instructionID: z.string().optional().describe('The single, most definitive jury instruction ID if found.'),
  disambiguationOptions: z.array(DisambiguationOptionSchema).optional().describe('A list of choices for the user if the query is ambiguous.'),
});
export type FindJuryInstructionOutput = z.infer<typeof FindJuryInstructionOutputSchema>;

const findInstructionPrompt = ai.definePrompt({
    name: "findInstructionPrompt",
    input: { schema: z.object({ query: z.string(), instructionDatabase: z.array(z.string()) }) },
    output: { schema: FindJuryInstructionOutputSchema },
    prompt: `You are an expert AI paralegal specializing in Florida criminal law. Your primary task is to act as a highly constrained and accurate search and disambiguation engine.

User's Raw Query: "{{query}}"

I have the following full database of available jury instructions:
{{#each instructionDatabase}}
- {{this}}
{{/each}}

Follow these rules with absolute precision:

1.  **Strict Initial Filtering:** First, create a mental shortlist of instructions from the database where the crime name or keywords are a DIRECT match to the user's query. A query for "murder" MUST only result in murder-related instructions. A query for "robbery" MUST only result in robbery instructions. A query for "escape" MUST only result in the escape instruction. You MUST IGNORE all other instructions, no matter how semantically similar they might seem.

2.  **DEFAULT BEHAVIOR: PROVIDE OPTIONS.** If your shortlist contains multiple related items (e.g., a search for "battery" matches "Battery", "Felony Battery", and "Aggravated Battery"), your response MUST be a 'disambiguationOptions' array containing ALL of the relevant matches from your shortlist. This empowers the user to make the final, correct selection.

3.  **EXCEPTION: 100% CONFIDENCE.** The ONLY time you should populate the 'instructionID' field directly is if the user's query is an exact, unambiguous match for a SINGLE item on your shortlist. An example would be a query for "First Degree Murder," which has only one clear match.

4.  **Final Verification:** Before producing the output, verify that your selected instruction(s) are directly related to the user's initial query. A search for "robbery" must never result in an instruction for "battery". If no direct matches are found on your shortlist, you must return a valid JSON object with empty values for both fields.

Your entire response must be a single, valid JSON object.`,
});

export const findJuryInstruction = ai.defineFlow(
  {
    name: 'findJuryInstruction',
    inputSchema: FindJuryInstructionInputSchema,
    outputSchema: FindJuryInstructionOutputSchema,
  },
  async (input) => {
    // Format the entire database for the AI prompt
    const fullDatabaseContext = instructionDatabase.map(r => r.text);

    const { output } = await findInstructionPrompt({
        query: input.query,
        instructionDatabase: fullDatabaseContext,
    });

    if (!output || (!output.instructionID && (!output.disambiguationOptions || output.disambiguationOptions.length === 0))) {
        throw new Error(`The AI analyst could not identify a relevant instruction for "${input.query}". Please try a more specific search term.`);
    }
    if (!output) {
      throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
