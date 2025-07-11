
'use client';

import { PageHeader } from "@/components/PageHeader"
import { juryInstructionsIndex } from "@/data/legal-reference/jury-instructions-index"
import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const JuryInstructionsClient = dynamic(() =>
  import('./Client').then(mod => mod.JuryInstructionsClient),
  {
    ssr: false,
    loading: () => <JuryInstructionsLoading />
  }
);

function JuryInstructionsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  )
}

export default function JuryInstructionsNavigatorPage() {
  return (
    <div className="animate-fade-in-up h-full flex flex-col">
        <PageHeader
            title="Jury Instructions Navigator"
            description="Select a common crime to get a detailed, AI-powered analysis of the evidence needed to build a strong case."
        />
        <Suspense fallback={<JuryInstructionsLoading />}>
          <JuryInstructionsClient initialInstructions={juryInstructionsIndex} />
        </Suspense>
    </div>
  )
}
