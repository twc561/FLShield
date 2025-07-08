import { PageHeader } from "@/components/PageHeader"
import { ListChecks } from "lucide-react"

export default function StandardJuryInstructionsPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Standard Jury Instructions"
        description="Access to Florida's standard jury instructions for criminal cases."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <ListChecks className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will feature an AI-powered search for standard jury instructions.
        </p>
      </div>
    </div>
  )
}
