'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, RefreshCw, ShieldCheck, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DecoScenario } from '@/data/training/deco-scenarios';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


type Feedback = {
  professionalism: {
    score: number;
    justification: string;
  };
  deEscalation: {
    score: number;
    justification: string;
  };
  currentScore: number;
};

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  feedback?: Feedback;
};

type SummaryReport = {
    finalScore: number;
    performanceGrade: string;
    keyStrengths: string[];
    areasForImprovement: string[];
}

const parseAIResponse = (responseText: string): { npcResponse: string; feedback: Feedback | undefined; summary: SummaryReport | undefined } => {

    if (responseText.includes('**SCENARIO COMPLETE**')) {
        const finalScoreMatch = responseText.match(/\* \*\*Final Score:\*\* ([\d]+)/);
        const gradeMatch = responseText.match(/\* \*\*Performance Grade:\*\* (.*)/);
        const strengthsMatch = responseText.match(/\* \*\*Key Strengths:\*\*\n((?:\s{4}\* .*\n?)*)/);
        const improvementsMatch = responseText.match(/\* \*\*Areas for Improvement:\*\*\n((?:\s{4}\* .*\n?)*)/);

        const summary: SummaryReport = {
            finalScore: finalScoreMatch ? parseInt(finalScoreMatch[1], 10) : 0,
            performanceGrade: gradeMatch ? gradeMatch[1].trim() : 'N/A',
            keyStrengths: strengthsMatch ? strengthsMatch[1].split('\n').map(s => s.trim().replace('* ', '')).filter(Boolean) : [],
            areasForImprovement: improvementsMatch ? improvementsMatch[1].split('\n').map(s => s.trim().replace('* ', '')).filter(Boolean) : [],
        };
        return { npcResponse: '', feedback: undefined, summary };
    }

    const feedbackMarker = '**COACH FEEDBACK:**';
    const feedbackIndex = responseText.indexOf(feedbackMarker);

    if (feedbackIndex === -1) {
        return { npcResponse: responseText, feedback: undefined, summary: undefined };
    }

    const npcResponse = responseText.substring(0, feedbackIndex).trim();
    const feedbackText = responseText.substring(feedbackIndex);

    const profScoreMatch = feedbackText.match(/\* \*\*Professionalism:\*\* \[([+-]?\d+)\].*?- (.*)/);
    const deescScoreMatch = feedbackText.match(/\* \*\*De-Escalation:\*\* \[([+-]?\d+)\].*?- (.*)/);
    const currentScoreMatch = feedbackText.match(/\* \*\*Current Score:\*\* \[(\d+)\].*/);

    if (!profScoreMatch || !deescScoreMatch || !currentScoreMatch) {
        return { npcResponse: responseText, feedback: undefined, summary: undefined }; // Return full text if parsing fails
    }

    const feedback: Feedback = {
        professionalism: {
            score: parseInt(profScoreMatch[1], 10),
            justification: profScoreMatch[2].trim(),
        },
        deEscalation: {
            score: parseInt(deescScoreMatch[1], 10),
            justification: deescScoreMatch[2].trim(),
        },
        currentScore: parseInt(currentScoreMatch[1], 10),
    };

    return { npcResponse, feedback, summary: null };
};


