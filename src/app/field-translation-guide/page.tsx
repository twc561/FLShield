
import { PageHeader } from "@/components/PageHeader";
import { translationPhrases } from "@/data/field-translation-guide";
import { FieldTranslationClient } from "./Client";

export default function FieldTranslationGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Field Translation Guide"
        description="Search for common phrases and play audio translations in English, Spanish, and Haitian Creole. Click the speaker icons to hear AI-generated pronunciations for accurate field communication."
      />
      <FieldTranslationClient phrases={translationPhrases} />
    </div>
  );
}
