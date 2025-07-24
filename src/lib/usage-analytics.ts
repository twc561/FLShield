
interface ToolUsage {
  toolId: string
  timestamp: number
  duration?: number
  context: {
    timeOfDay: string
    dayOfWeek: string
    location?: string
  }
}

interface UsagePattern {
  toolId: string
  frequency: number
  avgDuration: number
  commonContexts: string[]
  lastUsed: number
}

class UsageAnalytics {
  private static instance: UsageAnalytics
  private usageHistory: ToolUsage[] = []
  private patterns: Map<string, UsagePattern> = new Map()

  static getInstance(): UsageAnalytics {
    if (!UsageAnalytics.instance) {
      UsageAnalytics.instance = new UsageAnalytics()
    }
    return UsageAnalytics.instance
  }

  constructor() {
    this.loadFromStorage()
  }

  trackUsage(toolId: string, duration?: number): void {
    const usage: ToolUsage = {
      toolId,
      timestamp: Date.now(),
      duration,
      context: {
        timeOfDay: this.getTimeOfDay(),
        dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' })
      }
    }

    this.usageHistory.push(usage)
    this.updatePatterns()
    this.saveToStorage()
  }

  getContextualRecommendations(): string[] {
    const hour = new Date().getHours()
    const dayOfWeek = new Date().getDay()
    
    // Time-based recommendations
    if (hour >= 6 && hour < 10) {
      return [
        'Start with Daily Briefing for shift preparation',
        'Review Scenario Checklists for common situations',
        'Check Field Notes from previous shift'
      ]
    } else if (hour >= 14 && hour < 18) {
      return [
        'AI Legal Advisor for complex situations',
        'Visual Evidence Identifier for field investigations',
        'Quick access to Charge Assistant'
      ]
    } else if (hour >= 22 || hour < 6) {
      return [
        'Baker Act procedures for mental health calls',
        'Domestic Violence protocols',
        'Emergency response guides'
      ]
    }

    return [
      'AI tools for enhanced decision making',
      'Legal reference for statutory guidance',
      'Training modules for skill development'
    ]
  }

  getFrequentlyUsed(limit: number = 5): string[] {
    const patterns = Array.from(this.patterns.values())
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit)
    
    return patterns.map(p => p.toolId)
  }

  getRecentlyUsed(limit: number = 5): string[] {
    return this.usageHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
      .map(u => u.toolId)
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  }

  private updatePatterns(): void {
    this.patterns.clear()
    
    const toolGroups = this.usageHistory.reduce((groups, usage) => {
      if (!groups[usage.toolId]) {
        groups[usage.toolId] = []
      }
      groups[usage.toolId].push(usage)
      return groups
    }, {} as Record<string, ToolUsage[]>)

    Object.entries(toolGroups).forEach(([toolId, usages]) => {
      const pattern: UsagePattern = {
        toolId,
        frequency: usages.length,
        avgDuration: usages.reduce((sum, u) => sum + (u.duration || 0), 0) / usages.length,
        commonContexts: [...new Set(usages.map(u => u.context.timeOfDay))],
        lastUsed: Math.max(...usages.map(u => u.timestamp))
      }
      
      this.patterns.set(toolId, pattern)
    })
  }

  private saveToStorage(): void {
    try {
      // Keep only last 1000 entries for performance
      const recentHistory = this.usageHistory.slice(-1000)
      localStorage.setItem('usage-analytics', JSON.stringify(recentHistory))
    } catch (error) {
      console.error('Failed to save usage analytics:', error)
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('usage-analytics')
      if (stored) {
        this.usageHistory = JSON.parse(stored)
        this.updatePatterns()
      }
    } catch (error) {
      console.error('Failed to load usage analytics:', error)
    }
  }
}

export const usageAnalytics = UsageAnalytics.getInstance()

