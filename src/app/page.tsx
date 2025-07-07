import { DashboardCard } from "@/components/DashboardCard"
import { PageHeader } from "@/components/PageHeader"
import {
  Gavel,
  ScrollText,
  GitFork,
  FileText,
  Notebook,
} from "lucide-react"

const features = [
  {
    href: "/case-law",
    icon: Gavel,
    title: "Case Law Vault",
    description: "Search and review a comprehensive database of relevant case laws.",
  },
  {
    href: "/statutes",
    icon: ScrollText,
    title: "Statute Navigator",
    description: "Instantly access and search Florida statutes with a user-friendly interface.",
  },
  {
    href: "/flowcharts",
    icon: GitFork,
    title: "Interactive Flowcharts",
    description: "Visualize legal procedures and decision-making processes.",
  },
  {
    href: "/reports",
    icon: FileText,
    title: "Report Assistant",
    description: "Utilize templates to streamline your report writing process.",
  },
  {
    href: "/notes",
    icon: Notebook,
    title: "Field Notes",
    description: "A persistent digital notepad with auto-save for quick, on-the-go notes.",
  },
]

export default function DashboardPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Dashboard"
        description="Welcome to Florida Shield. Your digital toolkit for modern law enforcement."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <DashboardCard
            key={feature.title}
            {...feature}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-fade-in-up"
          />
        ))}
      </div>
    </div>
  )
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
