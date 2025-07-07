import { caseLaws } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import { CaseLawClient } from "./CaseLawClient"

export default function CaseLawPage() {
  // In a real app, this data would be fetched from a database.
  const cases = caseLaws

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Case Law Vault"
        description="Search and review relevant case laws. Use the AI Summarizer for quick insights."
      />
      <CaseLawClient initialCases={cases} />
    </div>
  )
}
