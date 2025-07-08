import { PageHeader } from "@/components/PageHeader";
import { BakerMarchmanClient } from "./Client";

export default function BakerMarchmanGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Baker Act & Marchman Act Guide"
        description="AI-powered guide to involuntary commitment criteria for mental health and substance abuse."
      />
      <BakerMarchmanClient />
    </div>
  );
}
