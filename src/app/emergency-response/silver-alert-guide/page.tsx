import { PageHeader } from "@/components/PageHeader"
import { alertGuideData } from "@/data/emergency-response/alert-guides"
import { SilverAlertClient } from "./Client"
import { Summarizer } from "@/components/Summarizer"

export default function SilverAlertGuidePage() {
  const data = alertGuideData.silver
  const pageContent = `${data.title}: ${data.criteria.map(c => `${c.title}: ${c.text}`).join('. ')}`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Silver Alert Guide"
          description="Criteria for issuing a Silver Alert in Florida and quick contact info."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Silver Alert Summary"
        />
      </div>
      <SilverAlertClient data={data} />
    </div>
  )
}
