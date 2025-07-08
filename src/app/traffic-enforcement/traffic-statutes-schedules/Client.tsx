
"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { TrafficViolation } from "@/data/traffic-enforcement/traffic-violations"
import { Search, Gavel, FileText, Ban, AlertTriangle, User, Car } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const categoryIcons: { [key: string]: React.ElementType } = {
  "Core Moving Violations": Car,
  "Equipment & Non-Moving Violations": User,
  "License, Registration & Insurance Violations": FileText,
  "Serious Bodily Injury / Fatality Violations": AlertTriangle,
  "Commercial Motor Vehicle (CMV) Violations": Ban,
}

export const TrafficStatutesClient = React.memo(function TrafficStatutesClient({ violations }: { violations: TrafficViolation[] }) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const lowercasedFilter = searchTerm.toLowerCase()

  const filteredViolations = React.useMemo(() => {
    if (!lowercasedFilter) {
      return violations
    }
    return violations.filter(
      (v) =>
        v.CommonName.toLowerCase().includes(lowercasedFilter) ||
        v.StatuteNumber.toLowerCase().includes(lowercasedFilter) ||
        v.StatuteTitle.toLowerCase().includes(lowercasedFilter)
    )
  }, [lowercasedFilter, violations])

  const groupedViolations = React.useMemo(() => {
    return filteredViolations.reduce((acc, violation) => {
      const { Category } = violation
      if (!acc[Category]) {
        acc[Category] = []
      }
      acc[Category].push(violation)
      return acc
    }, {} as Record<string, TrafficViolation[]>)
  }, [filteredViolations])

  const categoryOrder = [
    "Core Moving Violations",
    "Equipment & Non-Moving Violations",
    "License, Registration & Insurance Violations",
    "Serious Bodily Injury / Fatality Violations",
  ]

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by statute # or keyword (e.g., 316.1925, Careless)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-6">
        {categoryOrder.map((category) => {
          const violationsInCategory = groupedViolations[category]
          if (!violationsInCategory || violationsInCategory.length === 0) {
            return null
          }
          const CategoryIcon = categoryIcons[category] || Gavel

          return (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1 flex items-center gap-3">
                <CategoryIcon className="h-5 w-5 text-primary" />
                {category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {violationsInCategory.map((v) => (
                  <AccordionItem value={v.StatuteNumber} key={v.StatuteNumber} className="border rounded-md">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                      <div className="flex-1 text-left">
                        <p>{v.CommonName}</p>
                        <p className="text-xs text-muted-foreground font-mono font-normal">{v.StatuteNumber}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="border-t pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground italic">{v.StatuteTitle}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={v.InfractionType === 'Criminal' ? 'destructive' : 'secondary'}>
                            {v.InfractionType}
                          </Badge>
                          <Badge variant="outline">{v.ViolationType} Violation</Badge>
                          <Badge variant="outline">{v.Points} Points</Badge>
                          <Badge variant="outline">~${v.BaseFine} Fine</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground/90 mb-2">Elements of the Offense</h4>
                          <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                            {v.Elements.map((element, i) => <li key={i}>{element}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground/90 mb-2">Officer Field Notes</h4>
                          <p className="text-sm text-accent-foreground/80 bg-accent/10 p-3 rounded-md">{v.OfficerNotes}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
         {filteredViolations.length === 0 && (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Violations Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your search for "{searchTerm}" did not match any traffic statutes.
            </p>
          </div>
        )}
      </div>
    </div>
  )
})