// Context-aware smart suggestions
export function getSmartSuggestions(): {
  quickActions: string[]
  aiPrompts: string[]
  shortcuts: { key: string; action: string; href: string }[]
} {
  const hour = new Date().getHours()
  const analytics = UsageAnalytics.getInstance()
  
  let quickActions: string[] = []
  let aiPrompts: string[] = []
  let shortcuts: { key: string; action: string; href: string }[] = []

  // Night shift: 18:00 (6 PM) to 05:00 (5 AM) next day
  const isNightShift = hour >= 18 || hour < 5
  
  if (isNightShift) {
    if (hour >= 18 && hour < 20) {
      // Evening start of night shift
      quickActions = ['Daily Briefing', 'Field Notes', 'Scenario Checklists']
      aiPrompts = [
        'What should I know for tonight\'s shift?',
        'Any incidents from day shift?',
        'Review night shift procedures'
      ]
      shortcuts = [
        { key: '⌘1', action: 'Daily Briefing', href: '/daily-briefing' },
        { key: '⌘2', action: 'Field Notes', href: '/notes' },
        { key: '⌘3', action: 'Scenario Checklists', href: '/field-procedures/scenario-checklists' }
      ]
    } else {
      // Late night/early morning (20:00 - 05:00)
      quickActions = ['Baker Act', 'DV Protocol', 'Emergency Response']
      aiPrompts = [
        'Walk me through Baker Act procedures',
        'Domestic violence response checklist',
        'Emergency medical protocols'
      ]
      shortcuts = [
        { key: '⌘1', action: 'Baker Act', href: '/emergency-response/baker-act-guide' },
        { key: '⌘2', action: 'DV Protocol', href: '/field-procedures/domestic-violence-protocol' },
        { key: '⌘3', action: 'First Aid', href: '/emergency-response/first-aid-guide' }
      ]
    }
  } else if (hour >= 5 && hour < 8) {
    // Day shift start
    quickActions = ['Daily Briefing', 'Field Notes', 'Equipment Check']
    aiPrompts = [
      'What should I know for today\'s shift?',
      'Any overnight incidents in my area?',
      'Review day shift procedures'
    ]
    shortcuts = [
      { key: '⌘1', action: 'Daily Briefing', href: '/daily-briefing' },
      { key: '⌘2', action: 'Field Notes', href: '/notes' },
      { key: '⌘3', action: 'Scenario Checklists', href: '/field-procedures/scenario-checklists' }
    ]
  } else if (hour >= 8 && hour < 14) {
    // Morning day shift
    quickActions = ['AI Legal Advisor', 'Traffic Enforcement', 'Charge Assistant']
    aiPrompts = [
      'Help me analyze this situation legally',
      'Review traffic violation procedures',
      'What charges might apply here?'
    ]
    shortcuts = [
      { key: '⌘1', action: 'AI Legal Advisor', href: '/ai-legal-advisor' },
      { key: '⌘2', action: 'Traffic Guide', href: '/traffic-enforcement/traffic-statutes-schedules' },
      { key: '⌘3', action: 'Charge Assistant', href: '/reporting-development/ai-charge-assistant' }
    ]
  } else {
    // Afternoon day shift (14:00 - 18:00)
    quickActions = ['AI Legal Advisor', 'Evidence ID', 'Report Writer']
    aiPrompts = [
      'Help me analyze this situation legally',
      'What evidence should I collect?',
      'Assist with report writing'
    ]
    shortcuts = [
      { key: '⌘1', action: 'AI Legal Advisor', href: '/ai-legal-advisor' },
      { key: '⌘2', action: 'Evidence ID', href: '/field-procedures/visual-evidence-identifier' },
      { key: '⌘3', action: 'Report Writer', href: '/reporting-development/ai-report-writer' }
    ]
  } else {
    // Fallback for any edge cases
    quickActions = ['Daily Briefing', 'AI Legal Advisor', 'Field Notes']
    aiPrompts = [
      'How can I assist you today?',
      'What tools do you need?',
      'Review procedures'
    ]
    shortcuts = [
      { key: '⌘1', action: 'Daily Briefing', href: '/daily-briefing-act-guide' },
      { key: '⌘2', action: 'DV Protocol', href: '/field-procedures/domestic-violence-protocol' },
      { key: '⌘3', action: 'First Aid', href: '/emergency-response/first-aid-guide' }
    ]
  }

  return { quickActions, aiPrompts, shortcuts }
}
