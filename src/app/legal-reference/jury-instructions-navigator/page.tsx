
import { PageHeader } from "@/components/PageHeader"
import { JuryInstructionsClient } from "./Client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function JuryInstructionsNavigatorPage() {
  return (
    <div className="animate-fade-in-up">
        <PageHeader
            title="Jury Instructions Navigator"
            description="Enter a crime to get a detailed, AI-powered analysis of the evidence needed to build a strong case."
        />
        <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>How It Works</AlertTitle>
            <AlertDescription>
            This tool uses a multi-step AI process. It first identifies the relevant Florida Statute for your query, maps it to the correct jury instruction, and then provides a detailed analysis. This ensures accuracy.
            </AlertDescription>
        </Alert>
        <JuryInstructionsClient />
    </div>
  )
}
