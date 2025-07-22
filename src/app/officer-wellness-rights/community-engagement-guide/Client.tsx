"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Target, 
  MessageSquare, 
  HandHeart, 
  Globe, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import type { CommunityEngagementGuide } from "@/data/officer-wellness-rights/community-engagement";

interface CommunityEngagementClientProps {
  data: CommunityEngagementGuide;
}

export function CommunityEngagementClient({ data }: CommunityEngagementClientProps) {
  return (
    <div className="container mx-auto px-3 py-4 max-w-6xl space-y-6">
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1 h-auto p-1">
          <TabsTrigger value="principles" className="text-xs sm:text-sm px-2 py-2">Core Principles</TabsTrigger>
          <TabsTrigger value="programs" className="text-xs sm:text-sm px-2 py-2">Programs</TabsTrigger>
          <TabsTrigger value="resolution" className="text-xs sm:text-sm px-2 py-2">Resolution</TabsTrigger>
          <TabsTrigger value="best-practices" className="text-xs sm:text-sm px-2 py-2">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="principles" className="mt-6 space-y-8">
          <div className="grid gap-8">
            {data.corePrinciples.map((principle, index) => (
              <Card key={index} className="bg-card border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Target className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="break-words">{principle.title}</span>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{principle.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-4 sm:px-6 pb-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm mb-3">Key Strategies:</h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                      {principle.keyStrategies.map((strategy, idx) => (
                        <li key={idx} className="leading-relaxed break-words">{strategy}</li>
                      ))}
                    </ul>
                  </div>

                  <Alert className="my-6">
                    <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div className="ml-2">
                      <AlertTitle className="text-sm font-semibold mb-2">Real-World Application</AlertTitle>
                      <AlertDescription className="text-sm leading-relaxed break-words">{principle.realWorldApplication}</AlertDescription>
                    </div>
                  </Alert>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm mb-3">Measurable Outcomes:</h4>
                    <div className="flex flex-wrap gap-3">
                      {principle.measurableOutcomes.map((outcome, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs px-3 py-1.5 break-words">
                          <CheckCircle className="h-3 w-3 mr-1.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="mt-6 space-y-8">
          <div className="grid gap-8">
            {data.communityPrograms.map((program, index) => (
              <Card key={index} className="bg-card border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg mb-2">
                    <Users className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="break-words">{program.programName}</span>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-3">{program.description}</CardDescription>
                  <Badge variant="outline" className="text-xs">Target: {program.targetAudience}</Badge>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="implementation">
                      <AccordionTrigger>Implementation Steps</AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          {program.implementationSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="metrics">
                      <AccordionTrigger>Success Metrics</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {program.successMetrics.map((metric, idx) => (
                            <li key={idx}>{metric}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="resources">
                      <AccordionTrigger>Resources Needed</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {program.resourcesNeeded.map((resource, idx) => (
                            <li key={idx}>{resource}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resolution" className="mt-6 space-y-8">
          <div className="grid gap-8">
            {data.conflictResolution.map((technique, index) => (
              <Card key={index} className="bg-card border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg mb-2">
                    <HandHeart className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="break-words">{technique.technique}</span>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    <strong>When to use:</strong> {technique.whenToUse}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-4 sm:px-6 pb-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Step-by-Step Process:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      {technique.stepByStepProcess.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertTitle>Expected Outcome</AlertTitle>
                    <AlertDescription>{technique.expectedOutcome}</AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Follow-up Actions:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {technique.followUpActions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="best-practices" className="mt-6 space-y-8">
          <div className="grid gap-8">
            <Card className="bg-card border-2">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="break-words">{data.communicationBestPractices.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-6">
                <ul className="list-disc pl-6 space-y-3 text-sm">
                  {data.communicationBestPractices.guidelines.map((guideline, idx) => (
                    <li key={idx} className="leading-relaxed break-words">{guideline}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {data.culturalCompetency.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-green-700">Key Considerations:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.culturalCompetency.keyConsiderations.map((consideration, idx) => (
                      <li key={idx}>{consideration}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-red-700 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Common Pitfalls to Avoid:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.culturalCompetency.commonPitfalls.map((pitfall, idx) => (
                      <li key={idx}>{pitfall}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {data.measuringSuccess.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Metrics:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.measuringSuccess.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs justify-start">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Sample Survey Questions:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {data.measuringSuccess.surveyQuestions.map((question, idx) => (
                      <li key={idx}>{question}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}