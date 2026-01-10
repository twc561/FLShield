
import { PageHeader } from "@/components/PageHeader"
import { FeatureCard } from "@/components/FeatureCard"
import { dashboardFeatureGroups } from "@/data/dashboard-features"

export default function AiToolsPage() {
  const aiFeatures = dashboardFeatureGroups.flatMap(group => 
    group.features.filter(feature => 
      feature.category === "AI Assistant Tools"
    )
  );

  // De-duplicate features if they appear in multiple groups
  const uniqueFeatures = Array.from(new Map(aiFeatures.map(item => [item.id, item])).values());

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Assistant Tools"
        description="Leverage artificial intelligence to enhance your decision-making, reporting, and training."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueFeatures.map((module) => (
          <FeatureCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
