import { PageHeader } from "@/components/PageHeader"
import { Footprints } from "lucide-react"

export default function FstImpliedConsentPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="FST & Implied Consent"
        description="Guides on Field Sobriety Tests and Implied Consent warnings."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
            <Footprints className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Content Coming Soon</h3>
        <p className="text-muted-foreground">
         This section will provide AI-powered guides and scripts for FSTs and Implied Consent.
        </p>
      </div>
    </div>
  )
}
