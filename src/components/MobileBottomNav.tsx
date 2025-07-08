
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Scale,
  ListChecks,
  FileText,
  Menu,
  X,
  ChevronDown,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import * as React from "react"
import { Button } from "./ui/button"

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
  const [isClient, setIsClient] = React.useState(false)
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (href: string) => {
    if (!isClient) return false
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  React.useEffect(() => {
    if (!isClient) return
    const initialStates: Record<string, boolean> = {}
    menuItems.forEach((item) => {
      if (item.items) {
        initialStates[item.label] = item.items.some((subItem) =>
          isActive(subItem.href)
        )
      }
    })
    setOpenStates(initialStates)
  }, [pathname, isClient])

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
        <SheetContent side="left" className="w-3/4 p-0 flex flex-col">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">All Features</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto flex-1">
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    {item.items ? (
                      <Collapsible
                        open={isClient ? openStates[item.label] || false : false}
                        onOpenChange={(isOpen) =>
                          setOpenStates((prev) => ({
                            ...prev,
                            [item.label]: isOpen,
                          }))
                        }
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="pl-8 pt-2 space-y-1">
                            {item.items.map((subItem) => (
                              <li key={subItem.label}>
                                <Link
                                  href={subItem.href}
                                  onClick={handleLinkClick}
                                  className={cn(
                                    "block p-2 rounded-md text-muted-foreground hover:bg-muted",
                                    isActive(subItem.href) &&
                                      "bg-muted font-semibold text-primary"
                                  )}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-md text-foreground hover:bg-muted",
                          isActive(item.href!) &&
                            "bg-muted font-semibold text-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
