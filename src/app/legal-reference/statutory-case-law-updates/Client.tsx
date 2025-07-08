
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { UpdatePlaceholder, UpdateDetail } from "@/data/legal-reference/statutory-case-law-updates"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, ShieldCheck } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeLegalUpdate } from "@/ai/flows/analyze-legal-update"
import { Badge } from "@/components/ui/badge"

const DetailView = React.memo(({ detail }: { detail: UpdateDetail }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{detail.sourceInfo.sourceName}</h3>
        <Badge variant={detail.sourceInfo.sourceType === "Case Law" ? "default" : "secondary"}>{detail.sourceInfo.sourceType}</Badge>
    </div>
    
    <h3 className="font-semibold text-lg">Plain Language Summary</h3>
    <p className="text-muted-foreground">{detail.plainLanguageSummary}</p>
    
    <Alert className="bg-accent/20 border-accent/50">
      <ShieldCheck className="h-4 w-4 text-accent" />
      <AlertTitle>{detail.tacticalImpactForOfficers.title}</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 space-y-1">
          {detail.tacticalImpactForOfficers.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </AlertDescription>
    </Alert>

    <div>
        <h3 className="font-semibold text-lg mb-2">Key Quote or Statutory Text</h3>
        <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
            "{detail.keyQuoteOrText}"
        </blockquote>
    </div>
  </div>
));

export const StatutoryCaseLawUpdatesClient = React.memo(function StatutoryCaseLawUpdatesClient({
  initialUpdates,
}: {
  initialUpdates: UpdatePlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, UpdateDetail>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeLegalUpdate({ updateID: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load the legal update analysis. Please try again." }));
    } finally {
      setLoadingId(null);
    }
  };
  
  const sortedUpdates = React.useMemo(() => {
    return [...initialUpdates].sort((a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime());
  }, [initialUpdates]);

  return (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
        {sortedUpdates.map(update => {
          const Icon = (LucideIcons as any)[update.icon] || LucideIcons.FileText;
          return (
            <AccordionItem value={update.updateID} key={update.updateID} className="border rounded-md bg-card">
              <AccordionTrigger className="p-4 hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-base text-card-foreground">{update.headline}</p>
                    <p className="text-xs text-muted-foreground">{update.subheading} &bull; {new Date(update.updateDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="border-t pt-4">
                  {loadingId === update.updateID && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <Sparkles className="h-5 w-5 text-accent" />
                      <span>AI is analyzing legal update...</span>
                    </div>
                  )}
                  {error[update.updateID] && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error[update.updateID]}</AlertDescription>
                    </Alert>
                  )}
                  {cachedDetails[update.updateID] && (
                    <DetailView detail={cachedDetails[update.updateID]} />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ScrollArea>
  );
});
