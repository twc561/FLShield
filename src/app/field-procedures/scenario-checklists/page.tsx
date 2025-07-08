import { PageHeader } from "@/components/PageHeader"
import { scenarioChecklistsData } from "@/data"
import { ScenarioChecklistsClient } from "./Client"

export default function ScenarioChecklistsPage() {
  const duiScenario = scenarioChecklistsData['dui-investigation'];

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title={duiScenario.name}
          description={duiScenario.goal}
        />
      </div>

      <ScenarioChecklistsClient scenario={duiScenario} />
    </div>
  )
}
