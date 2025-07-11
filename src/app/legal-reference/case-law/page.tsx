
import { PageHeader } from "@/components/PageHeader";
import { caseLawIndex, caseLawsFullData } from "@/data/case-law";
import { CaseLawClient } from "./CaseLawClient";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CaseLawLoading() {
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


export default function CaseLawPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Case Law Vault"
        description="Search landmark cases to get plain-language summaries and officer-focused takeaways."
      />
      <Suspense fallback={<CaseLawLoading />}>
        <CaseLawClient 
          initialCaseIndex={caseLawIndex}
          caseLawsFullData={caseLawsFullData}
        />
      </Suspense>
    </div>
  )
}
