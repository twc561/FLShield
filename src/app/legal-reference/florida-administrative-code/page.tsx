
import { PageHeader } from "@/components/PageHeader"
import { facPlaceholders } from "@/data/legal-reference/florida-administrative-code"
import { FloridaAdministrativeCodeClient } from "./Client"

export default function FloridaAdministrativeCodePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Florida Administrative Code"
        description="Select a rule to get a detailed, AI-powered analysis of its requirements and enforcement guidance for patrol officers."
      />
      <FloridaAdministrativeCodeClient initialPlaceholders={facPlaceholders} />
    </div>
  )
}
