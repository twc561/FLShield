'use client'

import { MarketingHeader } from "@/components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Database, Lock, Mail, Shield, Users, Zap } from "lucide-react";
import Link from 'next/link';

const BenefitCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

const HowItWorksStep = ({ step, title, description }: { step: number, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary text-primary font-bold">
                {step}
            </div>
            {step < 4 && <div className="mt-2 h-16 w-px bg-border/50"></div>}
        </div>
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
    </div>
);

export default function AgencyIntelligencePage() {

    return (
        <>
            <MarketingHeader />
            <main>
                {/* Hero Section */}
                <section className="text-center py-20 sm:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Your Policy. Florida Law. One AI Partner.
                        </h1>
                         <h2 className="mt-4 max-w-3xl mx-auto text-2xl font-semibold tracking-tight">
                            The Public Records Intelligence Engine for Law Enforcement.
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Shield FL transforms your agency's public-facing policies and manuals into an interactive knowledge base. Our AI synthesizes this with Florida Statutes and case law to give your officers instant, defensible answers in the field.
                        </p>
                        <div className="mt-8">
                            <Button asChild size="lg">
                                <Link href="/request-demo">Request an Agency Demo <ArrowRight className="ml-2 h-5 w-5"/></Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 animate-fade-in-up">
                    {/* The Challenge Section */}
                    <section className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight">The Challenge: The Gap Between Policy and Practice</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           Your Use of Force policy, your pursuit procedures, your response protocols—they are the backbone of professional law enforcement. But in a split-second, high-stress situation, how do you ensure your team's actions are not just lawful, but perfectly aligned with your agency's specific standards? This is the gap Shield FL was built to close.
                        </p>
                    </section>

                    {/* The Solution Section */}
                    <section>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold tracking-tight">The Solution: Your Agency's Private Intelligence Engine</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Think of Shield FL as a secure, private AI research partner that has read, indexed, and understood your entire policy manual. It cross-references this with state law and relevant case law in seconds, providing officers with the 'why' behind their training, precisely when they need it most.
                            </p>
                        </div>

                        <div className="mt-12 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-center mb-8">How It Works: A Simple & Secure Process</h3>
                            <div className="space-y-4">
                                <HowItWorksStep 
                                    step={1} 
                                    title="Public Document Ingestion" 
                                    description="It starts with your public-facing documents. You provide us with your policy and procedure manuals—the same documents you would provide for a public records request. No secure portals are needed because we only handle public information."
                                />
                                <HowItWorksStep 
                                    step={2} 
                                    title="Building Your Agency's Knowledge Core" 
                                    description="Our system doesn't just 'read' your policies; it ingests and understands them. We use a process called Retrieval-Augmented Generation (RAG) to convert your manuals into a sophisticated, private knowledge core. Every policy, procedure, and guideline is indexed for situational queries."
                                />
                                <HowItWorksStep 
                                    step={3} 
                                    title="Multi-Source Synthesis at Query Time" 
                                    description="When an officer asks a question—'Can I use a PIT maneuver on this vehicle?'—the engine instantly searches multiple sources. It retrieves the most relevant information from 1) Your Department's Pursuit Policy, 2) Florida Statutes, and 3) Controlling case law like Scott v. Harris."
                                />
                                <HowItWorksStep 
                                    step={4} 
                                    title="The Prioritized, Comprehensive Answer" 
                                    description="This is the critical step. The retrieved data is fed to our advanced AI with a unique instruction: deliver a single, comprehensive answer that prioritizes your agency's policy above all else. The result is a legally sound and department-compliant recommendation, delivered in seconds."
                                />
                            </div>
                        </div>
                    </section>

                    {/* The Benefits Section */}
                    <section>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold tracking-tight">From Risk Reduction to Officer Confidence</h2>
                        </div>
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                            <BenefitCard 
                                icon={Shield}
                                title="Reduce Liability and Enhance Legitimacy"
                                description="By ensuring every action is grounded in approved policy, you create a powerful digital record of due diligence, drastically reducing agency risk."
                            />
                             <BenefitCard 
                                icon={Brain}
                                title="Standardize Policy Application"
                                description="Ensure every officer, from a rookie to a 20-year veteran, applies your policies with the same understanding and consistency."
                            />
                            <BenefitCard 
                                icon={Database}
                                title="Supercharge Training and Remediation"
                                description="Use Shield FL as a live-training tool. Instantly pull up policies during debriefs and after-action reviews to reinforce key concepts."
                            />
                            <BenefitCard 
                                icon={Lock}
                                title="Streamline Incident Reporting"
                                description="Officers can use the AI's output, which cites specific policies and statutes, to help draft more accurate, detailed, and defensible incident reports."
                            />
                             <BenefitCard 
                                icon={Database}
                                title="Create a Living Policy Manual"
                                description="Your policies are no longer a static PDF. They become a dynamic, searchable, and instantly accessible resource for every member of your department."
                            />
                             <BenefitCard 
                                icon={Shield}
                                title="Boost Officer Confidence"
                                description="Give your officers the confidence that their decisions are backed by policy, law, and best practices, reducing hesitation in critical moments."
                            />
                        </div>
                    </section>

                    {/* Security & Trust Section */}
                    <section className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                           <Lock className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Security & Trust: Our Foundational Commitment</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           We understand the sensitive nature of law enforcement technology. Shield FL is built on Google's secure cloud infrastructure, leveraging best-in-class security protocols including end-to-end encryption and role-based access controls. Because we only handle public record information, we provide enterprise-grade security without the high cost and complexity of a CJIS-audited environment, making advanced AI accessible to more agencies.
                        </p>
                    </section>

                    {/* Onboarding Section */}
                    <section className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight">The Onboarding Process: Simple, Secure, and Seamless</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Partnering for a Safer, Smarter Force</p>
                        <p className="mt-2 text-muted-foreground">Getting your agency on Shield FL is a straightforward process.</p>
                        <div className="mt-8 grid sm:grid-cols-3 gap-8 text-left">
                            <div className="text-center">
                                <h3 className="font-bold text-lg">1. Consultation & Agreement</h3>
                                <p className="text-sm text-muted-foreground mt-1">We meet with your command staff to understand your needs and establish a partnership agreement.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg">2. Public Document Link</h3>
                                <p className="text-sm text-muted-foreground mt-1">You provide a public link to your agency's policy manuals. Our system securely ingests the data.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg">3. Go-Live & Training</h3>
                                <p className="text-sm text-muted-foreground mt-1">Within days, your agency-specific version of Shield FL is live. We provide simple, effective training materials to get your officers up to speed immediately.</p>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    {/* Contact Section */}
                <section className="bg-muted/30 py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold">Ready to Transform Your Agency?</CardTitle>
                                    <CardDescription className="text-lg mt-4">
                                        Join the growing number of Florida law enforcement agencies leveraging AI-powered intelligence tools to enhance officer safety, improve case outcomes, and streamline operations.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-primary">Get Your Personalized Agency Demo</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Our team will work with your department to demonstrate how Shield FL integrates with your existing workflows, policies, and training protocols. We'll show you exactly how our platform can address your agency's specific challenges.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground mb-2">Contact us directly:</p>
                                                <Button asChild size="lg" className="font-semibold">
                                                    <Link href="mailto:admin@shieldfl.app">
                                                        <Mail className="mr-2 h-5 w-5" />
                                                        admin@shieldfl.app
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 pt-6">
                                        <div className="text-center">
                                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                                <Shield className="h-6 w-6 text-primary" />
                                            </div>
                                            <h4 className="font-semibold">Rapid Deployment</h4>
                                            <p className="text-sm text-muted-foreground">Get your officers trained and operational within days, not months</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <h4 className="font-semibold">Dedicated Support</h4>
                                            <p className="text-sm text-muted-foreground">Full implementation support and ongoing training for your team</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                                <Zap className="h-6 w-6 text-primary" />
                                            </div>
                                            <h4 className="font-semibold">Immediate ROI</h4>
                                            <p className="text-sm text-muted-foreground">Measurable improvements in report quality and officer confidence from day one</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                </div>
            </main>
        </>
    );
}