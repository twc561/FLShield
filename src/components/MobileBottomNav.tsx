
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import {
  LayoutGrid,
  Scale,
  ListChecks,
  Menu,
  Flame,
  LogOut,
  Bot,
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

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/legal-reference/statutes", label: "Statutes", icon: Scale },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
  {
    href: "/field-procedures/scenario-checklists",
    label: "Checklists",
    icon: ListChecks,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const isActive = (href: string) => {
    if (!isClient) return false
    // Exact match for dashboard, startsWith for others to handle nested pages.
    if (href === "/dashboard" || href === "/ai-tools") return pathname === href
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    setIsSheetOpen(false)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50 flex justify-around items-center">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors",
            isActive(item.href) && "text-primary"
          )}
        >
          <item.icon className="h-6 w-6" />
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex flex-col items-center justify-center text-muted-foreground w-full h-full"
            aria-label="Open full menu"
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs">More</span>
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
                <span className="font-bold text-lg text-foreground">
                    Florida Shield
                </span>
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
  )
}
