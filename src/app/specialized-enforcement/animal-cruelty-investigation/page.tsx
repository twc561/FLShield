import { PageHeader } from "@/components/PageHeader"
import { animalCrueltyData } from "@/data/specialized-enforcement/animal-cruelty"
import { Summarizer } from "@/components/Summarizer"
import { AnimalCrueltyClient } from "./Client"

export default function AnimalCrueltyInvestigationPage() {
  const pageContent = animalCrueltyData.map(item => 
    `${item.title}: ${item.checklist.join('. ')}. Officer Takeaway: ${item.officerTakeaway}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Animal Cruelty Investigation"
          description="Checklist and guide for investigating animal cruelty under F.S. § 828.12."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Animal Cruelty Guide Summary"
        />
      </div>

      <AnimalCrueltyClient data={animalCrueltyData} />
    </div>
  )
}
