
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  LayoutGrid,
  Scale,
  ListChecks,
  FileText,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { menuItems } from "@/lib/menu-items"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/legal-reference/statutes", label: "Statutes", icon: Scale },
  {
    href: "/field-procedures/scenario-checklists",
    label: "Checklists",
    icon: ListChecks,
  },
  { href: "/notes", label: "Notes", icon: FileText },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    // For parent routes, we want an exact match, otherwise they are always active.
    const isParent = menuItems.some(item => item.href === href);
    if (isParent) return pathname === href;
    
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
            <SheetTitle className="text-left">All Features</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto flex-1">
             <nav className="p-2">
              {menuItems.map((item) => (
                <div key={item.label} className="py-2">
                  {item.items ? (
                    <>
                      <h4 className="px-3 py-2 text-sm font-semibold text-muted-foreground flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </h4>
                      <div className="pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-md text-foreground hover:bg-muted",
                              isActive(subItem.href) && "bg-muted font-semibold text-primary"
                            )}
                          >
                            <subItem.icon className="h-5 w-5 text-muted-foreground" />
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-md text-foreground hover:bg-muted",
                        isActive(item.href!) && "bg-muted font-semibold text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
