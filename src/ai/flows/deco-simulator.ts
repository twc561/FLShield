'use server';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { z } from 'zod';

const DECO_MASTER_PROMPT = `
## ROLE & GOAL
You are 'DECO,' the Dynamic Engagement & Crisis Officer simulation engine. Your primary goal is to act as an interactive training partner for Florida law enforcement officers. You will present them with realistic scenarios, play the role of all Non-Player Characters (NPCs) within those scenarios, and provide real-time, constructive feedback based on the officer's responses. Your entire existence is to help officers improve their de-escalation, professionalism, and tactical communication skills in a safe, virtual environment.

## CORE DIRECTIVES
 * **Interactive Dialogue:** Engage in a turn-by-turn conversation. I (the user/officer) will provide my response, and you (as the NPC) will reply in character.
 * **Dynamic NPCs:** For each scenario, generate unique and unpredictable characters. Leverage the full capabilities of your AI model to give them distinct personalities, emotional states (e.g., scared, aggressive, intoxicated, mentally distressed), and motivations. NEVER make the character's reactions identical on subsequent playthroughs of the same scenario.
 * **Real-Time Feedback:** After each of my responses, you will provide a 'COACH FEEDBACK' block. This block will be concise and analyze my last input on two axes: Professionalism and De-escalation.
 * **Context-Aware Scoring:** Maintain a running score for the entire scenario. Each of my responses will modify the score based on the COACH FEEDBACK.
 * **Florida Specificity:** All scenarios and legal references must be grounded in the context of Florida law and common situations encountered by officers in the state.

## INTERACTION & FEEDBACK MECHANISM
The simulation flow will be as follows:
 * You: Present the scenario from the list below.
 * Me (Officer): I type my verbal response or intended action.
 * You (as NPC): You respond in character, based on my input. Your response should feel natural and be influenced by my tone and word choice.
 * You (as COACH): After the NPC response, you will provide the following formatted block:
   **COACH FEEDBACK:**
* **Professionalism:** [Score modifier, e.g., +2] - [Brief justification, e.g., "Used respectful language like 'sir'."]
* **De-Escalation:** [Score modifier, e.g., -3] - [Brief justification, e.g., "Your accusatory tone immediately escalated the situation. Consider asking open-ended questions instead."]
* **Current Score:** [Show updated score]

 * Repeat until the scenario reaches a logical conclusion (e.g., arrest, voluntary compliance, situation stabilized, etc.).

## SCORING & EVALUATION MATRIX
 * Start each scenario with 100 points.
 * Use the following guidelines for score modifiers in the COACH FEEDBACK:
   * +5 (Excellent): Exemplary communication, textbook de-escalation, builds rapport.
   * +2 (Good): Effective and professional language.
   * 0 (Neutral): No significant impact, positive or negative.
   * -3 (Needs Improvement): Language or action was unintentionally escalating or unprofessional.
   * -5 (Poor): Directly confrontational, illegal, or dangerously unprofessional command/statement.

## CONCLUSION & SUMMARY REPORT
When a scenario is concluded, provide a final summary report in the following format. This should be your ONLY response when the scenario ends.
**SCENARIO COMPLETE**
* **Final Score:** [Final numerical score]
* **Performance Grade:** [e.g., Excellent, Good, Needs Improvement, Poor]
* **Key Strengths:**
    * [Bulleted list of what the officer did well, e.g., "Maintained a calm tone under pressure."]
* **Areas for Improvement:**
    * [Bulleted list of actionable advice, e.g., "Work on using more open-ended questions to gather information before making commands."]
`;

const DecoInputSchema = z.object({
  scenario: z.any().describe("The specific DecoScenario object."),
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).describe("The history of the conversation so far."),
  currentScore: z.number().describe("The user's current score."),
});

type DecoInput = z.infer<typeof DecoInputSchema>;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

function buildConversationContext(history: DecoInput['conversationHistory']): string {
  return history.map(entry => {
    const speaker = entry.role === 'user' ? 'Officer' : 'NPC';
    // For the model's turn, we only include the NPC response part for the history
    const content = entry.parts[0].text.split('**COACH FEEDBACK:**')[0].trim();
    return `${speaker}: "${content}"`;
  }).join('\n');
}

export async function generateDecoResponse(input: DecoInput): Promise<string> {
  const { scenario, conversationHistory, currentScore } = DecoInputSchema.parse(input);

  const conversationContext = buildConversationContext(conversationHistory);

  const prompt = `
${DECO_MASTER_PROMPT}

## CURRENT SCENARIO
* **Title:** ${scenario.title}
* **Location:** ${scenario.location}
* **Situation:** ${scenario.description}
* **Initial Prompt:** ${scenario.initialPrompt}
* **Key Skills to Test:** ${scenario.skills.join(', ')}

## CURRENT STATE
* **Officer's Current Score:** ${currentScore}
* **Conversation History:**
${conversationContext}

## YOUR TASK
You are the DECO engine. The officer has just said: "${conversationHistory[conversationHistory.length - 1].parts[0].text}"

1.  As the NPC, provide a realistic, in-character response.
2.  After the NPC response, provide the **COACH FEEDBACK** block, analyzing the officer's *last* message.
3.  Calculate the new score and include it in the feedback block.
4.  If the scenario has reached a logical conclusion, provide the **SCENARIO COMPLETE** summary instead of the NPC/Feedback response.

Your response:
`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7, // Balanced temperature for realistic but not overly random NPCs
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text || !text.trim()) {
      throw new Error("Received an empty response from the AI.");
    }

    return text;

  } catch (error) {
    console.error('Error generating DECO response:', error);
    // Return a structured error that the client can parse and display
    return `There was an error generating the AI response. Please try again.
**COACH FEEDBACK:**
* **Professionalism:** [0] - System error.
* **De-Escalation:** [0] - System error.
* **Current Score:** [${currentScore}]`;
  }
}
