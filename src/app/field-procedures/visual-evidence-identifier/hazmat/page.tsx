
'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Camera, AlertTriangle, ShieldAlert as ShieldAlertIcon, Wind, Flame, Skull, Biohazard, Activity, Radiation, CircleDot, Info, Bot } from 'lucide-react';
import { identifyHazmatPlacardFromImage, type IdentifyHazmatPlacardOutput } from '@/ai/flows/identify-hazmat-placard';
import Image from 'next/image';

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


function HazmatResult({ result }: { result: IdentifyHazmatPlacardOutput }) {
  if (result.materialName === "Invalid or Unknown ID" || result.materialName === "Not Found") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Unable to Identify Placard</AlertTitle>
        <AlertDescription>
            The AI could not confidently identify a valid HAZMAT placard from the image. Please try again with a clearer, more direct photo of the placard.
        </AlertDescription>
      </Alert>
    )
  }

  const Icon = classIcons[result.placardInfo.className.charAt(6)] || ShieldAlertIcon;

  return (
    <div className="space-y-6 animate-fade-in-up">
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>UN {result.unID}: {result.materialName}</span>
                    <span className="text-sm font-medium text-muted-foreground">ERG #{result.ergGuideNumber}</span>
                </CardTitle>
                <CardDescription className="pt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{result.placardInfo.className}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                         <Info className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                         <span className="text-muted-foreground">{result.placardInfo.graphicDescription}</span>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>

        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{result.immediateSafetyActions.title}</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    {result.immediateSafetyActions.checklist.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </AlertDescription>
        </Alert>
    </div>
  )
}

export default function HazmatIdentifierPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyHazmatPlacardOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      try {
        const response = await identifyHazmatPlacardFromImage({ imageDataUri: base64data });
        setResult(response);
      } catch (err) {
        console.error('HAZMAT Identification Error:', err);
        setError('The AI model failed to analyze the image. Please try again with a clearer picture of the placard.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError("Failed to read the image file.");
        setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader
        title="HAZMAT Placard Identifier"
        description="Upload an image of a HAZMAT placard to get immediate ERG safety information."
      />

       <Alert variant="destructive">
            <ShieldAlertIcon className="h-4 w-4" />
            <AlertTitle>For Emergency Reference Only</AlertTitle>
            <AlertDescription>
                This tool is for quick identification in the field. Always confirm with the official Emergency Response Guidebook (ERG) and follow your agency&apos;s HAZMAT protocols.
            </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload Placard Image</CardTitle>
          <CardDescription>For best results, use a clear, front-facing photo of the entire placard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef} 
                className="hidden" 
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                <Camera className="mr-2 h-4 w-4"/>
                Select Image
            </Button>
            {previewUrl && (
                <div className="mt-4 relative w-48 h-48 border rounded-md">
                    <Image src={previewUrl} alt="HAZMAT placard preview" layout="fill" objectFit="contain" className="rounded-md" />
                </div>
            )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleAnalyze} disabled={!imageFile || isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                {isLoading ? 'Analyzing...' : 'Identify Placard'}
            </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Analysis Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && <HazmatResult result={result} />}
    </div>
  );
}
