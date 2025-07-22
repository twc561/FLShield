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
import { ErrorBoundary } from 'react-error-boundary'; // Import ErrorBoundary
import { ScrollArea } from "@/components/ui/scroll-area" // Import ScrollArea

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

  // Define a fallback UI for the error boundary
  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={() => resetErrorBoundary()}>Try again</button>
      </div>
    );
  }

  return (
    <AuthWrapper>
      {!mounted ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : isPublicPage ? (
        <>
          {children}
          <Toaster />
        </>
      ) : (
        <SidebarProvider>
          <SubscriptionGate>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-6">
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => {
                    // Optional: Resetting the state of your app
                  }}
                >
                  <ScrollArea>
                    {children}
                  </ScrollArea>
                </ErrorBoundary>
              </main>
              <ContextualPanel />
            </div>
          </SubscriptionGate>
          <MobileBottomNav />
          <Toaster />
        </SidebarProvider>
      )}
    </AuthWrapper>
  )
}