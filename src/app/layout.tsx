
'use client'

import { usePathname } from "next/navigation"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ContextualPanel } from "@/components/ContextualPanel"
import { Toaster } from "@/components/ui/toaster"
import { ThemeScript } from "@/components/ThemeScript"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { useState, useEffect } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const isLandingPage = pathname === "/"

  // This pattern prevents a hydration mismatch by ensuring that the conditional
  // layout logic only runs on the client, after the initial render.
  if (!isMounted) {
    return (
       <html lang="en" suppressHydrationWarning>
        <head>
          <title>Florida Shield</title>
          <meta name="description" content="A digital toolkit for law enforcement." />
          <ThemeScript />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={cn("antialiased min-h-screen")}>
          {/* Render a basic structure on the server and initial client render */}
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Florida Shield</title>
        <meta name="description" content="A digital toolkit for law enforcement." />
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased min-h-screen")}>
        {isLandingPage ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-6">
                {children}
              </main>
              <ContextualPanel />
            </div>
            <MobileBottomNav />
            <Toaster />
          </SidebarProvider>
        )}
      </body>
    </html>
  )
}
