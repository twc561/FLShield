
import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Scale, ListChecks, MessageSquare, Gavel, Fish, Biohazard } from "lucide-react"

const Feature = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        title="Core Features"
        description="A deep dive into the tools that make Florida Shield indispensable for in-field decision-making."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Feature
          icon={Scale}
          title="AI-Powered Statute Navigator"
          description="Instantly search the entire Florida Statutes using natural language. Can't remember the statute number for burglary? Just search 'burglary' and get an immediate, officer-focused summary."
        />
        <Feature
          icon={Gavel}
          title="Case Law Vault"
          description="Access plain-language summaries of landmark case law (e.g., Graham v. Connor, Terry v. Ohio) that directly impacts your daily procedures. Know the 'why' behind the rules."
        />
        <Feature
          icon={ListChecks}
          title="Interactive Scenario Checklists"
          description="Step-by-step guidance for complex events like DUI investigations, traffic crashes, and domestic violence calls, ensuring procedural correctness every time."
        />
        <Feature
          icon={MessageSquare}
          title="AI Role-Play Simulator"
          description="Practice and refine your de-escalation and interview skills against a variety of AI-driven character personas in realistic training scenarios."
        />
         <Feature
          icon={Fish}
          title="FWC Regulations Guide"
          description="A quick-reference, searchable database for FWC rules, covering fishing seasons, bag limits, hunting regulations, and boating safety requirements."
        />
        <Feature
          icon={Biohazard}
          title="HAZMAT Placard Identifier"
          description="Instantly look up a UN/NA number from a HAZMAT placard to get critical ERG information on potential hazards and immediate safety actions."
        />
      </div>
    </div>
  )
}
