
'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Camera, Pill, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { identifyPillFromImage, type IdentifyPillOutput } from '@/ai/flows/identify-pill';
import Image from 'next/image';

function PillResult({ result }: { result: IdentifyPillOutput }) {
  if (result.drugName === "Unknown") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Unable to Identify</AlertTitle>
        <AlertDescription>
            The AI could not confidently identify the substance from the provided image and description. This could be due to a poor quality image, a non-standard pill, or an illicit substance. Do not ingest.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary"/>
            {result.drugName}
        </CardTitle>
        <CardDescription>
            Visual Description: {result.visualDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h3 className="font-semibold text-foreground/90">Primary Use</h3>
            <p className="text-muted-foreground">{result.primaryUse}</p>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/90">Key Warnings / Side Effects</h3>
            <p className="text-muted-foreground">{result.keyWarnings}</p>
        </div>
        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>Source Information</AlertTitle>
            <AlertDescription>
                This information was summarized by AI from publicly available data from sources like Drugs.com, WebMD, and the NLM.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default function VisualEvidenceIdentifierPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyPillOutput | null>(null);
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
        const response = await identifyPillFromImage({ imageDataUri: base64data });
        setResult(response);
      } catch (err) {
        console.error('Pill Identification Error:', err);
        setError('The AI model failed to analyze the image. Please try again with a clearer picture.');
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
        title="Visual Evidence Identifier"
        description="Upload an image of an unknown pill for AI-powered field identification."
      />

       <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>For Field Identification Only</AlertTitle>
            <AlertDescription>
                This tool is for preliminary identification and training purposes. It is NOT a substitute for a laboratory test. Do not taste or consume any unknown substance.
            </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload Pill Image</CardTitle>
          <CardDescription>For best results, use a clear photo with the pill on a neutral background, showing any imprints.</CardDescription>
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
                    <Image src={previewUrl} alt="Pill preview" layout="fill" objectFit="cover" className="rounded-md" />
                </div>
            )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleAnalyze} disabled={!imageFile || isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                {isLoading ? 'Analyzing...' : 'Identify Pill'}
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

      {result && <PillResult result={result} />}

    </div>
  );
}
