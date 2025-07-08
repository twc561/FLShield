import { PageHeader } from "@/components/PageHeader"
import { k9Data } from "@/data/specialized-enforcement/k9-guide"
import { Summarizer } from "@/components/Summarizer"
import { K9Client } from "./Client"

export default function K9OfficerGuidePage() {
  const pageContent = k9Data.map(item => 
    `${item.title}: ${item.points.map(p => p.summary).join('. ')}. Takeaway: ${item.takeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="K-9 Officer Guide"
          description="Key case law and best practices for K-9 deployments."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="K-9 Guide Summary"
        />
      </div>

      <K9Client data={k9Data} />
    </div>
  )
}
