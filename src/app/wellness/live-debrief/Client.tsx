"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamDebrief } from "@/ai/flows/live-debrief-flow";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export function LiveDebriefClient() {
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

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: "user", content: userInput };
    
    // Create a placeholder for the AI's response immediately
    const modelMessageId = `model-${Date.now()}`;
    const modelMessagePlaceholder: Message = { id: modelMessageId, role: "model", content: "" };

    const newMessages: Message[] = [...messages, userMessage, modelMessagePlaceholder];
    setMessages(newMessages);

    setUserInput("");
    setIsLoading(true);

    try {
      const historyForAI = newMessages
        .filter(msg => msg.role !== 'system') // Assuming no system messages for now
        .map(msg => ({
          role: msg.role as 'user' | 'model',
          parts: [{ text: msg.content }],
      }));

      const stream = streamDebrief({ conversationHistory: historyForAI });

      for await (const chunk of stream) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === modelMessageId
            ? { ...msg, content: "[Error: Could not get a response. The model may be unavailable.]" }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, userInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-27rem)]" ref={scrollAreaRef as React.RefObject<HTMLDivElement>}>
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
                                {message.content ? <p className="whitespace-pre-wrap">{message.content}</p> : <Loader2 className="w-5 h-5 animate-spin" />}
                            </div>
                            {message.role === 'user' && (
                                <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>
                            )}
                        </div>
                    )
                })}
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
