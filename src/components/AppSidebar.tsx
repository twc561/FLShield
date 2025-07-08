
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Flame,
  ChevronDown,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { menuItems } from "@/lib/menu-items"

export function AppSidebar() {
  const pathname = usePathname()
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>({})
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (href: string) => {
    if (!isClient) return false;
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  React.useEffect(() => {
    if (!isClient) return;
    const initialStates: Record<string, boolean> = {}
    menuItems.forEach((item) => {
      if (item.items) {
        initialStates[item.label] = item.items.some((subItem) => isActive(subItem.href))
      }
    })
    setOpenStates(initialStates)
  }, [pathname, isClient])

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
        <SidebarMenu>
          {menuItems.map((item) =>
            item.items ? (
              <Collapsible
                key={item.label}
                open={isClient ? (openStates[item.label] || false) : false}
                onOpenChange={(isOpen) =>
                  setOpenStates((prev) => ({ ...prev, [item.label]: isOpen }))
                }
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="w-full justify-between"
                      variant="ghost"
                      isActive={isClient && item.items.some(subItem => isActive(subItem.href))}
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
                          className={cn(
                            "flex h-full w-full items-center gap-2 rounded-md px-2 text-sm text-sidebar-foreground/80 outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
                            isClient && isActive(subItem.href) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
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
                  isActive={isClient && pathname === item.href}
                  tooltip={{ children: item.label, side: "right" }}
                  className={cn(isClient && pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary")}
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
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center">
      </SidebarFooter>
    </Sidebar>
  )
}
