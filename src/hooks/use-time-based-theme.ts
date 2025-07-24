
"use client"

import { useEffect, useState } from "react"

export function useTimeBasedTheme() {
  const [currentTheme, setCurrentTheme] = useState<'day' | 'night'>('day')

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date()
      // Convert to EST (UTC-5) or EDT (UTC-4) depending on daylight saving time
      const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}))
      const hour = estTime.getHours()
      
      // Night theme: 7 PM (19:00) to 7 AM (07:00) EST
      // Day theme: 7 AM (07:00) to 7 PM (19:00) EST
      const isNightTime = hour >= 19 || hour < 7
      const newTheme = isNightTime ? 'night' : 'day'
      
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme)
        
        // Apply theme to document
        const htmlElement = document.documentElement
        if (isNightTime) {
          htmlElement.classList.add('night-theme')
          htmlElement.classList.remove('day-theme')
        } else {
          htmlElement.classList.add('day-theme')
          htmlElement.classList.remove('night-theme')
        }
      }
    }

    // Update immediately
    updateTheme()

    // Check every minute for theme changes
    const interval = setInterval(updateTheme, 60000)

    return () => clearInterval(interval)
  }, [currentTheme])

  return currentTheme
}
