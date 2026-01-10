
"use client"

import * as React from "react"
import { memo } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { DuiInvestigationGuide, LanguageGuide } from "@/data/traffic-enforcement/dui-investigation"
import * as LucideIcons from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"


const FstSection = memo(function FstSection({ guideData }: { guideData: LanguageGuide }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue='item-0'>
        {guideData.fstAdminGuide.map((test, index) => (
             <AccordionItem value={`item-${index}`} key={test.TestName} className="border-b-0">
                <Card>
                    <AccordionTrigger className="p-6 text-left hover:no-underline">
                        <CardTitle>{test.TestName}</CardTitle>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                        <div className='border-t pt-4 space-y-4'>
                            <Alert>
                                <LucideIcons.FileText className="h-4 w-4" />
                                <AlertTitle>Verbatim Instructions</AlertTitle>
                                <AlertDescription className="whitespace-pre-wrap">
                                    {test.VerbatimInstructions}
                                </AlertDescription>
                            </Alert>
                             <div>
                                <h4 className="font-semibold text-foreground/90 mb-2">Standardized Clues ({test.TotalClues} Total, {test.DecisionPoint} for Decision)</h4>
                                <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                                    {test.StandardizedClues.map((clue, i) => <li key={i}>{clue}</li>)}
                                </ul>
                            </div>
                            <div className="p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                                <h4 className="font-semibold text-accent-foreground/90 mb-2">Officer Notes</h4>
                                <p className="text-sm text-accent-foreground/80">{test.OfficerNotes}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </Card>
             </AccordionItem>
        ))}
    </Accordion>
)});
FstSection.displayName = 'FstSection';

const LegalWarningsSection = memo(function LegalWarningsSection({ guideData }: { guideData: LanguageGuide }) {
  return (
    <div className="space-y-4">
        {guideData.impliedConsentScripts.map((warning, i) => (
             <Card key={i}>
                <CardHeader>
                    <CardTitle>{warning.Title}</CardTitle>
                    <CardDescription>F.S. 316.1932</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <LucideIcons.FileText className="h-4 w-4" />
                        <AlertTitle>Verbatim Script</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap">
                            {warning.Script}
                        </AlertDescription>
                    </Alert>
                </CardContent>
             </Card>
        ))}
    </div>
)});
LegalWarningsSection.displayName = 'LegalWarningsSection';


