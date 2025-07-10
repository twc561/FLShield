
import * as React from "react"
import {
  LayoutGrid, Bot, Star, Book, Scale, Gavel, ListChecks, Home, Car, Route, Footprints, Truck, Dog, Fish, Stethoscope, Siren, BrainCircuit, HeartPulse, Biohazard, AlertCircle, UserSearch, Briefcase, ClipboardEdit, ShieldQuestion, GraduationCap, ShieldCheck, ShieldAlert, FlaskConical, Users, Smartphone, MessageSquare, FileCheck, Languages as LanguagesIcon, Mic, Settings, Newspaper, Download, Heart, Users as UsersIcon, FileText as FileTextIcon
} from "lucide-react"

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

export const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/ai-legal-advisor", label: "AI Legal Advisor", icon: Bot },
  { href: "/voice-assistant", label: "AI Partner (Voice)", icon: Mic },
  { href: "/live-debrief", label: "Live AI Debrief", icon: LanguagesIcon },
  {
    label: "Training & Briefing",
    icon: GraduationCap,
    items: [
        { href: "/daily-briefing", label: "Daily Briefing", icon: Newspaper },
        { href: "/training-development/role-play-simulator", label: "AI Role-Play Simulator", icon: MessageSquare },
        { href: "/reporting-development/knowledge-check", label: "Knowledge Check", icon: GraduationCap },
        { href: "/training-development/common-misperceptions", label: "Common Misperceptions", icon: ShieldAlert },
    ],
  },
  {
    label: "In-Field Tools",
    icon: Briefcase,
    items: [
      { href: "/legal-reference/statutes", label: "Statute Navigator", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Vault", icon: Gavel },
      { href: "/legal-reference/miranda-warning-guide", label: "Miranda Warning Guide", icon: Mic },
      { href: "/field-translation-guide", label: "Field Translation Guide", icon: LanguagesIcon },
      { href: "/emergency-response/hazmat-guide", label: "HAZMAT Placard Guide", icon: Biohazard },
      { href: "/specialized-enforcement/k9-officer-guide", label: "K-9 Officer Guide", icon: Dog },
      { href: "/specialized-enforcement/fwc-regulations-guide", label: "FWC Regulations", icon: Fish },
      { href: "/legal-reference/local-ordinances-guide", label: "Local Ordinances", icon: Home },
    ],
  },
  {
    label: "Reporting & Procedures",
    icon: FileCheck,
    items: [
      { href: "/field-procedures/scenario-checklists", label: "Scenario Checklists", icon: ListChecks },
      { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Gavel },
      { href: "/reporting-development/use-of-force-wizard", label: "Use of Force Wizard", icon: ShieldQuestion },
      { href: "/training-development/report-proofreader", label: "Report Proofreader", icon: FileCheck },
      { href: "/notes", label: "Field Notes", icon: ClipboardEdit },
    ],
  },
  {
    label: "Wellness & Rights",
    icon: Heart,
    items: [
        { href: "/wellness", label: "Wellness Hub", icon: ShieldQuestion },
        { href: "/officer-wellness-rights/police-officers-bill-of-rights", label: "Police Officer's Bill...", icon: ShieldCheck },
        { href: "/officer-wellness-rights/court-testimony-guide", label: "Court Testimony Guide", icon: Mic },
    ],
  },
  {
    label: "Guides",
    icon: Book,
    items: [
      { href: "/emergency-response/alert-guides", label: "Amber/Silver Alerts", icon: AlertCircle },
      { href: "/emergency-response/baker-act-guide", label: "Baker Act Guide", icon: BrainCircuit },
      { href: "/emergency-response/marchman-act-guide", label: "Marchman Act Guide", icon: FlaskConical },
      { href: "/emergency-response/first-aid-guide", label: "First Aid Field Guide", icon: HeartPulse },
      { href: "/specialized-enforcement/animal-cruelty-investigation", label: "Animal Cruelty Guide", icon: Stethoscope },
      { href: "/traffic-enforcement/commercial-vehicle-info", label: "Commercial Vehicle Info", icon: Truck },
    ]
  },
  {
    label: "Settings",
    icon: Settings,
    items: [
        { href: "/favorites", label: "Favorites", icon: Star },
        { href: "/install", label: "Install App", icon: Download },
    ]
  }
]
