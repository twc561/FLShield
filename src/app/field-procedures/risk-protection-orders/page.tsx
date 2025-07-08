import { PageHeader } from "@/components/PageHeader"
import { ShieldAlert } from "lucide-react"

export default function RiskProtectionOrdersPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Risk Protection Orders"
        description="Procedures and requirements for obtaining Risk Protection Orders (RPOs)."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <ShieldAlert className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will provide AI-powered checklists and guides for the RPO process.
        </p>
      </div>
    </div>
  )
}
