import { PageHeader } from "@/components/PageHeader";
import { mirandaWarningGuideData } from "@/data/legal-reference/miranda-warning-guide";
import { MirandaWarningClient } from "./Client";

export default function MirandaWarningGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title={mirandaWarningGuideData.title}
        description={mirandaWarningGuideData.legalSource}
      />
      <MirandaWarningClient data={mirandaWarningGuideData} />
    </div>
  );
}
