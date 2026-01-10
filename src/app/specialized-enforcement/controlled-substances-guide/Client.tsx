
"use client"

import * as React from "react"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SubstancePlaceholder } from "@/data/specialized-enforcement/controlled-substances-index"
import type { AnalyzeSubstanceOutput } from "@/ai/flows/analyze-substance"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, FlaskConical, Scale, Eye, User, Loader2, Sparkles, Image as ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeSubstance } from "@/ai/flows/analyze-substance"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { generateSubstanceImage } from "@/ai/flows/generate-substance-image"

const SubstanceImageGenerator = ({ detail }: { detail: AnalyzeSubstanceOutput }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Create a simple context for the image prompt based on the substance
            const quantity = "A small, evidentiary pile, approximately 1-2 grams";
            const context = "Displayed directly on the neutral surface, next to a metric ruler for scale.";

            const result = await generateSubstanceImage({
                substanceName: detail.commonName,
                physicalForm: detail.fieldIdentification.appearance,
                quantity: quantity,
                context: context
            });
            setImageUrl(result.imageUrl);
        } catch (e) {
            console.error(e);
            setError("Image generation failed. The model may have safety blocks for this substance.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="bg-muted/50 text-center p-4">
             <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><ImageIcon className="h-5 w-5"/>AI-Generated Evidentiary Image</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 pt-0">
                {isLoading && <Loader2 className="w-12 h-12 text-primary animate-spin" />}
                {!isLoading && imageUrl && (
                    <div className="relative aspect-video w-full max-w-sm mx-auto">
                        <Image src={imageUrl} alt={`Generated image for ${detail.commonName}`} fill className="object-contain rounded-md border bg-background" />
                    </div>
                )}
                 {!isLoading && !imageUrl && (
                    <>
                        <p className="text-sm text-muted-foreground">Generate a clinical, non-sensationalized image of this substance for identification training.</p>
                        {error && <p className="text-xs text-destructive">{error}</p>}
                        <Button onClick={handleGenerateImage} disabled={isLoading} variant="secondary">
                            <Sparkles className="mr-2 h-4 w-4 text-accent" />
                            Generate Image
                        </Button>
                    </>
                 )}
            </CardContent>
        </Card>
    );
};


const DetailView = React.memo(function DetailView({ detail }: { detail: AnalyzeSubstanceOutput }) {
  return (
  <div className="space-y-6">
    <SubstanceImageGenerator detail={detail} />

    {/* Street Names & Legal Info */}
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Common Street Names</h4>
          <div className="flex flex-wrap gap-2">
            {detail.streetNames.map(name => <Badge key={name} variant="secondary">{name}</Badge>)}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Legal Schedule:</span>
          <Badge variant="outline">{detail.legalInfo.schedule}</Badge>
        </div>
         <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Controlling Statute:</span>
          <Badge variant="outline">{detail.legalInfo.controllingStatute}</Badge>
        </div>
      </CardContent>
    </Card>

    {/* Field Identification */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5"/>{detail.fieldIdentification.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div><strong className="text-foreground/80">Appearance:</strong> {detail.fieldIdentification.appearance}</div>
        <div><strong className="text-foreground/80">Common Packaging:</strong> {detail.fieldIdentification.packaging}</div>
        <div><strong className="text-foreground/80">Associated Paraphernalia:</strong> {detail.fieldIdentification.paraphernalia}</div>
        <div><strong className="text-foreground/80">Common Adulterants:</strong> {detail.fieldIdentification.commonAdulterants}</div>
      </CardContent>
    </Card>

    {/* User Indicators */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/>{detail.userIndicators.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Signs of Use</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {detail.userIndicators.signsOfUse.map((sign, i) => <li key={i}>{sign}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-destructive mb-2">Overdose Signs (Medical Emergency)</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {detail.userIndicators.overdoseSigns.map((sign, i) => <li key={i}>{sign}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>

    {/* Penalty Thresholds */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5"/>{detail.penaltyThresholds.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offense</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Penalty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.penaltyThresholds.thresholds.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{t.offense}</TableCell>
                <TableCell>{t.weight}</TableCell>
                <TableCell>{t.penalty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Officer Safety */}
    <Alert variant="destructive">
      <ShieldAlert className="h-4 w-4" />
      <AlertTitle>Officer Safety Notes</AlertTitle>
      <AlertDescription>{detail.officerSafetyNotes}</AlertDescription>
    </Alert>
  </div>
)});
DetailView.displayName = 'DetailView';

export const ControlledSubstancesClient = React.memo(function ControlledSubstancesClient({
  initialPlaceholders,
}: {
  initialPlaceholders: SubstancePlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, AnalyzeSubstanceOutput>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeSubstance({ substanceId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load substance analysis. Please try again." }));
    } finally {
      setLoadingId(null);
    }
  };

  const groupedPlaceholders = React.useMemo(() => {
    const order = ["Schedule I", "Schedule II", "Schedule III", "Schedule IV", "Schedule V"];
    const grouped = initialPlaceholders.reduce((acc, placeholder) => {
      if (!acc[placeholder.schedule]) {
        acc[placeholder.schedule] = [];
      }
      acc[placeholder.schedule].push(placeholder);
      return acc;
    }, {} as Record<string, SubstancePlaceholder[]>);

    return order.map(schedule => ({
        schedule,
        items: grouped[schedule] || []
    })).filter(g => g.items.length > 0);

  }, [initialPlaceholders]);
  
  return (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <div className="space-y-6">
        {groupedPlaceholders.map(({schedule, items}) => (
          <div key={schedule}>
            <h2 className="text-lg font-bold tracking-tight my-4 px-1">{schedule}</h2>
            <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
              {items.map(placeholder => (
                <AccordionItem value={placeholder.id} key={placeholder.id} className="border rounded-md bg-card">
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FlaskConical className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-base text-card-foreground">{placeholder.commonName}</p>
                        <p className="text-xs text-muted-foreground">{placeholder.statute}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <div className="border-t pt-4">
                      {loadingId === placeholder.id && (
                        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <Sparkles className="h-5 w-5 text-accent" />
                          <span>AI is analyzing substance...</span>
                        </div>
                      )}
                      {error[placeholder.id] && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error[placeholder.id]}</AlertDescription>
                        </Alert>
                      )}
                      {cachedDetails[placeholder.id] && (
                        <DetailView detail={cachedDetails[placeholder.id]} />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});
