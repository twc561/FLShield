import { PageHeader } from "@/components/PageHeader";
import { emergencyResponseIndex } from "@/data";
import { AlertGuidesClient } from "./Client";
import type { AlertPlaceholder } from "@/data";

export default function AlertGuidesPage() {
  // Filter for only the alert guides placeholders
  const alertPlaceholders = emergencyResponseIndex.filter(
    (item): item is AlertPlaceholder => item.id.includes("ALERT")
  );

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Alert Activation Guides"
        description="Official criteria and procedures for issuing Amber and Silver Alerts in Florida."
      />
      <AlertGuidesClient placeholders={alertPlaceholders} />
    </div>
  );
}
