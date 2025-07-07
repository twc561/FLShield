"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Summarizer } from "@/components/Summarizer"
import type { Statute } from "@/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ExternalLink, BookOpen } from "lucide-react"

function StatuteDetailModal({ statute, children }: { statute: Statute, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{statute.title}</DialogTitle>
                    <DialogDescription>{statute.code} - {statute.description}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-96 pr-6">
                    <div className="space-y-4 py-4 text-sm">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Degree of Charge</h4>
                            <p className="text-muted-foreground">{statute.degreeOfCharge}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">What it Means for Officers</h4>
                            <p className="text-muted-foreground leading-relaxed">{statute.practicalSummary}</p>
                        </div>
                         <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Real-World Example</h4>
                            <p className="text-muted-foreground leading-relaxed">{statute.example}</p>
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Summarizer documentText={statute.fullText} documentTitle={statute.title} />
                     <Button asChild variant="secondary">
                        <Link href={statute.url} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Full Statute
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


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
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialStatutes.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercasedTerm) ||
        s.code.toLowerCase().includes(lowercasedTerm) ||
        s.description.toLowerCase().includes(lowercasedTerm) ||
        s.practicalSummary.toLowerCase().includes(lowercasedTerm) ||
        s.example.toLowerCase().includes(lowercasedTerm)
    )
  }, [searchTerm, initialStatutes])

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-fade-in-up">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, code, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <ScrollArea className="flex-1 pr-4 -mr-4">
        <div className="space-y-4">
          {filteredStatutes.length > 0 ? (
            filteredStatutes.map((s, index) => (
              <StatuteDetailModal key={s.id} statute={s}>
                <Card
                  className="animate-fade-in-up hover:border-primary transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle>{s.title}</CardTitle>
                        <CardDescription>{s.code}</CardDescription>
                      </div>
                       <Badge variant="secondary">{s.degreeOfCharge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {s.practicalSummary}
                    </p>
                  </CardContent>
                </Card>
              </StatuteDetailModal>
            ))
          ) : (
            <div className="text-center py-16">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Statutes Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">No statutes found matching your search.</p>
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
