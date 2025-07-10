import { PageHeader } from "@/components/PageHeader";
import { LiveDebriefClient } from "./Client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldQuestion } from "lucide-react";

export default function LiveDebriefPage() {
  return (
    <div className="animate-fade-in-up flex flex-col h-full">
      <PageHeader
        title="Live AI Debrief"
        description="A real-time, streaming conversation to help you process events. This session is not saved."
      />
      <Alert variant="destructive" className="mb-4">
          <ShieldQuestion className="h-4 w-4" />
          <AlertTitle>This is a Confidential Space</AlertTitle>
          <AlertDescription>
              Your conversation here is processed in real-time and is never saved, logged, or monitored. It is designed to be a private tool for your wellness. This is not a substitute for professional therapy.
          </AlertDescription>
      </Alert>
      <LiveDebriefClient />
    </div>
  );
}
