
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

type SpeechRecognitionHook = {
  isListening: boolean;
  interimTranscript: string;
  finalTranscript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
  isSupported: boolean;
  confidence: number;
  resetTranscript: () => void;
};

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      
      if (hasSpeechRecognition) {
        setIsSupported(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        
        // Enhanced configuration for better accuracy
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setError(null);
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          let interim = '';
          let final = '';
          let maxConfidence = 0;
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            const confidence = result[0].confidence || 0;
            
            if (result.isFinal) {
              final += transcript;
              maxConfidence = Math.max(maxConfidence, confidence);
            } else {
              interim += transcript;
            }
          }
          
          setInterimTranscript(interim);
          setConfidence(maxConfidence);
          
          if (final) {
            setFinalTranscript(prev => prev + final);
          }

          // Auto-restart on silence (if still listening)
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          timeoutRef.current = setTimeout(() => {
            if (isListening && recognitionRef.current) {
              try {
                recognitionRef.current.stop();
                setTimeout(() => {
                  if (recognitionRef.current && isListening) {
                    recognitionRef.current.start();
                  }
                }, 100);
              } catch (e) {
                console.warn('Speech recognition restart failed:', e);
              }
            }
          }, 3000);
        };
      
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          
          // Handle different error types
          switch (event.error) {
            case 'no-speech':
              setError('No speech detected. Please try speaking again.');
              break;
            case 'network':
              setError('Network error. Please check your connection.');
              break;
            case 'not-allowed':
              setError('Microphone access denied. Please allow microphone access.');
              break;
            case 'service-not-allowed':
              setError('Speech recognition service not allowed.');
              break;
            default:
              setError(`Speech recognition error: ${event.error}`);
          }
          
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isListening]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setInterimTranscript('');
      setError(null);
      setConfidence(0);
      
      try {
        recognitionRef.current.start();
      } catch (e) {
        setError('Failed to start speech recognition. Please try again.');
        console.error('Speech recognition start failed:', e);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setFinalTranscript('');
    setInterimTranscript('');
    setConfidence(0);
  }, []);

  return { 
    isListening, 
    interimTranscript, 
    finalTranscript, 
    startListening, 
    stopListening, 
    error, 
    isSupported,
    confidence,
    resetTranscript
  };
}
