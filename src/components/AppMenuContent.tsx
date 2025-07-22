"use client"

import Link from "next/link"
import { menuItems } from "@/lib/menu-items"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface AppMenuContentProps {
  onLinkClick?: () => void
}

export function AppMenuContent({ onLinkClick }: AppMenuContentProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by showing consistent loading state
  if (!mounted) {
    return (
      <div className="space-y-4 p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="space-y-1 pl-4">
                <div className="h-3 bg-muted/70 rounded w-2/3"></div>
                <div className="h-3 bg-muted/70 rounded w-1/2"></div>
                <div className="h-3 bg-muted/70 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Ensure menuItems is available and has content
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="space-y-4 p-4 text-center text-muted-foreground">
        <p>No menu items available</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 pb-4">
      {menuItems.map((section) => (
        <div key={section.label} className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
            <section.icon className="h-4 w-4" />
            <span>{section.label}</span>
          </div>
          <div className="space-y-1 pl-2">
            {section.items && section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "active:bg-accent/80"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}