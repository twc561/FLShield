"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { AnalyzeBakerMarchmanOutput } from "@/ai/flows/analyze-baker-marchman"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, ShieldCheck } from "lucide-react"
import { analyzeBakerMarchman } from "@/ai/flows/analyze-baker-marchman"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ActDetailView = React.memo(({ actData }: { actData: AnalyzeBakerMarchmanOutput['bakerAct'] | AnalyzeBakerMarchmanOutput['marchmanAct'] }) => (
    <div className="space-y-4">
        <h3 className="font-semibold text-lg">{actData.legalStandard}</h3>
        <p className="text-muted-foreground">{actData.officerTakeaway}</p>
        <Alert className="bg-accent/20 border-accent/50">
        <ShieldCheck className="h-4 w-4 text-accent" />
        <AlertTitle>Criteria for Involuntary Examination</AlertTitle>
        <AlertDescription>
            <ul className="list-decimal pl-5 space-y-1 mt-2">
            {actData.criteria.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        </AlertDescription>
        </Alert>
  </div>
))

export const BakerMarchmanClient = React.memo(function BakerMarchmanClient() {
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
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
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

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>{details.bakerAct.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ActDetailView actData={details.bakerAct} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{details.marchmanAct.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ActDetailView actData={details.marchmanAct} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{details.proceduralForms_Trilingual.title}</CardTitle>
                <CardDescription>{details.proceduralForms_Trilingual.explanation}</CardDescription>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="english" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="english">English</TabsTrigger>
                        <TabsTrigger value="spanish">Español</TabsTrigger>
                        <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                    </TabsList>
                    {Object.entries(details.proceduralForms_Trilingual).filter(([key]) => key !== 'title' && key !== 'explanation').map(([key, value]) => (
                        <TabsContent key={key} value={key} className="mt-4 space-y-4">
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="text-base">{value.formTitle}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{value.criteriaSummary}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/50">
                                 <CardHeader>
                                    <CardTitle className="text-base">Transport Explanation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <p className="text-sm text-muted-foreground">{value.transportExplanation}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
});
