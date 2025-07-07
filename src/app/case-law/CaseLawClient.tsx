"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Summarizer } from "@/components/Summarizer"
import type { CaseLaw } from "@/data/case-law"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

export function CaseLawClient({ initialCases }: { initialCases: CaseLaw[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCases = useMemo(() => {
    if (!searchTerm) {
      return initialCases
    }
    return initialCases.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
    )
  }, [searchTerm, initialCases])

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, citation, category, tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4">
          {filteredCases.length > 0 ? (
            filteredCases.map((c, index) => (
              <Card
                key={c.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle>{c.title}</CardTitle>
                      <CardDescription>{c.citation} &middot; {c.category}</CardDescription>
                    </div>
                    <Summarizer
                      documentText={`${c.summary}\n\nWhat it Means for Officers:\n${c.meaning}`}
                      documentTitle={c.title}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground/90">
                    {c.summary}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-semibold text-foreground/80">What it Means for Officers:</span> {c.meaning}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {c.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No case laws found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      style?: React.CSSProperties & { [key: string]: string | number };
    }
}
