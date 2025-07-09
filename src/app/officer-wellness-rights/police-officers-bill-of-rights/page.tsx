
import { PageHeader } from "@/components/PageHeader"
import { pobrData } from "@/data/officer-wellness-rights/pobr"
import { Summarizer } from "@/components/Summarizer"
import { PobrClient } from "./Client"

export default function PoliceOfficersBillOfRightsPage() {
  const pageContent = pobrData.map(item => 
    `${item.title} (F.S. ${item.statuteRef}): ${item.explanation}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Police Officer's Bill of Rights"
          description="Your rights under F.S. §§ 112.531-112.535 during internal investigations."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Police Officer's Bill of Rights Summary"
        />
      </div>

      <PobrClient data={pobrData} />
    </div>
  )
}
