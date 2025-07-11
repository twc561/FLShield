
import { PageHeader } from "@/components/PageHeader"
import { JuryInstructionsClient } from "./Client"
import { juryInstructionsIndex } from "@/data/legal-reference/jury-instructions-index"

export default function JuryInstructionsNavigatorPage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
        <PageHeader
            title="Jury Instructions Navigator"
            description="Select a common crime to get a detailed, AI-powered analysis of the evidence needed to build a strong case."
        />
        <JuryInstructionsClient initialInstructions={juryInstructionsIndex} />
    </div>
  )
}
