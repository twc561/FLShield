import { PageHeader } from "@/components/PageHeader"
import { courtTestimonyData } from "@/data/officer-wellness-rights/court-testimony"
import { Summarizer } from "@/components/Summarizer"
import { CourtTestimonyClient } from "./Client"

export default function CourtTestimonyGuidePage() {
  const pageContent = courtTestimonyData.map(item => 
    `${item.title}: ${item.points.join('. ')}. Takeaway: ${item.takeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Court Testimony Guide"
          description="Preparation and best practices for delivering clear and professional testimony."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Court Testimony Summary"
        />
      </div>

      <CourtTestimonyClient data={courtTestimonyData} />
    </div>
  )
}
