
import { PageHeader } from "@/components/PageHeader"
import { Gavel } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AiChargeAssistantPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Charge Assistant"
        description="Enter key facts and let the AI suggest appropriate Florida statutes to charge."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <Gavel className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Describe the Incident</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
          Provide a brief summary of the incident, and the AI will suggest relevant charges and their elements.
        </p>
        <div className="max-w-lg mx-auto">
          <Textarea
            placeholder="e.g., 'Subject was found inside a locked business at night with a crowbar and stolen goods.'"
            className="min-h-[100px]"
            disabled
          />
          <Button className="mt-4" disabled>Get Suggested Charges</Button>
           <p className="text-xs text-muted-foreground mt-4">Feature Coming Soon</p>
        </div>
      </div>
    </div>
  )
}
