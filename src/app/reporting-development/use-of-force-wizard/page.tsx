import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldQuestion, Lightbulb } from "lucide-react"

export default function UseOfForceWizardPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Use of Force Wizard"
        description="Interactive AI tool to help articulate the justification for use of force incidents."
      />
       <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ShieldQuestion className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Feature Coming Soon</CardTitle>
              <CardDescription>This interactive tool will help you articulate your use of force reports.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border-2 border-dashed rounded-lg text-center">
            <h3 className="text-lg font-semibold">How it will work:</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
             This AI-powered wizard will guide you through a step-by-step analysis of a use of force incident based on the objective reasonableness standard from Graham v. Connor. By answering a series of objective questions, the AI will generate a structured, articulate narrative that helps you clearly explain the justification for your actions in your report.
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
                  <strong>AI Question:</strong> "Describe the severity of the crime at issue."<br/>
                  <strong>Your Input:</strong> "Armed Robbery."<br/>
                  <strong>AI Question:</strong> "Did the suspect pose an immediate threat to the safety of the officers or others? If so, how?"<br/>
                  <strong>Your Input:</strong> "Yes, he refused commands to show his hands and was reaching for his waistband where I believed he had a gun."<br/>
                  <strong>AI-Generated Narrative Snippet:</strong> "The subject, who was suspected of the serious and violent felony of Armed Robbery, posed an immediate threat to officer safety by refusing to comply with verbal commands and making furtive movements toward his waistband, leading me to believe he was reaching for a weapon."
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
