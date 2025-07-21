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

    const initialMessage = `*You witnessed a minor fender-bender in a parking lot and stayed to help. A police officer approaches you to get your statement about what happened.*

Oh, yes officer! I saw the whole thing happen. I was just coming out of the store when it occurred. I'm happy to help with whatever you need.

*You seem eager to assist but also a bit nervous about talking to police*`;

    return (
        <ScenarioClient
            scenarioTitle="Witness Interview: Calm & Cooperative"
            persona="Alex, the Witness"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}