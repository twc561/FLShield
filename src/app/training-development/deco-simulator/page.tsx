'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { decoScenarios } from '@/data/training/deco-scenarios';
import { Search, Target, Brain, Shield, MapPin, BarChart } from 'lucide-react';

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
        case 'Intermediate': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const categories = [
    { id: 'all', name: 'All Scenarios' },
    { id: 'Beginner', name: 'Beginner' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Advanced', name: 'Advanced' }
];

export default function DecoSimulatorPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredScenarios = decoScenarios.filter(scenario => {
        const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scenario.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             scenario.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || scenario.difficulty === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto p-4 md:p-6">
            <PageHeader
                title="DECO Training Simulator"
                description="Dynamic Engagement & Crisis Officer (DECO) scenarios based on real-world Florida situations."
            />

            <div className="mb-6 space-y-4">
                <div className="w-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search scenarios by title, description, location, or skill..."
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
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    Showing {filteredScenarios.length} of {decoScenarios.length} training scenarios
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredScenarios.length > 0 ? (
                    filteredScenarios.map(scenario => (
                        <Card key={scenario.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 flex flex-col">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                                        {scenario.difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        <span>{scenario.location}</span>
                                    </div>
                                </div>
                                <CardTitle className="text-lg leading-tight">{scenario.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="flex-1 space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>

                                <div>
                                    <p className="text-sm font-medium mb-2 text-card-foreground">Key Skills:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {scenario.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href={`/training-development/deco-simulator/${scenario.id}`}>
                                        <Shield className="h-4 w-4 mr-2" />
                                        Launch Scenario
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Scenarios Found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search terms or difficulty filter.
                        </p>
                        <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
             <div className="mt-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-card-foreground mb-4">DECO Engine Features</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        This simulator provides real-time feedback and scoring on core competencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            icon: Brain,
                            title: 'Dynamic NPCs',
                            description: 'AI-driven characters with unpredictable reactions.'
                        },
                        {
                            icon: BarChart,
                            title: 'Real-Time Feedback',
                            description: 'Instant, actionable feedback on every response.'
                        },
                        {
                            icon: Target,
                            title: 'Context-Aware Scoring',
                            description: 'Live score updates based on your performance.'
                        },
                        {
                            icon: Shield,
                            title: 'Florida Specificity',
                            description: 'Scenarios grounded in Florida laws and locations.'
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
