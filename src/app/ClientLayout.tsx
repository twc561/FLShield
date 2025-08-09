
'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { AuthWrapper } from "@/components/AuthWrapper"
import { SubscriptionGate } from "@/components/SubscriptionGate"
import { AppShell } from "@/components/shell/AppShell"
import { MainNav } from "@/components/nav/MainNav"

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

  // Render a loading state or null on the server and initial client render
  // to prevent hydration mismatches, especially with auth/sub checks.
  if (!mounted) {
    return null;
  }

  return (
    <AuthWrapper>
      {isPublicPage ? (
        <>
          {children}
          <Toaster />
        </>
      ) : (
        <SubscriptionGate>
          <AppShell navigation={<MainNav />}>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              {children}
            </main>
          </AppShell>
          <Toaster />
        </SubscriptionGate>
      )}
    </AuthWrapper>
  )
}
