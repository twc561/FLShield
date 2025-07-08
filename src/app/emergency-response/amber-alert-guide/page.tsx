import { PageHeader } from "@/components/PageHeader"
import { alertGuideData } from "@/data/emergency-response/alert-guides"
import { AmberAlertClient } from "./Client"
import { Summarizer } from "@/components/Summarizer"

export default function AmberAlertGuidePage() {
  const data = alertGuideData.amber
  const pageContent = `${data.title}: ${data.criteria.map(c => `${c.title}: ${c.text}`).join('. ')}`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Amber Alert Guide"
          description="Criteria for issuing an Amber Alert in Florida and quick contact info."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Amber Alert Summary"
        />
      </div>
      <AmberAlertClient data={data} />
    </div>
  )
}
