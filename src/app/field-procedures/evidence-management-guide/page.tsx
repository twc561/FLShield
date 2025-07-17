import { PageHeader } from "@/components/PageHeader"
import EvidenceManagementClient from "./Client"

export default function EvidenceManagementGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Evidence Management Guide"
          description="Complete procedures for evidence collection, chain of custody, and court preparation"
        />
      </div>

      <EvidenceManagementClient />
    </div>
  )
}