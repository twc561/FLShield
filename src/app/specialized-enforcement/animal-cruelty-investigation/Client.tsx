"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnimalCrueltyGuide, AgencyContact } from "@/data/specialized-enforcement/animal-cruelty"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioWalkthrough } from "@/app/field-procedures/scenario-checklists/ScenarioWalkthrough"
import { Check, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const renderAgencyContacts = (contacts: AgencyContact[]) => (
  <ul className="space-y-3">
    {contacts.map((contact, i) => (
      <li key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
        <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground/90">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.notes}</p>
          <Button variant="link" asChild className="p-0 h-auto text-sm">
            <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
          </Button>
        </div>
      </li>
    ))}
  </ul>
);

export const AnimalCrueltyClient = React.memo(function AnimalCrueltyClient({ data }: { data: AnimalCrueltyGuide }) {
  const { legalFoundation, recognitionGuide, investigativePlaybook, reportWriting, agencyDirectory } = data;

  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-playbook">
      {/* Part 1: Legal Foundation */}
      <AccordionItem value="item-legal" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <CardTitle>Part 1: Legal Foundation &amp; Definitions</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Key Legal Terms (F.S. § 828.02)</h3>
                <div className="space-y-2">
                  {legalFoundation.definitions.map(def => (
                    <p key={def.title} className="text-sm">
                      <strong className="text-foreground/90">{def.title}:</strong> <span className="text-muted-foreground">{def.definition}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Misdemeanor vs. Felony Cruelty</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardHeader><CardTitle className="text-base">Misdemeanor Cruelty (F.S. § 828.12(1))</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{legalFoundation.comparison.misdemeanor}</CardContent>
                  </Card>
                  <Card className="bg-destructive/10">
                    <CardHeader><CardTitle className="text-base">Aggravated / Felony Cruelty (F.S. § 828.12(2))</CardTitle></CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{legalFoundation.comparison.felony}</CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>
      
      {/* Part 2: Field Recognition Guide */}
      <AccordionItem value="item-recognition" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <CardTitle>Part 2: Field Recognition Guide</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4 space-y-4">
              {recognitionGuide.map(item => {
                const Icon = (LucideIcons as any)[item.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle
                return (
                  <div key={item.category}>
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Icon className="w-5 h-5 text-primary" /> {item.category}</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {item.indicators.map((indicator, i) => <li key={i}>{indicator}</li>)}
                    </ul>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>

      {/* Part 3: Investigative Playbook */}
      <AccordionItem value="item-playbook" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <CardTitle>Part 3: The Investigative Playbook</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4">
              <Tabs defaultValue="interactive" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="interactive">Interactive Guide</TabsTrigger>
                  <TabsTrigger value="static">Static Checklist</TabsTrigger>
                </TabsList>
                <TabsContent value="interactive" className="mt-4">
                  <ScenarioWalkthrough scenario={investigativePlaybook} />
                </TabsContent>
                <TabsContent value="static" className="mt-4">
                  <div className="space-y-4">
                    {investigativePlaybook.staticChecklist.map((section, index) => {
                        const SectionIcon = (LucideIcons as any)[section.icon] || Check
                        return (
                            <Card key={index} className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-base">
                                        <SectionIcon className="w-5 h-5 text-primary" />
                                        {section.section}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>

      {/* Part 4: Report Writing */}
      <AccordionItem value="item-reporting" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <CardTitle>Part 4: Report Writing &amp; Case Building</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4 space-y-6">
              {reportWriting.tips.map(tip => (
                <div key={tip.title}>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <Alert>
                    <LucideIcons.PenSquare className="h-4 w-4" />
                    <AlertTitle>Example Narrative</AlertTitle>
                    <AlertDescription className="italic">
                      "{tip.content}"
                    </AlertDescription>
                  </Alert>
                </div>
              ))}
              <div>
                <h3 className="font-semibold mb-2">{reportWriting.vetRole.title}</h3>
                <p className="text-sm text-muted-foreground">{reportWriting.vetRole.content}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Photo & Evidence Log Template</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {reportWriting.photoLogTemplate.map(header => <TableHead key={header.key}>{header.value}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">[#]</TableCell>
                      <TableCell className="text-muted-foreground">[Time/Date]</TableCell>
                      <TableCell className="text-muted-foreground">[Description]</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>

      {/* Part 5: Agency Directory */}
      <AccordionItem value="item-directory" className="border-b-0">
        <Card>
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <CardTitle>Part 5: Agency &amp; Resource Directory</CardTitle>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0">
            <div className="border-t pt-4 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">St. Lucie County Animal Control</h3>
                {renderAgencyContacts(agencyDirectory.stLucie)}
              </div>
              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="other-fl">
                    <AccordionTrigger>Other Major Florida Animal Control Agencies</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      {renderAgencyContacts(agencyDirectory.otherFlorida)}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </AccordionContent>
        </Card>
      </AccordionItem>

    </Accordion>
  )
})
