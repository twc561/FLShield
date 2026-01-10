import { PageHeader } from "@/components/PageHeader"
import { FeatureCard } from "@/components/FeatureCard"
import { dashboardFeatureGroups } from "@/data/dashboard-features"

export default function TrainingDevelopmentPage() {
  const trainingFeatures = dashboardFeatureGroups.flatMap(group => 
    group.features.filter(feature => 
      feature.category === "Training & Professional Development" || 
      feature.targetPage.startsWith('/training-development')
    )
  );

  // De-duplicate features if they appear in multiple groups
  const uniqueFeatures = Array.from(new Map(trainingFeatures.map(item => [item.id, item])).values());

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Training & Development"
        description="Tools to sharpen your skills, test your knowledge, and improve your report writing."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueFeatures.map((module) => (
          <FeatureCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
