
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardEdit, Lightbulb } from "lucide-react"

export default function AiReportWriterPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Report Writer"
        description="Dictate or type your narrative, and let the AI structure it into a professional report."
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ClipboardEdit className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Feature Coming Soon</CardTitle>
              <CardDescription>This tool will streamline your entire report writing process.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border-2 border-dashed rounded-lg text-center">
            <h3 className="text-lg font-semibold">How it will work:</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              You will provide your free-form narrative via text or voice dictation. The AI will then automatically parse your input, correct grammar and spelling, format it into a standard report structure, and ensure it aligns with the elements of the charged offenses identified by the AI Charge Assistant.
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
                  <strong>Your Input (Dictated):</strong> "On Friday I was on patrol and I saw a red Toyota run a stop sign. I pulled the guy over, name was John Smith. He smelled like weed. I searched the car and found a baggie of marijuana in the console."<br/>
                  <strong>AI Output:</strong> A professionally formatted narrative: "On Friday, [Date], at approximately [Time], I was on routine patrol when I observed a red Toyota fail to stop at the stop sign at [Location]. I initiated a traffic stop... The driver, identified as John Smith, had a strong odor of cannabis emanating from the vehicle... A search of the vehicle yielded a clear plastic baggie containing a green leafy substance, located in the center console."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
