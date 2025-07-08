
import { PageHeader } from "@/components/PageHeader"
import { rightsReferenceData } from "@/data/legal-reference/rights-reference"
import { RightsReferenceClient } from "./Client"

export default function RightsReferenceGuidePage() {
  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Rights Reference Guide"
          description="Quick reference for key constitutional and procedural rights relevant to law enforcement officers."
        />
      </div>
      
      <RightsReferenceClient data={rightsReferenceData} />
    </div>
  )
}
