"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setIsPlaying(false);
        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onplay = () => setIsPlaying(true);
    }
    
    // Cleanup function
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };
  }, []);

  const playAudio = useCallback((audioUrl: string) => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(e => {
            console.error("Audio playback error:", e);
            setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  return { isPlaying, playAudio, stopAudio };
}
