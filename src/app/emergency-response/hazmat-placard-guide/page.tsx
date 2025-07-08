import { PageHeader } from "@/components/PageHeader"
import { hazmatData } from "@/data/emergency-response/hazmat"
import { HazmatClient } from "./Client"
import { Summarizer } from "@/components/Summarizer"

export default function HazmatPlacardGuidePage() {
  const pageContent = hazmatData.map(item => 
    `Placard ${item.id} (${item.name}): Hazards - ${item.hazards.join(', ')}. Public Safety - ${item.publicSafety.join('. ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="HAZMAT Placard Guide"
          description="Instantly look up HAZMAT placard numbers for ERG information."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="HAZMAT Guide Summary"
        />
      </div>

      <HazmatClient data={hazmatData} />
    </div>
  )
}
