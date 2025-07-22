"use client"

import Link from "next/link"
import { menuItems } from "@/lib/menu-items"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppMenuContentProps {
  onLinkClick?: () => void
}

export function AppMenuContent({ onLinkClick }: AppMenuContentProps) {
  return (
    <div className="space-y-2">
      {menuItems.map((section) => (
        <div key={section.label} className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
            <section.icon className="h-4 w-4" />
            <span>{section.label}</span>
          </div>
          <div className="space-y-1 pl-2">
            {section.items.map((item) => (
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