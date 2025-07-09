
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInAnonymously } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Flame, ShieldCheck, Loader2, ListChecks, Scale, MessageSquare, AlertTriangle, Check, BookOpen } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const Feature = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <div className="p-4 bg-primary/10 rounded-full">
        <Icon className="w-8 h-8 text-primary" />
      </div>
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="mt-2 text-muted-foreground">{children}</p>
  </div>
)

const ChecklistMockup = () => (
    <Card className="max-w-md mx-auto bg-background/50 shadow-lg">
        <CardHeader>
            <CardTitle>Interactive Checklist: DUI Stop</CardTitle>
            <CardDescription>Step-by-step guidance, from stop to report.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Observe Driving Pattern</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Conduct Safe Driver-Side Approach</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-primary/10 ring-2 ring-primary">
                <ListChecks className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-bold text-primary">Administer Field Sobriety Tests</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-md bg-muted opacity-50">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Make Arrest Decision</span>
            </div>
        </CardContent>
    </Card>
)

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAccessApp = async () => {
    setIsLoading(true)
    try {
      await signInAnonymously(auth)
      toast({
        title: "Login Successful",
        description: "Welcome to Florida Shield.",
      })
      router.push('/dashboard')
    } catch (error) {
      console.error("Anonymous sign-in failed", error)
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not connect to the authentication service. Please try again.",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">Florida Shield</h1>
        </div>
        <Button onClick={handleAccessApp} disabled={isLoading}>
           {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
          Access App
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Your Essential Digital Partner
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Instant legal references, AI-powered reporting tools, and interactive field guides, designed for the modern Florida officer.
            </p>
            <div className="mt-8">
              <Button onClick={handleAccessApp} disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Authenticating...' : 'Acknowledge & Access App'}
              </Button>
               <p className="text-xs text-muted-foreground mt-4">
                By proceeding, you acknowledge this is a training tool and not CJIS-compliant.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Everything You Need, Instantly</h3>
                    <p className="mt-2 text-muted-foreground">From traffic stops to complex investigations, get the right information, right now.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Feature icon={Scale} title="AI Statute Search">
                        Can't find a statute? Just ask. Our AI searches all of Florida's laws to find what you need based on simple keywords.
                    </Feature>
                    <Feature icon={ListChecks} title="Interactive Checklists">
                        Navigate complex procedures like DUI stops and crash investigations with step-by-step interactive guidance.
                    </Feature>
                    <Feature icon={MessageSquare} title="AI Role-Play Simulator">
                        Practice de-escalation and interview techniques against a variety of AI-driven characters before you hit the street.
                    </Feature>
                </div>
            </div>
        </section>

        {/* See It In Action Section */}
        <section id="demo" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">See It In Action</h3>
                    <p className="mt-2 text-muted-foreground">A glimpse of the tools designed to make your job easier.</p>
                </div>
                <ChecklistMockup />
            </div>
        </section>

        {/* Trust & Transparency Section */}
         <section id="trust" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                     <div className="flex justify-center mb-4">
                        <AlertTriangle className="w-12 h-12 text-amber-500" />
                    </div>
                    <h3 className="text-3xl font-bold">Trust & Transparency</h3>
                    <p className="mt-4 text-muted-foreground">
                       <strong className="text-foreground/80">Florida Shield is a training and informational aid, not an evidence-gathering tool.</strong>
                       It is designed to help you study, practice, and quickly reference information. It is <strong className="text-amber-500">NOT CJIS-compliant</strong> and must never be used to store, transmit, or process any real criminal justice information, case details, or personally identifiable information (PII). All user input is treated as training data only.
                    </p>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Florida Shield. For Training & Informational Purposes Only.</p>
        </div>
      </footer>
    </div>
  )
}
