
"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, Volume2, Loader2, Languages } from "lucide-react"
import type { Phrase } from "@/data/field-translation-guide"
import { Button } from "@/components/ui/button"
import { trilingualTextToSpeech } from "@/ai/flows/trilingual-tts"

export const FieldTranslationClient = React.memo(function FieldTranslationClient({
  phrases,
}: {
  phrases: Phrase[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [audioState, setAudioState] = React.useState<Record<string, 'loading' | 'playing' | 'idle'>>({})
  
  // Refs to manage audio playback and cache fetched data
  const audioCache = React.useRef<Map<string, string>>(new Map());
  const activeAudioRef = React.useRef<HTMLAudioElement | null>(null);
  
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

  const playAudio = async (text: string, language: 'es-US' | 'ht-HT', id: string) => {
    // Stop any currently playing audio and reset its state
    if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        const playingId = Object.keys(audioState).find(key => audioState[key] === 'playing');
        if (playingId) {
             setAudioState(prev => ({ ...prev, [playingId]: 'idle' }));
        }
    }
    
    // Set all other states to idle before setting the current one to loading
    setAudioState(prev => {
        const newState = Object.keys(prev).reduce((acc, key) => {
            acc[key] = 'idle';
            return acc;
        }, {} as Record<string, 'loading' | 'playing' | 'idle'>);
        newState[id] = 'loading';
        return newState;
    });

    let audioDataUri = audioCache.current.get(id);

    if (!audioDataUri) {
        try {
          const response = await trilingualTextToSpeech({ text, language });
          audioDataUri = response.media;
          audioCache.current.set(id, audioDataUri);
        } catch (error) {
          console.error("TTS Error:", error);
          setAudioState(prev => ({ ...prev, [id]: 'idle' }));
          return;
        }
    }
    
    const audio = new Audio(audioDataUri);
    activeAudioRef.current = audio;

    audio.onplaying = () => setAudioState(prev => ({...prev, [id]: 'playing'}));
    audio.onended = () => {
        setAudioState(prev => ({...prev, [id]: 'idle'}));
        activeAudioRef.current = null;
    };
    audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setAudioState(prev => ({...prev, [id]: 'idle'}));
        activeAudioRef.current = null;
    }

    try {
        await audio.play();
    } catch(e) {
        console.error("Error playing audio:", e);
        setAudioState(prev => ({ ...prev, [id]: 'idle' }));
        activeAudioRef.current = null;
    }
  };


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
                {phrasesInCategory.map(phrase => {
                  const spanishId = `${phrase.phraseID}-es`;
                  const haitianId = `${phrase.phraseID}-ht`;

                  return (
                    <AccordionItem value={phrase.phraseID} key={phrase.phraseID} className="border rounded-md bg-card">
                      <AccordionTrigger className="p-4 hover:no-underline font-semibold text-base text-card-foreground">
                        {phrase.englishText}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">{phrase.spanishText}</p>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => playAudio(phrase.spanishText, 'es-US', spanishId)}
                              disabled={audioState[spanishId] === 'loading' || audioState[spanishId] === 'playing'}
                            >
                              {audioState[spanishId] === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">{phrase.haitianCreoleText}</p>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => playAudio(phrase.haitianCreoleText, 'ht-HT', haitianId)}
                              disabled={audioState[haitianId] === 'loading' || audioState[haitianId] === 'playing'}
                            >
                              {audioState[haitianId] === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          )
        })}
      </div>
    </div>
  )
})
