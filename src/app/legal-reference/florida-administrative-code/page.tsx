import { PageHeader } from "@/components/PageHeader"
import { Building } from "lucide-react"

export default function FloridaAdministrativeCodePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Florida Administrative Code"
        description="Searchable access to the Florida Administrative Code (FAC)."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Building className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will feature an AI-powered search for the Florida Administrative Code.
        </p>
      </div>
    </div>
  )
}
