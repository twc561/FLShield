
import { PageHeader } from "@/components/PageHeader"
import { standardJuryInstructionsPlaceholders } from "@/data/legal-reference/standard-jury-instructions"
import { StandardJuryInstructionsClient } from "./Client"

export default function StandardJuryInstructionsPage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Standard Jury Instructions Navigator"
        description="Select an instruction to get a detailed, AI-powered analysis focused on the evidence needed to build a strong case."
      />
      <StandardJuryInstructionsClient initialPlaceholders={standardJuryInstructionsPlaceholders} />
    </div>
  )
}
