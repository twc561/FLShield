import { PageHeader } from "@/components/PageHeader"
import { statutoryCaseLawUpdatesData } from "@/data/legal-reference/statutory-case-law-updates"
import { Summarizer } from "@/components/Summarizer"
import { StatutoryCaseLawUpdatesClient } from "./Client"

export default function StatutoryCaseLawUpdatesPage() {
  const pageContent = statutoryCaseLawUpdatesData.map(update => 
    `${update.title} (${update.type} - ${update.date}): ${update.summary}. Officer Impact: ${update.officerImpact}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Statutory & Case Law Updates"
          description="The latest updates and changes to Florida laws and relevant case law."
        />
         <Summarizer 
          documentText={pageContent}
          documentTitle="Legal Updates Summary"
        />
      </div>

      <StatutoryCaseLawUpdatesClient data={statutoryCaseLawUpdatesData} />
       <p className="text-center text-sm text-muted-foreground mt-8">Note: This section is for informational purposes. Consult official sources for the latest legal changes.</p>
    </div>
  )
}
