'use client';

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ShieldAlert, Sparkles, Loader2, Bot, Scale, Gavel, FileText } from 'lucide-react';
import { getAdvisorResponse, type AdvisorOutput } from '@/ai/flows/legalAdvisor';
import { motion, AnimatePresence } from "framer-motion";

const ResultCard = ({ title, icon: Icon, items }: { title: string; icon: React.ElementType; items: { content: string; source: string }[] }) => {
    if (items.length === 0) return null;
    return (
        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="text-sm">
                        <p className="text-foreground/90">{item.content}</p>
                        <p className="text-xs text-muted-foreground italic mt-1">Source: {item.source}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default function AiLegalAdvisorPage() {
    const [scenario, setScenario] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [result, setResult] = React.useState<AdvisorOutput | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scenario.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await getAdvisorResponse({ scenario });
            setResult(response);
        } catch (err) {
            console.error('AI Advisor Error:', err);
            setError('The AI model failed to generate a response. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <PageHeader
                title="AI Advisor"
                description="Analyze a scenario against policy, statutes, and case law."
            />

            <Alert variant="destructive" className="border-2">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>This is an informational tool, NOT a legal advisor.</AlertTitle>
                <AlertDescription>
                    All information must be verified. You are solely responsible for your actions.
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle>Scenario Input</CardTitle>
                    <CardDescription>
                        Describe a scenario in plain language. The AI will synthesize relevant information to help you understand the key considerations.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleAnalyze}>
                    <CardContent>
                        <Textarea
                            placeholder="e.g., 'During a wellness check, a subject is making threats but has not committed a crime. What are the criteria for an involuntary hold?'"
                            className="min-h-[120px] text-base"
                            value={scenario}
                            onChange={(e) => setScenario(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            Warning: Do NOT enter PII, case numbers, or any other sensitive information.
                        </p>
                    </CardContent>
                    <CardContent>
                        <Button type="submit" disabled={isLoading || !scenario.trim()}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {isLoading ? 'Analyzing...' : 'Analyze Scenario'}
                        </Button>
                    </CardContent>
                </form>
            </Card>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center justify-center text-center text-muted-foreground py-8"
                    >
                         <Bot className="w-12 h-12 text-primary mb-4 animate-pulse" />
                        <p className="text-lg font-medium">AI is synthesizing information...</p>
                        <p className="text-sm">This may take a moment.</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Analysis Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                
                {result && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Intelligence Briefing</h2>
                        <Card className="bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-lg"><Sparkles className="h-5 w-5 text-accent" />At a Glance Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                                    {result.atAGlanceSummary.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <ResultCard title="Agency Policy Considerations" icon={FileText} items={result.policyConsiderations} />
                        <ResultCard title="Statutory Guidelines" icon={Scale} items={result.statutoryGuidelines} />
                        <ResultCard title="Relevant Case Law" icon={Gavel} items={result.relevantCaseLaw} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
