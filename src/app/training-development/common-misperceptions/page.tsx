
import { PageHeader } from "@/components/PageHeader";
import { commonMisperceptionsData } from "@/data/officer-wellness-rights/common-misperceptions";
import { Summarizer } from "@/components/Summarizer";
import { CommonMisperceptionsClient } from "./Client";

export default function CommonMisperceptionsPage() {
  const pageContent = commonMisperceptionsData.map(item => 
    `Misperception: ${item.theMisperception}. Reality: ${item.theReality}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Common Misperceptions & Field Pitfalls"
          description="A risk management guide to debunking common legal myths and preventing procedural errors."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Common Misperceptions Summary"
        />
      </div>

      <CommonMisperceptionsClient data={commonMisperceptionsData} />
    </div>
  );
}
