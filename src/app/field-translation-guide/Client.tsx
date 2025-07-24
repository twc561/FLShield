
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
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { 
  Search, 
  Languages, 
  Volume2, 
  Loader2, 
  PauseCircle, 
  Download,
  Mic,
  MicOff,
  Settings,
  VolumeX,
  Play,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import type { Phrase } from "@/data/field-translation-guide"
import { textToSpeech } from "@/ai/flows/text-to-speech"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export const FieldTranslationClient = React.memo(function FieldTranslationClient({
  phrases,
}: {
  phrases: Phrase[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeAudioId, setActiveAudioId] = React.useState<string | null>(null)
  const [loadingAudioId, setLoadingAudioId] = React.useState<string | null>(null)
  const [audioCache, setAudioCache] = React.useState<Map<string, string>>(new Map())
  const [retryCount, setRetryCount] = React.useState<Map<string, number>>(new Map())
  const [showSettings, setShowSettings] = React.useState(false)
  const [speechSpeed, setSpeechSpeed] = React.useState(1.0)
  const [speechPitch, setSpeechPitch] = React.useState(0)
  const [offlineMode, setOfflineMode] = React.useState(false)
  const [downloadedPhrases, setDownloadedPhrases] = React.useState<Set<string>>(new Set())

  const { 
    isPlaying, 
    playAudio, 
    stopAudio, 
    volume, 
    setVolume, 
    currentTime, 
    duration, 
    error: audioError,
    isLoading: audioLoading
  } = useAudioPlayer()

  const {
    isListening,
    finalTranscript,
    startListening,
    stopListening,
    error: speechError,
    isSupported: speechSupported,
    confidence,
    resetTranscript
  } = useSpeechRecognition()

  const filteredPhrases = React.useMemo(() => {
    if (!searchTerm && !finalTranscript) {
      return phrases
    }
    
    const searchText = (searchTerm + ' ' + finalTranscript).toLowerCase()
    return phrases.filter(
      (phrase) =>
        phrase.englishText.toLowerCase().includes(searchText) ||
        phrase.spanishText.toLowerCase().includes(searchText) ||
        phrase.haitianCreoleText.toLowerCase().includes(searchText) ||
        phrase.category.toLowerCase().includes(searchText)
    )
  }, [searchTerm, finalTranscript, phrases])

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

    try {
      // Check cache first
      let audioData = audioCache.get(audioId);
      
      if (!audioData) {
        // Language code mapping
        const langMap = {
          'english': 'en',
          'spanish': 'es',
          'haitian_creole': 'ht'
        };

        const response = await textToSpeech({ 
          text, 
          language: langMap[language],
          speed: speechSpeed,
          pitch: speechPitch
        });

        if (response && response.media) {
          audioData = response.media;
          setAudioCache(prev => new Map(prev.set(audioId, audioData!)));
        }
      }

      if (audioData) {
        await playAudio(audioData);
        setRetryCount(prev => new Map(prev.set(audioId, 0))); // Reset retry count on success
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      
      // Implement retry logic
      const currentRetries = retryCount.get(audioId) || 0;
      if (currentRetries < 3) {
        setRetryCount(prev => new Map(prev.set(audioId, currentRetries + 1)));
        setTimeout(() => {
          handleAudioPlay(text, language, phraseId);
        }, 1000 * (currentRetries + 1)); // Exponential backoff
      } else {
        setActiveAudioId(null);
        // Show user-friendly error
      }
    } finally {
      setLoadingAudioId(null);
    }
  }, [activeAudioId, isPlaying, playAudio, stopAudio, audioCache, speechSpeed, speechPitch, retryCount]);

  const handleDownloadAudio = React.useCallback(async (
    text: string,
    language: 'english' | 'spanish' | 'haitian_creole',
    phraseId: string
  ) => {
    const audioId = `${phraseId}-${language}`;
    
    try {
      let audioData = audioCache.get(audioId);
      
      if (!audioData) {
        const langMap = { 'english': 'en', 'spanish': 'es', 'haitian_creole': 'ht' };
        const response = await textToSpeech({ 
          text, 
          language: langMap[language],
          speed: speechSpeed,
          pitch: speechPitch
        });
        audioData = response.media;
      }

      if (audioData) {
        const link = document.createElement('a');
        link.href = audioData;
        link.download = `${phraseId}-${language}.wav`;
        link.click();
        
        setDownloadedPhrases(prev => new Set(prev.add(audioId)));
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [audioCache, speechSpeed, speechPitch]);

  // Reset active audio when playback ends
  React.useEffect(() => {
    if (!isPlaying) {
      setActiveAudioId(null);
    }
  }, [isPlaying]);

  // Check online status
  React.useEffect(() => {
    const handleOnline = () => setOfflineMode(false);
    const handleOffline = () => setOfflineMode(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const AudioButton = React.memo(({ 
    text, 
    language, 
    phraseId, 
    size = "sm",
    showDownload = false 
  }: { 
    text: string; 
    language: 'english' | 'spanish' | 'haitian_creole'; 
    phraseId: string;
    size?: "sm" | "xs";
    showDownload?: boolean;
  }) => {
    const audioId = `${phraseId}-${language}`;
    const isCurrentlyPlaying = activeAudioId === audioId && isPlaying;
    const isCurrentlyLoading = loadingAudioId === audioId;
    const isDownloaded = downloadedPhrases.has(audioId);
    const isCached = audioCache.has(audioId);

    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size={size}
          onClick={() => handleAudioPlay(text, language, phraseId)}
          disabled={isCurrentlyLoading || offlineMode && !isCached}
          className="h-8 w-8 p-0 hover:bg-primary/10 relative"
        >
          {isCurrentlyLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isCurrentlyPlaying ? (
            <PauseCircle className="h-4 w-4 text-primary" />
          ) : offlineMode && !isCached ? (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
          )}
          {isCached && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
          )}
        </Button>
        
        {showDownload && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => handleDownloadAudio(text, language, phraseId)}
            className="h-6 w-6 p-0 hover:bg-primary/10"
            disabled={offlineMode}
          >
            {isDownloaded ? (
              <CheckCircle2 className="h-3 w-3 text-green-600" />
            ) : (
              <Download className="h-3 w-3 text-muted-foreground hover:text-primary" />
            )}
          </Button>
        )}
      </div>
    );
  });

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      {(offlineMode || audioError || speechError) && (
        <Alert className={offlineMode ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {offlineMode ? "Offline Mode" : "Audio Issue"}
          </AlertTitle>
          <AlertDescription>
            {offlineMode 
              ? "Only cached audio phrases will be available. Connect to internet for full functionality."
              : audioError || speechError
            }
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Field Translation Guide
          </CardTitle>
          <CardDescription>
            Search phrases and hear AI-generated pronunciations in multiple languages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search phrases in any language..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {speechSupported && (
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Voice Search Feedback */}
          {speechSupported && finalTranscript && (
            <div className="p-3 bg-blue-50 rounded-md border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800">Voice Search:</span>
                <Badge variant="secondary">
                  {Math.round(confidence * 100)}% confidence
                </Badge>
              </div>
              <p className="text-blue-700">{finalTranscript}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTranscript}
                className="mt-2 h-6 text-xs"
              >
                Clear
              </Button>
            </div>
          )}

          {/* Settings Panel */}
          <Collapsible open={showSettings} onOpenChange={setShowSettings}>
            <CollapsibleContent className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Volume</label>
                  <div className="flex items-center gap-2 mt-1">
                    <VolumeX className="h-4 w-4" />
                    <Slider
                      value={[volume]}
                      onValueChange={([value]) => setVolume(value)}
                      max={1}
                      step={0.1}
                      className="flex-1"
                    />
                    <Volume2 className="h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Speech Speed</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs">0.5x</span>
                    <Slider
                      value={[speechSpeed]}
                      onValueChange={([value]) => setSpeechSpeed(value)}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-xs">2x</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Pitch</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs">Low</span>
                    <Slider
                      value={[speechPitch]}
                      onValueChange={([value]) => setSpeechPitch(value)}
                      min={-10}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs">High</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Cached phrases: {audioCache.size}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAudioCache(new Map())}
                >
                  Clear Cache
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Audio Progress */}
      {isPlaying && duration > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(currentTime)}s</span>
                <span>{Math.round(duration)}s</span>
              </div>
              <Progress value={(currentTime / duration) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      <div className="space-y-4">
        {categoryOrder.map(category => {
          const phrasesInCategory = groupedPhrases[category];
          if (!phrasesInCategory || phrasesInCategory.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1 flex items-center gap-3">
                <Languages className="h-5 w-5 text-primary" />
                {category}
                <Badge variant="secondary">{phrasesInCategory.length}</Badge>
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
                          showDownload
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                      <div className="border-t pt-4 space-y-3">
                        <div className="p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Spanish (Español)</p>
                            <AudioButton
                              text={phrase.spanishText}
                              language="spanish"
                              phraseId={phrase.phraseID}
                              size="xs"
                              showDownload
                            />
                          </div>
                          <p className="text-foreground/90">{phrase.spanishText}</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Haitian Creole (Kreyòl Ayisyen)</p>
                            <AudioButton
                              text={phrase.haitianCreoleText}
                              language="haitian_creole"
                              phraseId={phrase.phraseID}
                              size="xs"
                              showDownload
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

      {filteredPhrases.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No phrases found matching your search.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                resetTranscript();
              }}
              className="mt-2"
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
})
