
import { PageHeader } from "@/components/PageHeader";
import { bakerActGuideData } from "@/data/emergency-response/baker-act-guide";
import { BakerActGuideClient } from "./Client";
import { Summarizer } from "@/components/Summarizer";

export default function BakerActGuidePage() {
    const summaryText = `${bakerActGuideData.plainLanguagePurpose} This guide covers the key differences between the Baker and Marchman Acts, the legal criteria for involuntary examination, field procedures for officers, and immunity provisions.`;
  return (
    <div className="animate-fade-in-up">
        <div className="flex justify-between items-start gap-4">
            <PageHeader
                title={bakerActGuideData.title}
                description={bakerActGuideData.controllingStatute}
            />
             <Summarizer 
                documentText={summaryText}
                documentTitle="Baker Act Summary"
            />
        </div>
      
      <BakerActGuideClient guideData={bakerActGuideData} />
    </div>
  );
}
