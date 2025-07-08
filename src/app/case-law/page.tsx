import { caseLawIndex, caseLawsFullData } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import { CaseLawClient } from "../legal-reference/case-law/CaseLawClient"

export default function CaseLawPage() {
  // This page now uses the more performant client from the legal-reference section,
  // which uses a placeholder index and lazy-loads full case details.
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
