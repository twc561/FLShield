import { PageHeader } from "@/components/PageHeader";
import { ActiveListenerClient } from "./Client";

export default function ActiveListenerPage() {
  return (
    <div className="animate-fade-in-up flex flex-col h-full">
      <PageHeader
        title="Confidential Wellness Partner"
        description="A private space to talk through anything on your mind. This conversation is not saved, logged, or monitored."
      />
      <ActiveListenerClient />
    </div>
  );
}
