
import { PageHeader } from "@/components/PageHeader";
import { handcuffingData } from "@/data/restraint-techniques/handcuffing";
import { HandcuffingClient } from "./Client";
import { Summarizer } from "@/components/Summarizer";

export default function HandcuffingProceduresPage() {
  const pageContent = `This guide covers the core principles of safe and effective handcuffing, including techniques for standing, kneeling, and prone subjects. Key points include maintaining control, checking for tightness, and double-locking the cuffs.`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Handcuffing Procedures"
          description="A step-by-step guide to safe and effective handcuffing techniques."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Handcuffing Procedures Summary"
        />
      </div>

      <HandcuffingClient data={handcuffingData} />
    </div>
  );
}
