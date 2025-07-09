import { PageHeader } from "@/components/PageHeader";
import { ordinanceIndex, ordinanceDetailsData } from "@/data";
import { LocalOrdinancesClient } from "./Client";

export default function LocalOrdinancesGuidePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Local Ordinances Guide"
        description="Use the AI Analyst to instantly look up and parse any municipal or county ordinance from across Florida."
      />
      <LocalOrdinancesClient
        initialIndex={ordinanceIndex}
        initialDetails={ordinanceDetailsData}
      />
    </div>
  );
}
