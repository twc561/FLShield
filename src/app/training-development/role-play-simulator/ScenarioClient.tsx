
'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, ArrowLeft, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
    getTurnResponse, 
    getAfterActionReport,
} from '@/ai/flows/roleplay-simulator';
import type { 
    ScenarioDefinition, 
    AfterActionReport, 
    TurnInput, 
    AARInput 
} from '@/lib/echo/types';

type Message = {
    id: string;
    role: 'user' | 'model' | 'narrator';
    content: string;
};

type Feedback = {
    feedbackId: string;
    type: "Positive" | "Informational" | "Context" | "Critique";
    message: string;
};

export function RolePlaySimulatorClient({
    scenario,
    onExit,
}: {
    scenario: ScenarioDefinition;
    onExit: () => void;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [hudInfo, setHudInfo] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isScenarioActive, setIsScenarioActive] = useState(true);
    const [aar, setAar] = useState<AfterActionReport | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ id: 'init-1', role: 'narrator', content: scenario.dispatchInfo.notes }]);
    }, [scenario]);
    
    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]')?.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, feedback]);

    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim() || isLoading) return;

        const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userInput };
        setMessages(prev => [...prev, userMessage]);
        
        const conversationHistory = [...messages, userMessage].map(msg => ({
            role: msg.role === 'narrator' ? 'model' : msg.role, // Treat narrator as model for history
            content: msg.content
        }));

        setUserInput('');
        setIsLoading(true);

        try {
            const turnInput: TurnInput = {
                scenarioId: scenario.scenarioId,
                conversationHistory,
                userAction: userInput,
            };
            const response = await getTurnResponse(turnInput);

            const { narratorText, aiDialogue, realTimeFeedback, hudUpdate, isScenarioActive: active } = response;

            const newAiMessages: Message[] = [];
            if (narratorText) {
                newAiMessages.push({ id: `narrator-${Date.now()}`, role: 'narrator', content: narratorText });
            }
            if (aiDialogue) {
                newAiMessages.push({ id: `model-${Date.now()}`, role: 'model', content: aiDialogue });
            }

            setMessages(prev => [...prev, ...newAiMessages]);
            setFeedback(prev => [...prev, ...realTimeFeedback].slice(-3)); // Keep last 3 feedback items
            if(hudUpdate) setHudInfo(hudUpdate.value);
            setIsScenarioActive(active);

            if (!active && !aar) {
                // Scenario ended, fetch AAR
                const finalHistory = [...conversationHistory, ...newAiMessages.map(m => ({ role: m.role === 'narrator' ? 'model' : m.role, content: m.content}))];
                const aarInput: AARInput = {
                    scenarioId: scenario.scenarioId,
                    conversationHistory: finalHistory,
                };
                const finalReport = await getAfterActionReport(aarInput);
                setAar(finalReport);
            }

        } catch (error) {
            console.error("AI Role-Play Error:", error);
            setMessages(prev => [...prev, { id: `error-${Date.now()}`, role: 'narrator', content: "[Error: The AI model could not respond.]" }]);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, isLoading, messages, scenario, aar]);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    
    const getFeedbackIcon = (type: Feedback['type']) => {
        switch(type) {
            case 'Positive': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'Critique': return <XCircle className="h-4 w-4 text-destructive" />;
            case 'Context': return <Info className="h-4 w-4 text-blue-500" />;
            default: return <Info className="h-4 w-4 text-muted-foreground" />;
        }
    };

    if (aar) {
        return (
            <div className="container mx-auto p-4 md:p-6 animate-fade-in-up">
                <PageHeader title="After-Action Report" description={`Review for: ${aar.scenarioId}`} />
                <Card>
                    <CardHeader>
                        <CardTitle>Scenario Complete</CardTitle>
                        <CardDescription>{aar.finalOutcome}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">Overall Performance Score</p>
                            <p className="text-6xl font-bold text-primary">{aar.performanceScore}</p>
                            <p className="text-2xl font-semibold text-muted-foreground">{aar.performanceGrade}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                            {Object.entries(aar.keyMetrics).map(([key, value]) => (
                                <div key={key} className="p-3 bg-muted/50 rounded-lg">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <p className="text-2xl font-semibold">{value}%</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Key Strengths:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-green-700">
                                {aar.keyStrengths.map(item => <li key={item.id}>{item.text}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Areas for Improvement:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-amber-700">
                                {aar.areasForImprovement.map(item => <li key={item.id}>{item.text}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Critical Learning Points:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-blue-700">
                                {aar.criticalLearningPoints.map(item => <li key={item.id}>{item.text}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={onExit}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Scenario Library
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
    

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                 <PageHeader title={scenario.title} description={`Category: ${scenario.category}`} />
                 <Button onClick={onExit} variant="ghost">Exit Scenario</Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1">
                <Card className="lg:col-span-2 flex flex-col bg-card border-border">
                    <CardHeader>
                        <CardTitle>Interaction Log</CardTitle>
                        <CardDescription>Respond to the AI persona below.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-[calc(100vh-30rem)]" ref={scrollAreaRef as any}>
                            <div className="p-6 space-y-4">
                                {messages.map(message => {
                                    if (message.role === 'narrator') {
                                        return (
                                            <motion.div
                                                key={message.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="my-4"
                                            >
                                                <p className="text-sm italic text-muted-foreground text-center border-x-4 border-transparent px-4">{message.content}</p>
                                            </motion.div>
                                        );
                                    }
                                    return (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}
                                        >
                                            {message.role === 'model' && <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>}
                                            <div className={cn("max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg flex items-center gap-2", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                                <p className="whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                            {message.role === 'user' && <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>}
                                        </motion.div>
                                    );
                                })}
                                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <div className="flex w-full items-center gap-2">
                            <Textarea
                                placeholder={isScenarioActive ? "Type your response..." : "Scenario ended."}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 resize-none"
                                rows={1}
                                disabled={isLoading || !isScenarioActive}
                            />
                            <Button onClick={handleSendMessage} disabled={isLoading || !userInput.trim() || !isScenarioActive}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Persona</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p><strong className="text-foreground/80">Type:</strong> {scenario.aiPersona.type}</p>
                            <p><strong className="text-foreground/80">Description:</strong> {scenario.aiPersona.description}</p>
                            <p><strong className="text-foreground/80">Initial State:</strong> {scenario.aiPersona.initialState}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>HUD / System Info</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            {hudInfo || "No updates yet."}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Real-Time Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {feedback.length > 0 ? feedback.map(fb => (
                                <div key={fb.feedbackId} className="flex items-start gap-2 text-xs p-2 bg-muted/50 rounded-md">
                                    {getFeedbackIcon(fb.type)}
                                    <span>{fb.message}</span>
                                </div>
                            )) : <p className="text-sm text-muted-foreground">Feedback will appear here.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
