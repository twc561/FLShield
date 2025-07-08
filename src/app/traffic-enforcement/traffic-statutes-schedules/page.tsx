
import { PageHeader } from "@/components/PageHeader"
import { trafficViolationsData } from "@/data"
import { TrafficStatutesClient } from "./Client"

export default function TrafficStatutesSchedulesPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Traffic Statutes & Schedules"
        description="A searchable quick-reference guide for common Florida traffic violations, including elements, fines, and officer notes."
      />
      <TrafficStatutesClient violations={trafficViolationsData} />
    </div>
  )
}