export default function DecoScenarioClient({ scenario }: { scenario: DecoScenario }) {
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [score, setScore] = useState(100);
    const [isComplete, setIsComplete] = useState(false);
    const [summary, setSummary] = useState<SummaryReport | undefined>(undefined);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const initializeRef = useRef(false);

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

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: userInput,
            timestamp: new Date(),
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
        setUserInput('');
        setIsLoading(true);

        try {
            const historyForAI = newMessages.slice(0, -1).map(msg => ({
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.content }],
            }));

            // This will be the new AI flow
            const { generateDecoResponse } = await import('@/ai/flows/deco-simulator');

            const responseText = await generateDecoResponse({
                scenario,
                conversationHistory: historyForAI,
                currentScore: score,
            });

            const { npcResponse, feedback, summary } = parseAIResponse(responseText);

            if (summary) {
                setSummary(summary);
                setScore(summary.finalScore);
                setIsComplete(true);
                setMessages(prev => prev.filter(msg => msg.id !== modelMessageId));
            } else {
                 setMessages(prev =>
                    prev.map(msg =>
                        msg.id === modelMessageId ? { ...msg, content: npcResponse, feedback } : msg
                    )
                );
                if (feedback) {
                    setScore(feedback.currentScore);
                }
            }

        } catch (error) {
            console.error("DECO AI Error:", error);
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? {
                        ...msg,
                        content: "I'm sorry, there was a system error. Please try again or restart the scenario."
                    } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [messages, userInput, isLoading, scenario, score]);

    const handleRestart = useCallback(() => {
        const initialMsg: Message = {
            id: 'init-1',
            role: 'model',
            content: scenario.initialPrompt,
            timestamp: new Date(),
        };
        setMessages([initialMsg]);
        setUserInput('');
        setScore(100);
        setIsLoading(false);
        setIsComplete(false);
        setSummary(undefined);
    }, [scenario]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    useEffect(() => {
        setMounted(true);
        if (!initializeRef.current) {
            handleRestart();
            initializeRef.current = true;
        }
    }, [handleRestart]);

    useEffect(() => {
        if (mounted && messages.length > 0) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, mounted, scrollToBottom]);

    if (!mounted) {
        return (
             <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin" />
             </div>
        );
    }

    if (isComplete && summary) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto p-4 md:p-6">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="text-center">
                        <Award className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="text-2xl">Scenario Complete</CardTitle>
                        <CardDescription>Final Performance Report for: {scenario.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Final Score</p>
                            <p className="text-5xl font-bold">{summary.finalScore}</p>
                            <p className="text-xl font-semibold text-primary">{summary.performanceGrade}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center"><TrendingUp className="h-5 w-5 mr-2 text-green-500"/>Key Strengths</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {summary.keyStrengths.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center"><TrendingDown className="h-5 w-5 mr-2 text-red-500"/>Areas for Improvement</h3>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {summary.areasForImprovement.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleRestart} className="w-full">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart Scenario
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <PageHeader title={scenario.title} description={scenario.location} />
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Score</div>
                    <div className="text-3xl font-bold">{score}</div>
                </div>
            </div>

            <Card className="flex flex-col flex-1 bg-card border-border">
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-25rem)] bg-card" ref={scrollAreaRef}>
                        <div className="p-6 space-y-6 bg-card">
                            {messages.map(message => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                        {message.role === 'model' && <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>}
                                        <div className={cn("max-w-xs md:max-w-md lg:max-w-xl", message.role === 'user' ? '' : '')}>
                                            <div className={cn("p-3 rounded-lg", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground')}>
                                                {message.content ? (
                                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                                ) : (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 px-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                        {message.role === 'user' && <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>}
                                    </div>

                                    {message.feedback && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2}}>
                                        <Alert>
                                            <ShieldCheck className="h-4 w-4" />
                                            <AlertTitle className="font-bold">COACH FEEDBACK</AlertTitle>
                                            <AlertDescription className="space-y-2 mt-2">
                                                <p><strong>Professionalism:</strong> <span className={cn(message.feedback.professionalism.score > 0 ? "text-green-600" : "text-red-600")}>[{message.feedback.professionalism.score > 0 ? '+' : ''}{message.feedback.professionalism.score}]</span> - {message.feedback.professionalism.justification}</p>
                                                <p><strong>De-Escalation:</strong> <span className={cn(message.feedback.deEscalation.score > 0 ? "text-green-600" : "text-red-600")}>[{message.feedback.deEscalation.score > 0 ? '+' : ''}{message.feedback.deEscalation.score}]</span> - {message.feedback.deEscalation.justification}</p>
                                            </AlertDescription>
                                        </Alert>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t border-border bg-card">
                    <div className="flex w-full items-center gap-4">
                        <Button variant="outline" size="sm" onClick={handleRestart}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart
                        </Button>
                        <div className="flex-1 relative">
                            <Textarea
                                placeholder="Type your response here..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 resize-none pr-20"
                                rows={1}
                                disabled={isLoading}
                            />
                             <Button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="ml-2 hidden sm:inline">Send</span>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
