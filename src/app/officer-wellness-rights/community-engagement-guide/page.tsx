
import { PageHeader } from "@/components/PageHeader"
import { communityEngagementData } from "@/data/officer-wellness-rights/community-engagement"
import { CommunityEngagementClient } from "./Client"

export default function CommunityEngagementGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Community Engagement Guide"
        description="Best practices, programs, and strategies for building positive police-community relations and fostering trust."
      />
      
      <CommunityEngagementClient data={communityEngagementData} />
    </div>
  )
}
