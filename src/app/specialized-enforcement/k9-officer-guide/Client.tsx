
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
import type { K9TopicPlaceholder } from "@/data/specialized-enforcement/k9-guide-index"
import type { AnalyzeK9TopicOutput } from "@/ai/flows/analyze-k9-topic"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, User, UserCog, Gavel, FileText, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { analyzeK9Topic } from "@/ai/flows/analyze-k9-topic"
import { Button } from "@/components/ui/button"

const DetailView = React.memo(({ detail }: { detail: AnalyzeK9TopicOutput }) => (
  <div className="space-y-6">
    <p className="text-muted-foreground">{detail.plainLanguageSummary}</p>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg"><Gavel className="h-5 w-5"/>{detail.legalConsiderations.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{detail.legalConsiderations.explanation}</p>
        <div className="space-y-3">
            {detail.legalConsiderations.keyCases.map(c => (
                <div key={c.caseName} className="p-3 bg-muted/50 rounded-md">
                <p className="font-semibold">{c.caseName} <span className="text-muted-foreground font-normal">({c.citation})</span></p>
                <p className="text-sm text-muted-foreground mt-1">{c.holding}</p>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg"><FileText className="h-5 w-5"/>{detail.proceduralGuidance.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {detail.proceduralGuidance.points.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </CardContent>
    </Card>

    <Alert className="bg-accent/20 border-accent/50">
      <Sparkles className="h-4 w-4 text-accent" />
      <AlertTitle>{detail.fieldScenario.title}</AlertTitle>
      <AlertDescription>
        {detail.fieldScenario.scenario}
      </AlertDescription>
    </Alert>
  </div>
));

export const K9GuideClient = React.memo(function K9GuideClient({
  guideIndex,
}: {
  guideIndex: { forHandlers: K9TopicPlaceholder[]; forPatrol: K9TopicPlaceholder[] };
}) {
  const [selectedRole, setSelectedRole] = React.useState<"handler" | "patrol" | null>(null);
  const [activeItem, setActiveItem] = React.useState<string | undefined>();
  const [cachedDetails, setCachedDetails] = React.useState<Record<string, AnalyzeK9TopicOutput>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Record<string, string | null>>({});

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveItem(value);
    if (!value || cachedDetails[value] || loadingId === value) return;

    setLoadingId(value);
    setError(prev => ({ ...prev, [value]: null }));

    try {
      const result = await analyzeK9Topic({ topicId: value });
      setCachedDetails(prev => ({ ...prev, [value]: result }));
    } catch (e) {
      console.error(e);
      setError(prev => ({ ...prev, [value]: "Failed to load topic analysis. Please try again." }));
    } finally {
      setLoadingId(null);
    }
  };

  const renderTopicList = (topics: K9TopicPlaceholder[]) => (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <Button variant="ghost" onClick={() => setSelectedRole(null)} className="mb-4">
        <LucideIcons.ArrowLeft className="mr-2 h-4 w-4" /> Back to Role Selection
      </Button>
      <Accordion type="single" collapsible className="w-full space-y-2" value={activeItem} onValueChange={handleAccordionChange}>
        {topics.map(placeholder => {
          const Icon = (LucideIcons as any)[placeholder.icon] || LucideIcons.HelpCircle;
          return (
            <AccordionItem value={placeholder.id} key={placeholder.id} className="border rounded-md bg-card">
              <AccordionTrigger className="p-4 hover:no-underline">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-base text-card-foreground">{placeholder.title}</p>
                    <p className="text-xs text-muted-foreground">{placeholder.subtitle}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="border-t pt-4">
                  {loadingId === placeholder.id && (
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <Sparkles className="h-5 w-5 text-accent" />
                      <span>AI is analyzing topic...</span>
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
          );
        })}
      </Accordion>
    </ScrollArea>
  );

  if (!selectedRole) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:border-primary transition-colors group cursor-pointer" onClick={() => setSelectedRole('handler')}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-3"><UserCog className="h-6 w-6 text-primary"/>Guide for K-9 Handlers</CardTitle>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">In-depth review of case law, training documentation, and advanced deployment tactics for K-9 handlers.</p>
                </CardContent>
            </Card>
             <Card className="hover:border-primary transition-colors group cursor-pointer" onClick={() => setSelectedRole('patrol')}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-3"><User className="h-6 w-6 text-primary"/>Guide for Patrol Officers</CardTitle>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Best practices for assisting K-9 units, understanding capabilities, and ensuring scene integrity as a cover officer.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return selectedRole === 'handler' 
    ? renderTopicList(guideIndex.forHandlers)
    : renderTopicList(guideIndex.forPatrol);
});
