
"use client";

import * as React from "react";
import * as LucideIcons from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandcuffingGuide } from "@/data/restraint-techniques/handcuffing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export const HandcuffingClient = React.memo(function HandcuffingClient({ data }: { data: HandcuffingGuide }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{data.principles.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {data.principles.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="standing">
        {data.techniques.map((technique) => {
          const Icon = (LucideIcons as any)[technique.icon] || LucideIcons.User;
          return (
            <AccordionItem value={technique.id} key={technique.id} className="border-b-0">
              <Card>
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <CardTitle>{technique.title}</CardTitle>
                      <CardDescription>{technique.description}</CardDescription>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="border-t pt-4 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Procedural Steps</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        {technique.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <Alert className="bg-accent/20 border-accent/50">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      <AlertTitle>Key Safety Points</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          {technique.keySafetyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
});
