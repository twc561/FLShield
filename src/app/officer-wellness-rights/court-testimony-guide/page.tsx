
import { PageHeader } from "@/components/PageHeader"
import { Landmark } from "lucide-react"

export default function CourtTestimonyGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Court Testimony Guide"
        description="AI-powered preparation tool for delivering clear and professional testimony."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <Landmark className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will feature an AI-powered tool to help you prepare for court, including checklists and common questions.
        </p>
      </div>
    </div>
  )
}
