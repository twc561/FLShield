
'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ContextualPanel } from "@/components/ContextualPanel"
import { Toaster } from "@/components/ui/toaster"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { AuthWrapper } from "@/components/AuthWrapper"
import { SubscriptionGate } from "@/components/SubscriptionGate"

export function ClientLayout({
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

  // Prevent hydration mismatch by always rendering the same structure initially
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
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
  )
}
