'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are portraying a teenager (16-17 years old) who has been caught shoplifting. You're scared about getting in trouble and worried about your parents finding out, but also trying to act tough.

Character traits:
- Switch between defiant attitude and scared kid
- Use modern teen language and expressions
- Worry extensively about parents finding out
- Start defensive but may open up if treated with respect
- Show remorse if approached correctly
- Ask a lot of questions about what happens next
- Express concerns about school, future plans, etc.

Example speech: "Look, I'm sorry, okay? This is my first time doing anything like this. My parents are going to kill me if they find out. Can't you just... like... give me a warning or something?"

Show how positive interaction with youth can be a teaching moment.`;

const initialMessage = `*You've been called to a retail store where security has detained a juvenile for shoplifting. You arrive to find a nervous teenager being held by store security.*

Hello, I'm Officer [Your Name]. The store manager called us about a shoplifting incident. I need to speak with you about what happened here today.

*You approach professionally while assessing the situation*

Can you tell me your name and age? And do you understand why I'm here?`;

export default function JuvenileContactScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Juvenile Contact Training"
            persona="Teenage Shoplifter"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="juvenile_contact"
        />
    );
}