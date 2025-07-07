import { FeatureCard } from "@/components/FeatureCard"
import { PageHeader } from "@/components/PageHeader"
import { featureModules } from "@/data"

export default function DashboardPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Dashboard"
        description="Welcome to Florida Shield. Your digital toolkit for modern law enforcement."
      />
      <div
        id="dashboard-grid"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {featureModules.map((module, index) => (
          <FeatureCard
            key={module.id}
            module={module}
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
    style?: React.CSSProperties & { [key: string]: string | number }
  }
}
