
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Simple type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognitionHook = {
  isListening: boolean;
  interimTranscript: string;
  finalTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  isSupported: boolean;
};

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      
      if (hasSpeechRecognition) {
        setIsSupported(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          setInterimTranscript(interim);
          if (final) {
            setFinalTranscript(final);
          }
        };
      
        recognition.onerror = (event: any) => {
          setError(event.error);
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

      } else {
          setIsSupported(false);
          setError("Speech recognition is not supported in this browser.");
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setInterimTranscript('');
      setFinalTranscript('');
      setError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return { isListening, interimTranscript, finalTranscript, startListening, stopListening, error, isSupported };
}
