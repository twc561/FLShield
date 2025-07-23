
"use client"

import { useState, useEffect, useCallback } from 'react'
import type { FeatureModule } from '@/types'

interface UsageData {
  [toolId: string]: number
}

interface ContextualData {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  shift: 'day' | 'evening' | 'night'
  weatherContext: string
  emergencyLevel: 'low' | 'medium' | 'high'
}

export function useContextualDashboard() {
  const [usageData, setUsageData] = useState<UsageData>({})
  const [recentTools, setRecentTools] = useState<string[]>([])
  const [contextualData, setContextualData] = useState<ContextualData>({
    timeOfDay: 'morning',
    shift: 'day',
    weatherContext: '',
    emergencyLevel: 'low'
  })

  // Load usage data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('toolUsage')
      const recent = localStorage.getItem('recentTools')
      
      if (saved) setUsageData(JSON.parse(saved))
      if (recent) setRecentTools(JSON.parse(recent))
    } catch (error) {
      console.error('Error loading usage data:', error)
    }
  }, [])

  // Update contextual data based on time
  useEffect(() => {
    const updateContext = () => {
      const hour = new Date().getHours()
      const day = new Date().getDay()
      
      let timeOfDay: ContextualData['timeOfDay'] = 'morning'
      let shift: ContextualData['shift'] = 'day'
      
      if (hour >= 5 && hour < 12) {
        timeOfDay = 'morning'
        shift = 'day'
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon'
        shift = 'day'
      } else if (hour >= 17 && hour < 22) {
        timeOfDay = 'evening'
        shift = 'evening'
      } else {
        timeOfDay = 'night'
        shift = 'night'
      }

      setContextualData(prev => ({
        ...prev,
        timeOfDay,
        shift
      }))
    }

    updateContext()
    const interval = setInterval(updateContext, 15 * 60 * 1000) // Update every 15 minutes

    return () => clearInterval(interval)
  }, [])

  // Track tool usage
  const trackToolUsage = useCallback((toolId: string) => {
    setUsageData(prev => {
      const updated = { ...prev, [toolId]: (prev[toolId] || 0) + 1 }
      localStorage.setItem('toolUsage', JSON.stringify(updated))
      return updated
    })

    setRecentTools(prev => {
      const updated = [toolId, ...prev.filter(id => id !== toolId)].slice(0, 10)
      localStorage.setItem('recentTools', JSON.stringify(updated))
      return updated
    })
  }, [])

  // Get contextual shortcuts
  const getContextualShortcuts = useCallback(() => {
    const shortcuts: { key: string; action: string; href: string }[] = []
    
    // Time-based shortcuts
    if (contextualData.timeOfDay === 'morning') {
      shortcuts.push(
        { key: 'Cmd+1', action: 'Daily Briefing', href: '/daily-briefing' },
        { key: 'Cmd+2', action: 'Field Notes', href: '/notes' },
        { key: 'Cmd+3', action: 'Scenario Checklists', href: '/field-procedures/scenario-checklists' }
      )
    } else if (contextualData.shift === 'night') {
      shortcuts.push(
        { key: 'Cmd+1', action: 'Baker Act Guide', href: '/emergency-response/baker-act-guide' },
        { key: 'Cmd+2', action: 'DV Protocol', href: '/field-procedures/domestic-violence-protocol' },
        { key: 'Cmd+3', action: 'First Aid Guide', href: '/emergency-response/first-aid-guide' }
      )
    }

    return shortcuts
  }, [contextualData])

  // Get AI suggestions based on context
  const getAISuggestions = useCallback(() => {
    const suggestions: string[] = []
    
    if (contextualData.timeOfDay === 'morning') {
      suggestions.push(
        'Start with your daily briefing',
        'Review overnight incidents',
        'Check equipment status'
      )
    } else if (contextualData.shift === 'evening') {
      suggestions.push(
        'Peak activity period - keep legal advisor handy',
        'Traffic enforcement tools ready',
        'Quick access to evidence ID'
      )
    } else if (contextualData.shift === 'night') {
      suggestions.push(
        'Mental health protocols accessible',
        'Emergency response tools prioritized',
        'Quick incident reporting ready'
      )
    }

    return suggestions
  }, [contextualData])

  return {
    usageData,
    recentTools,
    contextualData,
    trackToolUsage,
    getContextualShortcuts,
    getAISuggestions
  }
}
