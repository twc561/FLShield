
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<F extends (...args: unknown[]) => unknown>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<F>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generates a consistent, stable hash from a string.
 * This is a simple, non-cryptographic hash function useful for generating
 * a consistent index or number from a string, like a date.
 * @param str The string to hash.
 * @returns A number between 0 and 1.
 */
export function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  // Convert to a positive number between 0 and 1
  return (hash >>> 0) / 0xFFFFFFFF;
}
