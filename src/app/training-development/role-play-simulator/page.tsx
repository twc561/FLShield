
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, ShieldAlert, Clock, Target, TrendingUp, Users, Brain, Zap, Award, CheckCircle2, Search } from 'lucide-react';

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
        iconColor: 'text-green-600',
        category: 'basic'
    },
    { 
        id: 'nervous_citizen', 
        title: 'Nervous Citizen Contact', 
        description: 'Practice building trust and rapport with a citizen during a routine contact who is visibly nervous.',
        difficulty: 'Beginner',
        duration: '8-12 minutes',
        skills: ['Rapport Building', 'Professional Demeanor', 'Trust Building'],
        scenario: 'A citizen contacted during a welfare check who is nervous about police interaction despite having done nothing wrong.',
        learningObjectives: [
            'Build immediate trust and rapport',
            'Recognize and address citizen anxiety',
            'Maintain professional yet approachable demeanor',
            'Complete contact while preserving positive community relations'
        ],
        href: '/training-development/role-play-simulator/nervous-citizen',
        icon: Users,
        color: 'from-green-400/10 to-blue-400/10',
        iconColor: 'text-green-500',
        category: 'basic'
    },
    { 
        id: 'language_barrier', 
        title: 'Language Barrier Encounter', 
        description: 'Navigate communication challenges with limited English proficiency individuals.',
        difficulty: 'Intermediate',
        duration: '12-18 minutes',
        skills: ['Cross-Cultural Communication', 'Patience', 'Creative Problem Solving'],
        scenario: 'A traffic stop with a driver who speaks very limited English and appears confused about the interaction.',
        learningObjectives: [
            'Use clear, simple communication',
            'Employ non-verbal communication effectively',
            'Show patience and cultural sensitivity',
            'Find alternative communication methods'
        ],
        href: '/training-development/role-play-simulator/language-barrier',
        icon: MessageSquare,
        color: 'from-teal-500/10 to-cyan-500/10',
        iconColor: 'text-teal-600',
        category: 'intermediate'
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
        iconColor: 'text-amber-600',
        category: 'intermediate'
    },
    { 
        id: 'domestic_dispute', 
        title: 'Domestic Dispute Mediation', 
        description: 'Handle a heated domestic argument between partners with conflicting stories.',
        difficulty: 'Intermediate',
        duration: '15-20 minutes',
        skills: ['Conflict Mediation', 'De-escalation', 'Evidence Gathering', 'Safety Assessment'],
        scenario: 'Called to a domestic dispute where both parties are agitated and giving conflicting accounts of events.',
        learningObjectives: [
            'Separate and calm conflicting parties',
            'Gather accurate information from multiple sources',
            'Assess safety risks and threats',
            'Apply appropriate legal interventions'
        ],
        href: '/training-development/role-play-simulator/domestic-dispute',
        icon: Users,
        color: 'from-orange-500/10 to-red-500/10',
        iconColor: 'text-orange-600',
        category: 'intermediate'
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
        iconColor: 'text-blue-600',
        category: 'intermediate'
    },
    { 
        id: 'mental_health_crisis', 
        title: 'Mental Health Crisis', 
        description: 'Respond to an individual experiencing a mental health emergency with empathy and proper protocol.',
        difficulty: 'Advanced',
        duration: '20-25 minutes',
        skills: ['Crisis Intervention', 'Mental Health Awareness', 'De-escalation', 'Resource Connection'],
        scenario: 'A person experiencing a mental health crisis who is confused, scared, and potentially suicidal.',
        learningObjectives: [
            'Recognize signs of mental health crisis',
            'Apply crisis intervention techniques',
            'Connect individuals with appropriate resources',
            'Balance safety with compassionate care'
        ],
        href: '/training-development/role-play-simulator/mental-health-crisis',
        icon: Brain,
        color: 'from-indigo-500/10 to-purple-500/10',
        iconColor: 'text-indigo-600',
        category: 'advanced'
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
        iconColor: 'text-purple-600',
        category: 'advanced'
    },
    { 
        id: 'hostile_intoxicated', 
        title: 'Hostile Intoxicated Person', 
        description: 'Manage an intoxicated individual who is becoming increasingly hostile and unpredictable.',
        difficulty: 'Advanced',
        duration: '18-25 minutes',
        skills: ['De-escalation', 'Safety Assessment', 'Impairment Recognition', 'Tactical Communication'],
        scenario: 'An intoxicated person causing a disturbance who becomes increasingly hostile when approached.',
        learningObjectives: [
            'Assess intoxication levels and safety risks',
            'Use de-escalation with impaired individuals',
            'Maintain officer safety while showing restraint',
            'Apply appropriate legal responses to public intoxication'
        ],
        href: '/training-development/role-play-simulator/hostile-intoxicated',
        icon: ShieldAlert,
        color: 'from-red-500/10 to-pink-500/10',
        iconColor: 'text-red-600',
        category: 'advanced'
    },
    { 
        id: 'juvenille_contact', 
        title: 'Juvenile Contact', 
        description: 'Handle interaction with a minor who has been caught in a potential criminal act.',
        difficulty: 'Intermediate',
        duration: '12-18 minutes',
        skills: ['Youth Communication', 'Mentorship', 'Legal Procedures', 'Parent Notification'],
        scenario: 'A teenager caught shoplifting who is scared, defiant, and worried about their parents finding out.',
        learningObjectives: [
            'Communicate effectively with youth',
            'Balance enforcement with mentorship',
            'Follow proper juvenile procedures',
            'Make appropriate decisions about citations vs. warnings'
        ],
        href: '/training-development/role-play-simulator/juvenile-contact',
        icon: Users,
        color: 'from-cyan-500/10 to-blue-500/10',
        iconColor: 'text-cyan-600',
        category: 'intermediate'
    },
    { 
        id: 'elderly_confused', 
        title: 'Confused Elderly Person', 
        description: 'Assist an elderly individual who appears lost and confused, potentially with dementia.',
        difficulty: 'Beginner',
        duration: '10-15 minutes',
        skills: ['Compassionate Communication', 'Elder Care', 'Resource Connection', 'Family Coordination'],
        scenario: 'An elderly person found wandering who seems confused about where they are and how they got there.',
        learningObjectives: [
            'Communicate patiently with elderly individuals',
            'Recognize signs of dementia or confusion',
            'Coordinate with family and social services',
            'Ensure safety while maintaining dignity'
        ],
        href: '/training-development/role-play-simulator/elderly-confused',
        icon: Users,
        color: 'from-emerald-500/10 to-teal-500/10',
        iconColor: 'text-emerald-600',
        category: 'basic'
    },
    { 
        id: 'business_complaint', 
        title: 'Business Owner Complaint', 
        description: 'Handle a business owner frustrated with recurring issues affecting their establishment.',
        difficulty: 'Intermediate',
        duration: '10-16 minutes',
        skills: ['Problem Solving', 'Community Relations', 'Resource Referral', 'Follow-up Planning'],
        scenario: 'A business owner upset about loitering, panhandling, or other issues affecting their customers.',
        learningObjectives: [
            'Listen to community concerns effectively',
            'Develop practical solutions for ongoing problems',
            'Maintain positive business relationships',
            'Connect businesses with appropriate resources'
        ],
        href: '/training-development/role-play-simulator/business-complaint',
        icon: Target,
        color: 'from-violet-500/10 to-purple-500/10',
        iconColor: 'text-violet-600',
        category: 'intermediate'
    }
];

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
        case 'intermediate': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const categoryColors = {
    'basic': 'bg-green-100 text-green-800 border-green-200',
    'intermediate': 'bg-amber-100 text-amber-800 border-amber-200',
    'advanced': 'bg-red-100 text-red-800 border-red-200'
};

