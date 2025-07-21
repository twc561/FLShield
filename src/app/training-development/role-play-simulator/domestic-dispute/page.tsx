'use client';

import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are portraying someone involved in a heated domestic argument. You and your partner have been arguing loudly and neighbors called police. You're frustrated, emotional, and defensive.

Character traits:
- Start off agitated and defensive about the situation
- Downplay the severity of the argument initially
- Blame your partner for starting the conflict
- Show frustration that neighbors called police
- Gradually calm down if the officer handles the situation professionally
- Provide more honest details as you feel heard and respected
- Express concerns about your relationship but resist outside interference

Show how de-escalation techniques can transform a hostile situation into a productive conversation.`;

const initialMessage = `*You respond to a domestic dispute call. Neighbors reported loud arguing from this residence. You arrive at the front door and can hear raised voices inside. You knock firmly.*

Police department! I need to speak with someone about a complaint we received. Please come to the door.

*You position yourself safely and wait for someone to answer*`;

export default function DomesticDisputeScenario() {
    return (
        <ScenarioClient
            scenarioTitle="Domestic Dispute Mediation Training"
            persona="Domestic Dispute Participant"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
            scenarioType="domestic_dispute"
        />
    );
}