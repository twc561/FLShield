import { PageHeader } from "@/components/PageHeader";
import { HazmatClient } from "./Client";

export default function HazmatGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="HAZMAT Placard Guide"
        description="Search common HAZMAT placards by number or name for ERG info. Powered by AI."
      />
      <HazmatClient />
    </div>
  );
}
