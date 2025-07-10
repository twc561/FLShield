
'use server';
/**
 * @fileOverview A robust AI flow to find the correct Florida Jury Instruction ID
 * using semantic search and disambiguation. This replaces the brittle identify-then-map logic.
 *
 * - findJuryInstruction - Analyzes a user query and returns a definitive instruction ID or disambiguation options.
 * - FindJuryInstructionInput - The input type for the function.
 * - FindJuryInstructionOutput - The return type for the function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { instructionMap } from '@/data/legal-reference/instruction-map';

// This represents the corpus of documents we would search in a real vector database.
// For this simulation, we will provide the full context to the AI.
const instructionDatabase = instructionMap.map(item => ({
    id: item.instructionID,
    text: `The jury instruction for the crime of ${item.crimeName}, related to Florida Statute ${item.statuteNumber}. Additional keywords: ${item.keywords.join(', ')}`,
    title: item.crimeName,
}));

const FindJuryInstructionInputSchema = z.object({
  query: z.string().describe('The user\'s plain-language crime description.'),
  // In a real system, we might pass previous context to refine the search.
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
    prompt: `You are an expert AI paralegal specializing in Florida criminal law. Your primary task is to act as a disambiguation engine for a jury instruction search tool. Prioritize user choice over making a definitive selection yourself.

User's Raw Query: "{{query}}"

I have the following full database of available jury instructions:
{{#each instructionDatabase}}
- {{this}}
{{/each}}

Analyze the user's query and the full database. Follow these rules strictly:

1.  **Search the full database** to find all semantically relevant instructions for the user's query.
2.  **DEFAULT BEHAVIOR: PROVIDE OPTIONS.** For almost all queries (like "theft", "battery", "burglary"), your default behavior should be to return a 'disambiguationOptions' array. Present the top 2-4 most relevant matches as options for the user to choose from. This empowers the user to make the final, correct selection.
3.  **EXCEPTION: 100% CONFIDENCE.** The ONLY time you should populate the 'instructionID' field directly is if the user's query is an exact, unambiguous match for ONE of the instructions and could not possibly refer to anything else. An example would be a query for a specific instruction number or a very specific crime name that has no other variations (e.g., 'Justifiable Use of Deadly Force').
4.  If no matches seem relevant, return an empty response.

Your entire response must be a single, valid JSON object.`,
});

export async function findJuryInstruction(input: FindJuryInstructionInput): Promise<FindJuryInstructionOutput> {
  // Format the entire database for the AI prompt
  const potentialMatches = instructionDatabase.map(r => `${r.id}: ${r.title}`);

  const { output } = await findInstructionPrompt({
      query: input.query,
      instructionDatabase: potentialMatches,
  });

  if (!output?.instructionID && (!output?.disambiguationOptions || output.disambiguationOptions.length === 0)) {
      throw new Error("The AI analyst could not definitively identify an instruction or provide clarifying options.");
  }

  return output!;
}
