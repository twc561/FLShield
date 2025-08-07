'use client'

import { Toaster } from "@/components/ui/toaster"
import { AuthWrapper } from "@/components/AuthWrapper"
import { SubscriptionGate } from "@/components/SubscriptionGate"
import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MobileBottomNav } from "@/components/MobileBottomNav"
import { useMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [user, loading] = useAuthState(auth!)

  const isPublicPage = [
    "/",
    "/features",
    "/support",
    "/terms-of-use",
    "/privacy-policy",
    "/security",
    "/for-officers",
    "/agency-intelligence",
    "/cjis-compliance",
    "/request-demo",
    "/login"
  ].includes(pathname)

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      {!isPublicPage && user && !loading ? (
        <SubscriptionGate>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <main className="flex-1 flex flex-col overflow-hidden">
                <div className={`flex-1 overflow-y-auto ${isMobile ? 'pb-16' : ''}`} suppressHydrationWarning>
                  {children}
                </div>
                {isMobile && <MobileBottomNav />}
              </main>
            </div>
          </SidebarProvider>
        </SubscriptionGate>
      ) : (
        children
      )}
    </div>
  )
}

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <AuthWrapper>
      {isFirebaseConfigured ? <MainLayout>{children}</MainLayout> : children}
      <Toaster />
    </AuthWrapper>
  )
}

export default ClientLayout