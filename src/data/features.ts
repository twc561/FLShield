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
    id: "ai-legal-advisor",
    title: "AI Legal Advisor",
    summary: "Ask complex legal questions and get AI-powered answers. Your on-demand paralegal.",
    icon: "Bot",
    targetPage: "/ai-legal-advisor",
    category: "AI Tools",
  },
  {
    id: "legal-reference",
    title: "Legal Reference",
    summary: "Access a comprehensive library of statutes, case law, and procedural guides.",
    icon: "Book",
    targetPage: "/legal-reference/statutes",
    category: "Reference",
  },
  {
    id: "field-procedures",
    title: "Field Procedures",
    summary: "Step-by-step checklists and guides for common law enforcement scenarios.",
    icon: "ClipboardList",
    targetPage: "/field-procedures/scenario-checklists",
    category: "Tools",
  },
  {
    id: "traffic-enforcement",
    title: "Traffic Enforcement",
    summary: "Quick access to traffic statutes, fine schedules, and DUI procedures.",
    icon: "Car",
    targetPage: "/traffic-enforcement/traffic-statutes-schedules",
    category: "Tools",
  },
  {
    id: "statute-navigator",
    title: "Statute Navigator",
    summary: "Search and explore the full range of Florida criminal and traffic statutes.",
    icon: "Scale",
    targetPage: "/legal-reference/statutes",
    category: "Reference",
  },
  {
    id: "case-law-vault",
    title: "Case Law Vault",
    summary: "Explore landmark case law relevant to Florida officers with AI-powered summaries.",
    icon: "Gavel",
    targetPage: "/legal-reference/case-law",
    category: "Reference",
  },
]
