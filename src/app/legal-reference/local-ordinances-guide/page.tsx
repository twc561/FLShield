import { PageHeader } from "@/components/PageHeader";
import { ordinanceIndex, ordinanceDetailsData } from "@/data";
import { LocalOrdinancesClient } from "./Client";

export default function LocalOrdinancesGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Local Ordinances Guide"
        description="A searchable guide to the most common local ordinances for the City of Fort Pierce and St. Lucie County. Ordinances not found locally can be fetched on-demand with AI."
      />
      <LocalOrdinancesClient
        initialIndex={ordinanceIndex}
        initialDetails={ordinanceDetailsData}
      />
    </div>
  );
}
