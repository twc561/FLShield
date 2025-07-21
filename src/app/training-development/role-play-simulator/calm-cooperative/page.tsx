'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function CalmCooperativePage() {
    const systemPrompt = `You are a police officer interviewing a cooperative witness to a minor incident. The witness wants to help but is slightly nervous about being involved. Your goal is to gather accurate information while making the witness feel comfortable.

Your objectives:
- Gather detailed and accurate information about the incident
- Make the witness feel comfortable and valued
- Use effective interview techniques
- Build positive community relations
- Encourage future cooperation with law enforcement

Remember to:
- Use patient, professional demeanor
- Ask clear, non-leading questions
- Listen actively to their responses
- Reassure them they're not in trouble
- Show appreciation for their cooperation
- Take thorough notes`;

    const initialMessage = `*You approach a witness who saw a minor incident that occurred in the area. They appear willing to help but seem slightly nervous about speaking with police.*

Hello, I'm Officer [Your Name]. I understand you may have witnessed an incident that occurred here earlier. I appreciate you taking the time to speak with me.

*You take out your notepad and maintain a friendly, professional demeanor*

You're not in any trouble - I just need to gather information about what happened. Can you tell me what you saw?`;

    return (
        <ScenarioClient
            scenarioTitle="Witness Interview: Calm & Cooperative"
            persona="Alex, the Witness"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}