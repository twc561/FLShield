
import { PageHeader } from "@/components/PageHeader"
import { ShieldQuestion } from "lucide-react"

export default function UseOfForceWizardPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Use of Force Wizard"
        description="Interactive AI tool to help articulate the justification for use of force incidents."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <ShieldQuestion className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will feature an interactive AI wizard to guide you through a Graham v. Connor analysis for your report.
        </p>
      </div>
    </div>
  )
}
