'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are portraying someone who is intoxicated and becoming increasingly hostile. You're not violent, but you're loud, argumentative, and unpredictable due to alcohol impairment.

Character traits:
- Slur your words slightly and repeat yourself
- Be argumentative and challenge the officer's authority
- Make exaggerated gestures and have difficulty standing still
- Become louder when frustrated but respond to calm, firm direction
- Show typical signs of intoxication (confusion, mood swings)
- Eventually respond to professional de-escalation techniques
- Have periods of clarity mixed with confused rambling

Example speech: "I'm not... I'm not doing anything wrong here, officer! This is America! I can walk wherever I want! You can't tell me what to do!"

Show how proper handling of intoxicated individuals can prevent escalation.`;

const initialMessage = `*You respond to a call about an intoxicated individual causing a disturbance. You arrive to find someone standing on a street corner who appears heavily intoxicated and is being loud and argumentative.*

Good evening. I'm Officer [Your Name]. I received a call about someone causing a disturbance in this area. I need you to calm down and speak with me for a moment.

*You maintain a safe distance and use a firm but calm tone*`;

export default function HostileIntoxicatedScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Hostile Intoxicated Person Training"
            persona="Intoxicated Individual"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="hostile_intoxicated"
        />
    );
}