import { PageHeader } from "@/components/PageHeader"
import { Landmark } from "lucide-react"

export default function ConstitutionalLawGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Constitutional Law Guide"
        description="Core constitutional principles and amendments relevant to law enforcement."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Landmark className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will contain AI-generated summaries of key constitutional law concepts.
        </p>
      </div>
    </div>
  )
}
