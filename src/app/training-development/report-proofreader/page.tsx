import { PageHeader } from "@/components/PageHeader";
import { ReportProofreaderClient } from "./Client";

export default function ReportProofreaderPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="AI Report Proofreader"
        description="Get instant, constructive feedback on your anonymized report narratives to improve clarity and legal sufficiency."
      />
      <ReportProofreaderClient />
    </div>
  );
}
