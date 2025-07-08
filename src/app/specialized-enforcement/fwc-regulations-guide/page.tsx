
import { PageHeader } from "@/components/PageHeader"
import { Fish } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function FWCRegulationsGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="FWC Regulations Guide"
        description="AI-powered natural language search for Florida Fish and Wildlife regulations."
      />
      <div className="p-8 text-center border-2 border-dashed rounded-lg mt-8">
        <div className="flex justify-center mb-4">
          <Fish className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">AI-Powered FWC Search</h3>
        <p className="text-muted-foreground max-w-md mx-auto mt-2 mb-6">
          Ask a question like "bag limit for snook in St. Lucie County" or "boating safety equipment for a 20-foot vessel".
        </p>
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Ask a question about FWC regulations..."
              className="pl-10"
              disabled
            />
          </div>
          <Button className="mt-4" disabled>Search Regulations</Button>
           <p className="text-xs text-muted-foreground mt-4">Feature Coming Soon</p>
        </div>
      </div>
    </div>
  )
}
