import { PageHeader } from "@/components/PageHeader";
import { FwcClient } from "./Client";
import { 
  fishingRegulations, 
  huntingRegulations, 
  boatingSafetyEquipment, 
  buiReference, 
  manateeZoneInfo, 
  protectedSpeciesInfo 
} from "@/data/specialized-enforcement/fwc-regulations";

export default function FWCRegulationsGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="FWC Regulations Field Guide"
        description="A searchable database of Florida fishing, hunting, and boating regulations."
      />
      <FwcClient
        fishingData={fishingRegulations}
        huntingData={huntingRegulations}
        boatingSafetyData={boatingSafetyEquipment}
        buiData={buiReference}
        manateeData={manateeZoneInfo}
        speciesData={protectedSpeciesInfo}
      />
    </div>
  );
}
