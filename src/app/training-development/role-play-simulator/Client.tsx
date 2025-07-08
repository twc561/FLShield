
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
import { ArrowLeft, Loader2, Send, Bot, User } from "lucide-react";
import type { ScenarioPack } from "@/data/training/scenarios";
import {
  getRoleplayResponse,
  RoleplaySimulatorInput,
} from "@/ai/flows/roleplay-simulator";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "model";
  content: string;
};

export function RoleplayClient({ scenarios }: { scenarios: ScenarioPack[] }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPack | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSelectScenario = (scenario: ScenarioPack) => {
    setSelectedScenario(scenario);
    setMessages([]);
    setUserInput("");
  };

  const handleGoBack = () => {
    setSelectedScenario(null);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedScenario) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const historyForAI = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));
      
      const aiInput: RoleplaySimulatorInput = {
        scenarioTitle: selectedScenario.scenarioTitle,
        characterPersona: selectedScenario.characterProfile.persona,
        userUtterance: currentInput,
        conversationHistory: historyForAI,
      };

      const response = await getRoleplayResponse(aiInput);
      setMessages(prev => [...prev, { role: "model", content: response.characterResponse }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages(prev => [...prev, { role: "model", content: "[Error: Could not get a response. Please try again.]" }]);
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

  if (!selectedScenario) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.scenarioID}
            className="flex flex-col hover:border-primary transition-colors cursor-pointer"
            onClick={() => handleSelectScenario(scenario)}
          >
            <CardHeader>
              <CardTitle>{scenario.scenarioTitle}</CardTitle>
              <CardDescription>{scenario.learningObjective}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{scenario.scenarioBrief}</p>
            </CardContent>
            <CardFooter>
                <p className="text-sm font-semibold text-primary">Start Scenario</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>{selectedScenario.scenarioTitle}</CardTitle>
            <CardDescription>
              Your Goal: {selectedScenario.officerGoal}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-25rem)]" ref={scrollAreaRef as any}>
            <div className="p-6 space-y-4">
                {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                    {message.role === 'model' && (
                        <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>
                    )}
                    <div className={cn("max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                        <div className="p-2 bg-muted rounded-full"><User className="w-5 h-5" /></div>
                    )}
                </div>
                ))}
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
            placeholder={`Ask ${selectedScenario.characterProfile.name} a question...`}
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
