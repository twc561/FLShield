
"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { MarchmanActGuide } from "@/data/emergency-response/marchman-act-guide"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gavel, Users, ShieldCheck, Languages, CheckCircle } from "lucide-react"

const Section = ({
  title,
  icon: Icon,
  children,
  value,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  value: string;
}) => (
  <AccordionItem value={value} className="border-b-0">
    <Card>
      <AccordionTrigger className="p-6 text-left hover:no-underline">
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="border-t pt-4 space-y-4">{children}</div>
      </AccordionContent>
    </Card>
  </AccordionItem>
);

const CriteriaDetailView = ({ criteriaPoints }: { criteriaPoints: MarchmanActGuide['criteriaForInitiation']['english']['criteriaPoints'] }) => (
    <div className="space-y-4">
        {criteriaPoints.map((point) => (
            <Card key={point.criterion} className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-base">{point.criterion}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground"><strong className="text-foreground/80">What it Looks Like:</strong> {point.whatItLooksLike}</p>
                </CardContent>
            </Card>
        ))}
    </div>
);


export const MarchmanActClient = React.memo(
  function MarchmanActClient({
    guideData,
  }: {
    guideData: MarchmanActGuide;
  }) {
    return (
      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="part2">
        <Section title={guideData.comparisonWithBakerAct.title} icon={Users} value="part1">
          <p className="text-muted-foreground">{guideData.comparisonWithBakerAct.explanation}</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead className="text-accent">Marchman Act</TableHead>
                <TableHead>Baker Act</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guideData.comparisonWithBakerAct.table.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell className="text-accent">{row.marchmanAct}</TableCell>
                  <TableCell>{row.bakerAct}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title={guideData.criteriaForInitiation.title} icon={Gavel} value="part2">
           <Tabs defaultValue="english" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="spanish">Español</TabsTrigger>
                <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
            </TabsList>
            <TabsContent value="english" className="mt-4">
                <CriteriaDetailView criteriaPoints={guideData.criteriaForInitiation.english.criteriaPoints} />
            </TabsContent>
            <TabsContent value="spanish" className="mt-4">
                <CriteriaDetailView criteriaPoints={guideData.criteriaForInitiation.spanish.criteriaPoints} />
            </TabsContent>
            <TabsContent value="haitian_creole" className="mt-4">
                <CriteriaDetailView criteriaPoints={guideData.criteriaForInitiation.haitian_creole.criteriaPoints} />
            </TabsContent>
          </Tabs>
        </Section>

        <Section title={guideData.officerProcedure.title} icon={CheckCircle} value="part3">
            <ol className="space-y-3">
                {guideData.officerProcedure.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">{index + 1}</span>
                        <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                ))}
            </ol>
        </Section>
        
        <Section title={guideData.officerImmunity.title} icon={ShieldCheck} value="part4">
            <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Good Faith Immunity</AlertTitle>
                <AlertDescription>{guideData.officerImmunity.explanation}</AlertDescription>
            </Alert>
        </Section>

         <Section title={guideData.translatedResources.title} icon={Languages} value="part5">
            <p className="text-muted-foreground">{guideData.translatedResources.explanation}</p>
            <Tabs defaultValue="english" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="spanish">Español</TabsTrigger>
                    <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                </TabsList>
                <TabsContent value="english" className="mt-4 text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    {guideData.translatedResources.english.whatIsHappening}
                </TabsContent>
                <TabsContent value="spanish" className="mt-4 text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    {guideData.translatedResources.spanish.whatIsHappening}
                </TabsContent>
                <TabsContent value="haitian_creole" className="mt-4 text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    {guideData.translatedResources.haitian_creole.whatIsHappening}
                </TabsContent>
            </Tabs>
        </Section>
      </Accordion>
    );
  }
);
