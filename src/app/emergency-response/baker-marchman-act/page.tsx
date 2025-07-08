
import { PageHeader } from "@/components/PageHeader"
import { BrainCircuit } from "lucide-react"

export default function BakerMarchmanActPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Baker Act & Marchman Act"
        description="AI-driven wizard to assist in involuntary commitment decisions."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <BrainCircuit className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will feature an AI wizard to help determine if criteria are met for the Baker or Marchman Acts and provide de-escalation tactics.
        </p>
      </div>
    </div>
  )
}
