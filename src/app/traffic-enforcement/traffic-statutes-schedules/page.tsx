
'use client';

import { PageHeader } from "@/components/PageHeader"
import { trafficViolationsIndex, trafficViolationsFullData } from "@/data/traffic-enforcement/traffic-violations"
import { TrafficStatutesClient } from "./Client"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from 'next/dynamic';

const TrafficStatutesClientComponent = dynamic(() => 
  import('./Client').then(mod => mod.TrafficStatutesClient), 
  { 
    ssr: false,
    loading: () => <TrafficStatutesLoading />
  }
);

function TrafficStatutesLoading() {
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


export default function TrafficStatutesSchedulesPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Traffic Statutes & Schedules"
        description="A searchable quick-reference guide for common Florida traffic violations, including elements, fines, and officer notes."
      />
      <Suspense fallback={<TrafficStatutesLoading />}>
        <TrafficStatutesClientComponent
          initialViolations={trafficViolationsIndex} 
          violationsFullData={trafficViolationsFullData} 
        />
      </Suspense>
    </div>
  )
}
