
'use client'

import { usePathname } from "next/navigation"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ContextualPanel } from "@/components/ContextualPanel"
import { Toaster } from "@/components/ui/toaster"
import { MobileBottomNav } from "@/components/MobileBottomNav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  
  const isLandingPage = pathname === "/"

  return (
    <html lang="en" className="dark">
      <head>
        <title>Florida Shield</title>
        <meta name="description" content="A digital toolkit for law enforcement." />
        <meta name="application-name" content="Florida Shield" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Florida Shield" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning>
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
