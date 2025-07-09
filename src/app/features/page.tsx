
import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Scale, ListChecks, MessageSquare, Gavel, Fish, Biohazard, BrainCircuit, ShieldCheck, Languages, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const FeatureSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <section className="py-12 border-b">
    <div className="max-w-3xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);

const FeatureDetail = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="bg-card/50">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
      <PageHeader
        title="Core Features"
        description="A deep dive into the tools that make Florida Shield indispensable for in-field decision-making."
      />
      
      <FeatureSection 
        title="AI-Powered Field Intelligence" 
        description="Leverage cutting-edge AI to get answers faster and more accurately than ever before."
      >
        <FeatureDetail
          icon={Scale}
          title="AI Statute Navigator"
          description="Ask 'What's the statute for burglary?' and get an instant, officer-focused summary. If no local matches are found, the AI automatically searches the entire Florida Statutes."
        />
        <FeatureDetail
          icon={Gavel}
          title="AI Case Law Analysis"
          description="Select a landmark case and get an immediate, AI-generated summary explaining what it means for your procedures in the field."
        />
        <FeatureDetail
          icon={BrainCircuit}
          title="AI Charge Assistant"
          description="Input your narrative, and the AI suggests the most appropriate charges under Florida law, explaining its reasoning based on the elements of the crime."
        />
      </FeatureSection>
      
      <FeatureSection 
        title="Interactive Guides & Checklists"
        description="Standardize complex procedures and ensure every step is followed correctly, every time."
      >
        <FeatureDetail
          icon={ListChecks}
          title="Scenario Checklists"
          description="Step-by-step interactive guidance for complex events like DUI investigations, traffic crashes, and domestic violence calls, ensuring procedural correctness."
        />
        <FeatureDetail
          icon={ShieldCheck}
          title="Use of Force Wizard"
          description="Articulate your use-of-force justification based on the Graham v. Connor factors. The AI helps you build a clear, objective narrative for your report."
        />
        <FeatureDetail
          icon={Languages}
          title="Trilingual Field Translator"
          description="Break down communication barriers with pre-recorded, AI-voiced phrases in English, Spanish, and Haitian Creole for common field encounters."
        />
      </FeatureSection>
      
      <FeatureSection 
        title="Training & Development Tools"
        description="Sharpen your skills and stay current with dynamic, interactive training modules."
      >
        <FeatureDetail
          icon={MessageSquare}
          title="AI Role-Play Simulator"
          description="Practice de-escalation and interview techniques against a variety of AI-driven character personas in realistic training scenarios."
        />
        <FeatureDetail
          icon={ListChecks}
          title="Report Proofreader"
          description="Get instant, constructive feedback on your anonymized report narratives. The AI checks for clarity, objectivity, and legal sufficiency."
        />
        <FeatureDetail
          icon={ShieldCheck}
          title="Knowledge Drills"
          description="Test your knowledge of law and procedure with a constantly updated bank of quiz questions covering DUI, use of force, search & seizure, and more."
        />
      </FeatureSection>
      
      <FeatureSection 
        title="Specialized Enforcement Libraries"
        description="Quick-reference databases for specific, complex enforcement areas."
      >
        <FeatureDetail
          icon={Fish}
          title="FWC Regulations Guide"
          description="A searchable database for FWC rules, covering fishing seasons, bag limits, and hunting regulations."
        />
        <FeatureDetail
          icon={Biohazard}
          title="HAZMAT Placard Identifier"
          description="Instantly look up a UN/NA number from a HAZMAT placard to get critical ERG information on potential hazards and immediate safety actions."
        />
        <FeatureDetail
          icon={Truck}
          title="Commercial Vehicle Guide"
          description="A practical field guide for patrol officers covering common driver, vehicle, and cargo violations for CMVs."
        />
      </FeatureSection>

       <div className="mt-16 text-center bg-card p-8 rounded-lg border">
        <h2 className="text-2xl font-bold">See These Features in Action</h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Reading about features is one thing. Seeing how they perform in the field is another. Schedule a personalized demo to see how Florida Shield can empower your officers.
        </p>
        <Button asChild className="mt-6" size="lg">
            <Link href="/request-demo">Request a Demo <ArrowRight className="ml-2 h-5 w-5"/></Link>
        </Button>
      </div>
    </div>
  )
}
