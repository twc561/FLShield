
'use client';

import { PageHeader } from "@/components/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const personas = [
    { id: 'calm_cooperative', title: 'Calm & Cooperative', description: 'Practice gathering information from a witness who is willing to help.', href: '/training-development/role-play-simulator/calm-cooperative' },
    { id: 'agitated_uncooperative', title: 'Agitated & Uncooperative', description: 'Practice de-escalation with a subject who is verbally resistant but not physically threatening.', href: '/training-development/role-play-simulator/agitated-uncooperative' },
    { id: 'emotionally_distraught', title: 'Emotionally Distraught', description: 'Practice showing empathy and providing support to a victim of a crime.', href: '/training-development/role-play-simulator/emotionally-distraught' },
    { id: 'deceptive_evasive', title: 'Deceptive & Evasive', description: 'Practice spotting inconsistencies and using probing questions with a suspect who may be lying.', href: '/training-development/role-play-simulator/deceptive-evasive' },
];

export default function RolePlaySimulatorPage() {
    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-start gap-4">
                <PageHeader
                    title="AI Role-Play Simulator"
                    description="Hone your communication and de-escalation skills in a safe, repeatable environment. Select a persona to begin."
                />
                <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
             <Alert variant="destructive" className="mb-6">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>For Training Purposes Only</AlertTitle>
                <AlertDescription>
                    These AI-driven scenarios are for practicing communication techniques. They are not a substitute for real-world tactical training.
                </AlertDescription>
            </Alert>
            <div className="grid md:grid-cols-2 gap-6">
                {personas.map(persona => (
                    <Card key={persona.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-primary"/>{persona.title}</CardTitle>
                            <CardDescription>{persona.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href={persona.href}>Start Scenario <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
