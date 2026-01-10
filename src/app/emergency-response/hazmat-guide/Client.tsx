
"use client"

import * as React from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Search, Flame, ShieldAlert, Biohazard, Activity, Radiation, Skull, Wind, Bot, CircleDot, AlertTriangle, Info, Image as ImageIcon, Sparkles } from "lucide-react"
import { analyzeHazmatPlacard, type AnalyzeHazmatPlacardOutput } from "@/ai/flows/analyze-hazmat-placard"
import { generateImage } from "@/ai/flows/generate-image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { HazmatClass } from "@/data/emergency-response/hazmat-classes"

const classIcons: Record<string, React.ElementType> = {
    '1': Flame,
    '2': Bot,
    '3': Flame,
    '4': Activity,
    '5': Wind,
    '6': Skull,
    '7': Radiation,
    '8': Biohazard,
    '9': CircleDot
};

const PlacardImageGenerator = ({ detail }: { detail: AnalyzeHazmatPlacardOutput }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const prompt = `Generate a high-resolution image of a hazardous material placard for ${detail.placardInfo.className}. The image must be a clean vector safety symbol, ISO 7010 style, with a white background. The central graphic is a ${detail.placardInfo.graphicDescription}. The design must be simple, clear, and instantly recognizable as a safety warning. Do not include any text or numbers on the placard itself.`;
            const result = await generateImage({ prompt });
            setImageUrl(result.imageUrl);
        } catch (e) {
            console.error(e);
            setError("Image generation failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (imageUrl) {
        return (
            <div className="relative aspect-square w-full max-w-xs mx-auto">
                <Image src={imageUrl} alt={`Generated placard for ${detail.materialName}`} fill className="object-contain" />
            </div>
        )
    }

    return (
        <Card className="bg-muted/50 text-center p-4">
            <CardContent className="flex flex-col items-center justify-center gap-4 pt-6">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Generate an AI image of this placard for a visual reference.</p>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <Button onClick={handleGenerateImage} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                    {isLoading ? 'Generating...' : 'Generate Placard Image'}
                </Button>
            </CardContent>
        </Card>
    );
};
PlacardImageGenerator.displayName = 'PlacardImageGenerator';

const DetailView = React.memo(({ detail }: { detail: AnalyzeHazmatPlacardOutput }) => {
    const Icon = classIcons[detail.placardInfo.className.charAt(6)] || ShieldAlert;
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                        <span>UN {detail.unID}: {detail.materialName}</span>
                        <span className="text-sm font-medium text-muted-foreground">ERG #{detail.ergGuideNumber}</span>
                    </CardTitle>
                    <CardDescription className="pt-2 space-y-2">
                        <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{detail.placardInfo.className}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                             <Info className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                             <span className="text-muted-foreground">{detail.placardInfo.graphicDescription}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>

            <PlacardImageGenerator detail={detail} />

            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{detail.immediateSafetyActions.title}</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        {detail.immediateSafetyActions.checklist.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader><CardTitle className="text-lg">{detail.publicSafetyDistances.title}</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground/90">Initial Isolation:</strong> {detail.publicSafetyDistances.initialIsolation}</p>
                    <p><strong className="text-foreground/90">Evacuation (Spill):</strong> {detail.publicSafetyDistances.evacuation_Spill}</p>
                    <p><strong className="text-foreground/90">Evacuation (Fire):</strong> {detail.publicSafetyDistances.evacuation_Fire}</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle className="text-lg">{detail.potentialHazards.title}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-foreground/90 mb-1">Health Hazards</h4>
                        <p className="text-muted-foreground">{detail.potentialHazards.health}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold text-destructive mb-1">Fire or Explosion Hazards</h4>
                        <p className="text-muted-foreground">{detail.potentialHazards.fireOrExplosion}</p>
                     </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-lg">{detail.emergencyResponse.title}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-foreground/90 mb-1">First Aid</h4>
                        <p className="text-muted-foreground">{detail.emergencyResponse.firstAid}</p>
                     </div>
                     <div>
                        <h4 className="font-semibold text-foreground/90 mb-1">Fire Fighting</h4>
                        <p className="text-muted-foreground">{detail.emergencyResponse.fireFighting}</p>
                     </div>
                </CardContent>
            </Card>
        </div>
    )
});
DetailView.displayName = 'DetailView';

export const HazmatClient = React.memo(function HazmatClient({
    hazmatClasses
} : {
    hazmatClasses: HazmatClass[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [searchResult, setSearchResult] = React.useState<AnalyzeHazmatPlacardOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search')

  const handleSearch = React.useCallback(async (query?: string) => {
    const term = query || searchTerm;
    if (!term) return;

    setIsLoading(true);
    setError(null);
    setSearchResult(null);
    try {
        const result = await analyzeHazmatPlacard({ unID: term });
        setSearchResult(result);
    } catch (e) {
        console.error(e);
        setError(`Failed to retrieve data for '${term}'. Please check the ID or material name and try again. The AI model may be unavailable.`);
    } finally {
        setIsLoading(false);
    }
  }, [searchTerm])

  React.useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch)
      handleSearch(initialSearch)
    }
  }, [initialSearch, handleSearch])


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  }

  const handleClassClick = (exampleID: string) => {
    setSearchTerm(exampleID);
    handleSearch(exampleID);
  }

  return (
    <div className="space-y-6">
        <form onSubmit={handleFormSubmit}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                placeholder="Search by UN/NA number (e.g., 1203) or material name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                />
            </div>
        </form>

        {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <h3 className="mt-4 text-lg font-medium">AI is Analyzing Placard...</h3>
              <p className="mt-1 text-sm text-muted-foreground">This may take a moment.</p>
            </div>
        )}

        {error && (
             <Alert variant="destructive" className="my-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {searchResult && (
            <DetailView detail={searchResult} />
        )}
        
        {!isLoading && !searchResult && (
            <div className="grid md:grid-cols-3 gap-4">
                {hazmatClasses.map((item) => {
                    const Icon = classIcons[item.classNumber] || ShieldAlert;
                    return (
                        <Card key={item.classNumber} className="hover:border-primary transition-colors group cursor-pointer" onClick={() => handleClassClick(item.exampleID)}>
                            <CardHeader>
                                <Icon className="w-8 h-8 text-primary mb-2" />
                                <CardTitle>Class {item.classNumber}: {item.name}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xs font-semibold uppercase text-muted-foreground">Placard Appearance</h4>
                                        <p className="text-sm text-foreground/90">{item.graphicDescription}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground p-2 bg-muted/50 rounded-md">Example: Click to look up <span className="font-semibold">{item.exampleName} ({item.exampleID})</span></p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )}
    </div>
  );
});