const categories = [
    { id: 'all', name: 'All Scenarios', icon: '🎯' },
    { id: 'basic', name: 'Basic Training', icon: '📚' },
    { id: 'intermediate', name: 'Intermediate', icon: '⚡' },
    { id: 'advanced', name: 'Advanced', icon: '🧠' }
];

export default function RolePlaySimulatorPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredPersonas = personas.filter(persona => {
        const matchesSearch = persona.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             persona.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             persona.scenario.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || persona.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-start gap-4 mb-6">
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
            <Alert className="border-primary/20 bg-card mb-6">
                <ShieldAlert className="h-4 w-4 text-primary" />
                <AlertTitle className="text-card-foreground">Advanced Training Environment</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                    Experience realistic interactions with AI characters that adapt to your communication style. 
                    Get instant feedback and track your progress across multiple scenarios.
                </AlertDescription>
            </Alert>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search scenarios by title, description, or learning objectives..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Category Filter Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
                    {categories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id} className="text-xs">
                            <span className="mr-1">{category.icon}</span>
                            <span className="hidden sm:inline">{category.name}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    Showing {filteredPersonas.length} of {personas.length} training scenarios
                </p>
            </div>

            {/* Scenarios Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPersonas.length > 0 ? (
                    filteredPersonas.map(persona => {
                        const IconComponent = persona.icon;
                        return (
                            <Card key={persona.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                <IconComponent className={`h-5 w-5 ${persona.iconColor}`} />
                                            </span>
                                            <Badge className={getDifficultyColor(persona.difficulty)}>
                                                {persona.difficulty}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{persona.duration}</span>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg leading-tight">{persona.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">{persona.description}</p>

                                    <div>
                                        <p className="text-sm font-medium mb-2 text-card-foreground">Key Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {persona.skills.slice(0, 2).map((skill, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {persona.skills.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{persona.skills.length - 2} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full mt-4"
                                        asChild
                                    >
                                        <Link href={persona.href}>
                                            <Target className="h-4 w-4 mr-2" />
                                            Begin Training
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No scenarios found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search terms or category filter
                        </p>
                        <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="mt-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-card-foreground mb-4">Training Features</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Advanced AI technology delivers realistic, adaptive training experiences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            icon: Brain,
                            title: 'AI-Powered Characters',
                            description: 'Realistic personas that adapt to your approach'
                        },
                        {
                            icon: Target,
                            title: 'Real-Time Analytics',
                            description: 'Instant feedback on communication effectiveness'
                        },
                        {
                            icon: TrendingUp,
                            title: 'Progressive Learning',
                            description: 'Scenarios adapt based on your performance'
                        },
                        {
                            icon: Award,
                            title: 'Skill Certification',
                            description: 'Earn badges as you master techniques'
                        }
                    ].map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2 text-card-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
