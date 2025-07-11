
"use client";

import { useState, useRef, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { MirandaWarningGuideData, LanguageContent } from "@/data/legal-reference/miranda-warning-guide";
import { Gavel, AlertTriangle, Languages, CheckCircle, Mic, Milestone, Volume2, Loader2, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { textToSpeech } from "@/ai/flows/text-to-speech";

const LanguageContentWithAudio = ({ 
  content, 
  languageCode, 
  activeAudioId, 
  playAudio 
}: { 
  content: LanguageContent, 
  languageCode: 'en-US' | 'es-US' | 'ht-HT',
  activeAudioId: string | null, 
  playAudio: (text: string, langCode: 'en-US' | 'es-US' | 'ht-HT', id: string) => void 
}) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground/90 mb-2">Warning</h4>
        <ul className="space-y-1">
          {content.warningLines.map((line: string, i: number) => {
            const id = `${languageCode}-warning-${i}`;
            const isLoading = activeAudioId === id;
            return (
              <li key={i} className="flex items-center justify-between gap-2">
                <span className="flex-1"><Mic className="h-4 w-4 mr-2 inline-block text-accent"/>{line}</span>
                <Button variant="ghost" size="icon" onClick={() => playAudio(line, languageCode, id)} disabled={!!activeAudioId && !isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Volume2 className="h-5 w-5"/>}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground/90 mb-2">Waiver Questions</h4>
        <ul className="space-y-1">
          {content.waiverQuestions.map((line: string, i: number) => {
             const id = `${languageCode}-waiver-${i}`;
             const isLoading = activeAudioId === id;
            return (
              <li key={i} className="flex items-center justify-between gap-2">
                <span className="flex-1"><CheckCircle className="h-4 w-4 mr-2 inline-block text-green-500"/>{line}</span>
                 <Button variant="ghost" size="icon" onClick={() => playAudio(line, languageCode, id)} disabled={!!activeAudioId && !isLoading}>
                   {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Volume2 className="h-5 w-5"/>}
                 </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


export function MirandaWarningClient({
  data,
}: {
  data: MirandaWarningGuideData;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setActiveAudioId(null);
  }, []);

  const playAudio = useCallback(async (text: string, langCode: 'en-US' | 'es-US' | 'ht-HT', id: string) => {
    if (id === activeAudioId) {
      stopAudio();
      return;
    }
    
    stopAudio();
    setActiveAudioId(id);

    // Map language codes to voice names if necessary, or pass directly if the API supports it.
    // For this example, we assume direct support or a mapping within the TTS flow.
    const voiceMap = {
      'en-US': 'Algenib', // Example voice
      'es-US': 'Cursa',   // Example voice
      'ht-HT': 'Deneb',   // Example voice
    };

    try {
      const response = await textToSpeech({ text, voiceName: voiceMap[langCode] });
      if (audioRef.current) {
        audioRef.current.src = response.media;
        audioRef.current.play().catch(e => {
          console.error("Audio playback error:", e);
          stopAudio();
        });
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      stopAudio();
    }
  }, [activeAudioId, stopAudio]);

  return (
    <div className="space-y-6">
      <audio ref={audioRef} onEnded={stopAudio} onPause={stopAudio}/>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{data.plainLanguageSummary}</p>
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-b-0">
            <Card>
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-primary"/>{data.legalTriggers.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4 space-y-4">
                        <p className="text-muted-foreground">{data.legalTriggers.explanation}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {data.legalTriggers.definitions.map(def => (
                                <div key={def.term} className="p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-semibold text-foreground/90">{def.term}</h4>
                                    <p className="text-sm text-muted-foreground">{def.definition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-b-0">
            <Card>
                 <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><Languages className="h-5 w-5 text-primary"/>{data.mirandaWarningTranslations.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4">
                        <Tabs defaultValue="english" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="english">English</TabsTrigger>
                            <TabsTrigger value="spanish">Español</TabsTrigger>
                            <TabsTrigger value="haitian_creole">Kreyòl Ayisyen</TabsTrigger>
                          </TabsList>
                            <TabsContent value="english" className="mt-4">
                                <LanguageContentWithAudio 
                                    content={data.mirandaWarningTranslations.english}
                                    languageCode={'en-US'}
                                    activeAudioId={activeAudioId}
                                    playAudio={playAudio}
                                />
                            </TabsContent>
                            <TabsContent value="spanish" className="mt-4">
                                <LanguageContentWithAudio 
                                    content={data.mirandaWarningTranslations.spanish}
                                    languageCode={'es-US'}
                                    activeAudioId={activeAudioId}
                                    playAudio={playAudio}
                                />
                            </TabsContent>
                             <TabsContent value="haitian_creole" className="mt-4">
                                <LanguageContentWithAudio 
                                    content={data.mirandaWarningTranslations.haitian_creole}
                                    languageCode={'ht-HT'}
                                    activeAudioId={activeAudioId}
                                    playAudio={playAudio}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>

         <AccordionItem value="item-3" className="border-b-0">
            <Card>
                 <AccordionTrigger className="p-6 text-left hover:no-underline">
                    <CardTitle className="flex items-center gap-3"><Gavel className="h-5 w-5 text-primary"/>{data.rightsBreakdown.title}</CardTitle>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                    <div className="border-t pt-4 space-y-4">
                        {data.rightsBreakdown.rights.map(right => (
                            <div key={right.rightName}>
                                <h4 className="font-semibold text-foreground/90">{right.rightName}</h4>
                                <p className="text-muted-foreground">{right.explanation}</p>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
      </Accordion>
      
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Milestone className="h-5 w-5 text-primary"/>Key Case Law</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">{data.keyCase.caseName} <span className="text-muted-foreground font-normal">({data.keyCase.citation})</span></h4>
          <p className="text-sm text-muted-foreground italic mt-1">"{data.keyCase.holding}"</p>
        </CardContent>
      </Card>

    </div>
  );
}
