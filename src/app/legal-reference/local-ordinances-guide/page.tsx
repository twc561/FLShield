import { PageHeader } from "@/components/PageHeader";
import { ordinanceIndex, ordinanceDetailsData } from "@/data";
import { LocalOrdinancesClient } from "./Client";

export default function LocalOrdinancesGuidePage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
      <PageHeader
        title="Local Ordinances Guide"
        description="Use the AI Analyst to instantly look up and parse any municipal or county ordinance from across Florida. You can also browse a pre-loaded list of common ordinances for the St. Lucie County area."
      />
      <LocalOrdinancesClient
        initialIndex={ordinanceIndex}
        initialDetails={ordinanceDetailsData}
      />
    </div>
  );
}
