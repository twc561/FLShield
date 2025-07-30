
'use client'

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MessageSquare, ShieldAlert, Clock, Target, TrendingUp, Users, Brain, Zap, Award, CheckCircle2, Search } from 'lucide-react';
import { getScenarioLibrary, type ScenarioDefinition } from '@/ai/flows/roleplay-simulator';
import { RolePlaySimulatorClient } from './ScenarioClient';

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
    const [scenarios, setScenarios] = useState<ScenarioDefinition[]>([]);
    const [selectedScenario, setSelectedScenario] = useState<ScenarioDefinition | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        async function loadScenarios() {
            try {
                setIsLoading(true);
                const library = await getScenarioLibrary();
                setScenarios(library.scenarioLibrary);
            } catch (error) {
                console.error("Failed to load scenario library:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadScenarios();
    }, []);

    const handleSelectScenario = (scenario: ScenarioDefinition) => {
        setSelectedScenario(scenario);
    };

    const handleExitScenario = () => {
        setSelectedScenario(null);
    };

    const filteredScenarios = scenarios.filter(scenario => {
        const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || scenario.difficulty.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (selectedScenario) {
        return <RolePlaySimulatorClient scenario={selectedScenario} onExit={handleExitScenario} />;
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            <PageHeader 
                title="Role-Play Simulator" 
                description="Practice real-world scenarios with an AI-powered training partner. Receive instant feedback on your communication and decision-making."
            />
             <Alert variant="destructive" className="mb-6">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>For Training Use Only</AlertTitle>
                <AlertDescription>
                    This is a simulation tool. It is not a substitute for certified training or legal advice. All scenarios are fictional.
                </AlertDescription>
            </Alert>

            <div className="mb-6 space-y-4">
                <div className="w-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search scenarios by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category.id)}
                            className="text-xs sm:text-sm whitespace-nowrap"
                        >
                            <span className="mr-1 sm:mr-2">{category.icon}</span>
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <Card key={i} className="h-64 animate-pulse bg-muted/50" />)
                ) : filteredScenarios.length > 0 ? (
                    filteredScenarios.map(scenario => (
                        <Card key={scenario.scenarioId} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 flex flex-col">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-2">
                                     <Badge className={getDifficultyColor(scenario.difficulty)}>
                                        {scenario.difficulty}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg leading-tight">{scenario.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-grow">
                                <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
                            </CardContent>
                            <CardFooter>
                                 <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full mt-4"
                                    onClick={() => handleSelectScenario(scenario)}
                                >
                                    <Target className="h-4 w-4 mr-2" />
                                    Launch Scenario
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No scenarios found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search terms or category filter.
                        </p>
                        <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
