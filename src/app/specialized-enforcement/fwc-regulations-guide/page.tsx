import { PageHeader } from "@/components/PageHeader"
import { fwcData } from "@/data/specialized-enforcement/fwc-regulations"
import { Summarizer } from "@/components/Summarizer"
import { FwcClient } from "./Client"

export default function FWCRegulationsGuidePage() {
  const pageContent = fwcData.map(item => 
    `${item.title}: ${item.points.join('. ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="FWC Regulations Guide"
          description="Quick reference for common Florida Fish and Wildlife regulations."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="FWC Guide Summary"
        />
      </div>

      <FwcClient data={fwcData} />
       <p className="text-center text-sm text-muted-foreground mt-8">Note: This is a summary. For full details, always consult the official FWC regulations.</p>
    </div>
  )
}
