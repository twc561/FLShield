import { PageHeader } from "@/components/PageHeader"
import { MessageSquareWarning } from "lucide-react"

export default function RightsReferenceGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Rights Reference Guide"
        description="Quick reference for key constitutional rights (e.g., Miranda, Garrity)."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <MessageSquareWarning className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will provide quick, AI-summarized guides on critical rights advisories.
        </p>
      </div>
    </div>
  )
}
