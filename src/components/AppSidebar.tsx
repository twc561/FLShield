
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  LayoutGrid, Bot, Star, Book, Scale, Gavel, Landmark, FileText, ListChecks, Building, Newspaper, Home, MessageSquareWarning, Car, Route, Footprints, Truck, Wrench, Dog, Fish, Stethoscope, Siren, BrainCircuit, HeartPulse, Biohazard, AlertCircle, UserSearch, Briefcase, ClipboardEdit, ShieldQuestion, GraduationCap, ShieldCheck, ChevronDown, Flame,
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
    label: "Traffic Enforcement",
    icon: Car,
    items: [
      { href: "/traffic-enforcement/traffic-statutes-schedules", label: "Traffic Statutes & Sc...", icon: Route },
      { href: "/traffic-enforcement/fst-implied-consent", label: "FST & Implied Conse...", icon: Footprints },
      { href: "/traffic-enforcement/commercial-vehicle-info", label: "Commercial Vehicle ...", icon: Truck },
    ],
  },
  {
    label: "Specialized Enforcement",
    icon: Wrench,
    items: [
        { href: "/specialized-enforcement/k9-officer-guide", label: "K-9 Officer Guide", icon: Dog },
        { href: "/specialized-enforcement/fwc-regulations-guide", label: "FWC Regulations Gui...", icon: Fish },
        { href: "/specialized-enforcement/animal-cruelty-investigation", label: "Animal Cruelty Inves...", icon: Stethoscope },
    ],
  },
  {
      label: "Emergency Response",
      icon: Siren,
      items: [
          { href: "/emergency-response/baker-marchman-act", label: "Baker Act & Marchma...", icon: BrainCircuit },
          { href: "/emergency-response/first-aid-field-guide", label: "First Aid Field Guide", icon: HeartPulse },
          { href: "/emergency-response/hazmat-placard-guide", label: "HAZMAT Placard Gui...", icon: Biohazard },
          { href: "/emergency-response/amber-alert-guide", label: "Amber Alert Guide", icon: AlertCircle },
          { href: "/emergency-response/silver-alert-guide", label: "Silver Alert Guide", icon: UserSearch },
      ],
  },
  {
      label: "Reporting & Development",
      icon: Briefcase,
      items: [
          { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Gavel },
          { href: "/reporting-development/ai-report-writer", label: "AI Report Writer", icon: ClipboardEdit },
          { href: "/reporting-development/use-of-force-wizard", label: "Use of Force Wizard", icon: ShieldQuestion },
          { href: "/reporting-development/knowledge-check", label: "Knowledge Check", icon: GraduationCap },
      ],
  },
  {
      label: "Officer Wellness & Rights",
      icon: ShieldQuestion,
      items: [
          { href: "/officer-wellness-rights/police-officers-bill-of-rights", label: "Police Officer's Bill of...", icon: ShieldCheck },
          { href: "/officer-wellness-rights/court-testimony-guide", label: "Court Testimony Guide", icon: Landmark },
      ],
  },
  { href: "/notes", label: "Field Notes", icon: FileText },
  { href: "/wellness", label: "Wellness Hub", icon: ShieldQuestion },
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
         <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
