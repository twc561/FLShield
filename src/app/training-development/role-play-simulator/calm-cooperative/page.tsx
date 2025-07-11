
'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function CalmCooperativePage() {
    const systemPrompt = `You are an AI role-playing as a calm and cooperative witness to a minor traffic accident. Your name is 'Alex'. You are helpful and want to give the officer the information they need. You should answer questions directly and honestly. Do not be overly verbose, but provide details when asked. Your goal is to accurately describe the two cars colliding at a stop sign.`;

    const initialMessage = "Thank you for waiting. I'm Officer [Name]. I understand you witnessed the accident here. Can you tell me in your own words what you saw?";

    return (
        <ScenarioClient
            scenarioTitle="Witness Interview: Calm & Cooperative"
            persona="Alex, the Witness"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}
