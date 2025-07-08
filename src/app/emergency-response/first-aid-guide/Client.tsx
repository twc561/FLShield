"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { GenerateFirstAidProtocolOutput } from "@/ai/flows/generate-first-aid-protocol"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, ShieldCheck } from "lucide-react"
import { generateFirstAidProtocol } from "@/ai/flows/generate-first-aid-protocol"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export const FirstAidClient = React.memo(function FirstAidClient() {
  const [protocols, setProtocols] = React.useState<GenerateFirstAidProtocolOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await generateFirstAidProtocol();
        setProtocols(result);
      } catch (e) {
        console.error(e);
        setError("Failed to load First Aid protocols. The AI model may be unavailable.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
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

  if (!protocols) return null;

  const getBadgeVariant = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      default: return 'secondary';
    }
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {protocols.map((protocol, index) => {
        return (
          <AccordionItem value={protocol.injuryType} key={protocol.injuryType} className="border-b-0">
            <Card>
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <LucideIcons.HeartPulse className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle>{protocol.injuryType}</CardTitle>
                    <CardDescription className="mt-1">
                        <Badge variant={getBadgeVariant(protocol.priority)}>{protocol.priority} Priority</Badge>
                    </CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-2">Treatment Steps</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                        {protocol.treatmentSteps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});
