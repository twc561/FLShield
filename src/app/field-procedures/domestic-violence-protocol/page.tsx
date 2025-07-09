
import { PageHeader } from "@/components/PageHeader"
import { domesticViolenceData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { DomesticViolenceProtocolClient } from "./Client"

export default function DomesticViolenceProtocolPage() {
  const pageContent = domesticViolenceData.map(item => 
    `${item.title}: ${item.description} Key Points: ${item.details.join('. ')}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Domestic Violence Protocol"
          description="Guides on evidence gathering, victim resources, and enforcing injunctions."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="DV Protocol Summary"
        />
      </div>

      <DomesticViolenceProtocolClient data={domesticViolenceData} />
    </div>
  )
}
