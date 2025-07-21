
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
    // All hooks must be called in the same order every time
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPerformance, setShowPerformance] = useState(false);
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
    const initializeRef = useRef(false);

    // Calculate stress level based on conversation
    const calculateStressLevel = useCallback((newMessages: Message[]) => {
        let stress = 5; // baseline
        const recentMessages = newMessages.slice(-4);

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
    }, []);

    // Update performance metrics
    const updatePerformanceMetrics = useCallback((message: string, responseTime: number) => {
        const analysis = analyzeOfficerApproach(message);

        setPerformanceMetrics(prev => {
            const newMetrics = { ...prev };
            analysis.techniques.forEach(technique => 
                newMetrics.techniqueVariety.add(technique)
            );

            if (analysis.tone === 'empathetic') {
                newMetrics.empathyScore = Math.min(100, newMetrics.empathyScore + 5);
            }
            if (analysis.tone === 'professional') {
                newMetrics.professionalismScore = Math.min(100, newMetrics.professionalismScore + 5);
            }
            if (analysis.techniques.length > 1) {
                newMetrics.effectivenessScore = Math.min(100, newMetrics.effectivenessScore + 3);
            }

            newMetrics.responseTime.push(responseTime);
            return newMetrics;
        });
    }, []);

    const scrollToBottom = useCallback(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    }, []);

    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim() || isLoading) return;

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

        const newStressLevel = calculateStressLevel(newMessages);
        setCurrentStressLevel(newStressLevel);
        updatePerformanceMetrics(userInput, responseTime);

        setUserInput('');
        setIsLoading(true);
        messageStartTime.current = new Date();

        try {
            // Build history for AI with strict limits - only last 6 messages
            const historyForAI = newMessages.slice(-7, -1).map(msg => ({ 
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.content.substring(0, 150) }], // Truncate long messages
            }));

            // Import the enhanced roleplay simulator
            const { generateRolePlayResponse } = await import('@/ai/flows/roleplay-simulator');
            
            console.log('Sending to enhanced Gemini AI:', {
                scenarioType,
                stressLevel: newStressLevel,
                historyLength: historyForAI.length,
                lastMessage: userInput.substring(0, 50) + '...'
            });

            const response = await generateRolePlayResponse({
                systemPrompt: systemPrompt,
                conversationHistory: historyForAI,
                scenarioType: scenarioType,
                currentStressLevel: newStressLevel,
                officerApproach: userInput
            });

            // Enhanced response processing
            let finalResponse = '';
            
            if (typeof response === 'string' && response.trim()) {
                finalResponse = response.trim();
                
                // Add character name prefix if not present
                if (!finalResponse.includes(':') && !finalResponse.startsWith('*')) {
                    const scenarioName = scenarioType?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Character';
                    finalResponse = `${scenarioName}: "${finalResponse}"`;
                }
            } else {
                // Enhanced fallback based on scenario
                const fallbacks = {
                    'mental_health_crisis': "*looking confused and distressed* I'm sorry, I'm having trouble focusing right now. What did you ask?",
                    'hostile_intoxicated': "*swaying slightly* What? I didn't catch that... what are you trying to say?",
                    'emotionally_distraught': "*wiping tears* I'm sorry, I'm just so overwhelmed. Could you repeat that?",
                    'juvenile_contact': "*nervously fidgeting* I'm sorry, I'm really confused right now. Are you going to call my parents?",
                    'elderly_confused': "*looking puzzled* I'm sorry dear, my mind isn't as sharp as it used to be. What was that?",
                    'language_barrier': "*struggling with English* Sorry, sorry... no understand good. You speak slow please?",
                    'agitated_uncooperative': "*frustrated* This whole day has been a disaster. What exactly do you want from me?",
                    'domestic_dispute': "*defensive* Look, can we just handle this quietly? I don't want the whole neighborhood involved.",
                    'calm_cooperative': "I'm sorry, I got a bit distracted. Could you repeat your question?",
                    'nervous_citizen': "*anxiously* I'm sorry, I'm just really nervous. What did you need to know?",
                    'business_complaint': "*impatiently* Sorry, I'm just frustrated with this whole situation. What were you asking?",
                    'deceptive_evasive': "*hesitating* Uh... I'm not sure I understand what you're asking exactly."
                };
                
                finalResponse = fallbacks[scenarioType as keyof typeof fallbacks] || 
                               "I'm here. What did you need to talk to me about?";
            }

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { ...msg, content: finalResponse } : msg
                )
            );

        } catch (error: any) {
            console.error("Enhanced AI Role-Play Error:", error);

            // Character-aware error responses
            const characterErrorResponses = {
                'mental_health_crisis': "*becoming more agitated* I can't... I can't think straight right now. Everything's so confusing.",
                'hostile_intoxicated': "*slurring* What the hell is going on? I can't... this doesn't make sense.",
                'emotionally_distraught': "*breaking down* I'm sorry, I just can't handle any more right now.",
                'juvenile_contact': "*panic in voice* Oh no, oh no... am I in big trouble? Is something wrong with the system?",
                'elderly_confused': "*very confused* I don't understand what's happening. Is everything alright, officer?",
                'language_barrier': "*frustrated* No comprendo... system no work? Computer broken?",
                'agitated_uncooperative': "*angry* Great, now even the computer's not working! This day just keeps getting worse!",
                'domestic_dispute': "*worried* Is there a problem with the system? Are you recording this?",
                'calm_cooperative': "I'm sorry, there seems to be a technical issue. Should we try again?",
                'nervous_citizen': "*very anxiously* Oh no, did I break something? I didn't mean to cause any problems!",
                'business_complaint': "*frustrated* Now even the technology isn't working? This is exactly the kind of thing I'm dealing with!",
                'deceptive_evasive': "*suspicious* Is this some kind of trick? Why isn't it working?"
            };

            const errorMessage = characterErrorResponses[scenarioType as keyof typeof characterErrorResponses] || 
                                "I apologize, I'm having difficulty responding right now. Could you try asking again?";

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
    }, [messages, userInput, systemPrompt, scenarioType, calculateStressLevel, updatePerformanceMetrics, isLoading]);

    const handleRestart = useCallback(() => {
        if (!initialMessage) return;
        
        const initialMsg: Message = {
            id: 'init-1',
            role: 'model',
            content: initialMessage,
            timestamp: new Date(),
        };
        setMessages([initialMsg]);
        setUserInput('');
        setCurrentStressLevel(5);
        setPerformanceMetrics({
            empathyScore: 0,
            professionalismScore: 0,
            effectivenessScore: 0,
            responseTime: [],
            techniqueVariety: new Set(),
        });
        messageStartTime.current = null;
    }, [initialMessage]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const getStressColor = useCallback((level: number) => {
        if (level <= 3) return 'text-green-600';
        if (level <= 6) return 'text-yellow-600';
        return 'text-red-600';
    }, []);

    // Initialize only once after mount
    useEffect(() => {
        setMounted(true);
        
        if (!initializeRef.current && initialMessage) {
            const initialMsg: Message = {
                id: 'init-1',
                role: 'model',
                content: initialMessage,
                timestamp: new Date(),
            };
            setMessages([initialMsg]);
            initializeRef.current = true;
        }
    }, [initialMessage]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (mounted && messages.length > 0) {
            // Use setTimeout to ensure DOM is updated
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, mounted, scrollToBottom]);

    // Early return for SSR
    if (!mounted) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-card rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
                    <div className="text-center py-10">
                        <div className="animate-pulse">Loading scenario...</div>
                    </div>
                </div>
            </div>
        );
    }

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
                    <ScrollArea className="h-[calc(100vh-27rem)] bg-card" ref={scrollAreaRef}>
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
                                            {message.content ? (
                                                <p className={cn("whitespace-pre-wrap", message.role === 'user' ? 'text-primary-foreground' : 'text-foreground')}>
                                                    {message.content}
                                                </p>
                                            ) : (
                                                <Loader2 className="w-5 h-5 animate-spin text-foreground" />
                                            )}
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
