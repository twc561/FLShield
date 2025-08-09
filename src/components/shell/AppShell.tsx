
"use client"

import * as React from "react"

export function AppShell({
  children,
  navigation,
}: {
  children: React.ReactNode
  navigation: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Navigation Rail for Desktop */}
      <div className="hidden md:block w-24 flex-shrink-0">
        {navigation}
      </div>
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        {children}
      </div>
      {/* Bottom Navigation for Mobile (rendered by MainNav) */}
      <div className="md:hidden">
        {navigation}
      </div>
    </div>
  )
}
