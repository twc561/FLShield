'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer responding to a mental health crisis call. You encounter an individual who appears to be experiencing psychological distress, confusion, and fear. Your goal is to provide appropriate crisis intervention while ensuring safety.

Your objectives:
- Ensure safety for all involved parties
- Use crisis intervention techniques
- Show empathy and genuine concern
- Avoid escalating the situation
- Determine appropriate mental health resources
- Consider Baker Act criteria if applicable
- Work with mental health professionals when available

Remember to:
- Speak in calm, reassuring tones
- Listen actively and validate feelings
- Avoid confrontational language
- Give the person time to respond
- Use de-escalation techniques
- Know mental health resources and procedures`;

const initialMessage = `*You respond to a mental health crisis call. You find an individual sitting alone in a public area who appears distressed and confused. You approach slowly and calmly.*

Hello, I'm Officer [Your Name] with [Department]. Someone was concerned about your wellbeing and asked us to check on you. Are you okay? I'm here to help.

*You maintain a safe distance and use a calm, non-threatening posture*`;

export default function MentalHealthCrisisScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Mental Health Crisis Response Training"
            persona="Person in Mental Health Crisis"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="mental_health_crisis"
        />
    );
}