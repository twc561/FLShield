import { PageHeader } from "@/components/PageHeader"
import { localOrdinancesData } from "@/data/legal-reference/local-ordinances"
import { Summarizer } from "@/components/Summarizer"
import { LocalOrdinancesClient } from "./Client"

export default function LocalOrdinancesGuidePage() {
  const pageContent = localOrdinancesData.map(item => 
    `${item.title}: ${item.description}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Local Ordinances Guide"
          description="A guide to common local ordinances by county and municipality."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Local Ordinances Summary"
        />
      </div>

      <LocalOrdinancesClient data={localOrdinancesData} />
    </div>
  )
}
