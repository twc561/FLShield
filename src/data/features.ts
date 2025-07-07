export interface FeatureModule {
  id: string
  title: string
  summary: string // Can be an empty string "" to trigger AI generation.
  icon: string // Corresponds to a name in the lucide-react library
  targetPage: string
  category: string
}

export const featureModules: FeatureModule[] = [
  {
    id: "case-law-vault",
    title: "Case Law Vault",
    summary: "Explore landmark case law relevant to Florida officers.",
    icon: "Gavel",
    targetPage: "/case-law",
    category: "Reference",
  },
  {
    id: "statute-navigator",
    title: "Statute Navigator",
    summary: "", // AI will generate this
    icon: "ScrollText",
    targetPage: "/statutes",
    category: "Reference",
  },
  {
    id: "report-writer",
    title: "Report Writer",
    summary: "", // AI will generate this
    icon: "FileText",
    targetPage: "/reports",
    category: "Productivity",
  },
  {
    id: "hazmat-guide",
    title: "Hazmat Guide",
    summary: "A visual guide to DOT hazardous materials placards.",
    icon: "Biohazard",
    targetPage: "/", // Points to dashboard for now
    category: "Tools",
  },
  {
    id: "field-tools",
    title: "Field Tools",
    summary: "A collection of essential interactive field utilities.",
    icon: "Wrench",
    targetPage: "/", // Points to dashboard for now
    category: "Tools",
  },
  {
    id: "officer-wellness",
    title: "Officer Wellness",
    summary: "", // AI will generate this
    icon: "HeartPulse",
    targetPage: "/", // Points to dashboard for now
    category: "Support",
  },
]
