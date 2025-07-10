import type { FeatureModule } from "@/types"
import {
  Book,
  ListChecks,
  Languages,
  Car,
  Wrench,
  Siren,
  Briefcase,
  GraduationCap,
  Heart,
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
} from "lucide-react"

export type FeatureGroup = {
  category: string
  icon: React.ElementType
  features: FeatureModule[]
}

export const dashboardFeatureGroups: FeatureGroup[] = [
  {
    category: "Legal Reference",
    icon: Book,
    features: [
      {
        id: "statute-navigator",
        title: "Statute Navigator",
        summary: "AI-powered search of all Florida Statutes.",
        icon: "Scale",
        targetPage: "/legal-reference/statutes",
        category: "Legal Reference",
      },
      {
        id: "case-law-vault",
        title: "Case Law Vault",
        summary: "Plain-language summaries of landmark case law.",
        icon: "Gavel",
        targetPage: "/legal-reference/case-law",
        category: "Legal Reference",
      },
      {
        id: "fwc-regulations-guide",
        title: "FWC Regulations Guide",
        summary: "Searchable FWC rules for fishing, hunting, and boating.",
        icon: "Fish",
        targetPage: "/specialized-enforcement/fwc-regulations-guide",
        category: "Specialized Enforcement",
      },
    ],
  },
  {
    category: "Field Tools & Guides",
    icon: ListChecks,
    features: [
      {
        id: "scenario-checklists",
        title: "Scenario Checklists",
        summary: "Interactive guides for common field scenarios like DUI and DV.",
        icon: "ListChecks",
        targetPage: "/field-procedures/scenario-checklists",
        category: "Field Procedures",
      },
       {
        id: "hazmat-placard-guide",
        title: "HAZMAT Placard Guide",
        summary: "Instantly look up HAZMAT placard numbers for ERG info.",
        icon: "Biohazard",
        targetPage: "/emergency-response/hazmat-guide",
        category: "Emergency Response",
      },
       {
        id: "visual-evidence-identifier",
        title: "Visual Evidence ID",
        summary: "Use your camera to identify unknown pills and other items.",
        icon: "Camera",
        targetPage: "/field-procedures/visual-evidence-identifier",
        category: "Field Procedures",
      },
    ],
  },
  {
    category: "Training & Development",
    icon: GraduationCap,
    features: [
       {
        id: "role-play-simulator",
        title: "AI De-escalation Coach",
        summary: "Practice de-escalation skills against AI characters.",
        icon: "MessageSquare",
        targetPage: "/training-development/role-play-simulator",
        category: "Training & Development",
      },
      {
        id: "report-proofreader",
        title: "AI Report Proofreader",
        summary: "Get instant feedback on anonymized report narratives.",
        icon: "FileCheck",
        targetPage: "/training-development/report-proofreader",
        category: "Training & Development",
      },
      {
        id: "ai-report-writer",
        title: "AI Report Assistant",
        summary: "Transform your notes into a formal report narrative.",
        icon: "ClipboardEdit",
        targetPage: "/reporting-development/ai-report-writer",
        category: "Reporting & Development"
      },
    ],
  },
  {
    category: "Officer Wellness & Rights",
    icon: Heart,
    features: [
      {
        id: "wellness-hub",
        title: "Wellness Hub",
        summary: "Access the confidential chatbot and guided decompression sessions.",
        icon: "ShieldQuestion",
        targetPage: "/wellness",
        category: "Wellness",
      },
      {
        id: "pobr-guide",
        title: "Police Officer's Bill of Rights",
        summary: "Your rights under F.S. §§ 112.531-112.535 during IA investigations.",
        icon: "ShieldCheck",
        targetPage: "/officer-wellness-rights/police-officers-bill-of-rights",
        category: "Wellness",
      },
      {
        id: "court-testimony-guide",
        title: "Court Testimony Guide",
        summary: "Preparation and best practices for delivering clear testimony.",
        icon: "Mic",
        targetPage: "/officer-wellness-rights/court-testimony-guide",
        category: "Wellness",
      },
    ],
  },
]
