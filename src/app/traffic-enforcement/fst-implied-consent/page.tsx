
import { PageHeader } from "@/components/PageHeader"
import { fstTrilingualData } from "@/data"
import { Summarizer } from "@/components/Summarizer"
import { FstImpliedConsentClient } from "./Client"

export default function FstImpliedConsentPage() {
  const pageContent = `This guide provides standardized instructions and legal warnings for DUI investigations in English, Spanish, and Haitian Creole. It covers proper FST administration and the precise language for Florida's Implied Consent laws.`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Trilingual FST & Implied Consent Guide"
          description="Standardized instructions and warnings in English, Spanish, and Haitian Creole."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="FST & Implied Consent Summary"
        />
      </div>

      <FstImpliedConsentClient data={fstTrilingualData} />
    </div>
  )
}
