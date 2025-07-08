import { PageHeader } from "@/components/PageHeader";
import { FirstAidClient } from "./Client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function FirstAidGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="First Aid Field Guide"
        description="AI-generated tactical medical reference for common traumatic injuries."
      />
      <FirstAidClient />
      <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Medical Disclaimer</AlertTitle>
        <AlertDescription>
          This guide is for informational purposes only and is not a substitute for certified medical training or professional medical advice. Always follow your agency's policies and the direction of certified medical personnel.
        </AlertDescription>
      </Alert>
    </div>
  );
}
