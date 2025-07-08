
import { PageHeader } from "@/components/PageHeader"
import { Stethoscope } from "lucide-react"

export default function AnimalCrueltyInvestigationPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Animal Cruelty Investigation"
        description="AI-powered checklist and guide for investigating animal cruelty under F.S. §828.12."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <Stethoscope className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will feature an AI-powered checklist guiding officers on evidence collection for animal cruelty cases.
        </p>
      </div>
    </div>
  )
}
