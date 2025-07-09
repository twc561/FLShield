
import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Lock, DatabaseZap, ShieldAlert } from "lucide-react"

const SecurityFeature = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-primary/10 rounded-lg mt-1">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        title="Security & Compliance"
        description="Built with the trust and security of your agency as our highest priority."
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Security-First Philosophy</CardTitle>
            <CardDescription>We understand that law enforcement technology demands the highest standards of security and data integrity. Our platform is architected around these core principles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <SecurityFeature
              icon={Lock}
              title="Data Encryption"
              description="All data transmitted between your device and our servers is encrypted in transit using industry-standard TLS protocols. Any sensitive data at rest is protected with AES-256 encryption."
            />
            <SecurityFeature
              icon={DatabaseZap}
              title="No Persistent User Data"
              description="Features like the Active Listener Chatbot are designed to be ephemeral. Conversations are processed in memory and are not logged, stored, or monitored, ensuring absolute user privacy."
            />
             <SecurityFeature
              icon={ShieldAlert}
              title="AI Reliability and Citation"
              description="Our AI models are trained to provide information based on verifiable sources. Where possible, AI-generated answers cite the specific Florida Statute or case law they are referencing, allowing for independent verification."
            />
          </CardContent>
        </Card>
        
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Critical CJIS Compliance Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground/90">
              Florida Shield is designed as a <strong className="font-semibold">training and informational aid only</strong>. It is <strong className="font-semibold">NOT</strong> a CJIS-compliant system.
            </p>
            <p className="mt-2 text-destructive-foreground/80">
              Users are strictly prohibited from entering, storing, or transmitting any Criminal Justice Information (CJI), Personally Identifiable Information (PII), or any other sensitive or case-specific details into the application. All user input fields must be treated as unsecure for the purposes of real-world case data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
