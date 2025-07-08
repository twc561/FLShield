"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search, Fish, Crosshair, Anchor, ShieldAlert, LifeBuoy, Wind, Flag, Waves, Info } from "lucide-react";
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
  HuntingRegulation,
  BoatingSafetyEquipment,
  BuiReference,
  ManateeZoneInfo,
  ProtectedSpeciesInfo,
} from "@/data/specialized-enforcement/fwc-regulations";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ElementType } = {
    Fish,
    Crosshair,
    Anchor,
    ShieldAlert,
    LifeBuoy,
    Wind, 
    Flag,
    Waves,
    Info
  };
  return icons[iconName] || Fish;
};

export function FwcClient({
  fishingData,
  huntingData,
  boatingSafetyData,
  buiData,
  manateeData,
  speciesData,
}: {
  fishingData: FishingRegulation[];
  huntingData: HuntingRegulation[];
  boatingSafetyData: BoatingSafetyEquipment;
  buiData: BuiReference;
  manateeData: ManateeZoneInfo;
  speciesData: ProtectedSpeciesInfo[];
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const lowercasedFilter = searchTerm.toLowerCase();

  const filteredFishingData = React.useMemo(() => {
    if (!lowercasedFilter) return fishingData;
    return fishingData.filter(
      (item) =>
        item.speciesName.toLowerCase().includes(lowercasedFilter) ||
        item.commonNames.toLowerCase().includes(lowercasedFilter)
    );
  }, [lowercasedFilter, fishingData]);

  const filteredHuntingData = React.useMemo(() => {
    if (!lowercasedFilter) return huntingData;
    return huntingData.filter((item) =>
      item.speciesName.toLowerCase().includes(lowercasedFilter)
    );
  }, [lowercasedFilter, huntingData]);
  
  const allBoatingTopics = React.useMemo(() => [
    buiData, manateeData, ...boatingSafetyData.topics
  ], [buiData, manateeData, boatingSafetyData]);

  const filteredBoatingData = React.useMemo(() => {
     if (!lowercasedFilter) return allBoatingTopics;
     return allBoatingTopics.filter(item => item.title.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, allBoatingTopics]);


  const filteredSpeciesData = React.useMemo(() => {
    if (!lowercasedFilter) return speciesData;
    return speciesData.filter(item => item.speciesName.toLowerCase().includes(lowercasedFilter));
  }, [lowercasedFilter, speciesData]);


  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search all regulations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="fishing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="fishing">
            <Fish className="mr-2 h-4 w-4" />
            Fishing
          </TabsTrigger>
          <TabsTrigger value="hunting">
            <Crosshair className="mr-2 h-4 w-4" />
            Hunting
          </TabsTrigger>
          <TabsTrigger value="boating">
            <Anchor className="mr-2 h-4 w-4" />
            Boating
          </TabsTrigger>
          <TabsTrigger value="species">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Species
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fishing" className="mt-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredFishingData.map((item) => (
              <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                <AccordionTrigger className="p-4 hover:no-underline">
                  <span className="font-semibold text-base text-card-foreground">
                    {item.speciesName}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p><strong className="text-foreground/80">Common Names:</strong> {item.commonNames}</p>
                      <p><strong className="text-foreground/80">License:</strong> {item.licenseRequired}</p>
                      <p><strong className="text-foreground/80">Gear Rules:</strong> {item.gearRestrictions}</p>
                      <p><strong className="text-foreground/80">F.A.C. Rule:</strong> {item.facRule}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary">Atlantic</Badge>
                        <p className="mt-1"><strong className="text-foreground/80">Season:</strong> {item.atlantic.season}</p>
                        <p><strong className="text-foreground/80">Slot Limit:</strong> {item.atlantic.slotLimit}</p>
                        <p><strong className="text-foreground/80">Bag Limit:</strong> {item.atlantic.bagLimit}</p>
                      </div>
                      <div>
                        <Badge variant="secondary">Gulf</Badge>
                        <p className="mt-1"><strong className="text-foreground/80">Season:</strong> {item.gulf.season}</p>
                        <p><strong className="text-foreground/80">Slot Limit:</strong> {item.gulf.slotLimit}</p>
                        <p><strong className="text-foreground/80">Bag Limit:</strong> {item.gulf.bagLimit}</p>
                      </div>
                    </div>
                     <div className="md:col-span-2 p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                        <h4 className="font-semibold text-accent-foreground/90">Officer Notes</h4>
                        <p className="text-accent-foreground/80 text-sm mt-1">{item.officerNotes}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
             {filteredFishingData.length === 0 && <p className="text-center text-muted-foreground py-8">No fishing regulations found for "{searchTerm}".</p>}
          </Accordion>
        </TabsContent>

        <TabsContent value="hunting" className="mt-4">
           <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredHuntingData.map((item) => (
              <AccordionItem value={item.speciesName} key={item.speciesName} className="border rounded-md">
                <AccordionTrigger className="p-4 hover:no-underline">
                   <span className="font-semibold text-base text-card-foreground">
                    {item.speciesName}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div className="space-y-2">
                      <p><strong className="text-foreground/80">License/Permits:</strong> {item.licensePermits}</p>
                      <p><strong className="text-foreground/80">Legal Hours:</strong> {item.legalHours}</p>
                      <p><strong className="text-foreground/80">Legal Methods:</strong> {item.legalMethods}</p>
                       <p><strong className="text-foreground/80">F.A.C. Rule:</strong> {item.facRule}</p>
                    </div>
                     <div className="space-y-2">
                      <p><strong className="text-foreground/80">Bag Limit:</strong> {item.bagLimit}</p>
                      {item.antlerRules && <p><strong className="text-foreground/80">Antler Rules:</strong> {item.antlerRules}</p>}
                    </div>
                     <div className="md:col-span-2 space-y-2">
                        <h4 className="font-semibold text-foreground/80">Seasons by Zone</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            {Object.entries(item.seasonDates).map(([zone, dates]) => (
                                <div key={zone} className="p-2 bg-muted/50 rounded-md">
                                    <Badge>{zone}</Badge>
                                    <ul className="text-xs list-disc pl-4 mt-1">
                                        {Object.entries(dates).map(([type, dateRange]) => <li key={type}><strong>{type}:</strong> {dateRange}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                        <h4 className="font-semibold text-accent-foreground/90">Officer Notes</h4>
                        <p className="text-accent-foreground/80 text-sm mt-1">{item.officerNotes}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
             {filteredHuntingData.length === 0 && <p className="text-center text-muted-foreground py-8">No hunting regulations found for "{searchTerm}".</p>}
          </Accordion>
        </TabsContent>
        
        <TabsContent value="boating" className="mt-4">
           <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredBoatingData.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <AccordionItem value={item.title} key={item.title} className="border rounded-md">
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-base text-card-foreground">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <div className="border-t pt-4 space-y-2 text-muted-foreground">
                      {'details' in item && item.details.map((detail, index) => <p key={index}>{detail}</p>)}
                      {'checklists' in item && Object.entries(item.checklists).map(([vessel, reqs]) => (
                        <div key={vessel}>
                          <h4 className="font-semibold text-foreground/80">{vessel}</h4>
                          <ul className="list-disc pl-5 mt-1">
                            {reqs.map(req => <li key={req}>{req}</li>)}
                          </ul>
                        </div>
                      ))}
                      {'url' in item && (
                        <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          View Official Interactive Map
                        </Link>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
             {filteredBoatingData.length === 0 && <p className="text-center text-muted-foreground py-8">No boating topics found for "{searchTerm}".</p>}
          </Accordion>
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
      </Tabs>
    </div>
  );
}
