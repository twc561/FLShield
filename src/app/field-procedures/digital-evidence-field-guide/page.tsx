import { PageHeader } from "@/components/PageHeader"
import { digitalEvidenceData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { DigitalEvidenceClient } from "./Client"

export default function DigitalEvidenceFieldGuidePage() {
  const pageContent = digitalEvidenceData.map(principle => 
    `${principle.title}: ${principle.description} Guidelines: ${principle.guidelines.join(', ')} Case Law: ${principle.caseLaw.name} - ${principle.caseLaw.summary}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Digital Evidence Field Guide"
          description="Procedures for lawfully seizing and handling digital evidence."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Digital Evidence Summary"
        />
      </div>
      
      <DigitalEvidenceClient data={digitalEvidenceData} />
    </div>
  )
}
