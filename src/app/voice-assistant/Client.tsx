
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2, Bot, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { getConversationalResponse } from "@/ai/flows/conversational-partner-flow";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ConversationMessage = {
  role: 'user' | 'model' | 'system';
  text: string;
};

type Status = 'idle' | 'listening' | 'processing' | 'speaking';

export function VoiceAssistantClient() {
  const [status, setStatus] = useState<Status>('idle');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const { 
    isListening, 
    interimTranscript,
    finalTranscript, 
    startListening, 
    stopListening, 
    error: sttError, 
    isSupported 
  } = useSpeechRecognition();
  
  const { isPlaying, playAudio, stopAudio } = useAudioPlayer();

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      stopAudio();
      startListening();
    }
  };
  
  useEffect(() => {
    if (isListening) setStatus('listening');
    else if(status === 'listening') setStatus('idle'); // Back to idle if stopped manually
  }, [isListening, status]);

  useEffect(() => {
    if (isPlaying) setStatus('speaking');
    else if(status === 'speaking') setStatus('idle');
  }, [isPlaying, status]);

  const processTranscript = useCallback(async (transcript: string) => {
    if (!transcript.trim()) {
      setStatus('idle');
      return;
    }

    const userMessage: ConversationMessage = { role: 'user', text: transcript };
    setConversation(prev => [...prev, userMessage]);
    setStatus('processing');

    try {
      const historyForAI = conversation.map(msg => ({
        role: msg.role as 'user' | 'model',
        parts: [{ text: msg.text }],
      }));

      const aiResponse = await getConversationalResponse({ 
          query: transcript,
          conversationHistory: historyForAI,
      });

      if (aiResponse && aiResponse.response) {
        setConversation(prev => [...prev, { role: 'model', text: aiResponse.response }]);
        const ttsResponse = await textToSpeech({ text: aiResponse.response });
        playAudio(ttsResponse.media);
      } else {
        throw new Error("Empty response from AI.");
      }
    } catch (error) {
      console.error("Conversation flow error:", error);
      const errorMessage = { role: 'system' as const, text: "I'm sorry, I encountered an error. Please try again." };
      setConversation(prev => [...prev, errorMessage]);
      const ttsErrorResponse = await textToSpeech({ text: errorMessage.text });
      playAudio(ttsErrorResponse.media);
    }
  }, [conversation, playAudio]);

  useEffect(() => {
    if (finalTranscript) {
      processTranscript(finalTranscript);
    }
  }, [finalTranscript, processTranscript]);


  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Browser Not Supported</AlertTitle>
        <AlertDescription>
          This browser does not support the Web Speech API required for this feature. Please try Chrome or Safari.
        </AlertDescription>
      </Alert>
    );
  }

  const getStatusText = () => {
    switch (status) {
      case 'listening': return 'Listening...';
      case 'processing': return 'Thinking...';
      case 'speaking': return 'Speaking...';
      default: return 'Tap the mic to start';
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
            {conversation.map((msg, index) => (
                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'model' && <div className="p-2 bg-primary/10 rounded-full flex-shrink-0"><Bot className="w-5 h-5 text-primary" /></div>}
                    <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                        <p>{msg.text}</p>
                    </div>
                     {msg.role === 'user' && <div className="p-2 bg-muted rounded-full flex-shrink-0"><User className="w-5 h-5" /></div>}
                </div>
            ))}
             {isListening && interimTranscript && (
                <div className="flex items-start gap-3 justify-end opacity-60">
                    <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-primary/80 text-primary-foreground">
                        <p>{interimTranscript}</p>
                    </div>
                    <div className="p-2 bg-muted rounded-full flex-shrink-0"><User className="w-5 h-5" /></div>
                </div>
             )}
        </div>
      </ScrollArea>
      <div className="flex flex-col items-center justify-center p-6 border-t gap-4">
        <p className="text-sm text-muted-foreground h-5">{getStatusText()}</p>
        <motion.button
          onClick={handleMicClick}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isListening ? "bg-destructive" : "bg-primary",
            isPlaying || status === 'processing' ? 'bg-gray-500 cursor-not-allowed' : ''
          )}
          disabled={isPlaying || status === 'processing'}
          whileTap={{ scale: 0.9 }}
        >
          {status === 'processing' ? <Loader2 className="w-8 h-8 animate-spin" /> : <Mic className="w-8 h-8" />}
        </motion.button>
         {sttError && <p className="text-xs text-destructive">Error: {sttError}</p>}
      </div>
    </div>
  );
}
