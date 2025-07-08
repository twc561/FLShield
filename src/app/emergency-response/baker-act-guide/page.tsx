
import { PageHeader } from "@/components/PageHeader";
import { BakerActClient } from "./Client";

export default function BakerActGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Baker Act Guide"
        description="AI-powered guide to involuntary commitment criteria for mental health crises."
      />
      <BakerActClient />
    </div>
  );
}
