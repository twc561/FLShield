
import { PageHeader } from "@/components/PageHeader"
import { tenantRightsData } from "@/data/legal-reference/tenant-rights"
import { TenantRightsClient } from "./Client"

export default function TenantRightsGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Florida Tenant Rights Guide"
          description="Comprehensive guide to tenant rights and landlord obligations under Florida law for law enforcement reference"
        />
      </div>
      
      <TenantRightsClient data={tenantRightsData} />
    </div>
  )
}