export const DuiInvestigationClient = memo(function DuiInvestigationClient({ data }: { data: DuiInvestigationGuide }) {
    return (
        <div className="space-y-6">
            <Accordion type="multiple" className="w-full space-y-4" defaultValue={['part1']}>
                <AccordionItem value="part1" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <div className="flex items-center gap-3">
                                <LucideIcons.Eye className="h-5 w-5 text-primary"/>
                                <CardTitle>Part 1: DUI Detection (Phases 1 & 2)</CardTitle>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4 space-y-6">
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Vehicle in Motion Cue Library</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Cue</TableHead>
                                                    <TableHead>Associated Impairment</TableHead>
                                                    <TableHead>Linked Statute</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {data.dui_detection.vehicleInMotionCues.map(cue => (
                                                    <TableRow key={cue.cueName}>
                                                        <TableCell className="font-medium">{cue.cueName}</TableCell>
                                                        <TableCell>{cue.associatedImpairment}</TableCell>
                                                        <TableCell>
                                                            <Button variant="link" asChild className="p-0 h-auto">
                                                                <Link href={`/traffic-enforcement/traffic-statutes-schedules?search=${cue.linkedStatute}`}>{cue.linkedStatute}</Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                                <Card>
                                     <CardHeader><CardTitle className="text-lg">Personal Contact Sensory Checklist</CardTitle></CardHeader>
                                     <CardContent className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><LucideIcons.Eye className="h-4 w-4"/> Sight</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                                {data.dui_detection.personalContactChecklist.sight.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><LucideIcons.Ear className="h-4 w-4"/> Sound</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                                {data.dui_detection.personalContactChecklist.sound.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                         <div>
                                            <h4 className="font-semibold mb-2 flex items-center gap-2"><LucideIcons.Wind className="h-4 w-4"/> Smell</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                                {data.dui_detection.personalContactChecklist.smell.map((item, i) => <li key={i}>{item}</li>)}
                                            </ul>
                                        </div>
                                     </CardContent>
                                </Card>
                                 <Card>
                                     <CardHeader><CardTitle className="text-lg">Pre-FST Screening Questions</CardTitle></CardHeader>
                                     <CardContent>
                                         <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                                            {data.dui_detection.preFstScreeningQuestions.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                     </CardContent>
                                </Card>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                <AccordionItem value="part2" className="border-b-0">
                    <Card>
                         <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <div className="flex items-center gap-3">
                                <LucideIcons.Footprints className="h-5 w-5 text-primary"/>
                                <CardTitle>Part 2: Pre-Arrest Screening (Phase 3)</CardTitle>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4 space-y-6">
                                <Tabs defaultValue="english" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="english">English</TabsTrigger>
                                        <TabsTrigger value="spanish">Español</TabsTrigger>
                                        <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                                    </TabsList>
                                     <TabsContent value="english" className="mt-4">
                                        <FstSection guideData={data.pre_arrest_screening.fstAdminGuide.english} />
                                    </TabsContent>
                                     <TabsContent value="spanish" className="mt-4">
                                        <FstSection guideData={data.pre_arrest_screening.fstAdminGuide.spanish} />
                                    </TabsContent>
                                     <TabsContent value="haitian_creole" className="mt-4">
                                        <FstSection guideData={data.pre_arrest_screening.fstAdminGuide.haitian_creole} />
                                    </TabsContent>
                                </Tabs>
                                 <Card>
                                     <CardHeader><CardTitle className="text-lg">Non-Standardized Tests</CardTitle></CardHeader>
                                     <CardContent>
                                        <p className="text-muted-foreground mb-4">{data.pre_arrest_screening.nonStandardizedTests.description}</p>
                                        <Alert variant="destructive">
                                            <LucideIcons.Gavel className="h-4 w-4" />
                                            <AlertTitle>Legal Caveat</AlertTitle>
                                            <AlertDescription>{data.pre_arrest_screening.nonStandardizedTests.legalCaveat}</AlertDescription>
                                        </Alert>
                                     </CardContent>
                                </Card>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                <AccordionItem value="part3" className="border-b-0">
                    <Card>
                         <AccordionTrigger className="p-6 text-left hover:no-underline">
                           <div className="flex items-center gap-3">
                                <LucideIcons.Gavel className="h-5 w-5 text-primary"/>
                                <CardTitle>Part 3: Arrest, Implied Consent &amp; Testing</CardTitle>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4 space-y-6">
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Articulating Probable Cause</CardTitle></CardHeader>
                                    <CardContent className="text-muted-foreground space-y-2">
                                       <p>{data.arrest_and_testing.articulatingProbableCause.guide}</p>
                                    </CardContent>
                                </Card>
                                <Tabs defaultValue="english" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="english">English</TabsTrigger>
                                        <TabsTrigger value="spanish">Español</TabsTrigger>
                                        <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="english" className="mt-4">
                                        <LegalWarningsSection guideData={data.pre_arrest_screening.fstAdminGuide.english} />
                                    </TabsContent>
                                    <TabsContent value="spanish" className="mt-4">
                                        <LegalWarningsSection guideData={data.pre_arrest_screening.fstAdminGuide.spanish} />
                                    </TabsContent>
                                    <TabsContent value="haitian_creole" className="mt-4">
                                        <LegalWarningsSection guideData={data.pre_arrest_screening.fstAdminGuide.haitian_creole} />
                                    </TabsContent>
                                </Tabs>
                                <Card>
                                     <CardHeader><CardTitle className="text-lg">Chemical Test Procedures</CardTitle></CardHeader>
                                     <CardContent className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Breath Test (Intoxilyzer)</h4>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.arrest_and_testing.chemicalTestProcedures.breathTest.guide}</p>
                                        </div>
                                         <div>
                                            <h4 className="font-semibold mb-2">Urine / Blood Test</h4>
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.arrest_and_testing.chemicalTestProcedures.urineBloodTest.guide}</p>
                                        </div>
                                     </CardContent>
                                </Card>
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                 <AccordionItem value="part4" className="border-b-0">
                    <Card>
                         <AccordionTrigger className="p-6 text-left hover:no-underline">
                             <div className="flex items-center gap-3">
                                <LucideIcons.FileCheck className="h-5 w-5 text-primary"/>
                                <CardTitle>Part 4: Case Building &amp; Court Prep</CardTitle>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                             <div className="border-t pt-4 space-y-6">
                                 <Card>
                                    <CardHeader><CardTitle className="text-lg">DUI Report Narrative Builder</CardTitle></CardHeader>
                                    <CardContent>
                                        <h4 className="font-semibold mb-2">Narrative Template:</h4>
                                        <Alert className="mb-4">
                                            <AlertDescription className="whitespace-pre-wrap text-xs">{data.case_building.reportNarrativeBuilder.template}</AlertDescription>
                                        </Alert>
                                        <h4 className="font-semibold mb-2">Prosecutor-Preferred Phrases:</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                            {data.case_building.reportNarrativeBuilder.prosecutorPhrases.map(phrase => <li key={phrase}>&quot;{phrase}&quot;</li>)}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle className="text-lg">Preparing for Court Testimony (Q&amp;A)</CardTitle></CardHeader>
                                    <CardContent>
                                        <h4 className="font-semibold mb-2">Common Prosecution Questions:</h4>
                                         <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                                            {data.case_building.courtTestimonyPrep.prosecutionQuestions.map(q => <li key={q}>{q}</li>)}
                                        </ul>
                                        <h4 className="font-semibold mb-2 text-destructive">Common Defense Attorney Questions:</h4>
                                         <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                            {data.case_building.courtTestimonyPrep.defenseQuestions.map(q => <li key={q}>{q}</li>)}
                                        </ul>
                                    </CardContent>
                                </Card>
                             </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    )
})
