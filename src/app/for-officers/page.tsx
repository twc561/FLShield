
'use client'

import { MarketingHeader } from "@/components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Car, FileText, Gavel, Scale, ShieldCheck, Video } from "lucide-react";
import Link from 'next/link'
import { useRouter } from "next/navigation";

const FeatureCard = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href?: string }) => (
    <Card className="flex flex-col">
        <CardHeader>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
        {href && (
            <CardFooter>
                <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={href}>Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </CardFooter>
        )}
    </Card>
);


export default function ForOfficersPage() {
    const router = useRouter()
    return (
        <>
            <MarketingHeader />
            <main>
                {/* Hero Section */}
                <section className="text-center py-20 sm:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Your Partner on Patrol.
                        </h1>
                         <h2 className="mt-4 max-w-3xl mx-auto text-2xl font-semibold tracking-tight">
                            The Field Intelligence Tool Built for Florida Cops.
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Stop fumbling with outdated code books or trying to remember the specifics of a recent court ruling. Shield FL puts instant, reliable answers in your pocket, helping you act with confidence and legal precision on every call.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => router.push('/login')} size="lg">
                                Get Started Now
                            </Button>
                             <Button onClick={() => router.push('/features')} size="lg" variant="outline">
                                View All Features
                            </Button>
                        </div>
                    </div>
                </section>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 animate-fade-in-up">
                    <section>
                         <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight">From the Stop to the Stand: Intelligence When it Counts</h2>
                            <p className="mt-2 text-lg text-muted-foreground">Shield FL is designed around the real-world workflow of a patrol officer.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <FeatureCard 
                                icon={Scale}
                                title="Instant Legal Answers"
                                description="Use the AI-powered search to ask plain-language questions like 'What's the statute for burglary?' or 'What are the elements of stalking?' Get immediate, officer-focused summaries of Florida Statutes and landmark case law."
                                href="/legal-reference/statutes"
                            />
                            <FeatureCard 
                                icon={Car}
                                title="Master Complex Procedures"
                                description="Walk through interactive checklists for DUI investigations, traffic crashes, and domestic violence calls. Ensure you hit every critical step, from evidence collection to providing victim resources, every single time."
                                href="/field-procedures/scenario-checklists"
                            />
                             <FeatureCard 
                                icon={FileText}
                                title="Write Stronger Reports, Faster"
                                description="Use the AI Report Assistant to transform your rough field notes into a formal, structured narrative. Articulate your Use of Force justification based on Graham v. Connor factors, building a defensible report from the ground up."
                                href="/reporting-development/ai-report-writer"
                            />
                        </div>
                    </section>

                     <section>
                         <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight">Built By Cops, For Cops</h2>
                            <p className="mt-2 text-lg text-muted-foreground">We focus on the tools that make a real difference on your shift.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard 
                                icon={Gavel}
                                title="Case Law Vault"
                                description="Don't just know the rule, understand the 'why.' Get plain-language summaries of landmark cases like Terry v. Ohio and Arizona v. Gant, explaining what they mean for your actions in the field."
                            />
                            <FeatureCard 
                                icon={ShieldCheck}
                                title="Police Officer's Bill of Rights"
                                description="Quickly reference your rights under F.S. § 112.531. Understand the protections you are afforded during an internal affairs investigation."
                            />
                             <FeatureCard 
                                icon={Car}
                                title="DUI & Traffic Guides"
                                description="Access end-to-end DUI investigation guides, trilingual FST instructions, and a quick-reference for common traffic violation codes and fines."
                            />
                        </div>
                    </section>
                    
                     <section className="max-w-2xl mx-auto text-center">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Ready to Upgrade Your Toolkit?</CardTitle>
                                <CardDescription>Create a free account to access the complete suite of tools. No credit card required.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <Button size="lg" asChild>
                                    <Link href="/login">Sign Up & Access the App</Link>
                               </Button>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </>
    );
}
