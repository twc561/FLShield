
import { PageHeader } from "@/components/PageHeader"
import { statuteIndex, statutesFullData } from "@/data/statutes"
import { StatuteClient } from "./StatuteClient"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function StatuteLoading() {
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


export default function StatutePage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="Statute Navigator"
        description="Search by keyword or statute number. If no local results are found, our AI will automatically search the Florida Statutes for you. You can also generate the 'Elements of the Crime' for any statute using AI."
      />
      <Suspense fallback={<StatuteLoading />}>
        <StatuteClient 
          initialStatuteIndex={statuteIndex}
          statutesFullData={statutesFullData}
        />
      </Suspense>
    </div>
  )
}
