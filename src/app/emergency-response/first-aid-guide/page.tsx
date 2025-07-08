import { PageHeader } from "@/components/PageHeader";
import { FirstAidClient } from "./Client";

export default function FirstAidGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="First Aid Field Guide"
        description="AI-generated tactical medical reference for common traumatic injuries."
      />
      <FirstAidClient />
    </div>
  );
}
