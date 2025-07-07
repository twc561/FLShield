"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Gavel,
  ScrollText,
  GitFork,
  FileText,
  Notebook,
  Flame,
  HeartPulse,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/case-law", label: "Case Law Vault", icon: Gavel },
  { href: "/statutes", label: "Statute Navigator", icon: ScrollText },
  { href: "/flowcharts", label: "Flowcharts", icon: GitFork },
  { href: "/reports", label: "Report Assistant", icon: FileText },
  { href: "/notes", label: "Field Notes", icon: Notebook },
  { href: "/wellness", label: "Officer Wellness", icon: HeartPulse },
]

export function AppSidebar() {
  const pathname = usePathname()

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
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right" }}
                className={cn(pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary")}
              >
                <Link href={item.href}>
                  <item.icon className="size-5" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
         <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
