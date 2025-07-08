import { statuteIndex, statutesFullData } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import { StatuteClient } from "./StatuteClient"

export default function StatutePage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Statute Navigator"
        description="Search by keyword or statute number. If no local results are found, our AI will automatically search the Florida Statutes for you. You can also generate the 'Elements of the Crime' for any statute using AI."
      />
      <StatuteClient 
        initialStatuteIndex={statuteIndex}
        statutesFullData={statutesFullData}
      />
    </div>
  )
}
