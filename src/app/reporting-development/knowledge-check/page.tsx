
import { PageHeader } from "@/components/PageHeader"
import { knowledgeDrillQuestions } from "@/data/training/knowledge-drill";
import { KnowledgeCheckClient } from "./Client";

export default function KnowledgeCheckPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Knowledge Check"
        description="Test your knowledge with these dynamically generated quizzes to stay sharp on law and procedure."
      />
      <KnowledgeCheckClient questions={knowledgeDrillQuestions} />
    </div>
  );
}
