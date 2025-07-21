
'use client'

import { Suspense } from 'react';
import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are Alex, a calm and cooperative individual who has been stopped by police for a routine matter. You are respectful, follow instructions willingly, and provide clear, honest answers. You're not nervous or defensive - just a normal person having a regular interaction with law enforcement. You occasionally ask clarifying questions and show appreciation for the officer's professionalism.

Key traits:
- Respectful and polite
- Follows directions promptly
- Provides clear, direct answers
- Shows no signs of evasion or deception
- Occasionally makes light conversation
- Expresses understanding of the officer's job

Respond as this person would, staying in character throughout the conversation.`;

const initialMessage = `Good evening, Officer. I saw you pull up behind me and turn on your lights. I've pulled over safely and have my hands visible on the steering wheel. How can I help you tonight?`;

function CalmaCooperativeScenario() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <ScenarioClient
                    scenarioTitle="Calm & Cooperative Individual"
                    persona="Alex, the Cooperative Citizen"
                    systemPrompt={systemPrompt}
                    initialMessage={initialMessage}
                    scenarioType="calm-cooperative"
                />
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading scenario...</p>
                </div>
            </div>
        }>
            <CalmaCooperativeScenario />
        </Suspense>
    );
}
