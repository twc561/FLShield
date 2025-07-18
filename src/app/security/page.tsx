

import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Lock, DatabaseZap, ShieldAlert, BrainCircuit, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MarketingHeader } from "@/components/MarketingHeader"

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
    <>
      <MarketingHeader />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
          <PageHeader
            title="Security by Design"
            description="Built with the trust and integrity of your agency as our highest priority."
          />
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Public Records Intelligence Philosophy</CardTitle>
                <CardDescription>We believe that making public information highly accessible and useful is a critical, unmet need. Our security model is built around this principle.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SecurityFeature
                  icon={Lock}
                  title="End-to-End Encryption"
                  description="All data transmitted between your device and our servers is encrypted in transit using industry-standard TLS 1.3 protocols. Any sensitive configuration data at rest is protected with AES-256 encryption."
                />
                <SecurityFeature
                  icon={DatabaseZap}
                  title="Zero-Retention Policy on Sensitive AI Interactions"
                  description="Features like the Active Listener Chatbot and Report Proofreader are designed to be ephemeral. User inputs are processed in memory and are never logged, stored, or monitored, ensuring absolute user privacy and confidentiality."
                />
                 <SecurityFeature
                  icon={BrainCircuit}
                  title="AI Reliability and Grounding"
                  description="Our AI models are specifically 'grounded' on a curated database of Florida Statutes, case law summaries, and your agency's public policies. This minimizes hallucinations and ensures that AI-generated answers cite specific sources for verification."
                />
                <SecurityFeature
                  icon={Users}
                  title="Role-Based Access Control"
                  description="Agency-level deployments feature robust, role-based access control, ensuring that officers, supervisors, and administrators only have access to the features and data appropriate for their roles."
                />
              </CardContent>
            </Card>
            
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-3">
                  <ShieldAlert/>
                  A Note on CJIS: An Inapplicable Standard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive-foreground/90">
                  Shield FL is a <strong>training and informational aid only</strong> that operates exclusively on public records. The CJIS Security Policy, which governs sensitive Criminal Justice Information (CJI), is not applicable to our data model.
                </p>
                <p className="mt-2 text-destructive-foreground/80">
                    This is a deliberate design choice. By not handling CJI, we can provide a powerful, low-cost AI tool without the risks associated with protected data. Users are strictly prohibited from entering any real PII or CJI.
                </p>
                <Button asChild variant="link" className="p-0 h-auto mt-2 text-destructive-foreground font-bold">
                    <Link href="/cjis-compliance">
                        Learn more about our Public Records focus
                    </Link>
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-12 text-center bg-card p-8 rounded-lg border">
                <h2 className="text-2xl font-bold">Have More Questions?</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                    We are committed to transparency and are happy to provide detailed security documentation to prospective agency partners.
                </p>
                <Button asChild className="mt-6" size="lg">
                    <Link href="/request-demo">Discuss Your Agency's Needs <ArrowRight className="ml-2 h-5 w-5"/></Link>
                </Button>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
