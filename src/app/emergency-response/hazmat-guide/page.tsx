
import { PageHeader } from "@/components/PageHeader";
import { HazmatClient } from "./Client";
import { hazmatClasses } from "@/data/emergency-response/hazmat-classes";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function HazmatGuideLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full" />
      <div className="grid md:grid-cols-3 gap-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}

export default function HazmatGuidePage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="HAZMAT Placard Guide"
        description="Visually identify a hazard class or search by UN/NA number for detailed, AI-powered response information."
      />
      <Suspense fallback={<HazmatGuideLoading />}>
        <HazmatClient hazmatClasses={hazmatClasses} />
      </Suspense>
    </div>
  );
}
