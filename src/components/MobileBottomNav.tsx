'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Home, Search, Heart, MoreHorizontal, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppMenuContent } from "./AppMenuContent"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
  ]

  const isPublicPage = publicPages.includes(pathname)

  // Prevent hydration mismatch by rendering consistent structure
  if (!mounted) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <nav className="flex items-center justify-around h-16 px-4">
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <div className="h-5 w-5" />
            <span className="text-xs font-medium invisible">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <div className="h-5 w-5" />
            <span className="text-xs font-medium invisible">AI Tools</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <div className="h-5 w-5" />
            <span className="text-xs font-medium invisible">Favorites</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <div className="h-5 w-5" />
            <span className="text-xs font-medium invisible">More</span>
          </div>
        </nav>
      </div>
    )
  }

  // Don't render on public pages after mounting
  if (isPublicPage) {
    return null
  }

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Home",
      isActive: pathname === "/dashboard"
    },
    {
      href: "/ai-tools", 
      icon: Search,
      label: "AI Tools",
      isActive: pathname === "/ai-tools"
    },
    {
      href: "/favorites",
      icon: Heart, 
      label: "Favorites",
      isActive: pathname === "/favorites"
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <nav className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              item.isActive 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 px-3 py-2 h-auto"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs font-medium">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <AppMenuContent onNavigate={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}