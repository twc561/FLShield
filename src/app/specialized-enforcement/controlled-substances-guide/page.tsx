import { PageHeader } from "@/components/PageHeader"
import { controlledSubstancesData } from "@/data"
import { ControlledSubstancesClient } from "./Client"

export default function ControlledSubstancesGuidePage() {

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Controlled Substances Field Guide"
        description="A visual quick-reference for common narcotics, including street names, paraphernalia, and relevant Florida statutes."
      />
      
      <ControlledSubstancesClient data={controlledSubstancesData} />
    </div>
  )
}
