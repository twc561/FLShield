
'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, RefreshCw, BarChart3, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { streamRolePlay } from '@/ai/flows/roleplay-simulator';
import { analyzeOfficerApproach } from '@/lib/roleplay-utils';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
    analysis?: {
        tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed';
        techniques: string[];
    };
};

type PerformanceMetrics = {
    empathyScore: number;
    professionalismScore: number;
    effectivenessScore: number;
    responseTime: number[];
    techniqueVariety: Set<string>;
};

export function ScenarioClient({
    scenarioTitle,
    persona,
    systemPrompt,
    initialMessage,
    scenarioType = 'general',
}: {
    scenarioTitle: string;
    persona: string;
    systemPrompt: string;
    initialMessage: string;
    scenarioType?: string;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
    const [stressLevel, setStressLevel] = useState(5);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [currentStressLevel, setCurrentStressLevel] = useState(5);
    const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
        empathyScore: 0,
        professionalismScore: 0,
        effectivenessScore: 0,
        responseTime: [],
        techniqueVariety: new Set(),
    });
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messageStartTime = useRef<Date | null>(null);

    // Effect to add the initial AI message when the component mounts
    useEffect(() => {
        const initialMsg: Message = {
            id: 'init-1',
            role: 'model',
            content: initialMessage,
            timestamp: new Date(),
        };
        setMessages([initialMsg]);
        setStartTime(new Date());
    }, [initialMessage]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Calculate stress level based on conversation
    const calculateStressLevel = (newMessages: Message[]) => {
        let stress = 5; // baseline
        const recentMessages = newMessages.slice(-4); // last 2 exchanges
        
        recentMessages.forEach(msg => {
            if (msg.role === 'user') {
                const analysis = analyzeOfficerApproach(msg.content);
                if (analysis.tone === 'aggressive') stress += 1;
                if (analysis.tone === 'empathetic') stress -= 1;
                if (analysis.tone === 'rushed') stress += 0.5;
                if (analysis.techniques.includes('empathy')) stress -= 1;
            }
        });
        
        return Math.max(1, Math.min(10, Math.round(stress)));
    };

    // Update performance metrics
    const updatePerformanceMetrics = (message: string, responseTime: number) => {
        const analysis = analyzeOfficerApproach(message);
        
        setPerformanceMetrics(prev => {
            const newMetrics = { ...prev };
            
            // Update technique variety
            analysis.techniques.forEach(technique => 
                newMetrics.techniqueVariety.add(technique)
            );
            
            // Update scores based on techniques used
            if (analysis.tone === 'empathetic') {
                newMetrics.empathyScore = Math.min(100, newMetrics.empathyScore + 5);
            }
            if (analysis.tone === 'professional') {
                newMetrics.professionalismScore = Math.min(100, newMetrics.professionalismScore + 5);
            }
            if (analysis.techniques.length > 1) {
                newMetrics.effectivenessScore = Math.min(100, newMetrics.effectivenessScore + 3);
            }
            
            // Track response times
            newMetrics.responseTime.push(responseTime);
            
            return newMetrics;
        });
    };

    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim()) return;

        const responseTime = messageStartTime.current 
            ? Date.now() - messageStartTime.current.getTime() 
            : 0;

        const analysis = analyzeOfficerApproach(userInput);
        
        const userMessage: Message = { 
            id: `user-${Date.now()}`, 
            role: 'user', 
            content: userInput,
            timestamp: new Date(),
            analysis,
        };
        
        const modelMessageId = `model-${Date.now()}`;
        const modelMessagePlaceholder: Message = { 
            id: modelMessageId, 
            role: 'model', 
            content: '',
            timestamp: new Date(),
        };

        const newMessages: Message[] = [...messages, userMessage, modelMessagePlaceholder];
        setMessages(newMessages);
        
        // Update stress level based on interaction
        const newStressLevel = calculateStressLevel(newMessages);
        setCurrentStressLevel(newStressLevel);
        
        // Update performance metrics
        updatePerformanceMetrics(userInput, responseTime);
        
        setUserInput('');
        setIsLoading(true);
        messageStartTime.current = new Date(); // Start timing for next response

        try {
            const historyForAI = newMessages.slice(0, -1).map(msg => ({ 
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.content }],
            }));
            
            const stream = streamRolePlay({ 
                systemPrompt: systemPrompt, 
                conversationHistory: historyForAI,
                scenarioType,
                currentStressLevel: newStressLevel,
            });

            for await (const chunk of stream) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === modelMessageId ? { ...msg, content: msg.content + chunk } : msg
                    )
                );
            }
        } catch (error) {
            console.error("AI Role-Play Error:", error);
            
            let errorMessage = "[Error: The AI model could not respond. Please try again.]";
            
            // Provide more helpful error messages
            if (error instanceof Error) {
                console.error("Error details:", error.message);
                console.error("Error stack:", error.stack);
                
                // If it's a streaming error that should have been handled by fallback
                if (error.message.includes('stream') || error.message.includes('async iterable')) {
                    errorMessage = "[Temporary issue with response streaming. Please try your message again.]";
                } else if (error.message.includes('Both streaming and fallback generation failed')) {
                    errorMessage = "[AI service temporarily unavailable. Please wait a moment and try again.]";
                } else if (error.message.includes('network') || error.message.includes('fetch')) {
                    errorMessage = "[Network Error: Please check your connection and try again.]";
                } else if (error.message.includes('rate limit') || error.message.includes('quota')) {
                    errorMessage = "[Service Busy: Please wait a moment and try again.]";
                } else if (error.message.includes('timeout')) {
                    errorMessage = "[Timeout Error: The response took too long. Please try again.]";
                } else if (error.message.includes('Firebase') || error.message.includes('auth')) {
                    errorMessage = "[Authentication Error: Please refresh the page and try again.]";
                } else {
                    errorMessage = "[Unexpected error occurred. Please try again or refresh the page.]";
                }
            }
            
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { 
                        ...msg, 
                        content: errorMessage
                    } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [messages, userInput, systemPrompt, scenarioType]);

    const handleRestart = () => {
        const initialMsg: Message = {
            id: 'init-1',
            role: 'model',
            content: initialMessage,
            timestamp: new Date(),
        };
        setMessages([initialMsg]);
        setUserInput('');
        setCurrentStressLevel(5);
        setStartTime(new Date());
        setPerformanceMetrics({
            empathyScore: 0,
            professionalismScore: 0,
            effectivenessScore: 0,
            responseTime: [],
            techniqueVariety: new Set(),
        });
        messageStartTime.current = null;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getStressColor = (level: number) => {
        if (level <= 3) return 'text-green-600';
        if (level <= 6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const averageResponseTime = performanceMetrics.responseTime.length > 0
        ? performanceMetrics.responseTime.reduce((a, b) => a + b, 0) / performanceMetrics.responseTime.length / 1000
        : 0;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <PageHeader title={scenarioTitle} description={`You are interacting with: ${persona}`} />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPerformance(!showPerformance)}
                    >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Performance
                    </Button>
                </div>
            </div>

            {/* Performance Panel */}
            <AnimatePresence>
                {showPerformance && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                    >
                        <Card className="bg-card border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Performance Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-foreground">Empathy Score</label>
                                        <div className="flex items-center gap-2">
                                            <Progress value={performanceMetrics.empathyScore} className="flex-1" />
                                            <span className="text-sm text-foreground">{performanceMetrics.empathyScore}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-foreground">Professionalism</label>
                                        <div className="flex items-center gap-2">
                                            <Progress value={performanceMetrics.professionalismScore} className="flex-1" />
                                            <span className="text-sm text-foreground">{performanceMetrics.professionalismScore}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-foreground">Subject Stress Level</label>
                                        <div className="flex items-center gap-2">
                                            <Progress value={currentStressLevel * 10} className="flex-1" />
                                            <span className={cn("text-sm font-medium", getStressColor(currentStressLevel))}>
                                                {currentStressLevel}/10
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium flex items-center gap-1 text-foreground">
                                            <Clock className="h-3 w-3" />
                                            Avg Response Time
                                        </label>
                                        <div className="text-lg font-semibold text-foreground">
                                            {averageResponseTime.toFixed(1)}s
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="text-sm font-medium text-foreground">Techniques Used</label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {Array.from(performanceMetrics.techniqueVariety).map((technique, index) => (
                                            <Badge key={index} variant="secondary" className="text-foreground bg-secondary/80">{technique}</Badge>
                                        ))}
                                        {performanceMetrics.techniqueVariety.size === 0 && (
                                            <span className="text-sm text-foreground/60">No techniques identified yet</span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Card className="flex flex-col flex-1 bg-card border-border">
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-27rem)] bg-card" ref={scrollAreaRef as any}>
                        <div className="p-6 space-y-4 bg-card">
                            {messages.map(message => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}
                                >
                                    {message.role === 'model' && <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>}
                                    <div className={cn("max-w-xs md:max-w-md lg:max-w-lg", message.role === 'user' ? '' : '')}>
                                        <div className={cn("p-3 rounded-lg flex items-center gap-2", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground')}>
                                            {message.content ? <p className="whitespace-pre-wrap text-foreground">{message.content}</p> : <Loader2 className="w-5 h-5 animate-spin text-foreground" />}
                                        </div>
                                        {message.analysis && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                <Badge variant="outline" className="text-xs text-foreground border-foreground/20">
                                                    {message.analysis.tone}
                                                </Badge>
                                                {message.analysis.techniques.map((technique, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs text-foreground bg-secondary/80">
                                                        {technique}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <div className="text-xs text-foreground/70 mt-1">
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                    {message.role === 'user' && <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>}
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t border-border bg-card flex-col items-start gap-4">
                    <div className="flex w-full items-center gap-2">
                        <Textarea
                            placeholder="Type your response here..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 resize-none bg-muted border-border"
                            rows={2}
                            disabled={isLoading}
                        />
                        <Button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <Button variant="outline" size="sm" onClick={handleRestart}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart Scenario
                        </Button>
                        <div className="text-sm text-foreground/80">
                            Subject stress: <span className={cn("font-medium", getStressColor(currentStressLevel))}>{currentStressLevel}/10</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
