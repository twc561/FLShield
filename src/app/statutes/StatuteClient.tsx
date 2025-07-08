"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Summarizer } from "@/components/Summarizer"
import type { Statute } from "@/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ExternalLink, BookOpen, Loader2, Sparkles } from "lucide-react"
import { findStatute } from "@/ai/flows/find-statute"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function StatuteClient({
  initialStatutes,
}: {
  initialStatutes: Statute[]
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAiSearching, setIsAiSearching] = useState(false)
  const [aiResult, setAiResult] = useState<Statute | null>(null)

  const filteredStatutes = useMemo(() => {
    if (!searchTerm) {
      return initialStatutes
    }
    const lowercasedTerm = searchTerm.toLowerCase()
    return initialStatutes.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm) ||
        s.description.toLowerCase().includes(lowercasedTerm) ||
        s.practicalSummary.toLowerCase().includes(lowercasedTerm) ||
        s.example.toLowerCase().includes(lowercasedTerm)
    )
  }, [searchTerm, initialStatutes])

  useEffect(() => {
    if (searchTerm === "") {
        setAiResult(null)
        setIsAiSearching(false)
        return
    }

    const handler = setTimeout(() => {
      if (
        filteredStatutes.length === 0 &&
        !isAiSearching &&
        !aiResult
      ) {
        setIsAiSearching(true)
        findStatute({ query: searchTerm })
          .then((result) => {
            if (result && result.code) {
              const newStatute: Statute = {
                id: result.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
                code: result.code,
                title: result.title || "N/A",
                description:
                  result.description || "No description provided by AI.",
                fullText:
                  result.practicalSummary ||
                  "No full text available for AI-generated result.",
                degreeOfCharge: result.degreeOfCharge || "N/A",
                practicalSummary:
                  result.practicalSummary || "No summary provided by AI.",
                elementsOfTheCrime: result.elementsOfTheCrime || null,
                example: result.example || "No example provided by AI.",
                url: `https://www.flsenate.gov/Laws/Statutes/search?search=${encodeURIComponent(
                  result.title || result.code
                )}&context=statutes`,
              }
              setAiResult(newStatute)
            } else {
              setAiResult(null) 
            }
          })
          .catch((error) => {
            console.error("AI search failed:", error)
            setAiResult(null)
          })
          .finally(() => {
            setIsAiSearching(false)
          })
      }
    }, 800) 

    return () => {
      clearTimeout(handler) 
    }
  }, [searchTerm, filteredStatutes.length, isAiSearching, aiResult])

  const showLocalResults = filteredStatutes.length > 0 && searchTerm !== ""
  const showAiResult = !showLocalResults && aiResult
  const showLoading = !showLocalResults && isAiSearching
  const showNotFound =
    !showLocalResults && !aiResult && !isAiSearching && searchTerm.length > 0
    
  const statutesToDisplay = searchTerm ? filteredStatutes : initialStatutes

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, code, or keyword (e.g. 'DUI')"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            if (e.target.value === '' || filteredStatutes.length > 0) {
              setAiResult(null)
            }
          }}
          className="pl-10"
        />
      </div>
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {(showLocalResults || searchTerm === "") &&
            statutesToDisplay.map((statute, index) => (
              <AccordionItem
                value={statute.id}
                key={statute.id}
                className="border-b-0"
              >
                <Card
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <div className="flex-1 text-left">
                      <CardTitle>{statute.title}</CardTitle>
                      <CardDescription>
                        {statute.code} &bull; {statute.degreeOfCharge}
                      </CardDescription>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                      <Accordion type="multiple" collapsible className="w-full space-y-2" defaultValue={['description']}>
                        <AccordionItem value="description" className="border-b-0">
                          <Card className="bg-muted/50">
                              <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                  Official Description
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                  {statute.description}
                              </AccordionContent>
                          </Card>
                        </AccordionItem>
                        <AccordionItem value="summary" className="border-b-0">
                          <Card className="bg-muted/50">
                              <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                  What it Means for Officers
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                  {statute.practicalSummary}
                              </AccordionContent>
                          </Card>
                        </AccordionItem>
                        <AccordionItem value="example" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    Real-World Example
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {statute.example}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                      </Accordion>
                      <div className="mt-6 flex items-center gap-2">
                        <Summarizer
                          documentText={
                            statute.fullText ||
                            `${statute.practicalSummary} ${statute.example}`
                          }
                          documentTitle={statute.title}
                        />
                        <Button asChild variant="secondary">
                          <Link href={statute.url} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Statute
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}

          {showAiResult && aiResult && (
            <AccordionItem value={aiResult.id} className="border-b-0">
              <Card className="animate-fade-in-up border-accent/50">
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
                      <CardTitle>{aiResult.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {aiResult.code} &bull; {aiResult.degreeOfCharge}
                    </CardDescription>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                       <Accordion type="multiple" collapsible className="w-full space-y-2" defaultValue={['description']}>
                        <AccordionItem value="description" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    AI-Generated Description
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {aiResult.description}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                        <AccordionItem value="summary" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    What it Means for Officers
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {aiResult.practicalSummary}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                        {aiResult.elementsOfTheCrime && (
                            <AccordionItem value="elements" className="border-b-0">
                                <Card className="bg-muted/50">
                                    <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                        Elements of the Crime
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {aiResult.elementsOfTheCrime}
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        )}
                        <AccordionItem value="example" className="border-b-0">
                            <Card className="bg-muted/50">
                                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                                    Real-World Example
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                                    {aiResult.example}
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h4 className="font-semibold mb-2 text-destructive-foreground/90">
                          AI Result Disclaimer
                        </h4>
                        <p className="text-destructive-foreground/80 leading-relaxed text-sm">
                          This information was generated by AI and has not been
                          verified. Always consult official sources for legal
                          decisions.
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <Summarizer
                          documentText={
                            aiResult.fullText ||
                            `${aiResult.practicalSummary} ${aiResult.example}`
                          }
                          documentTitle={aiResult.title}
                        />
                        <Button asChild variant="secondary">
                          <Link href={aiResult.url} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Statute
                          </Link>
                        </Button>
                      </div>
                    </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          )}

          {showLoading && (
            <div className="text-center py-16">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <h3 className="mt-4 text-lg font-medium">
                AI is searching statutes...
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This may take a moment.
              </p>
            </div>
          )}

          {showNotFound && (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Statutes Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your search for "{searchTerm}" did not match any local or
                AI-found statutes.
              </p>
            </div>
          )}
        </Accordion>
      </ScrollArea>
    </div>
  )
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    style?: React.CSSProperties & { [key: string]: string | number }
  }
}
