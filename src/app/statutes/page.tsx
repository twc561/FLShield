import { statutes } from "@/data"
import { PageHeader } from "@/components/PageHeader"
import { StatuteClient } from "./StatuteClient"

export default function StatutePage() {
  const allStatutes = statutes

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Statute Navigator"
        description="Search and review Florida statutes. Use the AI Summarizer for quick insights."
      />
      <StatuteClient initialStatutes={allStatutes} />
    </div>
  )
}
