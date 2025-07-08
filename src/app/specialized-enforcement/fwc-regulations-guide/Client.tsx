"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search, Fish, Crosshair, Anchor, ShieldAlert, LifeBuoy, Wind, Flag, Waves, Info, Award } from "lucide-react";
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

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ElementType } = {
    Fish, Crosshair, Anchor, ShieldAlert, LifeBuoy, Wind, Flag, Waves, Info, Award
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
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFishingData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      {/* Content for finfish */}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <h3 className="text-lg font-bold tracking-tight my-4 px-1">Invertebrates</h3>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredInvertebrateData.map((item) => (
                  <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.speciesName}</AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                       {/* Content for invertebrates */}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
               <h3 className="text-lg font-bold tracking-tight my-4 px-1">Gear Regulations</h3>
                 <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredGearData.map((item) => (
                  <AccordionItem value={item.gearName} key={item.gearName} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">{item.gearName}</AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       {/* Content for gear */}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hunting" className="mt-4">
          {/* Hunting content here */}
        </TabsContent>
        
        <TabsContent value="boating" className="mt-4">
           {/* Boating content here */}
        </TabsContent>

        <TabsContent value="species" className="mt-4">
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4 pr-4">
            {filteredSpeciesData.map((item) => (
                <Card key={item.speciesName}>
                    <CardHeader>
                        <CardTitle>{item.speciesName}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.protocol}</p>
                    </CardContent>
                </Card>
            ))}
             {filteredSpeciesData.length === 0 && <p className="text-center text-muted-foreground py-8">No species information found for "{searchTerm}".</p>}
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
               {filteredLicenseData.length === 0 && <p className="text-center text-muted-foreground py-8">No license information found for "{searchTerm}".</p>}
              </div>
           </ScrollArea>
        </TabsContent>

      </Tabs>
    </div>
  );
}
