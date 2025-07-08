
import { PageHeader } from "@/components/PageHeader";
import { marchmanActGuideData } from "@/data/emergency-response/marchman-act-guide";
import { MarchmanActClient } from "./Client";
import { Summarizer } from "@/components/Summarizer";

export default function MarchmanActGuidePage() {
    const summaryText = `${marchmanActGuideData.plainLanguagePurpose} This guide covers the key differences between the Marchman and Baker Acts, the legal criteria for involuntary assessment, field procedures for officers, and immunity provisions.`;
  return (
    <div className="animate-fade-in-up">
        <div className="flex justify-between items-start gap-4">
            <PageHeader
                title={marchmanActGuideData.title}
                description={marchmanActGuideData.controllingStatute}
            />
             <Summarizer 
                documentText={summaryText}
                documentTitle="Marchman Act Summary"
            />
        </div>
      
      <MarchmanActClient guideData={marchmanActGuideData} />
    </div>
  );
}
