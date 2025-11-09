
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Scale, ListChecks, Bot, Menu as MenuIcon, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppMenuContent } from "../AppMenuContent"
import { ScrollArea } from "../ui/scroll-area"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/legal-reference/statutes", label: "Statutes", icon: Scale },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
  { href: "/field-procedures/scenario-checklists", label: "Checklists", icon: ListChecks },
]

export function MainNav() {
  const pathname = usePathname()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    setIsSheetOpen(false)
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-background/95 backdrop-blur-sm border-t z-50 flex justify-around items-center">
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
              <MenuIcon className="h-6 w-6" />
              <span className="text-xs">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 p-0 flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">All Tools</h2>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2">
                    <AppMenuContent onLinkClick={handleLinkClick} />
                </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Desktop Navigation Rail */}
      <nav className="hidden md:flex flex-col items-center gap-4 px-2 py-4 h-full bg-background border-r">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full transition-colors",
              isActive(item.href) && "bg-muted text-primary"
            )}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col h-auto p-2 gap-1 text-muted-foreground"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="text-xs">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
             <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">All Tools</h2>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-2">
                    <AppMenuContent onLinkClick={handleLinkClick} />
                </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  )
}
