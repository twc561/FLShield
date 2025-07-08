import { PageHeader } from "@/components/PageHeader";
import { HazmatClient } from "./Client";
import { hazmatClasses } from "@/data/emergency-response/hazmat-classes";

export default function HazmatGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="HAZMAT Placard Guide"
        description="Visually identify a hazard class or search by UN/NA number for detailed, AI-powered response information."
      />
      <HazmatClient hazmatClasses={hazmatClasses} />
    </div>
  );
}
