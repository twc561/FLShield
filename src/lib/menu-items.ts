import * as React from "react"
import {
  Book,
  ListChecks,
  Briefcase,
  GraduationCap,
  Scale,
  Gavel,
  Fish,
  Biohazard,
  MessageSquare,
  FileCheck,
  ShieldAlert,
  ShieldQuestion,
  ShieldCheck,
  Mic,
  Camera,
  ClipboardEdit,
  Users,
  Car,
  Home,
  Newspaper,
  FileText as FileTextIcon,
  BrainCircuit,
  Siren,
  HeartPulse,
  AlertCircle,
  UserSearch,
  Dog,
  Stethoscope,
  Truck,
  Heart,
  Wind,
  Footprints,
  Languages,
  Bot,
  FlaskConical,
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

// Re-categorized based on intuitive, workflow-oriented model
export const menuItems: MenuItem[] = [
  {
    label: "AI Tools",
    icon: Bot,
    items: [
      { href: "/voice-assistant", label: "AI Partner Mode", icon: Mic },
      { href: "/ai-legal-advisor", label: "AI Advisor", icon: ShieldQuestion },
      { href: "/field-procedures/visual-evidence-identifier", label: "Visual Evidence ID", icon: Camera },
      { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Gavel },
      { href: "/reporting-development/ai-report-writer", label: "AI Report Assistant", icon: ClipboardEdit },
      { href: "/training-development/report-proofreader", label: "AI Report Proofreader", icon: FileCheck },
      { href: "/training-development/role-play-simulator", label: "AI Role-Play Simulator", icon: MessageSquare },
    ],
  },
  {
    label: "Reference & Investigation",
    icon: Book,
    items: [
      { href: "/legal-reference/statutes", label: "Statute Navigator", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Vault", icon: Gavel },
      { href: "/legal-reference/jury-instructions-navigator", label: "Jury Instructions", icon: Users },
      { href: "/legal-reference/constitutional-law-guide", label: "Constitutional Law", icon: ShieldAlert },
      { href: "/legal-reference/rules-of-criminal-procedure", label: "Rules of Crim. Pro.", icon: FileTextIcon },
      { href: "/legal-reference/local-ordinances-guide", label: "Local Ordinances", icon: Home },
      { href: "/legal-reference/statutory-case-law-updates", label: "Legal Updates", icon: Newspaper },
      { href: "/specialized-enforcement/controlled-substances-guide", label: "Controlled Substances", icon: FlaskConical },
      { href: "/specialized-enforcement/k9-officer-guide", label: "K-9 Operations Guide", icon: Dog },
      { href: "/specialized-enforcement/fwc-regulations-guide", label: "FWC Regulations", icon: Fish },
      { href: "/specialized-enforcement/animal-cruelty-investigation", label: "Animal Cruelty Guide", icon: Stethoscope },
      { href: "/traffic-enforcement/commercial-vehicle-info", label: "Commercial Vehicles", icon: Truck },
      { href: "/legal-reference/asset-forfeiture-guide", label: "Asset Forfeiture Guide", icon: Scale },
    ],
  },
  {
    label: "Field Encounters & Checklists",
    icon: ListChecks,
    items: [
      { href: "/field-procedures/scenario-checklists", label: "Scenario Checklists", icon: ListChecks },
      { href: "/field-procedures/field-interview-contact", label: "Field Interview Guide", icon: Users },
      { href: "/field-procedures/domestic-violence-protocol", label: "DV Protocol", icon: ShieldAlert },
      { href: "/traffic-enforcement/dui-investigation", label: "DUI Investigation Guide", icon: Car },
      { href: "/emergency-response/alert-guides", label: "Alert Activation Guides", icon: AlertCircle },
      { href: "/emergency-response/first-aid-guide", label: "First Aid Field Guide", icon: HeartPulse },
      { href: "/emergency-response/hazmat-guide", label: "HAZMAT Placard Guide", icon: Biohazard },
    ],
  },
  {
    label: "Reporting & Documentation",
    icon: ClipboardEdit,
    items: [
      { href: "/notes", label: "Field Notes", icon: ClipboardEdit },
      { href: "/reporting-development/use-of-force-wizard", label: "Use of Force Wizard", icon: ShieldCheck },
      { href: "/field-procedures/crime-scene-management", label: "Crime Scene Management", icon: Wind },
    ]
  },
  {
    label: "Officer Support & Development",
    icon: GraduationCap,
    items: [
      { href: "/daily-briefing", label: "Public Intelligence Briefing", icon: Newspaper },
      { href: "/reporting-development/knowledge-check", label: "Knowledge Drills", icon: BrainCircuit },
      { href: "/training-development/common-misperceptions", label: "Field Pitfalls Guide", icon: ShieldAlert },
      { href: "/officer-wellness-rights/court-testimony-guide", label: "Court Testimony Guide", icon: Mic },
      { href: "/wellness", label: "Wellness Hub", icon: Heart },
      { href: "/officer-wellness-rights/police-officers-bill-of-rights", label: "Police Officer's Bill...", icon: ShieldCheck },
      { href: "/officer-wellness-rights/community-engagement-guide", label: "Community Engagement", icon: Users },
      { href: "/field-translation-guide", label: "Field Translator", icon: Languages },
    ],
  },
];