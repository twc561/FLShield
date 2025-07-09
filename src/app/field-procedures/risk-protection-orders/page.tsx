
import { PageHeader } from "@/components/PageHeader"
import { riskProtectionOrderData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { RiskProtectionOrdersClient } from "./Client"

export default function RiskProtectionOrdersPage() {
  const pageContent = riskProtectionOrderData.map(item => 
    `${item.title}: ${item.description} Details: ${item.details.join(', ')}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Risk Protection Orders (RPOs)"
          description="Procedures and requirements for obtaining Risk Protection Orders in Florida."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="RPO Summary"
        />
      </div>

      <RiskProtectionOrdersClient data={riskProtectionOrderData} />
    </div>
  )
}
