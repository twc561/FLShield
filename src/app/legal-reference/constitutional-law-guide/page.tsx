import { PageHeader } from "@/components/PageHeader"
import { constitutionalLawPlaceholders } from "@/data/legal-reference/constitutional-law"
import { ConstitutionalLawClient } from "./Client"

export default function ConstitutionalLawGuidePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Constitutional Law Navigator"
        description="Select a constitutional provision to get a detailed, AI-powered analysis including landmark cases and officer field tests."
      />
      <ConstitutionalLawClient initialPlaceholders={constitutionalLawPlaceholders} />
    </div>
  )
}
