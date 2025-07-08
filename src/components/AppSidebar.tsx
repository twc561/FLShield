
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  LayoutGrid, Bot, Star, Book, Scale, Gavel, Landmark, FileText, ListChecks, Building, Newspaper, Home, MessageSquareWarning, ClipboardList, ListTodo, Users, Mic, Search, Smartphone, ShieldAlert, Car, Route, Footprints, Truck, LogIn, ChevronDown, Flame
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
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"

type SubMenuItem = {
  href: string
  label: string
  icon: React.ElementType
}

type MenuItem = {
  href?: string
  label: string
  icon: React.ElementType
  items?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/ai-legal-advisor", label: "AI Legal Advisor", icon: Bot },
  { href: "/favorites", label: "Favorites", icon: Star },
  {
    label: "Legal Reference",
    icon: Book,
    items: [
      { href: "/legal-reference/statutes", label: "Statute Navigator", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Vault", icon: Gavel },
      { href: "/legal-reference/constitutional-law-guide", label: "Constitutional Law Guide", icon: Landmark },
      { href: "/legal-reference/rules-of-criminal-procedure", label: "Rules of Criminal Pro...", icon: FileText },
      { href: "/legal-reference/standard-jury-instructions", label: "Standard Jury Instruc...", icon: ListChecks },
      { href: "/legal-reference/florida-administrative-code", label: "Florida Administrati...", icon: Building },
      { href: "/legal-reference/statutory-case-law-updates", label: "Statutory & Case Law...", icon: Newspaper },
      { href: "/legal-reference/local-ordinances-guide", label: "Local Ordinances Gui...", icon: Home },
      { href: "/legal-reference/rights-reference-guide", label: "Rights Reference Gui...", icon: MessageSquareWarning },
    ],
  },
  {
    label: "Field Procedures",
    icon: ClipboardList,
    items: [
      { href: "/field-procedures/scenario-checklists", label: "Scenario Checklists", icon: ListTodo },
      { href: "/field-procedures/field-interview-contact", label: "Field Interview & Con...", icon: Users },
      { href: "/field-procedures/interview-techniques", label: "Interview Techniques...", icon: Mic },
      { href: "/field-procedures/crime-scene-management", label: "Crime Scene Manage...", icon: Search },
      { href: "/field-procedures/digital-evidence-field-guide", label: "Digital Evidence Field...", icon: Smartphone },
      { href: "/field-procedures/risk-protection-orders", label: "Risk Protection Order...", icon: ShieldAlert },
    ],
  },
  {
    label: "Traffic Enforcement",
    icon: Car,
    items: [
      { href: "/traffic-enforcement/traffic-statutes-schedules", label: "Traffic Statutes & Sc...", icon: Route },
      { href: "/traffic-enforcement/fst-implied-consent", label: "FST & Implied Conse...", icon: Footprints },
      { href: "/traffic-enforcement/commercial-vehicle-info", label: "Commercial Vehicle ...", icon: Truck },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
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
        <SidebarMenu>
          {menuItems.map((item) =>
            item.items ? (
              <Collapsible key={item.label} defaultOpen={item.items.some(subItem => isActive(subItem.href))}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="w-full justify-between"
                      variant="ghost"
                      data-active={item.items.some(subItem => isActive(subItem.href))}
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
                            isActive(subItem.href) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
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
                  className={cn(pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary")}
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
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{ children: "Sign In", side: "right" }}
              >
                <Link href="#">
                  <LogIn className="size-5" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Sign In
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
         <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
