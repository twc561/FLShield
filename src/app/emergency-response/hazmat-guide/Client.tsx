"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Search, Flame, ShieldAlert, Biohazard } from "lucide-react"
import { lookupHazmatPlacards, type LookupHazmatPlacardsOutput } from "@/ai/flows/lookup-hazmat-placard"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export const HazmatClient = React.memo(function HazmatClient() {
  const [placards, setPlacards] = React.useState<LookupHazmatPlacardsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await lookupHazmatPlacards();
        setPlacards(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load HAZMAT data. The AI model may be unavailable.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPlacards = React.useMemo(() => {
    if (!placards) return [];
    if (!searchTerm) return placards;
    const lowercasedTerm = searchTerm.toLowerCase();
    return placards.filter(p => 
      p.placardID.includes(lowercasedTerm) || 
      p.materialName.toLowerCase().includes(lowercasedTerm)
    );
  }, [placards, searchTerm]);

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
     return (
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
     )
  }

  return (
    <div className="space-y-6">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
            placeholder="Search by placard number or material name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {filteredPlacards.map((placard) => (
                <Card key={placard.placardID}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                           <div>
                            <CardTitle className="flex items-center gap-2"><Biohazard className="h-5 w-5"/>UN/NA {placard.placardID}</CardTitle>
                            <CardDescription>{placard.materialName}</CardDescription>
                           </div>
                           <Badge variant="outline">ERG #{placard.ergGuideNumber}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Alert variant={placard.hazardClass.includes("Flammable") || placard.hazardClass.includes("Explosive") ? "destructive" : "default"}>
                            <Flame className="h-4 w-4" />
                            <AlertTitle>Primary Hazard</AlertTitle>
                            <AlertDescription>{placard.hazardClass}</AlertDescription>
                        </Alert>
                        <Alert>
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Public Safety Guidance</AlertTitle>
                            <AlertDescription>{placard.publicSafetyInfo}</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            ))}
        </div>
        {filteredPlacards.length === 0 && searchTerm && (
            <div className="text-center py-16">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Placards Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your search did not match any HAZMAT placards.
                </p>
            </div>
        )}
    </div>
  );
});
