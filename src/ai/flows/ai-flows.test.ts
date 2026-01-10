
import { describe, it, expect, vi } from 'vitest';
import { commandSearch } from './commandSearch';
import { summarizeDocument } from './summarize-document';

// Mock the ai instance
vi.mock('@/ai/genkit', () => ({
  ai: {
    generate: vi.fn(),
  },
}));

import { ai } from '@/ai/genkit';

describe('AI Flows Error Handling', () => {
  it('commandSearch throws error when AI output is empty', async () => {
    // Setup mock to return null output
    vi.mocked(ai.generate).mockResolvedValueOnce({ output: null } as any);

    await expect(commandSearch({ query: 'test' })).rejects.toThrow('AI response was empty.');
  });

  it('summarizeDocument throws error when AI output is empty', async () => {
    // Setup mock to return null output
    vi.mocked(ai.generate).mockResolvedValueOnce({ output: null } as any);

    await expect(summarizeDocument({ documentText: 'test' })).rejects.toThrow('AI response was empty.');
  });

  it('commandSearch returns output when AI output is valid', async () => {
    // Setup mock to return valid output
    const mockOutput = { answer: 'Test Answer' };
    vi.mocked(ai.generate).mockResolvedValueOnce({ output: mockOutput } as any);

    const result = await commandSearch({ query: 'test' });
    expect(result).toEqual(mockOutput);
  });
});
