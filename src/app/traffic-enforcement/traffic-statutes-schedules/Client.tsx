
"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { TrafficViolation, TrafficViolationIndexItem } from "@/data/traffic-enforcement/traffic-violations"
import type { Statute } from "@/data/statutes"
import { Search, Gavel, FileText, Ban, AlertTriangle, User, Car, Loader2, Sparkles, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { findStatute } from "@/ai/flows/find-statute"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Summarizer } from "@/components/Summarizer"
import { Skeleton } from "@/components/ui/skeleton"

const categoryIcons: { [key: string]: React.ElementType } = {
  "Core Moving Violations": Car,
  "Equipment & Non-Moving Violations": User,
  "License, Registration & Insurance Violations": FileText,
  "Serious Bodily Injury / Fatality Violations": AlertTriangle,
  "Commercial Motor Vehicle (CMV) Violations": Ban,
}

const FullViolationContent = React.memo(function FullViolationContent({
    violation
}: {
    violation: TrafficViolation
}) {
    return (
        <div className="border-t pt-4 space-y-4">
            <p className="text-sm text-muted-foreground italic">{violation.StatuteTitle}</p>
            <div className="flex flex-wrap gap-2">
            <Badge variant={violation.InfractionType === 'Criminal' ? 'destructive' : 'secondary'}>
                {violation.InfractionType}
            </Badge>
            <Badge variant="outline">{violation.ViolationType} Violation</Badge>
            <Badge variant="outline">{violation.Points} Points</Badge>
            <Badge variant="outline">~${violation.BaseFine} Fine</Badge>
            </div>
            <div>
            <h4 className="font-semibold text-foreground/90 mb-2">Elements of the Offense</h4>
            <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                {violation.Elements.map((element, i) => <li key={i}>{element}</li>)}
            </ul>
            </div>
            <div>
            <h4 className="font-semibold text-foreground/90 mb-2">Officer Field Notes</h4>
            <p className="text-sm text-accent-foreground/80 bg-accent/10 p-3 rounded-md">{violation.OfficerNotes}</p>
            </div>
      </div>
    )
})

