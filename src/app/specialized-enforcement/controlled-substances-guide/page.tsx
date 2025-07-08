
import { PageHeader } from "@/components/PageHeader"
import { substancePlaceholders } from "@/data/specialized-enforcement/controlled-substances-index"
import { ControlledSubstancesClient } from "./Client"

export default function ControlledSubstancesGuidePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Controlled Substances Field Guide"
        description="A detailed reference for common narcotics. Select a substance for an AI-powered analysis of its appearance, paraphernalia, legal status, and officer safety considerations."
      />
      <ControlledSubstancesClient initialPlaceholders={substancePlaceholders} />
    </div>
  )
}
