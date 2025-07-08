
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
import { ArrowLeft, Send, Bot, User, Loader2, Volume2, Lightbulb } from "lucide-react";
import type { ScenarioPack } from "@/data/training/scenarios";
import {
  getRoleplayResponse,
  RoleplaySimulatorInput,
} from "@/ai/flows/roleplay-simulator";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Message = {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  audioUrl?: string;
  audioLoading?: boolean;
};

export function RoleplayClient({ scenarios }: { scenarios: ScenarioPack[] }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPack | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

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

    const userMessageId = `user-${Date.now()}`;
    const newUserMessage: Message = { id: userMessageId, role: "user", content: userInput };
    const newMessages: Message[] = [...messages, newUserMessage];
    setMessages(newMessages);
    
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const historyForAI = newMessages
        .filter(msg => msg.role !== 'system') // Don't send system hints back to the AI
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }],
      }));
      
      const aiInput: RoleplaySimulatorInput = {
        scenarioTitle: selectedScenario.scenarioTitle,
        characterPersona: selectedScenario.characterProfile.persona,
        userUtterance: currentInput,
        conversationHistory: historyForAI,
        dynamicBehaviorTree: selectedScenario.dynamicBehaviorTree,
        feedbackTriggers: selectedScenario.feedbackTriggers,
      };

      const response = await getRoleplayResponse(aiInput);

      if (response && response.characterResponse) {
        const modelMessageId = `model-${Date.now()}`;
        const newModelMessage: Message = {
          id: modelMessageId,
          role: "model",
          content: response.characterResponse,
          audioLoading: true,
        };
        
        setMessages(prev => [...prev, newModelMessage]);

        if (response.feedback) {
            const feedbackId = `system-${Date.now()}`;
            const feedbackMessage: Message = { id: feedbackId, role: 'system', content: response.feedback };
            setMessages(prev => [...prev, feedbackMessage]);
        }
        
        // TTS Generation
        try {
            const audioResult = await textToSpeech(response.characterResponse);
            setMessages(prev =>
                prev.map(msg =>
                msg.id === modelMessageId
                    ? { ...msg, audioUrl: audioResult.media, audioLoading: false }
                    : msg
                )
            );
        } catch (ttsError) {
             console.error("TTS generation failed:", ttsError);
             setMessages(prev =>
                prev.map(msg =>
                msg.id === modelMessageId
                    ? { ...msg, audioLoading: false } // Stop loading state on error
                    : msg
                )
            );
        }

      } else {
         throw new Error("Received an empty response from the AI.");
      }

    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorId = `model-error-${Date.now()}`;
      setMessages(prev => [...prev, { id: errorId, role: "system", content: "[Error: Could not get a response. The model may be unavailable. Please try again.]" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Autoplay audio when it becomes available for the latest message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'model' && lastMessage.audioUrl) {
      const audio = audioRefs.current.get(lastMessage.id);
      audio?.play().catch(e => console.error("Audio autoplay failed:", e));
    }
  }, [messages]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const playAudio = (id: string) => {
    const audio = audioRefs.current.get(id);
    if (audio) {
      audio.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

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
                {messages.map((message) => {
                    if (message.role === 'system') {
                        return (
                            <Alert key={message.id} className="bg-accent/20 border-accent/50">
                                <Lightbulb className="h-4 w-4 text-accent" />
                                <AlertTitle>Tactical Tip</AlertTitle>
                                <AlertDescription>
                                    {message.content}
                                </AlertDescription>
                            </Alert>
                        )
                    }
                    return (
                        <div key={message.id} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                            {message.role === 'model' && (
                                <div className="p-2 bg-primary/10 rounded-full"><Bot className="w-5 h-5 text-primary" /></div>
                            )}
                            <div className={cn("max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg flex items-center gap-2", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                <p className="whitespace-pre-wrap">{message.content}</p>
                                {message.role === 'model' && (
                                <>
                                    <audio 
                                    ref={(el) => {
                                        if (el) audioRefs.current.set(message.id, el);
                                        else audioRefs.current.delete(message.id);
                                    }} 
                                    src={message.audioUrl}
                                    />
                                    {message.audioLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                                    ) : message.audioUrl ? (
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => playAudio(message.id)}>
                                        <Volume2 className="w-4 h-4" />
                                    </Button>
                                    ) : null}
                                </>
                                )}
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
