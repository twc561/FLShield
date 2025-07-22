"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { menuItems } from "@/lib/menu-items"
import { useSubscription } from "@/hooks/use-subscription"
import { Badge } from "@/components/ui/badge"
import * as LucideIcons from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { useMobile } from "@/hooks/use-mobile"

interface AppMenuContentProps {
  onLinkClick?: () => void
}

export function AppMenuContent({ onLinkClick }: AppMenuContentProps) {
  const pathname = usePathname()
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const { setOpen } = useSidebar()
  const isMobile = useMobile()

  // Initialize sections based on active routes
  useEffect(() => {
    const initialState: Record<string, boolean> = {}
    menuItems.forEach(item => {
      if (item.items) {
        initialState[item.label] = item.items.some((subItem) => isActive(subItem.href))
      }
    })
    setOpenSections(initialState)
  }, [pathname]) // Add pathname dependency back

  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpen(false)
    }
  }

  const handleSubMenuClick = () => {
    if (isMobile) {
      setOpen(false) // Close sidebar on mobile
    }
    if (onLinkClick) {
      onLinkClick()
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && href !== "/" && pathname.startsWith(href))
  }

  const onNavigate = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Prevent hydration mismatch by not rendering interactive elements until mounted
  if (!mounted) {
    return (
      <SidebarMenu className="p-0">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton variant="ghost" className="w-full">
              <div className="flex items-center gap-2">
                <item.icon className="size-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu className="p-0">
      {menuItems.map((item) =>
        item.items ? (
          <Collapsible
            key={item.label}
            open={openSections[item.label] ?? false}
            onOpenChange={(open) => setOpenSections(prev => ({ ...prev, [item.label]: open }))}
            className="w-full"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="w-full justify-between"
                  variant="ghost"
                  data-active={item.items.some((subItem) =>
                    isActive(subItem.href)
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="size-5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden data-[state=open]:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.label}>
                    <Link
                      href={subItem.href}
                      onClick={handleSubMenuClick}
                      className={cn(
                        "flex h-full w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground/80 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
                        isActive(subItem.href) &&
                          "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <subItem.icon className="size-4 shrink-0" />
                      <span className="truncate">{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: "right" }}
              className={cn(
                pathname === item.href &&
                  "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              )}
              onClick={handleMenuItemClick}
            >
              <Link href={item.href!}>
                <item.icon className="size-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  )
}