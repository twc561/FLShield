
"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AlertPlaceholder } from "@/data/emergency-response"
import type { AnalyzeAlertGuideOutput } from "@/ai/flows/analyze-alert-guide"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, PhoneCall, Phone } from "lucide-react"
import { analyzeAlertGuide } from "@/ai/flows/analyze-alert-guide"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DetailView = React.memo(function DetailView({ detail }: { detail: AnalyzeAlertGuideOutput }) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">{detail.purpose}</p>
  
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activation Criteria Checklist</CardTitle>
          <CardDescription>All criteria must be met to issue the alert.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-decimal pl-5 space-y-2 text-muted-foreground">
            {detail.activationCriteria.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </CardContent>
      </Card>
  
      <Card>
          <CardHeader>
              <CardTitle className="text-lg">Key Information to Have Ready</CardTitle>
              <CardDescription>Before calling, gather this information to expedite the process.</CardDescription>
          </CardHeader>
          <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {detail.keyInformationForLEO.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
          </CardContent>
      </Card>
  
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Initiation Procedure</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              {detail.initiationProcedure.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
          <Alert className="mt-4">
              <PhoneCall className="h-4 w-4" />
              <AlertTitle>{detail.contactInfo.agency}</AlertTitle>
              <AlertDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                      <p>Phone: {detail.contactInfo.phone}</p>
                      <Button asChild variant="secondary" size="sm" className="mt-2 sm:mt-0">
                          <Link href={`tel:${detail.contactInfo.phone}`}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Now
                          </Link>
                      </Button>
                  </div>
              </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
});
DetailView.displayName = 'DetailView';

export const AlertGuidesClient = React.memo(function AlertGuidesClient({
  placeholders,
}: {
  placeholders: AlertPlaceholder[];
}) {
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, AnalyzeAlertGuideOutput>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeAlertGuide({ alertId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load alert guide analysis. Please try again." }));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full space-y-4" value={activeItem} onValueChange={handleAccordionChange}>
      {placeholders.map(placeholder => {
        const Icon = (LucideIcons as any)[placeholder.icon] || LucideIcons.HelpCircle;
        return (
          <AccordionItem value={placeholder.id} key={placeholder.id} className="border-b-0">
            <Card>
              <AccordionTrigger className="p-6 text-left hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle>{placeholder.title}</CardTitle>
                    <CardDescription>{placeholder.subtitle}</CardDescription>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4">
                  {loadingId === placeholder.id && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <Sparkles className="h-5 w-5 text-accent" />
                      <span>AI is analyzing alert criteria...</span>
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
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
});
AlertGuidesClient.displayName = 'AlertGuidesClient';
