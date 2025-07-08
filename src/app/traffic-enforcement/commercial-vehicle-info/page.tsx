import { PageHeader } from "@/components/PageHeader"
import { Truck } from "lucide-react"

export default function CommercialVehicleInfoPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Commercial Vehicle Info"
        description="Regulations and guidelines for commercial motor vehicle enforcement."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Truck className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
         This section will provide AI-powered search for commercial vehicle regulations.
        </p>
      </div>
    </div>
  )
}
