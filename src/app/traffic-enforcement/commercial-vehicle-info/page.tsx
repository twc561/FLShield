import { PageHeader } from "@/components/PageHeader";
import { commercialVehicleGuideData } from "@/data";
import { CommercialVehicleClient } from "./Client";

export default function CommercialVehicleInfoPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Commercial Vehicle Info"
        description="A practical field guide for patrol officers covering common driver, vehicle, and cargo violations."
      />
      <CommercialVehicleClient guideData={commercialVehicleGuideData} />
    </div>
  );
}
