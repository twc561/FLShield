
import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ShieldCheck, BarChart, BookOpen, ArrowRight, TrendingUp, ShieldAlert, UserCheck } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ValueProp = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="bg-muted/50 flex flex-col">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Testimonial = ({ quote, name, title }: { quote: string, name: string, title: string }) => (
    <div className="p-6 border-l-4 border-primary bg-card">
        <blockquote className="italic text-foreground/90">"{quote}"</blockquote>
        <p className="mt-4 font-semibold text-right text-primary">{name}</p>
        <p className="text-sm text-muted-foreground text-right">{title}</p>
    </div>
);

export default function ForAgenciesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
      <PageHeader
        title="A Modern Solution for Modern Law Enforcement Agencies"
        description="Equip your officers, reduce liability, and streamline training with Florida Shield."
      />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <ValueProp
          icon={ShieldAlert}
          title="Reduce Agency Liability"
          description="By providing instant access to up-to-date legal and procedural information, Florida Shield helps ensure every action your officers take is defensible and compliant, reducing the risk of costly litigation from bad searches or procedural errors."
        />
        <ValueProp
          icon={TrendingUp}
          title="Increase Officer Efficiency"
          description="Less time searching for information means more time on patrol. Our AI-powered search turns minutes of flipping through a statute book into seconds of typing on a mobile device, improving productivity and in-field decision-making."
        />
        <ValueProp
          icon={UserCheck}
          title="Enhance Training & FTO Programs"
          description="Supplement traditional academy and in-service training with interactive scenarios and just-in-time learning. Florida Shield serves as a perpetual FTO, reinforcing training in the moments it's needed most."
        />
      </div>

       <section className="py-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Trusted by Leaders in the Field</h2>
                <p className="mt-2 text-lg text-muted-foreground">Hear what command staff are saying about the impact of Florida Shield.</p>
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                <Testimonial 
                    quote="Florida Shield is a force multiplier. It gives my officers the confidence to make the right call on the street, and it gives me the confidence that they're operating based on the latest case law. It's an essential tool for risk management."
                    name="[Placeholder] Police Chief"
                    title="Anytown Police Department"
                />
                 <Testimonial 
                    quote="The FTO program has been transformed. New recruits use the interactive checklists for every DUI and DV call. Their report quality has improved dramatically, and they're learning faster because they have a 'digital FTO' guiding them 24/7."
                    name="[Placeholder] Training Sergeant"
                    title="Metro County Sheriff's Office"
                />
            </div>
       </section>

       <div className="mt-16 text-center bg-card p-8 rounded-lg border">
         <h2 className="text-2xl font-bold">Ready to Empower Your Agency?</h2>
         <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
           Schedule a personalized demonstration to see how Florida Shield can be tailored to your agency's specific needs and policies.
         </p>
         <Button asChild className="mt-6" size="lg">
           <Link href="/request-demo">Request a Demo <ArrowRight className="ml-2 h-5 w-5"/></Link>
         </Button>
       </div>
    </div>
  )
}
