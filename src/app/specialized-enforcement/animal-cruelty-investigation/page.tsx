import { PageHeader } from "@/components/PageHeader"
import { animalCrueltyGuideData } from "@/data/specialized-enforcement/animal-cruelty"
import { Summarizer } from "@/components/Summarizer"
import { AnimalCrueltyClient } from "./Client"

export default function AnimalCrueltyInvestigationPage() {
  const pageContent = `This guide covers legal definitions, field recognition, investigation protocols, and reporting for animal cruelty cases in Florida.`;

  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Animal Cruelty Field Guide"
          description="A comprehensive guide to investigating animal cruelty under F.S. § 828.12."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Animal Cruelty Guide Summary"
        />
      </div>

      <AnimalCrueltyClient data={animalCrueltyGuideData} />
    </div>
  )
}
