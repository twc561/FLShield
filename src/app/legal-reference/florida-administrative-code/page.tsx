import { PageHeader } from "@/components/PageHeader"
import { floridaAdministrativeCodeData } from "@/data/legal-reference/florida-administrative-code"
import { Summarizer } from "@/components/Summarizer"
import { FloridaAdministrativeCodeClient } from "./Client"

export default function FloridaAdministrativeCodePage() {
  const pageContent = floridaAdministrativeCodeData.map(item => 
    `${item.title}: ${item.description}. Officer Impact: ${item.officerImpact}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Florida Administrative Code"
          description="Searchable access to the Florida Administrative Code (FAC)."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="FAC Summary"
        />
      </div>

      <FloridaAdministrativeCodeClient data={floridaAdministrativeCodeData} />
    </div>
  )
}
