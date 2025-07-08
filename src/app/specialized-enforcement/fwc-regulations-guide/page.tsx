import { PageHeader } from "@/components/PageHeader";
import { FwcClient } from "./Client";
import { FwcQueryClient } from "./FwcQueryClient";
import { 
  fishingRegulations, 
  invertebrateRegulations,
  gearRegulations,
  huntingRegulations,
  trappingRegulations,
  firearmsMethodsGuide,
  boatingTopics,
  boatingSafetyEquipment,
  protectedSpeciesInfo,
  licenseData
} from "@/data/specialized-enforcement/fwc-regulations";

export default function FWCRegulationsGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4 mb-4">
        <PageHeader
          title="FWC Regulations Field Guide"
          description="A searchable database of Florida fishing, hunting, and boating regulations."
        />
        <div className="pt-2">
            <FwcQueryClient />
        </div>
      </div>
      <FwcClient
        fishingData={fishingRegulations}
        invertebrateData={invertebrateRegulations}
        gearData={gearRegulations}
        huntingData={huntingRegulations}
        trappingData={trappingRegulations}
        firearmsData={firearmsMethodsGuide}
        boatingData={boatingTopics}
        boatingEquipmentData={boatingSafetyEquipment}
        speciesData={protectedSpeciesInfo}
        licenseData={licenseData}
      />
    </div>
  );
}
