
import { PageHeader } from "@/components/PageHeader"
import { FeatureCard } from "@/components/FeatureCard"
import { Card, CardContent } from "@/components/ui/card"
import { dashboardFeatureGroups } from "@/data/dashboard-features"
import { Star, Lightbulb } from "lucide-react"
import type { FeatureModule } from "@/types"

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
      
      {/* Quick Pin Suggestion */}
      <Card className="border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <strong>💡 Quick Tip:</strong> Pin frequently used AI tools like <strong>AI Legal Advisor</strong> and <strong>Visual Evidence ID</strong> to your dashboard using the 
                <Star className="w-3 h-3 mx-1 inline text-amber-500" /> icon for instant access.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        {uniqueFeatures.map((module) => (
          <FeatureCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}
