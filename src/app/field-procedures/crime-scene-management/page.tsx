
import { PageHeader } from "@/components/PageHeader"
import { crimeSceneManagementData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { CrimeSceneManagementClient } from "./Client"

export default function CrimeSceneManagementPage() {
  const pageContent = crimeSceneManagementData.map(step => 
    `${step.title}: ${step.description} Key Points: ${step.keyPoints.join(', ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Crime Scene Management"
          description="Guidelines and best practices for securing and processing a crime scene."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Crime Scene Management Summary"
        />
      </div>

      <CrimeSceneManagementClient data={crimeSceneManagementData} />
    </div>
  )
}
