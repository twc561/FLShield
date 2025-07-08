import { PageHeader } from "@/components/PageHeader"
import { scenarioChecklistsData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { ScenarioChecklistsClient } from "./Client"

export default function ScenarioChecklistsPage() {
  const pageContent = scenarioChecklistsData.map(scenario => 
    `${scenario.title}: ${scenario.checklist.map(item => item.text).join('. ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Scenario Checklists"
          description="Step-by-step guides for common and critical field scenarios."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Scenario Checklists Summary"
        />
      </div>

      <ScenarioChecklistsClient data={scenarioChecklistsData} />
    </div>
  )
}
