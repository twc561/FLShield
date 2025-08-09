
"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Languages, Volume2, Loader2, PauseCircle } from "lucide-react"
import type { Phrase } from "@/data/field-translation-guide"
import { textToSpeech } from "@/ai/flows/text-to-speech"
import { useAudioPlayer } from "@/hooks/use-audio-player"

export const FieldTranslationClient = React.memo(function FieldTranslationClient({
  phrases,
}: {
  phrases: Phrase[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeAudioId, setActiveAudioId] = React.useState<string | null>(null)
  const [loadingAudioId, setLoadingAudioId] = React.useState<string | null>(null)
  const { isPlaying, playAudio, stopAudio } = useAudioPlayer()

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

  const handleAudioPlay = React.useCallback(async (
    text: string, 
    language: 'english' | 'spanish' | 'haitian_creole',
    phraseId: string
  ) => {
    const audioId = `${phraseId}-${language}`;
    
    if (audioId === activeAudioId && isPlaying) {
      stopAudio();
      setActiveAudioId(null);
      return;
    }

    stopAudio();
    setActiveAudioId(audioId);
    setLoadingAudioId(audioId);

    // Voice mapping for different languages
    const voiceMap = {
      'english': 'Algenib',     // Clear American English voice
      'spanish': 'Cursa',       // Spanish voice
      'haitian_creole': 'Deneb' // Fallback voice for Haitian Creole
    };

    try {
      const response = await textToSpeech({ 
        text, 
        voiceName: voiceMap[language] 
      });
      
      if (response && response.media) {
        playAudio(response.media);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setActiveAudioId(null);
    } finally {
      setLoadingAudioId(null);
    }
  }, [activeAudioId, isPlaying, playAudio, stopAudio]);

  // Reset active audio when playback ends
  React.useEffect(() => {
    if (!isPlaying) {
      setActiveAudioId(null);
    }
  }, [isPlaying]);

  const AudioButton = React.memo(({ 
    text, 
    language, 
    phraseId, 
    size = "sm" 
  }: { 
    text: string; 
    language: 'english' | 'spanish' | 'haitian_creole'; 
    phraseId: string;
    size?: "sm" | "xs";
  }) => {
    const audioId = `${phraseId}-${language}`;
    const isCurrentlyPlaying = activeAudioId === audioId && isPlaying;
    const isCurrentlyLoading = loadingAudioId === audioId;

    return (
      <Button
        variant="ghost"
        size={size}
        onClick={() => handleAudioPlay(text, language, phraseId)}
        disabled={isCurrentlyLoading}
        className="h-8 w-8 p-0 hover:bg-primary/10"
      >
        {isCurrentlyLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isCurrentlyPlaying ? (
          <PauseCircle className="h-4 w-4 text-primary" />
        ) : (
          <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
        )}
      </Button>
    );
  });
  AudioButton.displayName = 'AudioButton';

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
                      <div className="flex items-center justify-between w-full mr-4">
                        <span>{phrase.englishText}</span>
                        <AudioButton
                          text={phrase.englishText}
                          language="english"
                          phraseId={phrase.phraseID}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="border-t pt-4 space-y-3">
                        <div className="p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Spanish</p>
                            <AudioButton
                              text={phrase.spanishText}
                              language="spanish"
                              phraseId={phrase.phraseID}
                              size="xs"
                            />
                          </div>
                          <p className="text-foreground/90">{phrase.spanishText}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Haitian Creole</p>
                            <AudioButton
                              text={phrase.haitianCreoleText}
                              language="haitian_creole"
                              phraseId={phrase.phraseID}
                              size="xs"
                            />
                          </div>
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
FieldTranslationClient.displayName = "FieldTranslationClient";
