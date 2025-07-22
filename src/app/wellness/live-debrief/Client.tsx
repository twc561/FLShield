"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const [stressLevel, setStressLevel] = useState(5);
  const [incidentType, setIncidentType] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
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

    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const conversationHistory = newMessages
        .filter(msg => msg.role !== "model" || msg.content.trim())
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }));

      console.log('Sending debrief request with:', {
        historyLength: conversationHistory.length,
        stressLevel,
        incidentType
      });

      const stream = streamDebrief({
        conversationHistory,
        officerStressLevel: stressLevel,
        incidentType,
        sessionProgress: "exploration"
      });

      let responseContent = "";
      let chunkCount = 0;

      for await (const chunk of stream) {
        chunkCount++;
        responseContent += chunk;
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === modelMessageId 
              ? { ...msg, content: responseContent }
              : msg
          )
        );
      }

      console.log(`Received ${chunkCount} chunks, total content length: ${responseContent.length}`);

      if (!responseContent.trim()) {
        console.warn('No content received from stream');
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === modelMessageId 
              ? { ...msg, content: "I'm here to listen and support you. Please feel free to share what's on your mind - this is a safe space for you to process your experiences." }
              : msg
          )
        );
      }

    } catch (error) {
      console.error("Error in debrief:", error);

      // More specific error handling
      let errorMessage = "I'm experiencing technical difficulties, but I want you to know that your wellbeing matters. ";

      if (error.message?.includes('API key') || error.message?.includes('authentication')) {
        errorMessage += "There's an authentication issue with the system. ";
      } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        errorMessage += "The system is temporarily overloaded. ";
      }

      errorMessage += "Please consider reaching out to your Employee Assistance Program or call 988 for the Suicide & Crisis Lifeline if you need immediate support.";

      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, content: errorMessage }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, userInput, stressLevel, incidentType]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  if (!sessionStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Confidential Wellness Session</CardTitle>
          <CardDescription>
            This is a private, confidential space. Your conversation is not recorded or saved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium">Current stress level (1-10):</label>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">1</span>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm">10</span>
              <span className="ml-2 font-medium">{stressLevel}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Type of incident (optional):</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md"
            >
              <option value="">General debrief</option>
              <option value="use_of_force">Use of Force</option>
              <option value="traumatic_incident">Traumatic Incident</option>
              <option value="officer_involved_shooting">Officer Involved Shooting</option>
              <option value="death_investigation">Death Investigation</option>
              <option value="child_abuse">Child Abuse Case</option>
              <option value="domestic_violence">Domestic Violence</option>
              <option value="workplace_stress">Workplace Stress</option>
              <option value="critical_incident">Critical Incident</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setSessionStarted(true)} className="w-full">
            Begin Confidential Session
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Confidential Wellness Partner</CardTitle>
            <CardDescription className="text-sm">
              Stress Level: {stressLevel}/10 • {incidentType || 'General debrief'}
            </CardDescription>
          </div>
          <div className="text-xs text-muted-foreground">
            Not recorded • Confidential
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-27rem)]" ref={scrollAreaRef as any}>
            <div className="p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        <p>I'm here to listen and support you.</p>
                        <p className="text-sm">Take your time - this is your space.</p>
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