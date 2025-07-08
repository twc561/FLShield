
import { PageHeader } from "@/components/PageHeader"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AmberAlertGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Amber Alert Guide"
        description="Criteria for issuing an Amber Alert in Florida and quick contact info."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will provide the exact FDLE criteria for Amber Alerts and a one-touch button to initiate contact.
        </p>
        <Button className="mt-6" disabled>Contact FDLE Regional Office</Button>
      </div>
    </div>
  )
}
