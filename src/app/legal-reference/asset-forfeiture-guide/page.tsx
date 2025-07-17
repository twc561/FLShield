
import { PageHeader } from "@/components/PageHeader"
import { assetForfeitureData } from "@/data/legal-reference/asset-forfeiture"
import { Summarizer } from "@/components/Summarizer"
import { AssetForfeitureClient } from "./Client"

export default function AssetForfeitureGuidePage() {
  const pageContent = `
    Asset Forfeiture Guide - Legal procedures for seizing property connected to criminal activity.
    
    Key Definitions: ${assetForfeitureData.definitions.map(def => `${def.title}: ${def.definition}`).join('. ')}
    
    Procedures: ${assetForfeitureData.procedures.map(proc => `${proc.title}: ${proc.description}`).join('. ')}
    
    Legal Foundations: ${assetForfeitureData.legalFoundations.map(legal => `${legal.title} (${legal.statute}): ${legal.summary}`).join('. ')}
    
    Property Types: ${assetForfeitureData.propertyTypes.map(type => `${type.category}: ${type.description}`).join('. ')}
    
    Timeframes: ${assetForfeitureData.timeframes.map(time => `${time.stage}: ${time.timeLimit} - ${time.description}`).join('. ')}
    
    Notice Requirements: ${assetForfeitureData.noticeRequirements.map(notice => `${notice.type}: ${notice.timeline} - ${notice.method}`).join('. ')}
    
    Defenses: ${assetForfeitureData.defensesAndChallenges.map(defense => `${defense.defense}: ${defense.description}`).join('. ')}
  `;

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Asset Forfeiture Guide"
          description="Comprehensive guide to civil and criminal asset forfeiture procedures, legal requirements, and best practices."
        />
        <Summarizer 
          documentText={pageContent}
          documentTitle="Asset Forfeiture Summary"
        />
      </div>
      
      <AssetForfeitureClient data={assetForfeitureData} />
    </div>
  )
}
