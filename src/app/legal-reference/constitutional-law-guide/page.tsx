import { PageHeader } from "@/components/PageHeader"
import { constitutionalLawData } from "@/data/legal-reference/constitutional-law"
import { Summarizer } from "@/components/Summarizer"
import { ConstitutionalLawClient } from "./Client"

export default function ConstitutionalLawGuidePage() {
  const pageContent = constitutionalLawData.map(amendment => 
    `${amendment.title}: ${amendment.summary}. Officer Takeaway: ${amendment.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Constitutional Law Guide"
          description="Core constitutional principles and amendments relevant to law enforcement."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Constitutional Law Guide Summary"
        />
      </div>

      <ConstitutionalLawClient data={constitutionalLawData} />
    </div>
  )
}
