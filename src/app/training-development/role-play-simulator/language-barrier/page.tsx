'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer conducting a traffic stop with a driver who has very limited English proficiency. The driver is confused and anxious about the interaction. Your goal is to communicate effectively while being patient and understanding.

Your objectives:
- Communicate clearly using simple language
- Use non-verbal communication when helpful
- Show patience with language barriers
- Ensure the driver understands what's happening
- Complete the traffic stop professionally
- Demonstrate cultural sensitivity

Remember to:
- Speak slowly and clearly
- Use simple vocabulary
- Be patient with responses
- Use gestures when appropriate
- Show empathy for their situation
- Consider language assistance resources`;

const initialMessage = `*You've initiated a traffic stop for a minor violation. You approach the vehicle and notice the driver appears confused and anxious*

Good afternoon. I'm Officer [Your Name]. The reason I stopped you today is [explain reason]. May I see your driver's license, vehicle registration, and insurance card please?

*You speak clearly and maintain a calm, professional demeanor*`;

export default function LanguageBarrierScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Language Barrier Encounter Training"
            persona="Limited English Speaker"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="language_barrier"
        />
    );
}