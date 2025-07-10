
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

const LoadingScreen = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    if (isAuthenticated === false && !isPublicPage) {
      router.push('/login');
    }

    if (isAuthenticated === true && authPages.includes(pathname)) {
        router.push('/dashboard');
    }

  }, [isAuthenticated, pathname, router, isPublicPage]);

  const showLoadingScreen = !isMounted || (isAuthenticated === null && !isPublicPage);
  const showAppShell = isMounted && isAuthenticated && !isPublicPage;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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
      <body className={cn("antialiased min-h-screen")}>
          {showLoadingScreen && <LoadingScreen />}

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
            <div className={cn(showLoadingScreen && 'invisible')}>
              {children}
              <Toaster />
            </div>
          )}
      </body>
    </html>
  )
}
