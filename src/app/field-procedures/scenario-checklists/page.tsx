import { PageHeader } from "@/components/PageHeader"
import { scenarioChecklistsData } from "@/data"
import { ScenarioChecklistsClient } from "./Client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScenarioChecklistsPage() {
  const scenarios = Object.values(scenarioChecklistsData)
  const defaultScenarioId = scenarios.length > 0 ? scenarios[0].id : ""

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Interactive Scenario Checklists"
        description="Select a scenario below to begin a step-by-step interactive walkthrough or view a static checklist."
      />

      {scenarios.length > 0 ? (
        <Tabs defaultValue={defaultScenarioId} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
            {scenarios.map(scenario => (
              <TabsTrigger key={scenario.id} value={scenario.id}>
                {scenario.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {scenarios.map(scenario => (
            <TabsContent key={scenario.id} value={scenario.id} className="mt-6">
              <PageHeader title={scenario.name} description={scenario.goal} />
              <ScenarioChecklistsClient scenario={scenario} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <p className="text-muted-foreground">No scenarios available.</p>
      )}
    </div>
  )
}
