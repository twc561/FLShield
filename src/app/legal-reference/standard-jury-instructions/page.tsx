import { PageHeader } from "@/components/PageHeader"
import { standardJuryInstructionsData } from "@/data/legal-reference/standard-jury-instructions"
import { Summarizer } from "@/components/Summarizer"
import { StandardJuryInstructionsClient } from "./Client"

export default function StandardJuryInstructionsPage() {
  const pageContent = standardJuryInstructionsData.map(item => 
    `${item.title}: ${item.description}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Standard Jury Instructions"
          description="Access to Florida's standard jury instructions for criminal cases."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Standard Jury Instructions Summary"
        />
      </div>

      <StandardJuryInstructionsClient data={standardJuryInstructionsData} />
    </div>
  )
}
