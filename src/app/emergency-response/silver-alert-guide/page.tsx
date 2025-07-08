
import { PageHeader } from "@/components/PageHeader"
import { UserSearch } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SilverAlertGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Silver Alert Guide"
        description="Criteria for issuing a Silver Alert in Florida and quick contact info."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <UserSearch className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will provide the exact FDLE criteria for Silver Alerts and a one-touch button to initiate contact.
        </p>
        <Button className="mt-6" disabled>Contact FDLE Regional Office</Button>
      </div>
    </div>
  )
}
