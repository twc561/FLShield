
import { PageHeader } from "@/components/PageHeader"
import { duiInvestigationGuideData } from "@/data/traffic-enforcement/dui-investigation"
import { DuiInvestigationClient } from "./Client"
import { Summarizer } from "@/components/Summarizer"

export default function DuiInvestigationPage() {
  const pageContent = `This end-to-end guide covers the three phases of a DUI investigation as defined by NHTSA. It provides detailed checklists, trilingual FST instructions and Implied Consent warnings, and guidance on report writing and court testimony to build a strong, prosecutable case under Florida law.`

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="DUI Investigation Guide"
          description="An end-to-end procedural guide for DUI stops, from initial detection to courtroom testimony."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="DUI Investigation Summary"
        />
      </div>

      <DuiInvestigationClient data={duiInvestigationGuideData} />
    </div>
  )
}
