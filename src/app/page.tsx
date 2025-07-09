
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Flame, ShieldCheck, ListChecks, Scale, MessageSquare, Video, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const Feature = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href: string }) => (
    <div className="text-center p-6 border rounded-lg bg-card shadow-sm hover:shadow-primary/20 hover:border-primary/50 transition-all">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground h-24">{description}</p>
      <Button variant="link" asChild className="mt-4">
        <Link href={href}>Learn More <ArrowRight className="ml-2 h-4 w-4"/></Link>
      </Button>
    </div>
)

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">Florida Shield</h1>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
            <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/for-agencies" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">For Agencies</Link>
            <Link href="/security" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Security</Link>
            <Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Support</Link>
             <Button onClick={() => router.push('/login')}>
                App Login
            </Button>
        </nav>
        <Button onClick={() => router.push('/login')} className="md:hidden">Login</Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              The Digital FTO In Every Officer's Pocket
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Florida Shield is the secure, AI-powered mobile application designed to enhance officer safety, improve in-field decision-making, and ensure legal and procedural accuracy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/for-agencies')} size="lg">
                For Agency Decision-Makers
              </Button>
               <Button onClick={() => router.push('/request-demo')} size="lg" variant="outline">
                <Video className="mr-2 h-5 w-5" />
                Request a Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">A Tool for Modern Policing</h3>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">From traffic stops to complex investigations, get the right information, right now.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Feature icon={Scale} title="AI Statute Search" description="Can't find a statute? Just ask. Our AI searches all of Florida's laws to find what you need based on simple keywords." href="/features"/>
                    <Feature icon={ListChecks} title="Interactive Checklists" description="Navigate complex procedures like DUI stops and crash investigations with step-by-step interactive guidance." href="/features"/>
                    <Feature icon={MessageSquare} title="AI Role-Play Simulator" description="Practice de-escalation and interview techniques against a variety of AI-driven characters before you hit the street." href="/features"/>
                </div>
            </div>
        </section>

        {/* Trust & Security Section */}
         <section id="trust" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                     <div className="flex justify-center mb-4">
                        <ShieldCheck className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold">Built on a Foundation of Trust</h3>
                    <p className="mt-4 text-muted-foreground">
                       We understand that adopting new technology in law enforcement requires absolute confidence in its security and reliability. Our platform is designed with a "security-first" architecture, ensuring data integrity and user privacy are paramount.
                    </p>
                    <Button variant="secondary" asChild className="mt-6">
                        <Link href="/security">View Security & Compliance Details</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Florida Shield. A training and informational aid for law enforcement.</p>
          <p className="mt-2">Florida Shield is NOT a CJIS-compliant system and must not be used for operational or evidentiary purposes.</p>
        </div>
      </footer>
    </div>
  )
}
