
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  CommercialVehicleGuide
} from "@/data/traffic-enforcement/commercial-vehicle";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Biohazard, ClipboardCheck, Gavel, Info, ShieldAlert, Wrench } from "lucide-react";

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

export const CommercialVehicleClient = React.memo(
  function CommercialVehicleClient({
    guideData,
  }: {
    guideData: CommercialVehicleGuide;
  }) {
    return (
      <Accordion type="single" collapsible className="w-full space-y-4">
        <Section title="The 'First 5 Minutes' Roadside Checklist" icon={ClipboardCheck} value="part1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Check Item</TableHead>
                <TableHead>What to Look For</TableHead>
                <TableHead>Citation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guideData.firstFiveMinutesChecklist.map((item) => (
                <TableRow key={item.StepNumber}>
                  <TableCell className="font-medium">{item.CheckItem}</TableCell>
                  <TableCell>{item.WhatToLookFor}</TableCell>
                  <TableCell className="font-mono text-xs">{item.RelevantCitation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="The 'Walk-Around' Inspection Guide" icon={Wrench} value="part2">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {guideData.walkAroundInspectionGuide.map((category) => (
              <AccordionItem key={category.CategoryName} value={category.CategoryName} className="border rounded-md">
                <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base">
                  {category.CategoryName}
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <div className="border-t pt-4 space-y-3">
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {category.CommonViolations.map((violation, index) => (
                        <li key={index}>{violation}</li>
                      ))}
                    </ul>
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Officer Notes & Governing Rule</AlertTitle>
                      <AlertDescription>
                        {category.OfficerNotes} (Ref: {category.GoverningRule})
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section title="Specialized Cargo Quick Reference" icon={Biohazard} value="part3">
          <Tabs defaultValue="hazmat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hazmat">HazMat Placards</TabsTrigger>
              <TabsTrigger value="oversize">Oversize Loads</TabsTrigger>
            </TabsList>
            <TabsContent value="hazmat" className="mt-4">
               <div className="space-y-2">
                {guideData.specializedCargoReference.hazmatPlacards.map((placard) => (
                  <Link href={`/emergency-response/hazmat-guide?search=${placard.UN_ID}`} key={placard.UN_ID}>
                    <Card className="bg-muted/50 hover:border-primary transition-colors cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>UN {placard.UN_ID}: {placard.ProperShippingName}</CardTitle>
                            <CardDescription>ERG Guide #{placard.ERG_GuideNumber}</CardDescription>
                          </div>
                          <Badge variant={placard.HazardClass.startsWith("2") ? "secondary" : "destructive"}>
                            Class {placard.HazardClass}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Alert variant="destructive">
                          <ShieldAlert className="h-4 w-4" />
                          <AlertTitle>Key Emergency Actions</AlertTitle>
                          <AlertDescription>{placard.KeyEmergencyActions}</AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
               </div>
            </TabsContent>
            <TabsContent value="oversize" className="mt-4">
              <div className="space-y-4">
                {guideData.specializedCargoReference.oversizeLoadGuide.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Section>
        
        <Section title="Common Violations Database" icon={Gavel} value="part4">
            {guideData.commonCmvViolations.map((violation, index) => (
              <Card key={index} className="bg-card">
                 <CardHeader>
                    <CardTitle>{violation.ViolationName}</CardTitle>
                    <CardDescription>{violation.CommonName} - {violation.Citation}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Type: {violation.ViolationType}</Badge>
                         <Badge variant={violation.Severity === "Out-of-Service" ? "destructive" : "secondary"}>
                           {violation.Severity}
                         </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{violation.OfficerNotes}</p>
                </CardContent>
              </Card>
            ))}
        </Section>
      </Accordion>
    );
  }
);
CommercialVehicleClient.displayName = "CommercialVehicleClient";
