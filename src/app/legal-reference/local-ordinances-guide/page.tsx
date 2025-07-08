import { PageHeader } from "@/components/PageHeader"
import { Home } from "lucide-react"

export default function LocalOrdinancesGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Local Ordinances Guide"
        description="A guide to common local ordinances by county and municipality."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Home className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
         This section will feature an AI-powered search for local ordinances.
        </p>
      </div>
    </div>
  )
}
