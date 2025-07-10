
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
import { onAuthStateChanged } from "firebase/auth"
import { auth, isFirebaseConfigured } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsAuthenticated(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth!, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);
  
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
  ];
  const isPublicPage = publicPages.includes(pathname);

  const authPages = ["/", "/login"];

  useEffect(() => {
    if (isAuthenticated === null) {
      return; 
    }
    
    if (!isAuthenticated && !isPublicPage) {
      router.push('/login');
    }

    if (isAuthenticated && authPages.includes(pathname)) {
        router.push('/dashboard');
    }

  }, [isAuthenticated, pathname, router, isPublicPage]);

  const showAppShell = isAuthenticated && !publicPages.includes(pathname);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, [])

  if (isAuthenticated === null && !isPublicPage) {
      return (
         <html lang="en" className="dark">
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
            <body className="flex items-center justify-center min-h-screen bg-background">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </body>
         </html>
      )
  }

  return (
    <html lang="en" className="dark">
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
      <body className={cn("antialiased min-h-screen")} suppressHydrationWarning>
          {showAppShell ? (
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
          ) : (
            <>
              {children}
              <Toaster />
            </>
          )}
      </body>
    </html>
  )
}
