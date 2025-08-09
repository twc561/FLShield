
"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize Audio element only on the client
    if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onplay = () => setIsPlaying(true);
        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onended = () => setIsPlaying(false);
    }
    
    // Cleanup function to stop audio and release resources
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = ""; // Release audio source
        }
    };
  }, []);

  const playAudio = useCallback((audioUrl: string) => {
    if (audioRef.current) {
      if (isPlaying) {
        // If already playing, stop the current audio before starting new
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current.src = audioUrl;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          setIsPlaying(false);
        });
      }
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
