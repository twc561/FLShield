
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
import { auth } from '@/lib/firebase'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Always call all hooks first, in the same order
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const [user, loading] = useAuthState(auth)

  // Define constants after hooks
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

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything until client-side mounted
  if (!isClient) {
    return (
      <div className="min-h-screen bg-background">
        <Toaster />
      </div>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-background">
        {!isPublicPage && user && !loading ? (
          <SubscriptionGate>
            <SidebarProvider>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto">
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
      <Toaster />
    </AuthWrapper>
  )
}

export default ClientLayout
