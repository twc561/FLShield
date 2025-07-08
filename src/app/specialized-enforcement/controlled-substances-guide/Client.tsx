"use client"

import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ControlledSubstance } from "@/data/specialized-enforcement/controlled-substances"

export function ControlledSubstancesClient({ data }: { data: ControlledSubstance[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((substance, index) => (
        <Card 
          key={substance.id}
          className="animate-fade-in-up flex flex-col"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <CardHeader>
            <CardTitle>{substance.name}</CardTitle>
            <CardDescription>F.S. § {substance.statute}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="relative aspect-video w-full rounded-md overflow-hidden border">
              <Image 
                src={`https://placehold.co/400x225.png`}
                data-ai-hint={substance.imageAiHint}
                alt={substance.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Street Names</h4>
              <div className="flex flex-wrap gap-2">
                {substance.streetNames.map(name => (
                  <Badge key={name} variant="secondary">{name}</Badge>
                ))}
              </div>
            </div>
             <div>
              <h4 className="font-semibold text-sm mb-2">Common Paraphernalia</h4>
              <p className="text-sm text-muted-foreground">{substance.paraphernalia}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Officer Observations</h4>
              <p className="text-sm text-muted-foreground">{substance.observations}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
