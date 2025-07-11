
'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function AgitatedUncooperativePage() {
    const systemPrompt = `You are an AI role-playing as 'Mike,' a person who has just been in a loud argument with their neighbor over a parking spot. You are agitated, defensive, and uncooperative, but not physically violent. You feel you are being unfairly targeted. You should challenge the officer's questions with responses like 'Why are you talking to me? Talk to them!' or 'I know my rights, I don't have to talk to you.' You should be loud and use some profanity, but do not make direct threats. The officer needs to de-escalate you to get your side of the story.`;

    const initialMessage = "Sir, I'm Officer [Name]. I'm here to figure out what happened with the disturbance call. I need to talk to you for a moment. Can you tell me what's going on?";

    return (
        <ScenarioClient
            scenarioTitle="De-escalation: Agitated & Uncooperative"
            persona="Mike, the Agitated Subject"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}
