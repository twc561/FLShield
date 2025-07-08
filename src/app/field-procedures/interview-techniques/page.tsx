import { PageHeader } from "@/components/PageHeader"
import { interviewTechniquesData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { InterviewTechniquesClient } from "./Client"

export default function InterviewTechniquesPage() {
  const pageContent = interviewTechniquesData.map(technique =>
    `${technique.title}: ${technique.summary} Best for: ${technique.bestFor}. Phases: ${technique.phases.map(p => p.name).join(', ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Interview Techniques"
          description="Guides on various rapport-based interview and information-gathering methods."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Interview Techniques Summary"
        />
      </div>
      
      <InterviewTechniquesClient data={interviewTechniquesData} />
    </div>
  )
}
