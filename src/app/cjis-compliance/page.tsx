
import { MarketingHeader } from "@/components/MarketingHeader";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Database, Fingerprint, FileText, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const CompliancePillar = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
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


export default function CjisCompliancePage() {
    return (
        <>
            <MarketingHeader />
            <main>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
                    <PageHeader
                        title="Security by Design: Our Public Records Focus"
                        description="Understanding Why CJIS Compliance Is Not Applicable to Shield FL"
                    />
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>CRITICAL WARNING: This Application is NOT for Criminal Justice Information (CJI)</AlertTitle>
                            <AlertDescription>
                                The Shield FL platform is a training and informational aid ONLY. It is intentionally designed to work exclusively with public records. <strong>Users are strictly prohibited from entering, storing, or transmitting any real Criminal Justice Information (CJI) or Personally Identifiable Information (PII) into this application.</strong>
                            </AlertDescription>
                        </Alert>

                        <Card>
                            <CardHeader>
                                <CardTitle>What is the CJIS Security Policy?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground">The CJIS Security Policy is a set of strict standards established by the FBI that governs how sensitive Criminal Justice Information must be protected. CJI includes data like criminal history records (rap sheets), mugshots, and active case file information. Achieving compliance requires rigorous controls across infrastructure, personnel, and policy.</p>
                                
                                <CompliancePillar 
                                    icon={Database}
                                    title="Infrastructure Security"
                                    description="CJI data must be stored in physically secure, access-controlled government-approved data centers, with advanced encryption and monitoring."
                                />
                                <CompliancePillar 
                                    icon={Fingerprint}
                                    title="Personnel Security"
                                    description="Any individual with access to unencrypted CJI must undergo a national fingerprint-based background check and security screening."
                                />
                                 <CompliancePillar 
                                    icon={CheckCircle}
                                    title="Policy & Procedure Controls"
                                    description="Agencies must implement strict policies for data access, incident response, security audits, and data disposal."
                                />

                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold text-lg">Why Shield FL is Intentionally Different</h3>
                                    <p className="text-muted-foreground mt-2">Shield FL is architected as a **Public Records Intelligence Engine**. By design, we **do not** access, store, or transmit CJI. Our entire platform operates on information already in the public domain, such as:</p>
                                     <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                        <li>Published Florida Statutes</li>
                                        <li>Publicly released court opinions (case law)</li>
                                        <li>Your agency's policy manuals, which are subject to public records requests</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-2">Because we do not handle the protected data that CJIS governs, the CJIS Security Policy is not applicable to our service. This is a deliberate design choice that provides significant advantages: it allows us to offer a powerful, affordable, and rapidly deployable AI tool without the immense cost and complexity of a CJIS-audited system, while eliminating the risk of CJI data being mishandled.</p>
                                    <Button asChild variant="link" className="p-0 h-auto mt-2">
                                        <Link href="https://www.fbi.gov/services/cjis/cjis-security-policy-resource-center" target="_blank" rel="noopener noreferrer">
                                            Visit the FBI CJIS Resource Center to Learn More
                                        </Link>
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}
