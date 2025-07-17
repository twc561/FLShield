
"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  FileCheck, 
  ShieldAlert, 
  Camera, 
  Lock, 
  AlertTriangle,
  CheckCircle,
  Users,
  Clock
} from 'lucide-react'
import { evidenceManagementData } from '@/data/field-procedures/evidence-management'
import PageHeader from '@/components/PageHeader'

type SectionProps = {
  title: string
  icon: React.ElementType
  value: string
  children: React.ReactNode
}

function Section({ title, icon: Icon, value, children }: SectionProps) {
  return (
    <TabsContent value={value} className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </TabsContent>
  )
}

export default function EvidenceManagementClient() {
  const guideData = evidenceManagementData

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader 
        title="Evidence Management Guide"
        description="Complete procedures for evidence collection, chain of custody, and court preparation"
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="types">Evidence Types</TabsTrigger>
          <TabsTrigger value="custody">Chain of Custody</TabsTrigger>
          <TabsTrigger value="digital">Digital Evidence</TabsTrigger>
          <TabsTrigger value="court">Court Prep</TabsTrigger>
          <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
        </TabsList>

        <Section title={guideData.overviewPrinciples.title} icon={FileCheck} value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Fundamental Principles
              </CardTitle>
              <CardDescription>
                These core principles apply to all evidence handling situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {guideData.overviewPrinciples.principles.map((principle, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm">{principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Evidence Types and Handling" icon={Camera} value="types">
          <div className="space-y-4">
            {guideData.evidenceTypes.map((evidenceType, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{evidenceType.category}</Badge>
                  </CardTitle>
                  <CardDescription>{evidenceType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="handling">
                      <AccordionTrigger>Handling Procedures</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {evidenceType.handlingProcedures.map((procedure, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{procedure}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="storage">
                      <AccordionTrigger>Storage Requirements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {evidenceType.storageRequirements.map((requirement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Lock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mistakes">
                      <AccordionTrigger>Common Mistakes to Avoid</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {evidenceType.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Chain of Custody Procedure" icon={Users} value="custody">
          <div className="space-y-4">
            {guideData.chainOfCustodyProcedure.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {step.step}
                    </span>
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        Required Documentation
                      </h4>
                      <ul className="space-y-1">
                        {step.requiredDocumentation.map((doc, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {doc}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Critical Considerations
                      </h4>
                      <ul className="space-y-1">
                        {step.criticalConsiderations.map((consideration, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {consideration}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title={guideData.digitalEvidenceSpecial.title} icon={Lock} value="digital">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Special Procedures for Digital Evidence</CardTitle>
                <CardDescription>Digital evidence requires unique handling protocols</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Required Procedures</h4>
                    <ul className="space-y-2">
                      {guideData.digitalEvidenceSpecial.procedures.map((procedure, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{procedure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Essential Tools</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {guideData.digitalEvidenceSpecial.tools.map((tool, index) => (
                        <Badge key={index} variant="secondary" className="justify-start">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section title={guideData.courtPreparation.title} icon={Clock} value="court">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pre-Trial Preparation Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {guideData.courtPreparation.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Testimony Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guideData.courtPreparation.testimonyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section title={guideData.commonPitfalls.title} icon={AlertTriangle} value="pitfalls">
          <div className="space-y-4">
            {guideData.commonPitfalls.pitfalls.map((pitfall, index) => (
              <Alert key={index} className="border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">{pitfall.mistake}</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-semibold text-red-700">Consequence: </span>
                      <span className="text-red-600">{pitfall.consequence}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">Prevention: </span>
                      <span className="text-green-600">{pitfall.prevention}</span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </Section>
      </Tabs>
    </div>
  )
}
