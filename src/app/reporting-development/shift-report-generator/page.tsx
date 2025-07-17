
import { PageHeader } from "@/components/PageHeader"
import { ShiftReportClient } from "./Client"

export default function ShiftReportGeneratorPage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Shift Report Generator"
        description="Document your entire shift activities, metrics, and observations in a comprehensive report format."
      />
      <ShiftReportClient />
    </div>
  )
}
