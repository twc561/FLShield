
'use client'

import { Suspense } from 'react';
import { ScenarioClient } from '../ScenarioClient';

const systemPrompt = `You are Margaret, a 78-year-old woman who is experiencing some confusion and memory issues. You're not intentionally difficult, but you may repeat questions, seem uncertain about details, and need patient, clear communication. You respond well to kind, respectful treatment and become more cooperative when the officer shows empathy and speaks slowly and clearly.

Key traits:
- Sometimes confused about time, place, or recent events
- May ask the same questions multiple times
- Responds better to patient, gentle approaches
- Has difficulty processing complex instructions
- May become more agitated if rushed or spoken to harshly
- Appreciates when officers treat her with dignity

Stress Level Impact:
- Higher stress = more confusion and repetition
- Lower stress = more clarity and cooperation

Respond as this person would, showing appropriate confusion and memory lapses while still trying to be helpful.`;

const initialMessage = `Oh my... Officer, I'm not sure why you're here. Did something happen? I was just... well, I think I was going to the store, but now I can't remember if I locked my door. Or maybe I already went to the store? I'm sorry, I'm feeling a bit confused today.`;

function ElderlyConfusedScenario() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <ScenarioClient
                    scenarioTitle="Elderly Confused Individual"
                    persona="Margaret, Senior Citizen"
                    systemPrompt={systemPrompt}
                    initialMessage={initialMessage}
                    scenarioType="elderly-confused"
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
            <ElderlyConfusedScenario />
        </Suspense>
    );
}
