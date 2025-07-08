import { PageHeader } from "@/components/PageHeader"
import { FileText } from "lucide-react"

export default function RulesOfCriminalProcedurePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Rules of Criminal Procedure"
        description="Searchable access to the Florida Rules of Criminal Procedure."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <FileText className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will feature an AI-powered search for the Rules of Criminal Procedure.
        </p>
      </div>
    </div>
  )
}
