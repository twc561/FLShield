import { PageHeader } from "@/components/PageHeader"
import { scenarioChecklistsData } from "@/data"
import { ScenarioChecklistsClient } from "./Client"
import type { Scenario } from "@/data"

export default function ScenarioChecklistsPage() {
  const scenarios = Object.values(scenarioChecklistsData)

  const groupedScenarios = scenarios.reduce((acc, scenario) => {
    const { category } = scenario;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(scenario);
    return acc;
  }, {} as Record<string, Scenario[]>);

  const categoryOrder = [
    'Patrol Operations',
    'Crimes Against Persons',
    'Property Crimes',
    'General Investigations',
    'Death Investigations',
    'Emergency Response',
  ];

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Scenario Checklists"
        description="Search or browse our library of interactive guides and procedural checklists for common law enforcement scenarios."
      />
      <ScenarioChecklistsClient 
        initialScenarios={scenarios}
        groupedScenarios={groupedScenarios}
        categoryOrder={categoryOrder}
      />
    </div>
  )
}
