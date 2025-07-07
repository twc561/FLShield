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
    id: "flowcharts",
    title: "Interactive Flowcharts",
    summary: "Visualize complex legal procedures and decision-making processes.",
    icon: "GitFork",
    targetPage: "/flowcharts",
    category: "Tools",
  },
  {
    id: "report-assistant",
    title: "Report Assistant",
    summary: "", // AI will generate this
    icon: "FileText",
    targetPage: "/reports",
    category: "Productivity",
  },
  {
    id: "field-notes",
    title: "Field Notes",
    summary: "Your persistent digital notepad. All notes are saved automatically.",
    icon: "Notebook",
    targetPage: "/notes",
    category: "Productivity",
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
