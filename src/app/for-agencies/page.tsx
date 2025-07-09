
import { PageHeader } from "@/components/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ShieldCheck, BarChart, BookOpen, ArrowRight } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ValueProp = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <Card className="bg-muted/50">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function ForAgenciesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <PageHeader
        title="A Modern Solution for Modern Law Enforcement Agencies"
        description="Equip your officers, reduce liability, and streamline training with Florida Shield."
      />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <ValueProp
          icon={ShieldCheck}
          title="Reduce Agency Liability"
          description="By providing instant access to up-to-date legal and procedural information, Florida Shield helps ensure every action your officers take is defensible and compliant, reducing the risk of costly litigation from bad searches or procedural errors."
        />
        <ValueProp
          icon={BarChart}
          title="Increase Officer Efficiency"
          description="Less time searching for information means more time on patrol. Our AI-powered search turns minutes of flipping through a statute book into seconds of typing on a mobile device, improving productivity and in-field decision-making."
        />
        <ValueProp
          icon={BookOpen}
          title="Enhance Training Effectiveness"
          description="Supplement traditional academy and in-service training with interactive scenarios and just-in-time learning. Florida Shield serves as a perpetual FTO, reinforcing training in the moments it's needed most."
        />
      </div>
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
