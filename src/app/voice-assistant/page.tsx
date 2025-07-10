
import { PageHeader } from "@/components/PageHeader";
import { VoiceAssistantClient } from "./Client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mic, ShieldAlert } from "lucide-react";

export default function VoiceAssistantPage() {
  return (
    <div className="animate-fade-in-up h-[calc(100vh-100px)] flex flex-col">
       <div className="flex justify-between items-start gap-4">
            <PageHeader
                title="AI Partner Mode"
                description="Your hands-free, voice-to-voice AI partner."
            />
        </div>
        <Alert variant="destructive" className="mb-4">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>For Informational Use Only - Do Not Record Encounters</AlertTitle>
            <AlertDescription>
            This feature is for training, questions, and reference. Do not use it to record interactions with the public or for evidentiary purposes.
            </AlertDescription>
        </Alert>
      <VoiceAssistantClient />
    </div>
  );
}
