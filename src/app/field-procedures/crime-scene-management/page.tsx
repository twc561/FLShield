import { PageHeader } from "@/components/PageHeader"
import { Search } from "lucide-react"

export default function CrimeSceneManagementPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Crime Scene Management"
        description="Guidelines and best practices for securing and processing a crime scene."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will contain AI-powered guides and checklists for crime scene management.
        </p>
      </div>
    </div>
  )
}
