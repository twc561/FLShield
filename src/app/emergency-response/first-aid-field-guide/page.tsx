
import { PageHeader } from "@/components/PageHeader"
import { HeartPulse } from "lucide-react"

export default function FirstAidFieldGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="First Aid Field Guide"
        description="AI-powered tactical medical guide for common field injuries."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <HeartPulse className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground">
          This section will provide an AI-powered tactical medical guide for immediate field use.
        </p>
      </div>
    </div>
  )
}
