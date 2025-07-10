
import { caseLawIndex, caseLawsFullData } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import { CaseLawClient } from "./CaseLawClient"

export default function CaseLawPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Case Law Vault"
        description="Search and review relevant case laws by category. Use the AI Summarizer for quick insights."
      />
      <CaseLawClient initialCaseIndex={caseLawIndex} caseLawsFullData={caseLawsFullData} />
    </div>
  )
}
