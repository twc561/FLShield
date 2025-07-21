import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/PageHeader';
import { ArrowLeft, MessageSquare, ShieldAlert, Clock, Target, TrendingUp, Users, Brain, Zap, Award, CheckCircle2 } from 'lucide-react';

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
        href: '/training-development/role-play-simulator/calm-cooperative',
        icon: MessageSquare,
        color: 'from-green-500/10 to-emerald-500/10',
        iconColor: 'text-green-600'
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
        href: '/training-development/role-play-simulator/agitated-uncooperative',
        icon: Zap,
        color: 'from-amber-500/10 to-orange-500/10',
        iconColor: 'text-amber-600'
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
        href: '/training-development/role-play-simulator/emotionally-distraught',
        icon: Users,
        color: 'from-blue-500/10 to-cyan-500/10',
        iconColor: 'text-blue-600'
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
        href: '/training-development/role-play-simulator/deceptive-evasive',
        icon: Brain,
        color: 'from-purple-500/10 to-indigo-500/10',
        iconColor: 'text-purple-600'
    },
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
        case 'intermediate': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const features = [
    {
        icon: Brain,
        title: 'AI-Powered Characters',
        description: 'Interact with realistic AI personas that adapt to your communication style and respond dynamically to your approach.'
    },
    {
        icon: Target,
        title: 'Real-Time Analytics',
        description: 'Get instant feedback on your empathy, professionalism, and communication effectiveness with detailed performance metrics.'
    },
    {
        icon: TrendingUp,
        title: 'Progressive Learning',
        description: 'Scenarios adapt in complexity based on your performance, ensuring continuous skill development and growth.'
    },
    {
        icon: Award,
        title: 'Skill Certification',
        description: 'Earn digital badges and certificates as you master different communication techniques and de-escalation skills.'
    }
];

export default function RolePlaySimulatorPage() {
    return (
        <div className="animate-fade-in-up space-y-8">
            {/* Header Section */}
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

            {/* Alert */}
            <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <ShieldAlert className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Advanced Training Environment</AlertTitle>
                <AlertDescription className="text-blue-800">
                    Experience realistic interactions with AI characters that adapt to your communication style. 
                    Get instant feedback and track your progress across multiple scenarios.
                </AlertDescription>
            </Alert>

            {/* Hero Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                    <Card key={index} className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-semibold mb-2 text-slate-900">{feature.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Performance Tracking Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900">
                            <Target className="h-5 w-5 text-blue-600" />
                            Real-Time Performance Analytics
                        </CardTitle>
                        <CardDescription className="text-blue-700">
                            Advanced AI analysis of your communication patterns
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                'Dynamic empathy and professionalism scoring',
                                'Stress level impact monitoring',
                                'Communication technique identification',
                                'Response timing and effectiveness analysis'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-blue-800">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-purple-50 via-purple-50 to-indigo-100 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-purple-900">
                            <Brain className="h-5 w-5 text-purple-600" />
                            Adaptive AI Characters
                        </CardTitle>
                        <CardDescription className="text-purple-700">
                            Intelligent personas that evolve with your interactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                'Characters react authentically to your approach',
                                'Dynamic stress and emotional state changes',
                                'Realistic speech patterns and behavioral responses',
                                'Progressive scenario complexity adjustment'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-purple-800">
                                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Scenarios Section */}
            <div>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Training Scenarios</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose from carefully crafted scenarios designed to challenge and improve your communication skills
                    </p>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {personas.map(persona => {
                        const IconComponent = persona.icon;
                        return (
                            <Card key={persona.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                                <div className={`h-2 bg-gradient-to-r ${persona.color.replace('/10', '')}`} />
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${persona.color}`}>
                                                <IconComponent className={`h-6 w-6 ${persona.iconColor}`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    {persona.title}
                                                </CardTitle>
                                                <CardDescription className="mt-1 text-slate-600">
                                                    {persona.description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge className={getDifficultyColor(persona.difficulty)}>
                                            {persona.difficulty}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-blue-500">
                                        <p className="text-sm font-medium text-slate-700 mb-1">Scenario Context:</p>
                                        <p className="text-sm text-slate-600">{persona.scenario}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Clock className="h-4 w-4" />
                                            <span>{persona.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Users className="h-4 w-4" />
                                            <span>1-on-1 Interaction</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-2 text-slate-700">Key Skills Practiced:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {persona.skills.map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-2 text-slate-700">Learning Objectives:</p>
                                        <div className="space-y-1">
                                            {persona.learningObjectives.map((objective, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-xs text-slate-600">{objective}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-0">
                                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        <Link href={persona.href}>
                                            Begin Training Scenario
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Training Tips Section */}
            <Card className="border-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-900">
                        <Target className="h-5 w-5 text-amber-700" />
                        Professional Communication Mastery Tips
                    </CardTitle>
                    <CardDescription className="text-amber-800">
                        Essential techniques for successful law enforcement interactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-lg border border-amber-200/50">
                                <h4 className="font-semibold text-amber-900 mb-2">Empathy Building</h4>
                                <p className="text-sm text-amber-800">Use phrases like "I understand this is difficult" and "Help me understand your perspective" to build rapport and trust.</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-lg border border-amber-200/50">
                                <h4 className="font-semibold text-amber-900 mb-2">De-escalation Techniques</h4>
                                <p className="text-sm text-amber-800">Speak calmly, avoid commands, validate emotions first, then address facts. Lower your voice to encourage others to do the same.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-lg border border-amber-200/50">
                                <h4 className="font-semibold text-amber-900 mb-2">Active Listening</h4>
                                <p className="text-sm text-amber-800">Ask open-ended questions, repeat back key information, and confirm understanding before moving forward.</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-amber-100/80 to-orange-100/80 rounded-lg border border-amber-200/50">
                                <h4 className="font-semibold text-amber-900 mb-2">Professional Language</h4>
                                <p className="text-sm text-amber-800">Avoid jargon, speak clearly and respectfully, maintain consistent tone throughout the interaction.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}