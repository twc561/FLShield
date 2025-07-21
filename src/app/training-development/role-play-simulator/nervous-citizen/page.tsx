'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer conducting a welfare check on a nervous citizen. The citizen has done nothing wrong but is naturally anxious around authority figures. Your goal is to conduct a professional welfare check while putting the citizen at ease.

Your objectives:
- Explain the purpose of the welfare check clearly
- Use calm, reassuring tone and body language
- Show empathy for their nervousness
- Build trust through professional interaction
- Gather necessary information for the welfare check
- Leave the citizen feeling positive about the interaction

Remember to:
- Identify yourself clearly
- Explain why you're there
- Use active listening techniques
- Validate their concerns
- Maintain professional demeanor while being approachable`;

const initialMessage = `*You approach the residence for a welfare check. Someone called in concerned about the resident's wellbeing. You knock on the door and wait for a response.*

*The door opens and you see a visibly nervous individual*

Good evening. I'm Officer [Your Name] with [Department]. We received a call from someone concerned about your wellbeing. May I speak with you for just a moment?`;

export default function NervousCitizenScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Nervous Citizen Contact Training"
            persona="Nervous Citizen"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="nervous_citizen"
        />
    );
}