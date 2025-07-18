
'use client'

import { MarketingHeader } from "@/components/MarketingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, DatabaseZap, FileText, Fingerprint, ShieldCheck, TrendingUp, ShieldQuestion } from "lucide-react";
import Link from 'next/link'

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
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Demo Request Submitted",
            description: "Thank you! We will contact you shortly to schedule your agency's personalized demonstration.",
        });
        (e.target as HTMLFormElement).reset();
    }

    return (
        <>
            <MarketingHeader />
            <main>
                {/* Hero Section */}
                <section className="text-center py-20 sm:py-24 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Your Policy. Florida Statutes. Your AI Partner.
                        </h1>
                         <h2 className="mt-4 max-w-3xl mx-auto text-2xl font-semibold tracking-tight">
                            Instant, Vetted Answers for Every Officer.
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                           Shield FL goes beyond generic legal search. We integrate your department&apos;s specific policies, Florida Statutes, and controlling case law into a single, AI-powered engine, giving your officers unparalleled, real-time guidance.
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
                           Your Use of Force policy, your pursuit procedures, your response protocols—they are the backbone of professional law enforcement and the foundation of community trust. But even the best officer can&apos;t memorize every line of a 300-page manual. In a split-second, high-stress situation, how do you ensure your team&apos;s actions are not just lawful, but perfectly aligned with your agency&apos;s specific standards? This is the gap Shield FL was built to close.
                        </p>
                    </section>

                    {/* The Solution Section */}
                    <section>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold tracking-tight">The Solution: The Shield FL Intelligence Engine</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Think of the Shield FL Intelligence Engine as the ultimate research partner, riding along with every officer. It has read, indexed, and understood your entire policy manual, and can cross-reference it with state law and relevant case law in seconds. It provides your officers with the &apos;why&apos; behind their training, precisely when they need it most.
                            </p>
                        </div>

                        <div className="mt-12 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-center mb-8">How It Works: A Process Built on Trust and Precision</h3>
                            <div className="space-y-4">
                                <HowItWorksStep 
                                    step={1} 
                                    title="Secure Policy Integration" 
                                    description="It starts with your data. Using our secure, CJIS-aligned portal, your agency provides us with its current policy and procedure manuals. This data is encrypted, isolated, and remains your exclusive intellectual property."
                                />
                                <HowItWorksStep 
                                    step={2} 
                                    title="Building Your Agency's Knowledge Core" 
                                    description="Our system doesn't just 'read' your policies; it ingests and understands them. We use a process called Retrieval-Augmented Generation (RAG) to convert your manuals into a sophisticated knowledge core. Every policy, procedure, and guideline is indexed based on its semantic meaning, preparing it for complex, situational queries."
                                />
                                <HowItWorksStep 
                                    step={3} 
                                    title="Multi-Source Synthesis at Query Time" 
                                    description="When an officer asks a question—'Can I use a PIT maneuver on this vehicle?'—the engine instantly searches multiple sources. It retrieves the most relevant information from 1) Your Department's Pursuit Policy, 2) Florida Statute §316.192, and 3) Controlling case law like Scott v. Harris."
                                />
                                <HowItWorksStep 
                                    step={4} 
                                    title="The Prioritized, Comprehensive Answer" 
                                    description="This is the critical step. The retrieved data is fed to our advanced AI with a unique instruction: deliver a single, comprehensive answer that prioritizes your agency's policy above all else. The result is a legally sound, ethically consistent, and department-compliant recommendation, delivered in seconds."
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
                                icon={ShieldCheck}
                                title="Reduce Liability and Enhance Legitimacy"
                                description="By ensuring every action is grounded in approved policy, you create a powerful digital record of due diligence, drastically reducing agency risk."
                            />
                             <BenefitCard 
                                icon={CheckCircle}
                                title="Standardize Policy Application"
                                description="Ensure every officer, from a rookie to a 20-year veteran, applies your policies with the same understanding and consistency."
                            />
                            <BenefitCard 
                                icon={TrendingUp}
                                title="Supercharge Training and Remediation"
                                description="Use Shield FL as a live-training tool. Instantly pull up policies during debriefs and after-action reviews to reinforce key concepts."
                            />
                            <BenefitCard 
                                icon={FileText}
                                title="Streamline Incident Reporting"
                                description="Officers can use the AI's output, which cites specific policies and statutes, to help draft more accurate, detailed, and defensible incident reports."
                            />
                             <BenefitCard 
                                icon={DatabaseZap}
                                title="Create a Living Policy Manual"
                                description="Your policies are no longer a static PDF. They become a dynamic, searchable, and instantly accessible resource for every member of your department."
                            />
                             <BenefitCard 
                                icon={ShieldQuestion}
                                title="Boost Officer Confidence"
                                description="Give your officers the confidence that their decisions are backed by policy, law, and best practices, reducing hesitation in critical moments."
                            />
                        </div>
                    </section>

                    {/* Security & Trust Section */}
                    <section className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                           <Fingerprint className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Security & Trust: Our Foundational Commitment</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                           We understand the sensitive nature of law enforcement data. The Shield FL platform is built on Google&apos;s secure cloud infrastructure, leveraging best-in-class security protocols including end-to-end encryption, role-based access controls, and robust data isolation to ensure your agency&apos;s information is protected and confidential.
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
                                <h3 className="font-bold text-lg">2. Secure Data Transfer</h3>
                                <p className="text-sm text-muted-foreground mt-1">You securely upload your policy manuals through our dedicated portal.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg">3. Go-Live & Training</h3>
                                <p className="text-sm text-muted-foreground mt-1">Within days, your agency-specific version of Shield FL is live. We provide simple, effective training materials to get your officers up to speed immediately.</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Final CTA */}
                    <section className="max-w-2xl mx-auto">
                        <Card>
                            <CardHeader className="text-center p-6">
                                <CardTitle className="text-2xl">Equip Your Officers with Confidence. Empower Your Agency with Shield FL.</CardTitle>
                                <CardContent className="p-0 pt-4">
                                    <p className="text-muted-foreground">Give your team the tool they need to make the right call, every time. Contact us today to schedule a personalized demo and learn how Shield FL can be tailored to your agency&apos;s specific needs.</p>
                                    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" required placeholder="Sgt. Jane Doe" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="title">Title</Label>
                                                <Input id="title" required placeholder="Training Sergeant" />
                                            </div>
                                        </div>
                                         <div className="space-y-1.5">
                                            <Label htmlFor="agency">Agency</Label>
                                            <Input id="agency" required placeholder="Anytown Police Department" />
                                        </div>
                                         <div className="space-y-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" required placeholder="j.doe@anytownpd.gov" />
                                        </div>
                                         <div className="space-y-1.5">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea id="message" placeholder="We are interested in learning more about policy integration..." />
                                        </div>
                                        <Button type="submit" className="w-full">Schedule My Demo</Button>
                                    </form>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    </section>
                </div>
            </main>
        </>
    );
}
