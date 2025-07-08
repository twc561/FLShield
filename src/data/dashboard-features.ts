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
} from "lucide-react"

export type FeatureGroup = {
  category: string
  icon: React.ElementType
  features: FeatureModule[]
}

export const dashboardFeatureGroups: FeatureGroup[] = [
  {
    category: "Investigation Guides",
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
        id: "dui-investigation-guide",
        title: "DUI Investigation Guide",
        summary: "End-to-end procedural guide for DUI stops.",
        icon: "Footprints",
        targetPage: "/traffic-enforcement/dui-investigation",
        category: "Traffic Enforcement",
      },
      {
        id: "animal-cruelty-guide",
        title: "Animal Cruelty Guide",
        summary: "Comprehensive guide to investigating animal cruelty cases.",
        icon: "Stethoscope",
        targetPage: "/specialized-enforcement/animal-cruelty-investigation",
        category: "Specialized Enforcement",
      },
    ],
  },
  {
    category: "Reference Libraries",
    icon: Book,
    features: [
      {
        id: "statute-navigator",
        title: "Statute Navigator",
        summary: "Searchable Florida Statutes, with AI-powered search.",
        icon: "Scale",
        targetPage: "/legal-reference/statutes",
        category: "Legal Reference",
      },
      {
        id: "case-law-vault",
        title: "Case Law Vault",
        summary: "Review key case law holdings relevant to patrol.",
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
    category: "Field Tools",
    icon: Wrench,
    features: [
      {
        id: "field-translation-guide",
        title: "Field Translation Guide",
        summary: "Trilingual audio phrases for common field encounters.",
        icon: "Languages",
        targetPage: "/field-translation-guide",
        category: "Communication Tools",
      },
      {
        id: "commercial-vehicle-info",
        title: "Commercial Vehicle Info",
        summary: "Quick reference for CMV driver and vehicle violations.",
        icon: "Truck",
        targetPage: "/traffic-enforcement/commercial-vehicle-info",
        category: "Traffic Enforcement",
      },
      {
        id: "hazmat-placard-guide",
        title: "HAZMAT Placard Guide",
        summary: "Instantly look up HAZMAT placard numbers for ERG info.",
        icon: "Biohazard",
        targetPage: "/emergency-response/hazmat-placard-guide",
        category: "Emergency Response",
      },
    ],
  },
  {
    category: "Training & Development",
    icon: GraduationCap,
    features: [
      {
        id: "role-play-simulator",
        title: "AI Role-Play Simulator",
        summary: "Practice interview and de-escalation skills against AI characters.",
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
        id: "knowledge-check",
        title: "Knowledge Check",
        summary: "Test your knowledge with quizzes on law and procedure.",
        icon: "GraduationCap",
        targetPage: "/reporting-development/knowledge-check",
        category: "Training & Development",
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
