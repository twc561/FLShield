
import { PageHeader } from "@/components/PageHeader";
import { trainingScenarios } from "@/data/training/scenarios";
import { RoleplayClient } from "./Client";

export default function RolePlaySimulatorPage() {
  return (
    <div className="animate-fade-in-up flex flex-col h-full">
      <PageHeader
        title="AI Role-Play Simulator"
        description="Practice your interview and de-escalation skills against a variety of AI-driven characters."
      />
      <RoleplayClient scenarios={trainingScenarios} />
    </div>
  );
}
