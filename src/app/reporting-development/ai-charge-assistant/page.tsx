import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Lightbulb } from "lucide-react"

export default function AiChargeAssistantPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Charge Assistant"
        description="Enter key facts and let the AI suggest appropriate Florida statutes to charge."
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Gavel className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Feature Coming Soon</CardTitle>
              <CardDescription>This tool will help you identify the correct charges based on incident facts.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border-2 border-dashed rounded-lg text-center">
            <h3 className="text-lg font-semibold">How it will work:</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              You will provide a brief narrative or list of key observations from an incident. The AI will then analyze your input against the Florida Statutes to suggest the most appropriate primary charge, any lesser-included offenses, and list the specific elements you'll need to articulate in your report for a successful prosecution.
            </p>
          </div>

          <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-accent mt-1" />
              <div>
                <h4 className="font-semibold text-accent-foreground/90">
                  Example Use Case
                </h4>
                <p className="text-accent-foreground/80 text-sm">
                  <strong>Your Input:</strong> "Subject was found inside a locked business at 2 AM with a crowbar and stolen goods in a bag."<br/>
                  <strong>AI Output:</strong> Suggests Burglary of a Structure (F.S. 810.02), Possession of Burglary Tools (F.S. 810.06), and Theft (F.S. 812.014), providing the elements for each.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
