
import { PageHeader } from "@/components/PageHeader"
import { fieldInterviewData } from "@/data/field-procedures/field-interview-contact"
import { Summarizer } from "@/components/Summarizer"
import { FieldInterviewClient } from "./Client"

export default function FieldInterviewContactPage() {
  const pageContent = fieldInterviewData.map(encounter => 
    `${encounter.title} (Legal Standard: ${encounter.legalStandard}): Key Points: ${encounter.keyPoints.join(', ')} Case Law: ${encounter.caseLaw.name} - ${encounter.caseLaw.summary}`
  ).join('\n\n');
  
  return (
    <div className="animate-fade-in-up">
       <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Field Interview & Contact Guide"
          description="Legal standards and best practices for different levels of police-citizen encounters."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Field Interview Summary"
        />
      </div>
      
      <FieldInterviewClient data={fieldInterviewData} />
    </div>
  )
}
