
"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

type AudioPlayerHook = {
  isPlaying: boolean;
  playAudio: (audioDataUri: string) => Promise<void>;
  stopAudio: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  duration: number;
  currentTime: number;
  error: string | null;
  isLoading: boolean;
};

export function useAudioPlayer(): AudioPlayerHook {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCache = useRef<Map<string, string>>(new Map());

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playAudio = useCallback(async (audioDataUri: string): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Check cache first
      let processedUri = audioDataUri;
      const cacheKey = audioDataUri.substring(0, 100); // Use first 100 chars as cache key
      
      if (audioCache.current.has(cacheKey)) {
        processedUri = audioCache.current.get(cacheKey)!;
      } else {
        // Validate and process the data URI
        if (!audioDataUri.startsWith('data:audio/')) {
          throw new Error('Invalid audio data format');
        }
        audioCache.current.set(cacheKey, audioDataUri);
      }

      // Create new audio element
      const audio = new Audio();
      audioRef.current = audio;

      // Set up event listeners
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        setError('Failed to play audio. Please try again.');
        setIsPlaying(false);
        setIsLoading(false);
      });

      audio.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });

      // Set properties
      audio.volume = volume;
      audio.preload = 'auto';
      audio.src = processedUri;

      // Load and play
      await audio.load();
      await audio.play();
      setIsPlaying(true);

    } catch (error) {
      console.error('Audio playback failed:', error);
      setError(error instanceof Error ? error.message : 'Audio playback failed');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [volume]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setError(null);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  return {
    isPlaying,
    playAudio,
    stopAudio,
    volume,
    setVolume,
    duration,
    currentTime,
    error,
    isLoading
  };
}
