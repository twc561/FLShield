import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Lightbulb } from "lucide-react"

export default function RolePlaySimulatorPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Role-Play Simulator"
        description="Practice your interview and de-escalation skills against a variety of AI-driven characters."
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Feature Coming Soon</CardTitle>
              <CardDescription>This interactive tool will help you sharpen your communication skills in a safe environment.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border-2 border-dashed rounded-lg text-center">
            <h3 className="text-lg font-semibold">How it will work:</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              You will select a training scenario from our library. The AI will adopt the persona of a character from that scenario (e.g., a nervous witness, an agitated subject). You will then conduct a text-based interview. After the interview, the AI will provide a detailed debrief on your performance, focusing on rapport building, questioning techniques, and information control.
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
                  <strong>Scenario:</strong> Interviewing a Retail Theft Witness.<br/>
                  <strong>AI Persona:</strong> Alex, a nervous teenage clerk.
                  <br />
                  <strong>Your Goal:</strong> To calm Alex down and obtain a clear suspect description using open-ended questions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
