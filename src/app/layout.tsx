'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ContextualPanel } from "@/components/ContextualPanel"
import { Toaster } from "@/components/ui/toaster"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { AuthWrapper } from "@/components/AuthWrapper"
import { SubscriptionGate } from "@/components/SubscriptionGate"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shield FL - Law Enforcement Assistant",
  description: "AI-powered law enforcement assistant for Florida officers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const publicPages = [
    "/",
    "/login",
    "/features",
    "/agency-intelligence",
    "/cjis-compliance",
    "/support",
    "/request-demo",
    "/terms-of-use",
    "/privacy-policy",
    "/security",
    "/for-officers",
  ];

  useEffect(() => {
    setMounted(true)
  }, [])

  const isPublicPage = publicPages.includes(pathname);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>Florida Shield</title>
        <meta name="description" content="The essential digital partner for the modern Florida officer." />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning={true}>
          <AuthWrapper>
            {mounted && isPublicPage ? (
                <>
                    {children}
                    <Toaster />
                </>
            ) : mounted ? (
                <SidebarProvider>
                    <SubscriptionGate>
                    <div className="flex min-h-screen">
                        <AppSidebar />
                        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-6">
                        {children}
                        </main>
                        <ContextualPanel />
                    </div>
                    </SubscriptionGate>
                    <MobileBottomNav />
                    <Toaster />
                </SidebarProvider>
            ) : null}
          </AuthWrapper>
      </body>
    </html>
  )
}