
'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { streamRolePlay } from '@/ai/flows/roleplay-simulator';
import { motion } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'model';
    content: string;
};

export function ScenarioClient({
    scenarioTitle,
    persona,
    systemPrompt,
    initialMessage,
}: {
    scenarioTitle: string;
    persona: string;
    systemPrompt: string;
    initialMessage: string;
}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Effect to add the initial AI message when the component mounts
    useEffect(() => {
        setMessages([{ id: 'init-1', role: 'model', content: initialMessage }]);
    }, [initialMessage]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (!userInput.trim()) return;

        const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userInput };
        const modelMessageId = `model-${Date.now()}`;
        const modelMessagePlaceholder: Message = { id: modelMessageId, role: 'model', content: '' };

        const newMessages: Message[] = [...messages, userMessage, modelMessagePlaceholder];
        setMessages(newMessages);
        
        setUserInput('');
        setIsLoading(true);

        try {
            const historyForAI = newMessages.slice(0, -1).map(msg => ({ // Exclude the placeholder
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.content }],
            }));
            
            const stream = streamRolePlay({ 
                systemPrompt: systemPrompt, 
                conversationHistory: historyForAI 
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
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === modelMessageId ? { ...msg, content: "[Error: The AI model could not respond.]" } : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [messages, userInput, systemPrompt]);

    const handleRestart = () => {
        setMessages([{ id: 'init-1', role: 'model', content: initialMessage }]);
        setUserInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <PageHeader title={scenarioTitle} description={`You are interacting with: ${persona}`} />
            <Card className="flex flex-col flex-1">
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[calc(100vh-27rem)]" ref={scrollAreaRef as any}>
                        <div className="p-6 space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.role === 'model' && <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>}
                                    <div className={cn("max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg flex items-center gap-2", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                        {message.content ? <p className="whitespace-pre-wrap">{message.content}</p> : <Loader2 className="w-5 h-5 animate-spin" />}
                                    </div>
                                    {message.role === 'user' && <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t flex-col items-start gap-4">
                    <div className="flex w-full items-center gap-2">
                        <Textarea
                            placeholder="Type your response here..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 resize-none"
                            rows={1}
                            disabled={isLoading}
                        />
                        <Button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleRestart}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restart Scenario
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
