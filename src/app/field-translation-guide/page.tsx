
import { PageHeader } from "@/components/PageHeader";
import { translationPhrases } from "@/data/field-translation-guide";
import { FieldTranslationClient } from "./Client";

export default function FieldTranslationGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Field Translation Guide"
        description="Search for common phrases and play audio translations in Spanish or Haitian Creole. Powered by AI Text-to-Speech."
      />
      <FieldTranslationClient phrases={translationPhrases} />
    </div>
  );
}
