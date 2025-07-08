import { PageHeader } from "@/components/PageHeader"
import { firstAidData } from "@/data/emergency-response/first-aid"
import { Summarizer } from "@/components/Summarizer"
import { FirstAidClient } from "./Client"

export default function FirstAidFieldGuidePage() {
  const pageContent = firstAidData.map(item => 
    `${item.title}: ${item.steps.map(s => `${s.title} - ${s.text}`).join('. ')}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="First Aid Field Guide"
          description="A tactical medical guide for common field injuries, based on TECC principles."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="First Aid Summary"
        />
      </div>
      <FirstAidClient data={firstAidData} />
    </div>
  )
}
