"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, Languages } from "lucide-react"
import type { Phrase } from "@/data/field-translation-guide"

export const FieldTranslationClient = React.memo(function FieldTranslationClient({
  phrases,
}: {
  phrases: Phrase[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredPhrases = React.useMemo(() => {
    if (!searchTerm) {
      return phrases
    }
    const lowercasedTerm = searchTerm.toLowerCase()
    return phrases.filter(
      (phrase) =>
        phrase.englishText.toLowerCase().includes(lowercasedTerm) ||
        phrase.spanishText.toLowerCase().includes(lowercasedTerm) ||
        phrase.haitianCreoleText.toLowerCase().includes(lowercasedTerm)
    )
  }, [searchTerm, phrases])

  const groupedPhrases = React.useMemo(() => {
    return filteredPhrases.reduce((acc, phrase) => {
      const { category } = phrase;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(phrase);
      return acc;
    }, {} as Record<string, Phrase[]>);
  }, [filteredPhrases]);

  const categoryOrder = [
    'Initial Contact & Simple Commands',
    'Investigative & Information Gathering Questions',
    'Traffic Stop Specific',
    'Legal Warnings & Consent',
    'Emergency & Medical'
  ]
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search phrases in any language..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {categoryOrder.map(category => {
          const phrasesInCategory = groupedPhrases[category];
          if (!phrasesInCategory || phrasesInCategory.length === 0) return null;
          
          return (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1 flex items-center gap-3">
                <Languages className="h-5 w-5 text-primary" />
                {category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {phrasesInCategory.map(phrase => (
                  <AccordionItem value={phrase.phraseID} key={phrase.phraseID} className="border rounded-md bg-card">
                    <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground text-left">
                      {phrase.englishText}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="border-t pt-4 space-y-3">
                        <div className="p-2 bg-muted/50 rounded-md">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Spanish</p>
                            <p className="text-foreground/90">{phrase.spanishText}</p>
                        </div>
                        <div className="p-2 bg-muted/50 rounded-md">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Haitian Creole</p>
                            <p className="text-foreground/90">{phrase.haitianCreoleText}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>
    </div>
  )
})
