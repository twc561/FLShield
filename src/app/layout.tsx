
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

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

  const isPublicPage = isClient ? publicPages.includes(pathname) : true;

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>Florida Shield</title>
        <meta name="description" content="The essential digital partner for the modern Florida officer." />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1F2937" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning={true}>
          <AuthWrapper>
            {isPublicPage ? (
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
          </AuthWrapper>
      </body>
    </html>
  )
}
