
"use client"

import { useEffect } from "react"
import { useTimeBasedTheme } from "@/hooks/use-time-based-theme"

export function TimeBasedThemeProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = useTimeBasedTheme()

  useEffect(() => {
    // Set initial theme class on document load
    const htmlElement = document.documentElement
    
    const now = new Date()
    const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}))
    const hour = estTime.getHours()
    const isNightTime = hour >= 19 || hour < 7
    
    if (isNightTime) {
      htmlElement.classList.add('night-theme')
      htmlElement.classList.remove('day-theme')
    } else {
      htmlElement.classList.add('day-theme')
      htmlElement.classList.remove('night-theme')
    }
  }, [])

  return <>{children}</>
}
