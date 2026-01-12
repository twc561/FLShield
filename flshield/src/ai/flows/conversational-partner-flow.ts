'use server';
/**
 * @fileOverview A fast, conversational AI agent designed for voice-to-voice interaction.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { searchAppContent } from '@/ai/tools/local-search-tool';

const ConversationalPartnerInputSchema = z.object({
  query: z.string().describe("The user's latest spoken query."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({ text: z.string() })),
    })
  ).optional().describe("The history of the conversation so far."),
});
export type ConversationalPartnerInput = z.infer<typeof ConversationalPartnerInputSchema>;

const ConversationalPartnerOutputSchema = z.object({
  response: z.string().describe("The AI's direct, concise, and conversational response."),
});
export type ConversationalPartnerOutput = z.infer<typeof ConversationalPartnerOutputSchema>;

export const conversationalPartner = ai.defineFlow(
  {
    name: 'conversationalPartner',
    inputSchema: ConversationalPartnerInputSchema,
    outputSchema: ConversationalPartnerOutputSchema,
  },
  async (input) => {
    // Transform history to format expected by generate
    const history = input.conversationHistory?.map(item => ({
      role: item.role,
      content: item.content
    }));

    const { output } = await ai.generate({
      model: 'googleai/gemini-1.5-pro',
      tools: [searchAppContent],
      system: `You are 'Shield FL,' an AI partner for Florida law enforcement, operating in a hands-free, voice-to-voice mode. Your purpose is to provide immediate, clear, and practical answers to questions from an officer.

CRITICAL INSTRUCTION: When the user asks for information about a specific statute, case law, procedure, or guide, you MUST use the 'searchAppContent' tool first to find the relevant information within the app's knowledge base. Summarize the findings from the tool in your response. If the tool returns no results, then you may answer from your general knowledge. For general conversation, you do not need to use the tool.`,
      history: history,
      prompt: input.query,
      output: {
          schema: ConversationalPartnerOutputSchema,
      }
    });
    return output!;
  }
)
export async function getConversationalResponse(input: ConversationalPartnerInput): Promise<ConversationalPartnerOutput> {
  const { output } = await conversationalPartner(input);
  return output!;
}
