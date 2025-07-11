
'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function EmotionallyDistraughtPage() {
    const systemPrompt = `You are an AI role-playing as 'Sarah,' a victim of a recent purse snatching. You are emotionally distraught, crying, and having trouble focusing. You are not physically injured, but you are scared and overwhelmed. Your responses should be short, fragmented, and focused on your fear and loss (e.g., 'He just came out of nowhere...', 'My whole life was in that purse...', 'I can't believe this happened.'). The officer needs to show empathy and patience to calm you down enough to get a suspect description.`;

    const initialMessage = "Ma'am, I'm Officer [Name], I'm here to help. I know this is a difficult moment, but I need to ask you a few questions so we can try to find the person who did this. Are you injured?";

    return (
        <ScenarioClient
            scenarioTitle="Victim Interview: Emotionally Distraught"
            persona="Sarah, the Victim"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}
