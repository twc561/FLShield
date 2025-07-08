import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Lightbulb } from "lucide-react"

export default function KnowledgeCheckPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Knowledge Check"
        description="Dynamically generated quizzes to keep your knowledge sharp."
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Feature Coming Soon</CardTitle>
              <CardDescription>This tool provides dynamic quizzes for roll-call training and knowledge sustainment.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border-2 border-dashed rounded-lg text-center">
            <h3 className="text-lg font-semibold">How it will work:</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              The AI will dynamically generate short, multiple-choice quizzes based on the content throughout the Florida Shield app. You can select a specific topic (like Use of Force Case Law or DUI Procedures) or choose a random "roll-call" quiz. This provides a simple, effective way to stay current on law and policy.
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
                  <strong>User Action:</strong> Clicks "Start Random Roll-Call Quiz".<br/>
                  <strong>AI-Generated Question:</strong> "Under Arizona v. Gant, when can you search a vehicle incident to arrest? A) Any time you arrest the driver. B) Only if the arrestee is within reaching distance of the vehicle or it's reasonable to believe evidence of the crime of arrest is inside. C) Only with a search warrant."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
