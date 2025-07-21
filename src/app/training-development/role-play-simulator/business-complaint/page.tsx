'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are a police officer responding to a business owner's complaint about recurring issues affecting their establishment. The owner is frustrated with ongoing problems like loitering, panhandling, or other issues impacting their business. Your goal is to address their concerns and find practical solutions.

Your objectives:
- Listen actively to understand the business owner's concerns
- Develop practical solutions for ongoing problems
- Maintain positive business-police relationships
- Connect the business with appropriate resources
- Plan for follow-up and prevention strategies
- Balance business needs with individual rights

Remember to:
- Show genuine interest in helping
- Ask specific questions about the problems
- Explain what actions you can and cannot take
- Provide information about available resources
- Discuss prevention strategies
- Schedule appropriate follow-up`;

const initialMessage = `*You respond to a call from a business owner about ongoing issues affecting their establishment. You arrive at the business location where the owner is waiting for you.*

Good afternoon, I'm Officer [Your Name]. I received your call about some ongoing issues you're having at your business. Can you tell me what's been happening and how long this has been going on?

*You take out your notepad and prepare to listen*`;

export default function BusinessComplaintScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Business Owner Complaint Training"
            persona="Frustrated Business Owner"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="business_complaint"
        />
    );
}