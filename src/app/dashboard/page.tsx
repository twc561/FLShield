
import { FeatureCard } from "@/components/FeatureCard"
import { PageHeader } from "@/components/PageHeader"
import { featureModules } from "@/data"
import { generateFeatureSummary } from "@/ai/flows/generate-feature-summary"

export default async function DashboardPage() {
  const modulesWithSummaries = await Promise.all(
    featureModules.map(async (module) => {
      if (!module.summary) {
        try {
          const result = await generateFeatureSummary({ title: module.title });
          return { ...module, summary: result.summary };
        } catch (error) {
          console.error(`Failed to generate summary for ${module.title}:`, error);
          // Provide a fallback summary
          return { ...module, summary: `Access tools and resources for ${module.title}.` };
        }
      }
      return module;
    })
  );

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
        {modulesWithSummaries.map((module, index) => (
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
