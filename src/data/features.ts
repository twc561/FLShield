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
    id: "ai-report-writer",
    title: "AI Report Writer",
    summary: "Dictate or type free-form narratives and let the AI automatically structure, format, and proofread them into professional reports.",
    icon: "ClipboardEdit",
    targetPage: "/reporting-development/ai-report-writer",
    category: "AI Tools",
  },
  {
    id: "legal-reference",
    title: "Legal Reference",
    summary: "Access a comprehensive library of Florida statutes, case law, and procedural guides.",
    icon: "Book",
    targetPage: "/legal-reference/statutes",
    category: "Reference",
  },
  {
    id: "use-of-force-wizard",
    title: "Use of Force Wizard",
    summary: "An interactive AI tool that guides you through a Graham v. Connor analysis to help articulate justifications for use of force.",
    icon: "ShieldQuestion",
    targetPage: "/reporting-development/use-of-force-wizard",
    category: "Reporting",
  },
  {
    id: "traffic-enforcement",
    title: "Traffic Enforcement",
    summary: "Instant access to Florida traffic statutes, fine schedules, and AI-powered DUI/FST procedure guides.",
    icon: "Car",
    targetPage: "/traffic-enforcement/traffic-statutes-schedules",
    category: "Tools",
  },
  {
    id: "emergency-response",
    title: "Emergency Response",
    summary: "AI-driven guides for critical incidents, including Baker/Marchman Acts, HAZMAT placards, and First Aid.",
    icon: "Siren",
    targetPage: "/emergency-response/baker-marchman-act",
    category: "Response",
  },
  {
    id: "officer-wellness",
    title: "Officer Wellness & Rights",
    summary: "Resources for your well-being, including an AI guide to the Police Officer's Bill of Rights and court testimony prep.",
    icon: "ShieldHelp",
    targetPage: "/officer-wellness-rights/police-officers-bill-of-rights",
    category: "Wellness",
  },
]
