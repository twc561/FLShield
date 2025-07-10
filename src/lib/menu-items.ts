
import * as React from "react"
import {
  LayoutGrid, Bot, Star, Book, Scale, Gavel, Landmark, FileText, ListChecks, Building, Newspaper, Home, Car, Route, Footprints, Truck, Wrench, Dog, Fish, Stethoscope, Siren, BrainCircuit, HeartPulse, Biohazard, AlertCircle, UserSearch, Briefcase, ClipboardEdit, ShieldQuestion, GraduationCap, ShieldCheck, ShieldAlert, FlaskConical, Users, Smartphone, MessageSquare, FileCheck, Languages as LanguagesIcon, MicOff, Heart, Mic, Settings, Download
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
  { href: "/daily-briefing", label: "Daily Briefing", icon: Newspaper },
  { href: "/ai-legal-advisor", label: "AI Legal Advisor", icon: Bot },
  { href: "/voice-assistant", label: "AI Partner (Voice)", icon: Mic },
  { href: "/favorites", label: "Favorites", icon: Star },
  {
    label: "Legal Reference",
    icon: Book,
    items: [
      { href: "/legal-reference/statutes", label: "Statute Navigator", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Vault", icon: Gavel },
      { href: "/legal-reference/jury-instructions-navigator", label: "Jury Instructions", icon: ListChecks },
      { href: "/legal-reference/miranda-warning-guide", label: "Miranda Warning Guide", icon: MicOff },
      { href: "/legal-reference/local-ordinances-guide", label: "Local Ordinances", icon: Home },
      { href: "/legal-reference/constitutional-law-guide", label: "Constitutional Law Guide", icon: Landmark },
      { href: "/legal-reference/rules-of-criminal-procedure", label: "Rules of Criminal Pro...", icon: FileText },
      { href: "/legal-reference/florida-administrative-code", label: "Florida Administrati...", icon: Building },
      { href: "/legal-reference/statutory-case-law-updates", label: "Statutory & Case Law...", icon: Newspaper },
      { href: "/legal-reference/rights-reference-guide", label: "Rights Reference Gui...", icon: ShieldAlert },
    ],
  },
  {
    label: "Field Procedures",
    icon: ListChecks,
    items: [
      { href: "/field-procedures/scenario-checklists", label: "Scenario Checklists", icon: ListChecks },
      { href: "/field-procedures/crime-scene-management", label: "Crime Scene Manage...", icon: Siren },
      { href: "/field-procedures/domestic-violence-protocol", label: "Domestic Violence Pr...", icon: ShieldAlert },
      { href: "/field-procedures/field-interview-contact", label: "Field Interview & Con...", icon: Users },
      { href: "/field-procedures/interview-techniques", label: "Interview Techniques", icon: BrainCircuit },
      { href: "/field-procedures/digital-evidence-field-guide", label: "Digital Evidence Fiel...", icon: Smartphone },
      { href: "/field-procedures/risk-protection-orders", label: "Risk Protection Orde...", icon: ShieldCheck },
    ],
  },
  {
    label: "Communication Tools",
    icon: LanguagesIcon,
    items: [
      { href: "/field-translation-guide", label: "Field Translation Guide", icon: LanguagesIcon },
    ],
  },
  {
    label: "Traffic Enforcement",
    icon: Car,
    items: [
      { href: "/traffic-enforcement/traffic-statutes-schedules", label: "Traffic Statutes & Sc...", icon: Route },
      { href: "/traffic-enforcement/dui-investigation", label: "DUI Investigation", icon: Footprints },
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
        { href: "/specialized-enforcement/controlled-substances-guide", label: "Controlled Substanc...", icon: FlaskConical },
    ],
  },
  {
      label: "Emergency Response",
      icon: Siren,
      items: [
          { href: "/emergency-response/baker-act-guide", label: "Baker Act Guide", icon: BrainCircuit },
          { href: "/emergency-response/marchman-act-guide", label: "Marchman Act Guide", icon: BrainCircuit },
          { href: "/emergency-response/first-aid-guide", label: "First Aid Field Guide", icon: HeartPulse },
          { href: "/emergency-response/hazmat-guide", label: "HAZMAT Placard Guide", icon: Biohazard },
          { href: "/emergency-response/alert-guides", label: "Amber/Silver Alerts", icon: AlertCircle },
      ],
  },
  {
    label: "Training & Development",
    icon: GraduationCap,
    items: [
        { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Gavel },
        { href: "/reporting-development/use-of-force-wizard", label: "Use of Force Wizard", icon: ShieldQuestion },
        { href: "/reporting-development/ai-report-writer", label: "AI Report Writer", icon: ClipboardEdit },
        { href: "/training-development/role-play-simulator", label: "AI Role-Play Simulator", icon: MessageSquare },
        { href: "/training-development/report-proofreader", label: "Report Proofreader", icon: FileCheck },
        { href: "/reporting-development/knowledge-check", label: "Knowledge Check", icon: GraduationCap },
        { href: "/training-development/common-misperceptions", label: "Common Misperceptions", icon: ShieldAlert },
    ],
  },
   {
    label: "Officer Wellness & Rights",
    icon: Heart,
    items: [
        { href: "/wellness", label: "Wellness Hub", icon: ShieldQuestion },
        { href: "/wellness/live-debrief", label: "Live AI Debrief", icon: BrainCircuit },
        { href: "/officer-wellness-rights/police-officers-bill-of-rights", label: "Police Officer's Bill...", icon: ShieldCheck },
        { href: "/officer-wellness-rights/court-testimony-guide", label: "Court Testimony Guide", icon: Mic },
    ],
  },
  {
    label: "System",
    icon: Settings,
    items: [
        { href: "/notes", label: "Field Notes", icon: FileText },
        { href: "/install", label: "Install Guide", icon: Download },
    ]
  }
]
