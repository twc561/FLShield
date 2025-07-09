
import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  Fish,
  ListChecks,
  Scale,
  Bot,
  GraduationCap,
  AlertTriangle,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Confidence on Every Call.
            <br />
            <span className="text-primary">Clarity in Every Report.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-muted-foreground">
            The all-in-one Florida field guide with AI-powered checklists,
            searchable statutes, and FWC regulations, designed to make your job
            safer and more efficient.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Access The App</Link>
            </Button>
            <Button size="lg" variant="outline">
              Request Agency Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Feature-Benefit Section */}
      <section className="py-20 sm:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              From Stop to Report: Your Job, Simplified
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Florida Shield provides instant, reliable answers so you can focus
              on what matters most: officer safety and community protection.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border rounded-lg bg-card">
              <ListChecks className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Ironclad Checklists</h3>
              <p className="mt-2 text-muted-foreground">
                Navigate DUI, domestic violence, and dozens of other scenarios
                with interactive guides that ensure you never miss a step.
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg bg-card">
              <Fish className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Instant FWC Answers</h3>
              <p className="mt-2 text-muted-foreground">
                Stop guessing on fishing and boating rules. Get instant,
                searchable access to every size limit, season, and license requirement.
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg bg-card">
              <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Draft Reports Faster</h3>
              <p className="mt-2 text-muted-foreground">
                Use the AI Report Writer to structure your narrative and
                articulate probable cause, turning a 60-minute task into a
                30-minute one.
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg bg-card">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Searchable Statutes</h3>
              <p className="mt-2 text-muted-foreground">
                Find any Florida Statute or local ordinance in seconds with a
                powerful, keyword-driven search engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Did You Know?" Section */}
      <section className="py-20 sm:py-24 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Stay Sharp. Stay Safe.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Florida law is complex. Here are just a few examples of the critical details Florida Shield puts at your fingertips.
            </p>
          </div>
          <div className="mt-12 max-w-2xl mx-auto space-y-4">
            <div className="p-4 bg-card border rounded-lg flex items-start gap-4">
              <GraduationCap className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Did you know?</span> Florida law requires a separate permit for harvesting Snook AND Spiny Lobster, even with a valid saltwater license. Our guide tracks it all.
              </p>
            </div>
             <div className="p-4 bg-card border rounded-lg flex items-start gap-4">
              <GraduationCap className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Did you know?</span> Under F.S. § 828.12, simple neglect of an animal is a misdemeanor, but intentional infliction of pain elevates it to a felony. Our checklist helps you document the difference.
              </p>
            </div>
             <div className="p-4 bg-card border rounded-lg flex items-start gap-4">
              <GraduationCap className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Did you know?</span> A diver-down flag must be taken down when the last diver is out of the water. Leaving it up is a non-criminal infraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive In-App Preview */}
       <section className="py-20 sm:py-24 px-4">
        <div className="container mx-auto">
           <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              See It In Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience the clarity and speed of the interactive checklist interface. No more fumbling with binders or confusing manuals.
            </p>
          </div>
          <div className="mt-12">
            <div className="relative aspect-video max-w-4xl mx-auto rounded-lg border-4 border-muted/50 shadow-2xl overflow-hidden bg-card p-6 sm:p-8 flex flex-col">
              <div className="mb-4 sm:mb-6">
                <p className="text-sm sm:text-base font-medium text-primary">DUI Investigation Checklist</p>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Phase 1: Vehicle in Motion</h3>
              </div>
              <div className="flex-grow space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground">
                  You are now behind the suspect vehicle and observing its movement. What specific driving cues are you looking for to corroborate the BOLO and establish your own reasonable suspicion?
                </p>
                <div className="p-3 sm:p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-accent-foreground/90">AI Tactical Tip</h4>
                      <p className="text-xs sm:text-sm text-accent-foreground/80">
                        Document any observed traffic infractions. This independent observation is crucial and will be the legal foundation for your traffic stop, separate from the initial BOLO.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-6">
                <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2">Select your next action:</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-md px-3 py-1.5 sm:px-4 sm:py-2 shadow-md">
                    I have observed a violation and initiated a stop.
                  </div>
                  <div className="bg-secondary text-secondary-foreground text-xs sm:text-sm font-medium rounded-md px-3 py-1.5 sm:px-4 sm:py-2">
                    Continue observation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 px-4 bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full mt-12">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Is this app's information kept up-to-date with Florida law changes?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Our legal database is continuously monitored and updated by a team of legal experts to reflect the latest changes in Florida Statutes and relevant case law.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is my data and report information secure?</AccordionTrigger>
              <AccordionContent>
                Security is based on transparency and design. The app is designed so that sensitive information should never be entered. Features like Field Notes store data only locally on your device's browser, not on our servers. AI features process data temporarily and do not log it. The app is **not** CJIS compliant and must not be used for official evidence or case management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Does the app work offline if I don't have cell service?
              </AccordionTrigger>
              <AccordionContent>
                Core reference materials, including statutes, checklists, and FWC guides, are available offline. AI-powered features require a data connection to function.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is this for individual officers or agency-wide subscriptions?
              </AccordionTrigger>
              <AccordionContent>
                We offer flexible plans for both individual officers and cost-effective, agency-wide subscriptions that include additional administrative and training features.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 sm:py-24 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
            <div className="flex justify-center mb-4">
                <ShieldCheck className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              A Training Tool You Can Trust
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Florida Shield is an informational and training aid, built on a foundation of transparency.
            </p>
            <div className="mt-6 text-left p-6 border-2 border-destructive/50 rounded-lg bg-card">
                 <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                    <h3 className="text-xl font-bold text-destructive-foreground">Not a CJIS-Compliant Platform</h3>
                 </div>
                 <p className="text-muted-foreground">
                    This application is **NOT** connected to any official law enforcement database (FCIC/NCIC, DAVID). It is designed for training, reference, and note-taking only.
                 </p>
                 <ul className="mt-4 space-y-2 list-disc pl-5 text-muted-foreground">
                    <li><span className="font-semibold">Local-First Data:</span> Features like Field Notes store data only on your local device's browser storage. This data is never sent to our servers.</li>
                    <li><span className="font-semibold">Temporary AI Processing:</span> AI features process your input temporarily to generate a response and do not store or log your queries.</li>
                    <li><span className="font-semibold">Strict Prohibition:</span> Users are strictly prohibited from entering any real Personally Identifiable Information (PII), Criminal Justice Information (CJI), or other sensitive case data.</li>
                 </ul>
            </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Upgrade Your Patrol?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get the tool that gives you confidence in every encounter.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/dashboard">Access The App</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Disclaimer Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
            <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
              <strong className="font-semibold text-foreground/80">Disclaimer & CJIS Warning:</strong> The Florida Shield application is for informational and training purposes only and is not a substitute for legal advice, agency policy, or certified training. All information should be independently verified. <strong className="text-destructive">This is NOT a CJIS-compliant environment.</strong> Users are strictly prohibited from entering, storing, or transmitting any real Personally Identifiable Information (PII), Criminal Justice Information (CJI), or any other sensitive case-specific details. All user-input fields must be treated as unsecure and for training or note-taking purposes only. Violation of this policy may result in disciplinary action.
            </p>
        </div>
      </footer>
    </div>
  )
}
