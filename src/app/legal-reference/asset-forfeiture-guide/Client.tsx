
"use client"

import { memo } from "react"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Scale, 
  Clock, 
  FileText, 
  Shield, 
  AlertCircle, 
  Gavel, 
  Building, 
  Car, 
  DollarSign,
  Package,
  Bell
} from "lucide-react"
import type { AssetForfeitureGuide } from "@/data/legal-reference/asset-forfeiture"

interface AssetForfeitureClientProps {
  data: AssetForfeitureGuide
}

const Section = memo(({ title, icon: Icon, children, value }: { 
  title: string; 
  icon: any; 
  children: React.ReactNode; 
  value: string 
}) => (
  <AccordionItem value={value} className="border-b-0">
    <Card>
      <AccordionTrigger className="p-6 text-left hover:no-underline">
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="border-t pt-4">
          {children}
        </div>
      </AccordionContent>
    </Card>
  </AccordionItem>
))
Section.displayName = 'Section';


const PropertyTypeIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "Real Property": return <Building className="w-4 h-4" />
    case "Vehicles": return <Car className="w-4 h-4" />
    case "Currency and Financial Instruments": return <DollarSign className="w-4 h-4" />
    case "Personal Property": return <Package className="w-4 h-4" />
    default: return <Package className="w-4 h-4" />
  }
}

export const AssetForfeitureClient = memo(function AssetForfeitureClient({ data }: AssetForfeitureClientProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="definitions">
      <Section title="Key Definitions" icon={Scale} value="definitions">
        <div className="space-y-4">
          {data.definitions.map((def, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">{def.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{def.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Forfeiture Procedures" icon={FileText} value="procedures">
        <div className="space-y-6">
          {data.procedures.map((procedure, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3">{procedure.title}</h3>
              <p className="text-muted-foreground mb-3">{procedure.description}</p>
              <ol className="space-y-2">
                {procedure.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                      {stepIndex + 1}
                    </span>
                    <span className="text-muted-foreground pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Legal Foundations" icon={Gavel} value="legal">
        <div className="space-y-4">
          {data.legalFoundations.map((legal, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">{legal.title}</CardTitle>
                <CardDescription className="font-mono text-sm">{legal.statute}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{legal.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Property Types" icon={Package} value="property">
        <div className="space-y-4">
          {data.propertyTypes.map((type, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PropertyTypeIcon category={type.category} />
                  {type.category}
                </CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Examples:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-muted-foreground">{example}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {type.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="text-muted-foreground">{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Critical Timeframes" icon={Clock} value="timeframes">
        <div className="space-y-4">
          {data.timeframes.map((timeframe, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{timeframe.stage}</CardTitle>
                  <Badge variant={timeframe.timeLimit === "Immediate" ? "destructive" : "secondary"}>
                    {timeframe.timeLimit}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{timeframe.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Notice Requirements" icon={Bell} value="notice">
        <div className="space-y-4">
          {data.noticeRequirements.map((notice, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">{notice.type}</CardTitle>
                <CardDescription>To: {notice.recipient}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Timeline:</strong> {notice.timeline}</p>
                  <p><strong>Method:</strong> {notice.method}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Common Defenses & Challenges" icon={Shield} value="defenses">
        <div className="space-y-4">
          {data.defensesAndChallenges.map((defense, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">{defense.defense}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{defense.description}</p>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Burden of Proof</AlertTitle>
                  <AlertDescription>{defense.burden}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Important Reminders" icon={AlertCircle} value="reminders">
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Due Process Requirements</AlertTitle>
            <AlertDescription>
              All forfeiture proceedings must comply with constitutional due process requirements. 
              Proper notice, opportunity to be heard, and proportionality must be maintained throughout the process.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Documentation is Critical</AlertTitle>
            <AlertDescription>
              Maintain detailed records of all seizures, including photographs, inventory lists, and chain of custody documentation. 
              Poor documentation can result in dismissal of forfeiture proceedings.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Consult Legal Counsel</AlertTitle>
            <AlertDescription>
              Asset forfeiture involves complex legal procedures. Always consult with prosecutors or legal counsel 
              before initiating forfeiture proceedings to ensure compliance with all requirements.
            </AlertDescription>
          </Alert>
        </div>
      </Section>
    </Accordion>
  )
})
