
import { PageHeader } from "@/components/PageHeader"
import { ClipboardEdit } from "lucide-react"

export default function AiReportWriterPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Report Writer"
        description="Dictate or type your narrative, and let the AI structure it into a professional report."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <ClipboardEdit className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will feature an AI-powered report writing assistant to streamline your documentation process.
        </p>
      </div>
    </div>
  )
}
