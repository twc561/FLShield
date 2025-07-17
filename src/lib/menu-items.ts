import * as React from "react"
import {
  AlertCircle,
  Biohazard,
  Bot,
  BrainCircuit,
  Camera,
  Car,
  ClipboardEdit,
  Dog,
  FileCheck,
  FileText,
  Fish,
  FlaskConical,
  Gavel,
  GraduationCap,
  Shackles,
  Heart,
  HeartPulse,
  Home,
  Languages,
  ListChecks,
  MessageSquare,
  Mic,
  Newspaper,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Siren,
  Stethoscope,
  Truck,
  Users,
  Wind,
} from 'lucide-react'

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

// Reorganized menu structure based on officer workflow and logical task groupings
export const menuItems: MenuItem[] = [
  {
    label: "AI Assistant Tools",
    icon: Bot,
    items: [
      { href: "/voice-assistant", label: "AI Partner Mode", icon: Mic },
      { href: "/ai-legal-advisor", label: "AI Legal Advisor", icon: ShieldQuestion },
      { href: "/field-procedures/visual-evidence-identifier", label: "Visual Evidence ID", icon: Camera },
      { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Gavel },
      { href: "/reporting-development/ai-report-writer", label: "AI Report Assistant", icon: ClipboardEdit },
      { href: "/training-development/report-proofreader", label: "Report Writing Feedback", icon: FileCheck },
      { href: "/training-development/role-play-simulator", label: "AI Role-Play Simulator", icon: MessageSquare },
    ],
  },
  {
    label: "Legal Reference Library",
    icon: Scale,
    items: [
      { href: "/legal-reference/statutes", label: "Florida Statutes", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Database", icon: Gavel },
      { href: "/legal-reference/constitutional-law-guide", label: "Constitutional Law", icon: ShieldAlert },
      { href: "/legal-reference/rules-of-criminal-procedure", label: "Criminal Procedure Rules", icon: FileText },
      { href: "/legal-reference/jury-instructions-navigator", label: "Standard Jury Instructions", icon: Users },
      { href: "/legal-reference/local-ordinances-guide", label: "Local Ordinances", icon: Home },
      { href: "/legal-reference/tenant-rights-guide", label: "Landlord-Tenant Law", icon: Home },
      { href: "/legal-reference/asset-forfeiture-guide", label: "Asset Forfeiture Procedures", icon: Scale },
      { href: "/legal-reference/miranda-warning-guide", label: "Miranda Rights Guide", icon: ShieldCheck },
      { href: "/legal-reference/rights-reference-guide", label: "Constitutional Rights Reference", icon: Scale },
      { href: "/legal-reference/statutory-case-law-updates", label: "Legal Updates & Changes", icon: Newspaper },
    ],
  },
  {
    label: "Field Operations & Procedures",
    icon: ShieldCheck,
    items: [
      { href: "/field-procedures/scenario-checklists", label: "Field Scenario Checklists", icon: ListChecks },
      { href: "/field-procedures/field-interview-contact", label: "Field Interview Standards", icon: Users },
      { href: "/traffic-enforcement/dui-investigation", label: "DUI Investigation Guide", icon: Car },
      { href: "/field-procedures/domestic-violence-protocol", label: "Domestic Violence Protocol", icon: ShieldAlert },
      { href: "/field-procedures/evidence-management-guide", label: "Evidence Management", icon: FileCheck },
      { href: "/field-procedures/crime-scene-management", label: "Crime Scene Management", icon: Wind },
      { href: "/field-procedures/interview-techniques", label: "Interview Techniques", icon: Users },
      { href: "/field-procedures/risk-protection-orders", label: "Risk Protection Orders", icon: ShieldAlert },
      { href: "/field-translation-guide", label: "Field Translator", icon: Languages },
    ],
  },
  {
    label: "Emergency Response Protocols",
    icon: Siren,
    items: [
      { href: "/emergency-response/alert-guides", label: "Emergency Alert Protocols", icon: AlertCircle },
      { href: "/emergency-response/first-aid-guide", label: "Field First Aid Guide", icon: HeartPulse },
      { href: "/emergency-response/hazmat-guide", label: "HAZMAT Response Guide", icon: Biohazard },
      { href: "/emergency-response/baker-act-guide", label: "Baker Act Procedures", icon: Heart },
      { href: "/emergency-response/marchman-act-guide", label: "Marchman Act Procedures", icon: FlaskConical },
    ],
  },
  {
    label: "Specialized Enforcement",
    icon: Search,
    items: [
      { href: "/specialized-enforcement/controlled-substances-guide", label: "Drug Identification Guide", icon: FlaskConical },
      { href: "/specialized-enforcement/k9-officer-guide", label: "K-9 Operations Manual", icon: Dog },
      { href: "/specialized-enforcement/fwc-regulations-guide", label: "Fish & Wildlife Regulations", icon: Fish },
      { href: "/traffic-enforcement/commercial-vehicle-info", label: "Commercial Vehicle Guide", icon: Truck },
      { href: "/specialized-enforcement/animal-cruelty-investigation", label: "Animal Cruelty Guide", icon: Stethoscope },
      { href: "/traffic-enforcement/traffic-statutes-schedules", label: "Traffic Enforcement Guide", icon: Car },
    ],
  },
  {
    label: "Report Writing & Documentation",
    icon: ClipboardEdit,
    items: [
      { href: "/notes", label: "Digital Field Notes", icon: ClipboardEdit },
      { href: "/reporting-development/use-of-force-wizard", label: "Use of Force Articulation", icon: ShieldCheck },
      { href: "/reporting-development/shift-report-generator", label: "Shift Report Generator", icon: ClipboardEdit },
      { href: "/field-procedures/digital-evidence-field-guide", label: "Digital Evidence Guide", icon: Camera },
    ]
  },
  {
    label: "Training & Professional Development",
    icon: GraduationCap,
    items: [
      { href: "/reporting-development/knowledge-check", label: "Knowledge Assessment Drills", icon: BrainCircuit },
      { href: "/training-development/common-misperceptions", label: "Common Field Pitfalls", icon: ShieldAlert },
      { href: "/officer-wellness-rights/court-testimony-guide", label: "Court Testimony Preparation", icon: Mic },
    ],
  },
  {
    label: "Officer Wellness & Rights",
    icon: Heart,
    items: [
      { href: "/wellness", label: "Wellness Resources Hub", icon: Heart },
      { href: "/officer-wellness-rights/police-officers-bill-of-rights", label: "Police Officer's Bill of Rights", icon: ShieldCheck },
      { href: "/officer-wellness-rights/community-engagement-guide", label: "Community Relations Guide", icon: Users },
      { href: "/daily-briefing", label: "Intelligence Briefing", icon: Newspaper },
      { href: "/wellness/active-listener", label: "Confidential Support Chat", icon: Heart },
      { href: "/wellness/live-debrief", label: "Incident Debrief Tool", icon: MessageSquare },
    ],
  },
];