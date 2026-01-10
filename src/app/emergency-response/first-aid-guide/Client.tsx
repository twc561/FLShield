"use client"

import * as React from "react"
import Image from "next/image"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import type { GenerateFirstAidProtocolOutput } from "@/ai/flows/generate-first-aid-protocol"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, Image as ImageIcon } from "lucide-react"
import { generateFirstAidProtocol } from "@/ai/flows/generate-first-aid-protocol"
import { generateFirstAidProtocolImage } from "@/ai/flows/generate-first-aid-protocol-image"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const ImageGenerator = ({ injuryType }: { injuryType: string }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateFirstAidProtocolImage({ injuryType });
            setImageUrl(result.imageUrl);
        } catch (e) {
            console.error(e);
            setError("Image generation failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (imageUrl) {
        return (
            <div className="relative aspect-video w-full max-w-sm mx-auto mt-4">
                <Image src={imageUrl} alt={`Generated illustration for ${injuryType}`} fill className="object-contain rounded-md border bg-muted" />
            </div>
        )
    }

    return (
        <Card className="bg-muted/50 text-center p-4 mt-4">
            <CardContent className="flex flex-col items-center justify-center gap-4 pt-6">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Generate an AI illustration for this protocol.</p>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button onClick={handleGenerateImage} disabled={isLoading} variant="secondary">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                    {isLoading ? 'Generating...' : 'Generate Image'}
                </Button>
            </CardContent>
        </Card>
    );
};


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
      {protocols.map((protocol) => {
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

                    <h3 className="font-semibold text-lg mt-6 mb-2">AI-Generated Illustration</h3>
                    <ImageGenerator injuryType={protocol.injuryType} />
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});
