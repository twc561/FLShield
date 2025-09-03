
'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { AuthWrapper } from "@/components/AuthWrapper"
import { AppShell } from "@/components/shell/AppShell"
import { MainNav } from "@/components/nav/MainNav"
import { useSubscription } from "@/hooks/use-subscription"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isFeatureFree } = useSubscription();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const isPublicPage = isFeatureFree(pathname);

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
        <AppShell navigation={<MainNav />}>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </AppShell>
      )}
    </AuthWrapper>
  )
}
