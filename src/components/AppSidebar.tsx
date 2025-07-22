"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import {
  Flame,
  LogOut,
  Download,
  ChevronUp, 
  User2, 
  Settings, 
  Menu, 
  Crown
} from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { AppMenuContent } from "./AppMenuContent"
import { Badge } from "@/components/ui/badge"
import { useSubscription } from "@/hooks/use-subscription"

export function AppSidebar() {
  const { isPro, mounted } = useSubscription()
  const router = useRouter()
  const [isClient, setIsClient] = React.useState(false)
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)

  React.useEffect(() => {
    setIsClient(true)

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2.5">
          <Flame className="w-8 h-8 text-primary" />
          <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            Florida Shield
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <AppMenuContent />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center">
        {deferredPrompt && (
          <button onClick={handleInstallClick} className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95", "hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full")}>
            <Download className="size-5" />
            <span className="group-data-[collapsible=icon]:hidden">Install App</span>
          </button>
        )}
        <button onClick={handleSignOut} className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95", "hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full")}>
          <LogOut className="size-5" />
          <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}