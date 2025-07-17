
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
    <div className="space-y-8">
      <Tabs defaultValue="principles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principles">Core Principles</TabsTrigger>
          <TabsTrigger value="programs">Community Programs</TabsTrigger>
          <TabsTrigger value="resolution">Conflict Resolution</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="principles" className="space-y-6">
          <div className="grid gap-6">
            {data.corePrinciples.map((principle, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {principle.title}
                  </CardTitle>
                  <CardDescription>{principle.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Strategies:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {principle.keyStrategies.map((strategy, idx) => (
                        <li key={idx}>{strategy}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Real-World Application</AlertTitle>
                    <AlertDescription>{principle.realWorldApplication}</AlertDescription>
                  </Alert>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Measurable Outcomes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {principle.measurableOutcomes.map((outcome, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {outcome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-6">
            {data.communityPrograms.map((program, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {program.programName}
                  </CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                  <Badge variant="outline">Target: {program.targetAudience}</Badge>
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

        <TabsContent value="resolution" className="space-y-6">
          <div className="grid gap-6">
            {data.conflictResolution.map((technique, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HandHeart className="h-5 w-5 text-primary" />
                    {technique.technique}
                  </CardTitle>
                  <CardDescription>
                    <strong>When to use:</strong> {technique.whenToUse}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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

        <TabsContent value="best-practices" className="space-y-6">
          <div className="grid gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {data.communicationBestPractices.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {data.communicationBestPractices.guidelines.map((guideline, idx) => (
                    <li key={idx}>{guideline}</li>
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
