
import { PageHeader } from "@/components/PageHeader"
import { Biohazard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HazmatPlacardGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="HAZMAT Placard Guide"
        description="Instantly look up HAZMAT placard numbers for ERG information."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <Biohazard className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">HAZMAT Placard Lookup</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
          Enter the 4-digit number from a HAZMAT placard to get instant ERG information.
        </p>
        <div className="max-w-xs mx-auto">
          <Input
            placeholder="e.g., 1203"
            className="text-center text-lg h-12"
            disabled
          />
          <Button className="mt-4" disabled>Look Up Placard</Button>
           <p className="text-xs text-muted-foreground mt-4">Feature Coming Soon</p>
        </div>
      </div>
    </div>
  )
}
