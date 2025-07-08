import { PageHeader } from "@/components/PageHeader"
import { rulesOfCriminalProcedurePlaceholders } from "@/data/legal-reference/rules-of-criminal-procedure"
import { RulesOfCriminalProcedureClient } from "./Client"

export default function RulesOfCriminalProcedurePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Rules of Criminal Procedure"
        description="Select a rule to get a detailed, AI-powered analysis including a plain-language summary and its practical field application."
      />
      <RulesOfCriminalProcedureClient initialPlaceholders={rulesOfCriminalProcedurePlaceholders} />
    </div>
  )
}
