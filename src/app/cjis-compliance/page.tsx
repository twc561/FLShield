
import { MarketingHeader } from "@/components/MarketingHeader";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Server, Fingerprint, FileText } from "lucide-react";
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
                        title="CJIS Compliance Information"
                        description="Understanding the requirements for handling Criminal Justice Information."
                    />
                    <div className="max-w-4xl mx-auto space-y-8">
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>CRITICAL WARNING: This Application is NOT CJIS Compliant</AlertTitle>
                            <AlertDescription>
                                The Shield FL application, in its current configuration, is a training and informational aid ONLY. It is hosted in a standard cloud environment that does not meet the strict security requirements of the FBI's Criminal Justice Information Services (CJIS) Security Policy. <strong>Users are strictly prohibited from entering, storing, or transmitting any real Criminal Justice Information (CJI) or Personally Identifiable Information (PII) into this application.</strong>
                            </AlertDescription>
                        </Alert>

                        <Card>
                            <CardHeader>
                                <CardTitle>What is CJIS Compliance?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-muted-foreground">The CJIS Security Policy is a set of standards established by the FBI that governs how sensitive Criminal Justice Information must be protected. Achieving compliance is a complex, multi-faceted process that involves much more than just application code. Key pillars include:</p>
                                
                                <CompliancePillar 
                                    icon={Server}
                                    title="Infrastructure & Physical Security"
                                    description="Data must be stored in physically secure, access-controlled data centers within the United States. Network infrastructure requires advanced encryption, intrusion detection, and monitoring."
                                />
                                <CompliancePillar 
                                    icon={Fingerprint}
                                    title="Personnel Security"
                                    description="Any individual with access to unencrypted CJI (including system administrators and developers) must undergo a national fingerprint-based background check and security screening."
                                />
                                 <CompliancePillar 
                                    icon={FileText}
                                    title="Policies & Procedures"
                                    description="The hosting agency must implement strict policies for data access, incident response, security audits, and data disposal. All access to CJI must be logged and regularly reviewed."
                                />

                                <div className="pt-4 border-t">
                                    <h3 className="font-semibold text-lg">Path to Compliance</h3>
                                    <p className="text-muted-foreground mt-2">To make an application like Shield FL CJIS compliant, it must be deployed within a government-approved cloud environment (like AWS GovCloud or Azure Government) and managed by a CJIS-compliant entity, with all associated personnel and policy requirements fully implemented. This is a significant undertaking that cannot be achieved through simple code changes.</p>
                                    <Button asChild variant="link" className="p-0 h-auto mt-2">
                                        <Link href="https://www.fbi.gov/services/cjis/cjis-security-policy-resource-center" target="_blank" rel="noopener noreferrer">
                                            Visit the FBI CJIS Resource Center
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
