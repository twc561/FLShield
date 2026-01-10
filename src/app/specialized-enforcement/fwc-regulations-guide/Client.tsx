
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search, Fish, Crosshair, Anchor, ShieldAlert, LifeBuoy, Wind, Flag, Waves, Info, Award, CircleDot, Siren } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type {
  FishingRegulation,
  InvertebrateRegulation,
  GearRegulation,
  HuntingRegulation,
  TrappingRegulation,
  FirearmsMethodInfo,
  BoatingTopic,
  ProtectedSpeciesInfo,
  LicenseInfo,
} from "@/data/specialized-enforcement/fwc-regulations";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ElementType } = {
    Fish, Crosshair, Anchor, ShieldAlert, LifeBuoy, Wind, Flag, Waves, Info, Award, CircleDot, Siren
  };
  return icons[iconName] || Fish;
};

export function FwcClient({
  fishingData,
  invertebrateData,
  gearData,
  huntingData,
  trappingData,
  firearmsData,
  boatingData,
  boatingEquipmentData,
  speciesData,
  licenseData,
}: {
  fishingData: FishingRegulation[];
  invertebrateData: InvertebrateRegulation[];
  gearData: GearRegulation[];
  huntingData: HuntingRegulation[];
  trappingData: TrappingRegulation[];
  firearmsData: FirearmsMethodInfo[];
  boatingData: BoatingTopic[];
  boatingEquipmentData: Record<string, string[]>;
  speciesData: ProtectedSpeciesInfo[];
  licenseData: LicenseInfo[];
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const lowercasedFilter = searchTerm.toLowerCase();

  const filteredFishingData = React.useMemo(() => {
    if (!lowercasedFilter) return fishingData;
    return fishingData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter) || item.commonNames.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, fishingData]);

  const filteredInvertebrateData = React.useMemo(() => {
    if (!lowercasedFilter) return invertebrateData;
    return invertebrateData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, invertebrateData]);

  const filteredGearData = React.useMemo(() => {
    if (!lowercasedFilter) return gearData;
    return gearData.filter(item => item.gearName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, gearData]);

  const filteredHuntingData = React.useMemo(() => {
    if (!lowercasedFilter) return huntingData;
    return huntingData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, huntingData]);

  const filteredTrappingData = React.useMemo(() => {
    if (!lowercasedFilter) return trappingData;
    return trappingData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, trappingData]);

  const filteredFirearmsData = React.useMemo(() => {
    if (!lowercasedFilter) return firearmsData;
    return firearmsData.filter(item => item.topic.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, firearmsData]);

  const filteredBoatingData = React.useMemo(() => {
     if (!lowercasedFilter) return boatingData;
     return boatingData.filter(item => item.title.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, boatingData]);

  const filteredSpeciesData = React.useMemo(() => {
    if (!lowercasedFilter) return speciesData;
    return speciesData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, speciesData]);

  const filteredLicenseData = React.useMemo(() => {
    if (!lowercasedFilter) return licenseData;
    return licenseData.filter(item => item.licenseName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, licenseData]);


  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search all FWC regulations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="fishing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="fishing"><Fish className="mr-2 h-4 w-4" />Fishing</TabsTrigger>
          <TabsTrigger value="hunting"><Crosshair className="mr-2 h-4 w-4" />Hunting</TabsTrigger>
          <TabsTrigger value="boating"><Anchor className="mr-2 h-4 w-4" />Boating</TabsTrigger>
          <TabsTrigger value="species"><ShieldAlert className="mr-2 h-4 w-4" />Species</TabsTrigger>
          <TabsTrigger value="licensing"><Award className="mr-2 h-4 w-4" />Licensing</TabsTrigger>
        </TabsList>

        <TabsContent value="fishing" className="mt-4">
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 pr-4">
              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Finfish</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFishingData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong className="text-foreground/80">Common Names:</strong> {item.commonNames}</p>
                        <p><strong className="text-foreground/80">License/Permits:</strong> {item.licenseRequired}</p>
                        <p><strong className="text-foreground/80">Gear:</strong> {item.gearRestrictions}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-base">Atlantic</CardTitle></CardHeader>
                            <CardContent className="text-xs space-y-1">
                              <p><strong className="text-foreground/80">Season:</strong> {item.atlantic.season}</p>
                              <p><strong className="text-foreground/80">Slot Limit:</strong> {item.atlantic.slotLimit}</p>
                              <p><strong className="text-foreground/80">Bag Limit:</strong> {item.atlantic.bagLimit}</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/50">
                            <CardHeader><CardTitle className="text-base">Gulf</CardTitle></CardHeader>
                             <CardContent className="text-xs space-y-1">
                              <p><strong className="text-foreground/80">Season:</strong> {item.gulf.season}</p>
                              <p><strong className="text-foreground/80">Slot Limit:</strong> {item.gulf.slotLimit}</p>
                              <p><strong className="text-foreground/80">Bag Limit:</strong> {item.gulf.bagLimit}</p>
                            </CardContent>
                          </Card>
                        </div>
                         <p className="italic pt-2 text-accent-foreground/80 bg-accent/10 p-2 rounded-md">{item.officerNotes}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFishingData.length === 0 && <p className="text-center text-muted-foreground py-8">No finfish information found for &quot;{searchTerm}&quot;.</p>}
              
              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Invertebrates</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredInvertebrateData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                       <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong className="text-foreground/80">License/Permits:</strong> {item.licensePermits}</p>
                        <p><strong className="text-foreground/80">Season:</strong> {item.season}</p>
                        <p><strong className="text-foreground/80">Min. Size:</strong> {item.minSize}</p>
                        <p><strong className="text-foreground/80">Bag Limit:</strong> {item.bagLimit}</p>
                        <p><strong className="text-foreground/80">Harvest Method:</strong> {item.harvestMethod}</p>
                        <div>
                           <strong className="text-foreground/80 block mb-1">Other Rules:</strong>
                           <ul className="list-disc pl-5 space-y-1">
                            {item.otherRules.map((rule, i) => <li key={i}>{rule}</li>)}
                           </ul>
                        </div>
                         <p className="italic pt-2 text-accent-foreground/80 bg-accent/10 p-2 rounded-md">{item.officerNotes}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredInvertebrateData.length === 0 && <p className="text-center text-muted-foreground py-8">No invertebrate information found for &quot;{searchTerm}&quot;.</p>}

               <h3 className="text-lg font-bold tracking-tight my-4 px-1">Gear Regulations</h3>
                 <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredGearData.map((item) => (
                  <AccordionItem value={item.gearName} key={item.gearName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.gearName}</AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <div className="space-y-3 text-sm text-muted-foreground">
                         <ul className="list-disc pl-5 space-y-1">
                            {item.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                         </ul>
                         <p className="italic pt-2 text-accent-foreground/80 bg-accent/10 p-2 rounded-md">{item.officerNotes}</p>
                       </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredGearData.length === 0 && <p className="text-center text-muted-foreground py-8">No gear information found for &quot;{searchTerm}&quot;.</p>}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hunting" className="mt-4">
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 pr-4">
              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Hunting Regulations</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredHuntingData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong className="text-foreground/80">License/Permits:</strong> {item.licensePermits}</p>
                        <p><strong className="text-foreground/80">Legal Hours:</strong> {item.legalHours}</p>
                        <p><strong className="text-foreground/80">Legal Methods:</strong> {item.legalMethods}</p>
                        <p><strong className="text-foreground/80">Bag Limit:</strong> {item.bagLimit}</p>
                        {item.antlerRules && <p><strong className="text-foreground/80">Antler Rules:</strong> {item.antlerRules}</p>}
                        <div>
                          <strong className="text-foreground/80 block mb-1">Seasons (Varies by WMA):</strong>
                          <div className="pl-4 space-y-1 text-xs">
                            {Object.entries(item.seasonDates).map(([zone, seasons]) => (
                              <p key={zone}><strong>{zone}:</strong> {Object.entries(seasons).map(([type, dates]) => `${type}: ${dates}`).join('; ')}</p>
                            ))}
                          </div>
                        </div>
                        <p className="italic pt-2 text-accent-foreground/80 bg-accent/10 p-2 rounded-md">{item.officerNotes}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredHuntingData.length === 0 && <p className="text-center text-muted-foreground py-8">No hunting information found for &quot;{searchTerm}&quot;.</p>}

              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Trapping Regulations</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredTrappingData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                       <div className="space-y-3 text-sm text-muted-foreground">
                        <p><strong className="text-foreground/80">License/Permits:</strong> {item.licensePermits}</p>
                        <p><strong className="text-foreground/80">Season:</strong> {item.season}</p>
                        <p><strong className="text-foreground/80">Legal Methods:</strong> {item.legalMethods}</p>
                        <p className="italic pt-2 text-accent-foreground/80 bg-accent/10 p-2 rounded-md">{item.officerNotes}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredTrappingData.length === 0 && <p className="text-center text-muted-foreground py-8">No trapping information found for &quot;{searchTerm}&quot;.</p>}
              
              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Firearms & Methods of Take</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                 {filteredFirearmsData.map((item) => (
                  <AccordionItem value={item.topic} key={item.topic} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.topic}</AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                       <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {item.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                       </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFirearmsData.length === 0 && <p className="text-center text-muted-foreground py-8">No firearms information found for &quot;{searchTerm}&quot;.</p>}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="boating" className="mt-4">
           <ScrollArea className="h-[60vh]">
             <div className="space-y-4 pr-4">
               <h3 className="text-lg font-bold tracking-tight my-4 px-1">General Boating Topics</h3>
               {filteredBoatingData.map((topic) => {
                 const Icon = getIcon(topic.icon);
                 return (
                    <Card key={topic.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary" /> {topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {topic.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                            {topic.url && <Button asChild size="sm" variant="link" className="p-0 h-auto mt-2"><Link href={topic.url} target="_blank" rel="noopener noreferrer">More Info</Link></Button>}
                        </CardContent>
                    </Card>
                 )
               })}
               
               <h3 className="text-lg font-bold tracking-tight my-4 px-1">Safety Equipment Checklist</h3>
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {Object.entries(boatingEquipmentData).map(([vesselSize, equipment]) => (
                        <AccordionItem value={vesselSize} key={vesselSize} className="border rounded-md">
                            <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">Vessel Length: {vesselSize}</AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                    {equipment.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
               {filteredBoatingData.length === 0 && Object.keys(boatingEquipmentData).length > 0 && searchTerm && <p className="text-center text-muted-foreground py-8">No boating information found for &quot;{searchTerm}&quot;.</p>}
             </div>
           </ScrollArea>
        </TabsContent>

        <TabsContent value="species" className="mt-4">
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 pr-4">
            {filteredSpeciesData.map((item) => (
                <Card key={item.speciesName}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CircleDot className={`h-4 w-4 ${item.category === 'Protected' ? 'text-destructive' : 'text-primary'}`} />
                          {item.speciesName}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant={item.category === 'Protected' ? 'destructive' : 'secondary'}>{item.category}</Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.protocol}</p>
                    </CardContent>
                </Card>
            ))}
             {filteredSpeciesData.length === 0 && <p className="text-center text-muted-foreground py-8">No species information found for &quot;{searchTerm}&quot;.</p>}
            </div>
          </ScrollArea>
        </TabsContent>
        
         <TabsContent value="licensing" className="mt-4">
           <ScrollArea className="h-[60vh]">
             <div className="space-y-4 pr-4">
              {filteredLicenseData.map((item) => (
                  <Card key={item.licenseName}>
                      <CardHeader>
                          <CardTitle>{item.licenseName}</CardTitle>
                          <CardDescription>{item.whatItCovers}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><strong className="text-foreground/80">Permits Included:</strong> {item.permitsIncluded}</p>
                        <p><strong className="text-foreground/80">Est. Resident Cost:</strong> {item.costResident}</p>
                        <p className="text-muted-foreground pt-2">{item.notes}</p>
                      </CardContent>
                  </Card>
              ))}
               {filteredLicenseData.length === 0 && <p className="text-center text-muted-foreground py-8">No license information found for &quot;{searchTerm}&quot;.</p>}
              </div>
           </ScrollArea>
        </TabsContent>

      </Tabs>
    </div>
  );
}
