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
import type { Statute } from "@/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

export function StatuteClient({
  initialStatutes,
}: {
  initialStatutes: Statute[]
}) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStatutes = useMemo(() => {
    if (!searchTerm) {
      return initialStatutes
    }
    return initialStatutes.filter(
      (s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, initialStatutes])

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, code, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4">
          {filteredStatutes.length > 0 ? (
            filteredStatutes.map((s, index) => (
              <Card
                key={s.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle>{s.title}</CardTitle>
                      <CardDescription>{s.code}</CardDescription>
                    </div>
                    <Summarizer
                      documentText={s.fullText}
                      documentTitle={s.title}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No statutes found matching your search.</p>
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
