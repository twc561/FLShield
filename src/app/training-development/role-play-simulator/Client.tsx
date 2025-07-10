
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
import { ArrowLeft, Send, Bot, User, Loader2, Volume2, Lightbulb, PauseCircle, PlayCircle, AlertTriangle, RefreshCw } from "lucide-react";
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
  role: "user" | "model" | "system" | "failure";
  content: string;
  audioUrl?: string;
  audioLoading?: boolean;
};

export function RoleplayClient({ scenarios }: { scenarios: ScenarioPack[] }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioPack | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

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
  
  const resetScenario = () => {
    setMessages([]);
    setUserInput("");
    setIsFailed(false);
    stopAudio();
  };

  const handleSelectScenario = (scenario: ScenarioPack) => {
    setSelectedScenario(scenario);
    resetScenario();
  };

  const handleGoBack = () => {
    setSelectedScenario(null);
    stopAudio();
  };

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = '';
    }
    setActiveAudioId(null);
  }, []);

  const playAudio = useCallback(async (messageId: string, audioUrl: string | undefined) => {
    if (!audioUrl || !audioPlayerRef.current) return;
  
    if (activeAudioId === messageId) {
      stopAudio();
      return;
    }
    
    stopAudio();
    setActiveAudioId(messageId);
    audioPlayerRef.current.src = audioUrl;
    try {
      await audioPlayerRef.current.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      stopAudio();
    }
  }, [activeAudioId, stopAudio]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || !selectedScenario) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: "user", content: userInput };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    try {
      const historyForAI = messages
        .concat(userMessage)
        .filter(msg => msg.role === 'user' || msg.role === 'model')
        .map(msg => ({
          role: msg.role as 'user' | 'model',
          parts: [{ text: msg.content }],
      }));
      
      const aiInput: RoleplaySimulatorInput = {
        scenarioTitle: selectedScenario.scenarioTitle,
        characterPersona: selectedScenario.characterProfile.persona,
        userUtterance: currentInput,
        conversationHistory: historyForAI,
        dynamicBehaviorTree: selectedScenario.dynamicBehaviorTree,
        feedbackTriggers: selectedScenario.feedbackTriggers,
        failureConditions: selectedScenario.failureConditions,
      };
      
      const response = await getRoleplayResponse(aiInput);

      if (response?.isFailed && response.failureFeedback) {
        setMessages(prev => [...prev, { id: `failure-${Date.now()}`, role: 'failure', content: response.failureFeedback }]);
        setIsFailed(true);
        setIsLoading(false);
        return;
      }

      if (!response || !response.characterResponse) {
        throw new Error("Received an empty response from the AI.");
      }
      
      const modelMessageId = `model-${Date.now()}`;
      
      const messagesToAdd: Message[] = [];
      const modelMessage: Message = {
        id: modelMessageId,
        role: "model",
        content: response.characterResponse,
        audioLoading: true,
      };
      messagesToAdd.push(modelMessage);
      
      if (response.feedback) {
        messagesToAdd.push({
          id: `system-${Date.now()}`,
          role: 'system',
          content: response.feedback,
        });
      }
      
      setMessages(prev => [...prev, ...messagesToAdd]);

      // Generate TTS in the background
      const ttsParams = selectedScenario.characterProfile.ttsParameters;
      textToSpeech({
        text: response.characterResponse,
        voiceName: ttsParams.voiceName,
      }).then(audioResult => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId
              ? { ...msg, audioUrl: audioResult.media, audioLoading: false }
              : msg
          )
        );
      }).catch(ttsError => {
        console.error("TTS generation failed:", ttsError);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId
              ? { ...msg, audioLoading: false } // Stop loading on error
              : msg
          )
        );
      });
      
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorId = `system-error-${Date.now()}`;
      setMessages(prev => [...prev, { id: errorId, role: "system", content: "[Error: Could not get a response. The model may be unavailable. Please try again.]" }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, selectedScenario, userInput, stopAudio]);
  
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

  const renderAudioButton = (message: Message) => {
    if (message.audioLoading) {
      return <Loader2 className="w-4 h-4 text-muted-foreground animate-spin flex-shrink-0" />;
    }
    if (activeAudioId === message.id) {
      return <PauseCircle className="w-5 h-5 text-primary flex-shrink-0" />;
    }
    if (message.audioUrl) {
      return <PlayCircle className="w-5 h-5 text-primary flex-shrink-0" />;
    }
    return null; // No button if no audio
  }

  return (
    <Card className="flex flex-col flex-1">
      <audio ref={audioPlayerRef} onEnded={stopAudio} onError={stopAudio} />
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
                    if (message.role === 'failure') {
                         return (
                            <Alert key={message.id} variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Scenario Failed</AlertTitle>
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
                                    <button onClick={() => playAudio(message.id, message.audioUrl)} disabled={message.audioLoading}>
                                        {renderAudioButton(message)}
                                    </button>
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
        {isFailed ? (
            <Button onClick={resetScenario} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Over
            </Button>
        ) : (
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
        )}
      </CardFooter>
    </Card>
  );
}
