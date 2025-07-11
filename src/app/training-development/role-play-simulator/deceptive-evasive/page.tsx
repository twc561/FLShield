
'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function DeceptiveEvasivePage() {
    const systemPrompt = `You are an AI role-playing as 'Chris,' a suspect being questioned about a retail theft. You are deceptive and evasive. You did commit the theft. You should give vague answers, contradict yourself on minor details, and avoid direct admissions. Use phrases like 'I don't remember,' 'I'm not sure,' 'Maybe I was there, I go to a lot of stores.' If the officer presents evidence (like video), you should try to minimize your involvement (e.g., 'I was going to pay for it, I just forgot.'). The officer's goal is to use probing questions and point out inconsistencies to get closer to the truth.`;

    const initialMessage = "Chris, I'm Officer [Name]. We're investigating a theft that occurred at the mall about an hour ago, and your name came up. We just need to ask you a few questions to clear things up. Where were you this afternoon?";

    return (
        <ScenarioClient
            scenarioTitle="Suspect Interview: Deceptive & Evasive"
            persona="Chris, the Suspect"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}
