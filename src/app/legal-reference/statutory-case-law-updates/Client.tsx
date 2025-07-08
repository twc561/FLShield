"use client"

import * as LucideIcons from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UpdateInfo } from "@/data/legal-reference/statutory-case-law-updates"
import { Badge } from "@/components/ui/badge"

export function StatutoryCaseLawUpdatesClient({ data }: { data: UpdateInfo[] }) {
  return (
    <div className="space-y-6">
      {data.map((update, index) => {
        const Icon = (LucideIcons as any)[update.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
        return (
          <Card 
            key={update.id} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle>{update.title}</CardTitle>
                  <CardDescription>{update.date}</CardDescription>
                </div>
                <Badge variant={update.type === 'Case Law' ? 'default' : 'secondary'}>{update.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{update.summary}</p>
              <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                <h4 className="font-semibold mb-2 text-accent-foreground/90">
                  Impact for Officers
                </h4>
                <p className="text-accent-foreground/80 text-sm">{update.officerImpact}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
