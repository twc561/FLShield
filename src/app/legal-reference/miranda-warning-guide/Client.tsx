"use client";

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { MirandaWarningGuideData } from "@/data/legal-reference/miranda-warning-guide";
import { Gavel, AlertTriangle, Languages, CheckCircle, Mic, Milestone } from "lucide-react";

export function MirandaWarningClient({
  data,
}: {
  data: MirandaWarningGuideData;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{data.plainLanguageSummary}</p>
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-b-0">
            <Card>
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-primary"/>{data.legalTriggers.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4 space-y-4">
                        <p className="text-muted-foreground">{data.legalTriggers.explanation}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.legalTriggers.definitions.map(def => (
                                <div key={def.term} className="p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-foreground/90">{def.term}</h4>
                                    <p className="text-sm text-muted-foreground">{def.definition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-b-0">
            <Card>
                 <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><Languages className="h-5 w-5 text-primary"/>{data.mirandaWarningTranslations.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                        <Tabs defaultValue="english" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="english">English</TabsTrigger>
                            <TabsTrigger value="spanish">Español</TabsTrigger>
                            <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                          </TabsList>
                           {Object.entries(data.mirandaWarningTranslations).filter(([key]) => key !== 'title').map(([key, value]) => (
                               <TabsContent key={key} value={key} className="mt-4 space-y-4">
                                   <div className="p-4 bg-muted/50 rounded-lg">
                                       <h4 className="font-semibold text-foreground/90 mb-2">Warning</h4>
                                       <ul className="space-y-1">
                                           {value.warningLines.map((line: string, i: number) => <li key={i} className="flex items-start gap-2"><Mic className="h-4 w-4 mt-1 flex-shrink-0 text-accent"/><span>{line}</span></li>)}
                                       </ul>
                                   </div>
                                    <div className="p-4 bg-muted/50 rounded-lg">
                                       <h4 className="font-semibold text-foreground/90 mb-2">Waiver Questions</h4>
                                       <ul className="space-y-1">
                                           {value.waiverQuestions.map((line: string, i: number) => <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-1 flex-shrink-0 text-green-500"/><span>{line}</span></li>)}
                                       </ul>
                                   </div>
                               </TabsContent>
                           ))}
                        </Tabs>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>

         <AccordionItem value="item-3" className="border-b-0">
            <Card>
                 <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><Gavel className="h-5 w-5 text-primary"/>{data.rightsBreakdown.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4 space-y-4">
                        {data.rightsBreakdown.rights.map(right => (
                            <div key={right.rightName}>
                                <h4 className="font-semibold text-foreground/90">{right.rightName}</h4>
                                <p className="text-muted-foreground">{right.explanation}</p>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
      </Accordion>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Milestone className="h-5 w-5 text-primary"/>Key Case Law</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">{data.keyCase.caseName} <span className="text-muted-foreground font-normal">({data.keyCase.citation})</span></h4>
          <p className="text-sm text-muted-foreground italic mt-1">"{data.keyCase.holding}"</p>
        </CardContent>
      </Card>

    </div>
  );
}
