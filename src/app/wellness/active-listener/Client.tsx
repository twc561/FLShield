
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getActiveListeningResponse, type ActiveListenerInput } from "@/ai/flows/active-listener";

type Message = {
  id: string;
  role: "user" | "model" | "system";
  content: string;
};

export function ActiveListenerClient() {
  const [hasConsented, setHasConsented] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessageId = `user-${Date.now()}`;
    const newUserMessage: Message = { id: userMessageId, role: "user", content: userInput };
    const newMessages: Message[] = [...messages, newUserMessage];
    setMessages(newMessages);
    
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const historyForAI = newMessages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }],
      }));
      
      const aiInput: ActiveListenerInput = {
        userUtterance: currentInput,
        conversationHistory: historyForAI,
      };

      const response = await getActiveListeningResponse(aiInput);

      if (response && response.characterResponse) {
        const modelMessageId = `model-${Date.now()}`;
        const newModelMessage: Message = {
          id: modelMessageId,
          role: "model",
          content: response.characterResponse,
        };
        
        setMessages(prev => [...prev, newModelMessage]);
      } else {
         throw new Error("Received an empty response from the AI.");
      }

    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorId = `model-error-${Date.now()}`;
      setMessages(prev => [...prev, { id: errorId, role: "system", content: "[Error: The AI model could not respond. Please try again later.]" }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  if (!hasConsented) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Confidential AI Wellness Partner</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert variant="destructive">
                    <ShieldQuestion className="h-4 w-4" />
                    <AlertTitle>Welcome to Your Confidential Wellness Partner</AlertTitle>
                    <AlertDescription className="space-y-2">
                        <p>This is a private space designed for you. Your conversations here are **never saved, monitored, or transmitted.**</p>
                        <p>This tool is not a substitute for professional therapy but serves as a first-line resource for managing stress. By continuing, you acknowledge the confidential and on-device nature of this feature.</p>
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setHasConsented(true)}>I Acknowledge and Continue</Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardHeader className="border-b">
        <div>
          <CardTitle>Active Listener</CardTitle>
          <CardDescription>
            A private space to talk through anything on your mind.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-25rem)]" ref={scrollAreaRef as any}>
            <div className="p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        <p>You can start the conversation.</p>
                        <p className="text-sm">This chat is not saved.</p>
                    </div>
                )}
                {messages.map((message) => {
                    return (
                        <div key={message.id} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                            {message.role === 'model' && (
                                <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>
                            )}
                            <div className={cn("max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg flex items-center gap-2", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>
                            )}
                        </div>
                    )
                })}
                {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                         <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>
                        <div className="max-w-lg p-3 rounded-lg bg-muted flex items-center">
                            <Loader2 className="w-5 h-5 animate-spin"/>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center gap-2">
          <Textarea
            placeholder="Type your message..."
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
      </CardFooter>
    </Card>
  );
}
