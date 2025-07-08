
import { PageHeader } from "@/components/PageHeader"
import { GraduationCap } from "lucide-react"

export default function KnowledgeCheckPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Knowledge Check"
        description="Dynamically generated quizzes to keep your knowledge sharp."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <GraduationCap className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will provide AI-generated quizzes for roll-call training and knowledge sustainment.
        </p>
      </div>
    </div>
  )
}
