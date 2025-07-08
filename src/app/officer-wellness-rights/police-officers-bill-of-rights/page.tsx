
import { PageHeader } from "@/components/PageHeader"
import { ShieldCheck } from "lucide-react"

export default function PoliceOfficersBillOfRightsPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Police Officer's Bill of Rights"
        description="AI-powered guide to your rights under F.S. §§ 112.531-112.535."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <ShieldCheck className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Feature Coming Soon</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          This section will feature an AI-powered search to answer your questions about the Police Officer's Bill of Rights in Florida.
        </p>
      </div>
    </div>
  )
}
