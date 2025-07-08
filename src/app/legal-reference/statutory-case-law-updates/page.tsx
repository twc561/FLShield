"use client"

import * as LucideIcons from "lucide-react"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { statutoryCaseLawUpdatesData } from "@/data/legal-reference/statutory-case-law-updates"
import { Summarizer } from "@/components/Summarizer"
import { Badge } from "@/components/ui/badge"

export default function StatutoryCaseLawUpdatesPage() {
  const pageContent = statutoryCaseLawUpdatesData.map(update => 
    `${update.title} (${update.type} - ${update.date}): ${update.summary}. Officer Impact: ${update.officerImpact}`
  ).join('\n\n');

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-start gap-4">
        <PageHeader
          title="Statutory & Case Law Updates"
          description="The latest updates and changes to Florida laws and relevant case law."
        />
         <Summarizer 
          documentText={pageContent}
          documentTitle="Legal Updates Summary"
        />
      </div>

      <div className="space-y-6">
        {statutoryCaseLawUpdatesData.map((update, index) => {
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
       <p className="text-center text-sm text-muted-foreground mt-8">Note: This section is for informational purposes. Consult official sources for the latest legal changes.</p>
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number };
  }
}