export const TrafficStatutesClient = React.memo(function TrafficStatutesClient({ 
    initialViolations,
    violationsFullData
}: { 
    initialViolations: TrafficViolationIndexItem[],
    violationsFullData: Record<string, TrafficViolation>
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAiSearching, setIsAiSearching] = React.useState(false)
  const [aiResult, setAiResult] = React.useState<Statute | null>(null)
  
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search')

  const [activeAccordionItem, setActiveAccordionItem] = React.useState<string | undefined>();
  const [cachedData, setCachedData] = React.useState<Record<string, TrafficViolation>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch)
    }
  }, [initialSearch])

  const lowercasedFilter = searchTerm.toLowerCase()

  const filteredViolations = React.useMemo(() => {
    if (!lowercasedFilter) {
      return initialViolations
    }
    return initialViolations.filter(
      (v) =>
        v.CommonName.toLowerCase().includes(lowercasedFilter) ||
        v.StatuteNumber.toLowerCase().includes(lowercasedFilter)
    )
  }, [lowercasedFilter, initialViolations])

  const groupedViolations = React.useMemo(() => {
    return filteredViolations.reduce((acc, violation) => {
      const { Category } = violation
      if (!acc[Category]) {
        acc[Category] = []
      }
      acc[Category].push(violation)
      return acc
    }, {} as Record<string, TrafficViolationIndexItem[]>)
  }, [filteredViolations])


  React.useEffect(() => {
    if (searchTerm === "" || (initialSearch && searchTerm === initialSearch)) {
      setAiResult(null)
      setIsAiSearching(false)
      if (searchTerm === "") return
    }
    if (filteredViolations.length > 0) {
      setAiResult(null)
      return
    }

    const handler = setTimeout(() => {
      const currentSearchTerm = searchTerm
      setIsAiSearching(true)
      findStatute({ query: currentSearchTerm })
        .then((result) => {
          if (searchTerm === currentSearchTerm) {
            if (result && result.code) {
              const newStatute: Statute = {
                id: result.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
                code: result.code,
                title: result.title || "N/A",
                description: result.description || "No description provided by AI.",
                fullText: result.description || "No full text available for AI-generated result.",
                degreeOfCharge: result.degreeOfCharge || "N/A",
                practicalSummary: result.description || "No summary provided by AI.",
                elementsOfTheCrime: result.elementsOfTheCrime || null,
                example: result.example || "No example provided by AI.",
                url: `https://www.flsenate.gov/Laws/Statutes/search?search=${encodeURIComponent(
                  result.title || result.code
                )}&context=statutes`,
                category: 'AI Result'
              }
              setAiResult(newStatute)
            } else {
              setAiResult(null)
            }
          }
        })
        .catch((error) => {
          console.error("AI search failed:", error)
          if (searchTerm === currentSearchTerm) {
            setAiResult(null)
          }
        })
        .finally(() => {
          if (searchTerm === currentSearchTerm) {
            setIsAiSearching(false)
          }
        })
    }, 800)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, filteredViolations.length, initialSearch])

  const handleAccordionChange = async (value: string | undefined) => {
    setActiveAccordionItem(value);
    if (!value) return; 
    if (cachedData[value] || loadingId === value) return; 

    setLoadingId(value);
    await new Promise(res => setTimeout(res, 300)); // Simulate network delay

    const fullData = violationsFullData[value];
    if (fullData) {
        setCachedData(prev => ({ ...prev, [value]: fullData }));
    }
    setLoadingId(null);
  }

  const categoryOrder = [
    "Core Moving Violations",
    "Equipment & Non-Moving Violations",
    "License, Registration & Insurance Violations",
    "Serious Bodily Injury / Fatality Violations",
  ]

  const showNotFound = !isAiSearching && !aiResult && searchTerm.length > 0 && filteredViolations.length === 0

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
      
      {isAiSearching && (
        <div className="text-center py-16">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h3 className="mt-4 text-lg font-medium">AI is searching statutes...</h3>
          <p className="mt-1 text-sm text-muted-foreground">This may take a moment.</p>
        </div>
      )}

      {!isAiSearching && aiResult && (
        <Card className="animate-fade-in-up border-accent/50 shadow-lg shadow-accent/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
              <CardTitle>{aiResult.title}</CardTitle>
            </div>
            <CardDescription>{aiResult.code} &bull; {aiResult.degreeOfCharge}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-2" defaultValue={['description']}>
              <AccordionItem value="description" className="border-b-0">
                <Card className="bg-muted/50">
                  <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Practical Summary for Officers</AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{aiResult.practicalSummary}</AccordionContent>
                </Card>
              </AccordionItem>
              {aiResult.elementsOfTheCrime && (
                <AccordionItem value="elements" className="border-b-0">
                  <Card className="bg-muted/50">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Elements of the Crime</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">{aiResult.elementsOfTheCrime}</AccordionContent>
                  </Card>
                </AccordionItem>
              )}
              {aiResult.example && (
                <AccordionItem value="example" className="border-b-0">
                  <Card className="bg-muted/50">
                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">Real-World Example</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">{aiResult.example}</AccordionContent>
                  </Card>
                </AccordionItem>
              )}
            </Accordion>
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold mb-2 text-destructive-foreground/90">AI Result Disclaimer</h4>
              <p className="text-destructive-foreground/80 leading-relaxed text-sm">This information was generated by AI and has not been verified. Always consult official sources for legal decisions.</p>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Summarizer documentText={aiResult.fullText || `${aiResult.practicalSummary} ${aiResult.example}`} documentTitle={aiResult.title} />
            <Button asChild variant="secondary">
              <Link href={aiResult.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> View Full Statute
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {showNotFound && (
        <div className="text-center py-16">
          <Search className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No Violations Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your search for "{searchTerm}" did not match any local or AI-found traffic statutes.
          </p>
        </div>
      )}

      {!isAiSearching && !aiResult && (
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
                <Accordion type="single" collapsible className="w-full space-y-2" value={activeAccordionItem} onValueChange={handleAccordionChange}>
                  {violationsInCategory.map((v) => (
                    <AccordionItem value={v.StatuteNumber} key={v.StatuteNumber} className="border rounded-md">
                      <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                        <div className="flex-1 text-left">
                          <p>{v.CommonName}</p>
                          <p className="text-xs text-muted-foreground font-mono font-normal">{v.StatuteNumber}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                         {loadingId === v.StatuteNumber && (
                           <div className="border-t pt-4 space-y-4">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-full" />
                           </div>
                         )}
                         {cachedData[v.StatuteNumber] && <FullViolationContent violation={cachedData[v.StatuteNumber]} />}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})
