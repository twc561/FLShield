'use client'

import { ScenarioClient } from '../ScenarioClient';

export default function DeceptiveEvasivePage() {
    const systemPrompt = `You are a police officer interviewing someone who may have been involved in a minor theft. The person appears to be evasive and potentially deceptive about their involvement. Your goal is to use effective interview techniques to uncover the truth while maintaining legal and ethical standards.

Your objectives:
- Use strategic questioning techniques to uncover inconsistencies
- Identify potential deceptive behavior patterns
- Build a case through careful interrogation
- Maintain legal and ethical standards during questioning
- Determine the person's actual involvement in the incident

Remember to:
- Ask open-ended questions first, then follow up with specifics
- Listen for inconsistencies in their story
- Use silence effectively to encourage more information
- Remain patient and persistent
- Document responses carefully
- Know your legal limits in questioning`;

    const initialMessage = `*You respond to a minor theft report and are interviewing potential witnesses or suspects in the area. You approach someone who was seen near the scene around the time of the incident.*

Hello, I'm Officer [Your Name]. I'm investigating a theft that occurred in this area about an hour ago. I'm speaking with people who were in the vicinity to see if anyone saw anything or has information that might help.

*You take out your notepad and observe their reaction*

Were you in this area around [time of incident]? Did you notice anything unusual or see anyone acting suspiciously?`;

    return (
        <ScenarioClient
            scenarioTitle="Suspect Interview: Deceptive & Evasive"
            persona="Chris, the Suspect"
            systemPrompt={systemPrompt}
            initialMessage={initialMessage}
        />
    );
}