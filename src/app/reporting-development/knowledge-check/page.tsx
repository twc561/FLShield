
'use client';

import { Suspense } from 'react';
import { PageHeader } from "@/components/PageHeader"
import { knowledgeDrillQuestions } from "@/data/training/knowledge-drill";
import { KnowledgeCheckClient } from "./Client";
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <div className="flex items-center gap-4 rounded-md border p-4">
            <Skeleton className="h-6 w-6 rounded-full"/>
            <Skeleton className="h-6 w-full"/>
          </div>
          <div className="flex items-center gap-4 rounded-md border p-4">
            <Skeleton className="h-6 w-6 rounded-full"/>
            <Skeleton className="h-6 w-full"/>
          </div>
           <div className="flex items-center gap-4 rounded-md border p-4">
            <Skeleton className="h-6 w-6 rounded-full"/>
            <Skeleton className="h-6 w-full"/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function KnowledgeCheckPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Knowledge Check"
        description="Test your knowledge with these dynamically generated quizzes to stay sharp on law and procedure."
      />
      <Suspense fallback={<LoadingFallback />}>
        <KnowledgeCheckClient questions={knowledgeDrillQuestions} />
      </Suspense>
    </div>
  );
}
