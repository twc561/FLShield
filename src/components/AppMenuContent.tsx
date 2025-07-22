
"use client"

import Link from "next/link"
import { menuItems } from "@/lib/menu-items"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface AppMenuContentProps {
  onLinkClick?: () => void
}

// Loading skeleton component
function MenuSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-muted rounded w-1/3"></div>
            <div className="space-y-2 pl-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-muted/60 rounded w-2/3"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AppMenuContent({ onLinkClick }: AppMenuContentProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Ensure component is ready after hydration
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Show loading skeleton while not ready
  if (!isReady) {
    return <MenuSkeleton />
  }

  // Ensure menuItems is available
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>Unable to load menu items</p>
      </div>
    )
  }

  return (
    <div className="space-y-1 p-2">
      {menuItems.map((section) => (
        <div key={section.label} className="space-y-1">
          {/* Section Header */}
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md">
            <section.icon className="h-4 w-4" />
            <span>{section.label}</span>
          </div>
          
          {/* Section Items */}
          {section.items && section.items.length > 0 && (
            <div className="space-y-1 ml-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "active:bg-accent/80 active:scale-[0.98]",
                    "text-foreground border border-transparent hover:border-border/50"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span className="flex-1 leading-tight">{item.label}</span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
