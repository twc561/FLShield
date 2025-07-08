import { PageHeader } from "@/components/PageHeader"
import { Bot } from "lucide-react"

export default function AiLegalAdvisorPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Legal Advisor"
        description="Ask complex legal questions and get AI-powered answers."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Bot className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground">
          An interactive, AI-driven legal query feature will be available here.
        </p>
      </div>
    </div>
  )
}
