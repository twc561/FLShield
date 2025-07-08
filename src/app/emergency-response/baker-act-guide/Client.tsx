"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AnalyzeBakerMarchmanOutput } from "@/ai/flows/analyze-baker-marchman"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, ShieldCheck } from "lucide-react"
import { analyzeBakerMarchman } from "@/ai/flows/analyze-baker-marchman"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Type for the trilingual content, to make the component reusable
type TrilingualContent = AnalyzeBakerMarchmanOutput['bakerAct']['english'];

const ActDetailView = React.memo(({ data }: { data: TrilingualContent }) => (
    <div className="space-y-4">
        <h3 className="font-semibold text-lg">{data.legalStandard}</h3>
        <p className="text-muted-foreground">{data.officerTakeaway}</p>
        <Alert className="bg-accent/20 border-accent/50">
        <ShieldCheck className="h-4 w-4 text-accent" />
        <AlertTitle>Criteria for Involuntary Examination</AlertTitle>
        <AlertDescription>
            <ul className="list-decimal pl-5 space-y-1 mt-2">
            {data.criteria.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </AlertDescription>
        </Alert>
  </div>
))

const ActTabView = React.memo(({ actData }: { actData: AnalyzeBakerMarchmanOutput['bakerAct'] }) => (
    <Card>
        <CardHeader>
            <CardTitle>{actData.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="english" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="spanish">Español</TabsTrigger>
                    <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                </TabsList>
                <TabsContent value="english" className="mt-4">
                    <ActDetailView data={actData.english} />
                </TabsContent>
                <TabsContent value="spanish" className="mt-4">
                    <ActDetailView data={actData.spanish} />
                </TabsContent>
                <TabsContent value="haitian_creole" className="mt-4">
                    <ActDetailView data={actData.haitian_creole} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
));

export const BakerActClient = React.memo(function BakerActClient() {
  const [details, setDetails] = React.useState<AnalyzeBakerMarchmanOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await analyzeBakerMarchman();
        setDetails(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load guide. The AI model may be unavailable.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-64 w-full" />
        </div>
    )
  }

  if (error) {
     return (
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
     )
  }

  if (!details) return null;

  return <ActTabView actData={details.bakerAct} />;
});
