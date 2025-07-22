
'use client'

import { useState, useEffect } from 'react'
import type { FeatureModule } from '@/types'

const PINNED_TOOLS_KEY = 'shield-fl-pinned-tools'

export function usePinnedTools() {
  const [pinnedTools, setPinnedTools] = useState<FeatureModule[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PINNED_TOOLS_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setPinnedTools(parsed)
      }
    } catch (error) {
      console.error('Failed to load pinned tools:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const savePinnedTools = (tools: FeatureModule[]) => {
    try {
      localStorage.setItem(PINNED_TOOLS_KEY, JSON.stringify(tools))
      setPinnedTools(tools)
    } catch (error) {
      console.error('Failed to save pinned tools:', error)
    }
  }

  const pinTool = (tool: FeatureModule) => {
    const isAlreadyPinned = pinnedTools.some(t => t.id === tool.id)
    if (!isAlreadyPinned && pinnedTools.length < 6) { // Limit to 6 pinned tools
      const newPinnedTools = [...pinnedTools, tool]
      savePinnedTools(newPinnedTools)
      return true
    }
    return false
  }

  const unpinTool = (toolId: string) => {
    const newPinnedTools = pinnedTools.filter(t => t.id !== toolId)
    savePinnedTools(newPinnedTools)
  }

  const reorderTools = (startIndex: number, endIndex: number) => {
    const result = Array.from(pinnedTools)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    savePinnedTools(result)
  }

  const isPinned = (toolId: string) => {
    return pinnedTools.some(t => t.id === toolId)
  }

  const canPin = pinnedTools.length < 6

  return {
    pinnedTools,
    isLoaded,
    pinTool,
    unpinTool,
    reorderTools,
    isPinned,
    canPin
  }
}
