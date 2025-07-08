
import { PageHeader } from "@/components/PageHeader"
import { k9GuideIndex } from "@/data/specialized-enforcement/k9-guide-index"
import { Summarizer } from "@/components/Summarizer"
import { K9GuideClient } from "./Client"

export default function K9OfficerGuidePage() {
  const pageContent = `A dual-audience guide for K-9 operations. For Handlers: In-depth review of case law, training documentation, and deployment tactics. For Patrol Officers: Best practices for assisting K-9 units, understanding capabilities, and ensuring scene integrity.`;

  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="K-9 Operations Guide"
          description="A role-based guide for K-9 Handlers and Patrol Officers."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="K-9 Guide Summary"
        />
      </div>

      <K9GuideClient guideIndex={k9GuideIndex} />
    </div>
  )
}
