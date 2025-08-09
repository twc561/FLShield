
"use client";

import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticType, number | number[]> = {
  light: 20,
  medium: 40,
  heavy: 60,
  success: [20, 40, 60],
  warning: [50, 30, 50],
  error: [70, 50, 70, 50, 70],
};

export function useHaptics() {
  const triggerHaptic = useCallback((type: HapticType = 'light') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        const pattern = hapticPatterns[type];
        navigator.vibrate(pattern);
      } catch (e) {
        console.error("Haptic feedback failed:", e);
      }
    }
  }, []);

  return { triggerHaptic };
}
