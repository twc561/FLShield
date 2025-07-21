'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function AgitatedUncooperativePage() {
    const systemPrompt = `You are a police officer dealing with someone who is having a very bad day and appears agitated and defensive. They're not dangerous but are clearly frustrated and uncooperative. Your goal is to de-escalate the situation and complete your interaction professionally.

Your objectives:
- De-escalate the person's agitation using appropriate techniques
- Show empathy for their frustration while maintaining authority
- Complete your law enforcement task effectively
- Turn a negative encounter into a positive interaction
- Demonstrate professional communication skills

Remember to:
- Use calm, respectful tone even when they're hostile
- Listen to their concerns and validate feelings when appropriate
- Avoid escalating through authoritative language
- Show patience and understanding
- Explain your actions and reasoning clearly
- Look for opportunities to build rapport`;

    const initialMessage = `*You've been pulled over for speeding after having an absolutely terrible day. You just got fired, your car broke down earlier, and now this. You're frustrated and angry when the officer approaches your window.*

Oh, come ON! Are you serious right now?! I was barely going over the speed limit! Don't you people have anything better to do than harass working people? 

*You grip the steering wheel tightly, clearly agitated and ready to argue*`;

    return (
        <ScenarioClient
            scenarioTitle="De-escalation: Agitated & Uncooperative"
            persona="Mike, the Agitated Subject"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}