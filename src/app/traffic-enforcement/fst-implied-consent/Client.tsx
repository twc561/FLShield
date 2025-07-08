
"use client"

import { useState, memo } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { TrilingualFstGuide, LanguageGuide } from "@/data/traffic-enforcement/fst-trilingual"
import * as LucideIcons from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FstSection = memo(({ guideData }: { guideData: LanguageGuide }) => (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue='item-0'>
        {guideData.FstTests.map((test, index) => (
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
));

const SetupSection = memo(({ guideData }: { guideData: LanguageGuide }) => (
    <Card>
        <CardHeader>
            <CardTitle>{guideData.Setup_Checklist_Title}</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {guideData.Setup_Checklist_Items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </CardContent>
    </Card>
));

const MedicalClearanceSection = memo(({ guideData }: { guideData: LanguageGuide }) => (
    <Card>
        <CardHeader>
            <CardTitle>{guideData.Medical_Clearance_Title}</CardTitle>
            <CardDescription>Ask these questions before beginning tests.</CardDescription>
        </CardHeader>
        <CardContent>
             <ul className="list-decimal pl-5 space-y-2 text-muted-foreground italic">
                {guideData.Medical_Clearance_Questions.map((item, i) => <li key={i}>"{item}"</li>)}
            </ul>
        </CardContent>
    </Card>
));

const LegalWarningsSection = memo(({ guideData }: { guideData: LanguageGuide }) => (
    <div className="space-y-4">
        {guideData.Legal_Warnings.map((warning, i) => (
             <Card key={i}>
                <CardHeader>
                    <CardTitle>{warning.Title}</CardTitle>
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
));


export const FstImpliedConsentClient = memo(function FstImpliedConsentClient({ data }: { data: TrilingualFstGuide }) {
    const [language, setLanguage] = useState<keyof TrilingualFstGuide>('english');
    const guideData = data[language];

    return (
        <div className="space-y-6">
            <Tabs defaultValue="english" onValueChange={(value) => setLanguage(value as keyof TrilingualFstGuide)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="spanish">Español</TabsTrigger>
                    <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                </TabsList>
            </Tabs>

            <Accordion type="multiple" className="w-full space-y-4" defaultValue={['setup', 'fsts']}>
                <AccordionItem value="setup" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <CardTitle>Setup &amp; Medical Clearance</CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4 space-y-4">
                                <SetupSection guideData={guideData} />
                                <MedicalClearanceSection guideData={guideData} />
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                <AccordionItem value="fsts" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <CardTitle>Standardized Field Sobriety Tests (SFSTs)</CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                           <div className="border-t pt-4">
                                <FstSection guideData={guideData} />
                           </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
                 <AccordionItem value="warnings" className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-6 text-left hover:no-underline">
                            <CardTitle>Legal Warnings &amp; Implied Consent</CardTitle>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="border-t pt-4">
                                <LegalWarningsSection guideData={guideData} />
                            </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    )
})
