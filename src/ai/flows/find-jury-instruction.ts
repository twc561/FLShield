
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
// For this simulation, we'll just use the crime names as searchable text.
const instructionDatabase = instructionMap.map(item => ({
    id: item.instructionID,
    text: `The jury instruction for the crime of ${item.crimeName}, related to Florida Statute ${item.statuteNumber}.`,
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
    input: { schema: z.object({ query: z.string(), potentialMatches: z.array(z.string()) }) },
    output: { schema: FindJuryInstructionOutputSchema },
    prompt: `You are an expert AI paralegal specializing in Florida criminal law. Your task is to analyze a user's plain-text search query and determine the correct Florida Standard Jury Instruction.

User's Raw Query: "{{query}}"

I have performed a semantic search and found the following potentially relevant instructions from the database:
{{#each potentialMatches}}
- {{this}}
{{/each}}

Analyze the user's query and the list of potential matches.

1.  If ONE of the potential matches is a highly confident, direct match for the user's query, populate the 'instructionID' field with its ID. The ID is the first part of the match string (e.g., 'FL_JI_CRIM_15_1').
2.  If the query is ambiguous and could reasonably refer to TWO or THREE of the potential matches (e.g., user says "battery" and matches could be "Battery", "Aggravated Battery", "Felony Battery"), you MUST return a 'disambiguationOptions' array. Do not guess. For each option, provide the instructionID and the instructionTitle (e.g., "Felony Battery").
3.  If NONE of the potential matches seem relevant, return an empty response.

Provide your response as a single JSON object.`,
});

export async function findJuryInstruction(input: FindJuryInstructionInput): Promise<FindJuryInstructionOutput> {
  // This simulates a vector search. In a real application, this would be a call
  // to a vector database like Pinecone or Vertex AI Vector Search. We are faking
  // the semantic search by finding text that includes keywords from the query.
  const lowerCaseQuery = input.query.toLowerCase();
  const keywords = lowerCaseQuery.split(' ').filter(k => k.length > 2); // basic keyword extraction
  
  const searchResults = instructionDatabase.filter(doc => 
    keywords.some(kw => doc.text.toLowerCase().includes(kw))
  ).slice(0, 5); // Limit to top 5 results to simulate a real vector search

  if (searchResults.length === 0) {
      throw new Error("Could not find any potentially relevant jury instructions for your query.");
  }
  
  // Format results for the AI prompt
  const potentialMatches = searchResults.map(r => `${r.id}: ${r.title}`);

  const { output } = await findInstructionPrompt({
      query: input.query,
      potentialMatches,
  });

  if (!output?.instructionID && (!output?.disambiguationOptions || output.disambiguationOptions.length === 0)) {
      throw new Error("The AI analyst could not definitively identify an instruction or provide clarifying options.");
  }

  return output!;
}
