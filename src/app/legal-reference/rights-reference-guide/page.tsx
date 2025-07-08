import { PageHeader } from "@/components/PageHeader"
import { rightsReferenceData } from "@/data/legal-reference/rights-reference"
import { Summarizer } from "@/components/Summarizer"
import { RightsReferenceClient } from "./Client"

export default function RightsReferenceGuidePage() {
  const pageContent = rightsReferenceData.map(item => 
    `${item.title}: ${item.whenToUse}. Script: ${item.script}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Rights Reference Guide"
          description="Quick reference for key constitutional rights (e.g., Miranda, Garrity)."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Rights Reference Summary"
        />
      </div>
      
      <RightsReferenceClient data={rightsReferenceData} />
    </div>
  )
}
