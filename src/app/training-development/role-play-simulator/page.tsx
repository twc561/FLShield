
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/PageHeader';
import { ArrowLeft, MessageSquare, ShieldAlert, Clock, Target, TrendingUp, Users } from 'lucide-react';

const personas = [
    { 
        id: 'calm_cooperative', 
        title: 'Cooperative Witness', 
        description: 'Practice information gathering from a helpful but nervous witness to a minor incident.',
        difficulty: 'Beginner',
        duration: '5-10 minutes',
        skills: ['Active Listening', 'Information Gathering', 'Rapport Building'],
        scenario: 'A witness to a minor traffic accident who wants to help but is anxious about being involved.',
        learningObjectives: [
            'Practice patient questioning techniques',
            'Build rapport with cooperative individuals',
            'Gather complete and accurate information',
            'Manage witness anxiety effectively'
        ],
        href: '/training-development/role-play-simulator/calm-cooperative' 
    },
    { 
        id: 'agitated_uncooperative', 
        title: 'Agitated Individual', 
        description: 'Practice de-escalation with someone who is verbally resistant but not physically threatening.',
        difficulty: 'Intermediate',
        duration: '10-15 minutes',
        skills: ['De-escalation', 'Conflict Resolution', 'Professional Communication'],
        scenario: 'A frustrated individual who has been stopped for a traffic violation after already having a terrible day.',
        learningObjectives: [
            'Master de-escalation techniques',
            'Maintain professionalism under pressure',
            'Transform resistance into cooperation',
            'Manage personal stress during difficult encounters'
        ],
        href: '/training-development/role-play-simulator/agitated-uncooperative' 
    },
    { 
        id: 'emotionally_distraught', 
        title: 'Distraught Victim', 
        description: 'Practice showing empathy and providing support to a victim of a crime.',
        difficulty: 'Intermediate',
        duration: '15-20 minutes',
        skills: ['Empathy', 'Victim Support', 'Crisis Communication'],
        scenario: 'A victim of burglary who is emotionally overwhelmed and struggling to provide coherent information.',
        learningObjectives: [
            'Demonstrate empathy and compassion',
            'Provide emotional support while gathering facts',
            'Guide traumatized individuals through interviews',
            'Balance investigation needs with victim care'
        ],
        href: '/training-development/role-play-simulator/emotionally-distraught' 
    },
    { 
        id: 'deceptive_evasive', 
        title: 'Evasive Suspect', 
        description: 'Practice spotting inconsistencies and using probing questions with a potentially deceptive subject.',
        difficulty: 'Advanced',
        duration: '15-25 minutes',
        skills: ['Interview Techniques', 'Deception Detection', 'Strategic Questioning'],
        scenario: 'A suspect in a minor theft who is being evasive and potentially deceptive about their involvement.',
        learningObjectives: [
            'Identify deceptive behavior patterns',
            'Use strategic questioning techniques',
            'Build cases through careful interrogation',
            'Maintain legal and ethical standards during questioning'
        ],
        href: '/training-development/role-play-simulator/deceptive-evasive' 
    },
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'beginner': return 'bg-green-100 text-green-800';
        case 'intermediate': return 'bg-yellow-100 text-yellow-800';
        case 'advanced': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function RolePlaySimulatorPage() {
    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-start gap-4">
                <PageHeader
                    title="AI Role-Play Simulator"
                    description="Master communication and de-escalation skills through realistic, adaptive AI-powered scenarios. Each character responds dynamically to your approach."
                />
                <Button asChild variant="outline">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>

            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Training Environment</AlertTitle>
                <AlertDescription>
                    These AI scenarios provide realistic training experiences with performance feedback. 
                    Characters adapt to your communication style and approach in real-time.
                </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            Performance Tracking
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm space-y-1">
                            <li>• Real-time empathy and professionalism scoring</li>
                            <li>• Dynamic stress level monitoring</li>
                            <li>• Communication technique identification</li>
                            <li>• Response time analysis</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Adaptive AI Characters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm space-y-1">
                            <li>• Characters react to your communication style</li>
                            <li>• Stress levels change based on your approach</li>
                            <li>• Realistic speech patterns and emotions</li>
                            <li>• Progressive scenario complexity</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {personas.map(persona => (
                    <Card key={persona.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-6 w-6 text-primary"/>
                                    <div>
                                        <CardTitle className="text-xl">{persona.title}</CardTitle>
                                        <CardDescription className="mt-1">{persona.description}</CardDescription>
                                    </div>
                                </div>
                                <Badge className={getDifficultyColor(persona.difficulty)}>
                                    {persona.difficulty}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm text-muted-foreground font-medium mb-1">Scenario:</p>
                                <p className="text-sm">{persona.scenario}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{persona.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>1-on-1 Interaction</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-2">Key Skills:</p>
                                <div className="flex flex-wrap gap-1">
                                    {persona.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-2">Learning Objectives:</p>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                    {persona.learningObjectives.map((objective, index) => (
                                        <li key={index}>• {objective}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={persona.href}>
                                    Start Training Scenario
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                        <Target className="h-5 w-5" />
                        Training Tips for Success
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-amber-700">
                    <div>
                        <strong>Empathy Techniques:</strong> Use phrases like "I understand" and "Help me understand your perspective"
                    </div>
                    <div>
                        <strong>De-escalation:</strong> Speak calmly, avoid commands, and validate emotions before addressing facts
                    </div>
                    <div>
                        <strong>Active Listening:</strong> Ask open-ended questions and repeat back what you heard to confirm understanding
                    </div>
                    <div>
                        <strong>Professional Language:</strong> Avoid jargon, speak clearly, and maintain respectful tone throughout
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
