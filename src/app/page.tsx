
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
  CheckCircle,
  Fish,
  ListChecks,
  Scale,
  Bot,
  ShieldQuestion,
  GraduationCap,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Your Partner on Patrol.
            <br />
            <span className="text-primary">Master Every Scenario.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-muted-foreground">
            The all-in-one Florida field guide with AI-powered checklists,
            searchable statutes, and FWC regulations, designed to make your job
            safer and more efficient.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              Request Agency Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <p className="text-sm font-semibold text-muted-foreground tracking-wider">
            TRUSTED BY OFFICERS IN AGENCIES ACROSS FLORIDA
          </p>
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
              <h3 className="text-lg font-semibold">Cut Report Time</h3>
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
            <div className="relative aspect-video max-w-4xl mx-auto rounded-lg border-4 border-muted/50 shadow-2xl overflow-hidden">
                <Image 
                    src="https://placehold.co/1280x720.png"
                    alt="App Preview Animation"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="app animation video"
                />
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
                Security is our top priority. All data, especially sensitive information like field notes and report drafts, is encrypted both in transit and at rest, adhering to CJIS compliance standards.
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
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
