import { PageHeader } from "@/components/PageHeader"
import { rulesOfCriminalProcedureData } from "@/data/legal-reference/rules-of-criminal-procedure"
import { Summarizer } from "@/components/Summarizer"
import { RulesOfCriminalProcedureClient } from "./Client"

export default function RulesOfCriminalProcedurePage() {
  const pageContent = rulesOfCriminalProcedureData.map(item => 
    `${item.title} (${item.ruleNumber}): ${item.summary}. Officer Impact: ${item.officerImpact}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Rules of Criminal Procedure"
          description="Searchable access to the Florida Rules of Criminal Procedure."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Rules of Criminal Procedure Summary"
        />
      </div>

      <RulesOfCriminalProcedureClient data={rulesOfCriminalProcedureData} />
    </div>
  )
}
