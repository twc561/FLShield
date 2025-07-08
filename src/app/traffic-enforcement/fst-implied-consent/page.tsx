import { PageHeader } from "@/components/PageHeader"
import { fstData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { FstImpliedConsentClient } from "./Client"

export default function FstImpliedConsentPage() {
  const pageContent = fstData.map(item => 
    `${item.title}: ${item.description} Details: ${item.details?.join('. ') || ''} Script: ${item.script || ''}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="FST & Implied Consent Guide"
          description="Interactive walkthrough for DUI investigations, SFSTs, and Implied Consent warnings."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="FST & Implied Consent Summary"
        />
      </div>

      <FstImpliedConsentClient data={fstData} />
    </div>
  )
}
