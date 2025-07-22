"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import { memo, useCallback, useMemo } from "react"
import {
  LayoutGrid,
  Scale,
  Menu,
  Flame,
  LogOut,
  Bot,
  Crown,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { AppMenuContent } from "./AppMenuContent"
import { useSubscription } from "@/hooks/use-subscription"
import { Badge } from "@/components/ui/badge"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/legal-reference/statutes", label: "Statutes", icon: Scale },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
  {
    href: "/field-procedures/nearby-resources",
    label: "Nearby",
    icon: MapPin,
  },
]

export const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)
  const { isPro, mounted } = useSubscription()

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }, [router])

  const isActive = useCallback((href: string) => {
    if (!isClient) return false
    // Exact match for dashboard and ai-tools, startsWith for others to handle nested pages.
    if (href === "/dashboard" || href === "/ai-tools") return pathname === href
    // Special handling for nearby resources to ensure it activates correctly
    if (href === "/field-procedures/nearby-resources") return pathname.startsWith(href)
    return pathname.startsWith(href)
  }, [isClient, pathname])

  const handleLinkClick = useCallback(() => {
    setIsSheetOpen(false)
  }, [])

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      {/* Pro Status Bar */}
      {isClient && mounted && isPro && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-1">
          <div className="flex items-center justify-center gap-2 text-white text-xs font-medium">
            <Crown className="w-3 h-3" />
            <span>Shield FL Pro Active</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="h-16 flex justify-around items-center">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-all duration-200 active:scale-95 active:bg-accent/20 rounded-lg",
            isActive(item.href) && "text-primary bg-primary/5"
          )}
        >
          <item.icon className={cn(
            "h-6 w-6 transition-all duration-200",
            isActive(item.href) && "scale-110"
          )} />
          <span className={cn(
            "text-xs transition-all duration-200",
            isActive(item.href) && "font-medium"
          )}>{item.label}</span>
        </Link>
      ))}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-muted-foreground w-full h-full relative"
            aria-label="Open full menu"
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs">More</span>
            {isClient && mounted && isPro && (
              <div className="absolute -top-1 -right-1">
                <Crown className="w-3 h-3 text-amber-500" />
              </div>
            )}
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-3/4 p-0 flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle asChild>
                <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={handleLinkClick}
                >
                <Flame className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-foreground">
                      Florida Shield
                  </span>
                  {isClient && mounted && isPro && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs w-fit">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                </div>
                </Link>
            </SheetTitle>
            <SheetDescription className="sr-only">Main application menu</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto flex-1 p-2">
            <AppMenuContent onLinkClick={handleLinkClick} />
          </div>
          <div className="p-2 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 p-3 rounded-md text-foreground hover:bg-muted w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
      </div>
    </div>
  )
})