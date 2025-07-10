
import { PageHeader } from "@/components/PageHeader"
import { statutoryCaseLawUpdatesIndex } from "@/data/legal-reference/statutory-case-law-updates"
import { StatutoryCaseLawUpdatesClient } from "./Client"

export default function StatutoryCaseLawUpdatesPage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Statutory & Case Law Updates"
          description="A searchable archive of significant changes to Florida laws and relevant case law. Select an item for an AI-powered analysis."
        />
      </div>

      <StatutoryCaseLawUpdatesClient initialUpdates={statutoryCaseLawUpdatesIndex} />
    </div>
  )
}
