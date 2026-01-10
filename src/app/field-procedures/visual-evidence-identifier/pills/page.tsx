'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Camera, Pill as PillIcon, AlertTriangle, Info, ShieldAlert, Microscope, Scale, BookUser } from 'lucide-react';
import { identifyPill, type IdentifyPillOutput } from '@/ai/flows/identify-pill';
import Image from 'next/image';

function PillResult({ result }: { result: IdentifyPillOutput }) {
  const { identification, disclaimer } = result;

  if (identification.primaryIdentification.substanceName.startsWith("Unable to identify")) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Unable to Identify</AlertTitle>
        <AlertDescription>
          {identification.primaryIdentification.reasoning || "The AI could not confidently identify the substance from the provided image. This could be due to a poor quality image, a non-standard pill, or an illicit substance. Do not ingest."}
        </AlertDescription>
      </Alert>
    )
  }

  const {
    primaryIdentification,
    alternativeIdentifications,
    physicalCharacteristics,
    legalClassification,
    fieldSafetyNotes,
    recommendedActions,
    testingRecommendations,
    warningFlags
  } = identification;

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PillIcon className="h-6 w-6 text-primary"/>
            {primaryIdentification.substanceName}
        </CardTitle>
        <CardDescription>
            Confidence: {primaryIdentification.confidence}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <h3 className="font-semibold text-foreground/90">Reasoning</h3>
            <p className="text-muted-foreground">{primaryIdentification.reasoning}</p>
        </div>
        {warningFlags.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning Flags</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {warningFlags.map((flag, i) => <li key={i}>{flag}</li>)}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h3 className="font-semibold text-foreground/90 mb-2">Physical Characteristics</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li><strong>Shape:</strong> {physicalCharacteristics.shape}</li>
                    <li><strong>Color:</strong> {physicalCharacteristics.color}</li>
                    <li><strong>Size:</strong> {physicalCharacteristics.size}</li>
                    <li><strong>Markings:</strong> {physicalCharacteristics.markings}</li>
                    <li><strong>Texture:</strong> {physicalCharacteristics.texture}</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-foreground/90 mb-2 flex items-center gap-2"><Scale /> Legal Classification</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li><strong>Controlled:</strong> {legalClassification.controlledSubstance ? 'Yes' : 'No'}</li>
                    {legalClassification.schedule && <li><strong>Schedule:</strong> {legalClassification.schedule}</li>}
                    {legalClassification.flStatute && <li><strong>FL Statute:</strong> {legalClassification.flStatute}</li>}
                </ul>
            </div>
        </div>

        {alternativeIdentifications.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground/90 mb-2">Alternative Identifications</h3>
            <div className="space-y-2">
              {alternativeIdentifications.map((alt, i) => (
                <div key={i} className="p-2 border rounded-md">
                  <p className="font-semibold">{alt.substanceName} <span className="text-muted-foreground font-normal">(Confidence: {alt.confidence})</span></p>
                  <p className="text-sm text-muted-foreground">{alt.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
            <h3 className="font-semibold text-foreground/90 mb-2 flex items-center gap-2"><ShieldAlert /> Field Safety Notes</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {fieldSafetyNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/90 mb-2 flex items-center gap-2"><Microscope /> Testing Recommendations</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {testingRecommendations.fieldTest && <li><strong>Field Test:</strong> {testingRecommendations.fieldTest}</li>}
                <li><strong>Lab Analysis:</strong> {testingRecommendations.labAnalysis ? 'Recommended' : 'Not Recommended'}</li>
                <li><strong>Preservation:</strong> {testingRecommendations.preservationInstructions}</li>
            </ul>
        </div>
        <div>
            <h3 className="font-semibold text-foreground/90 mb-2 flex items-center gap-2"><BookUser /> Recommended Actions</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
            </ul>
        </div>

        <Alert>
            <Info className="h-4 w-4"/>
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
                {disclaimer}
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default function PillIdentifierPage() {
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

  const validateImageQuality = (file: File): string | null => {
    // Check file size (should be reasonable but not too small)
    if (file.size < 10000) { // Less than 10KB might be too small
      return "Image file is too small. Please use a higher quality image.";
    }
    if (file.size > 10000000) { // More than 10MB might be too large
      return "Image file is too large. Please use a smaller image.";
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return "Please select a valid image file.";
    }
    
    return null;
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    
    // Validate image quality
    const validationError = validateImageQuality(imageFile);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      const base64Image = base64data.split(',')[1];
      try {
        const response = await identifyPill({ imageBase64: base64Image });
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
        title="Pill & Substance Identifier"
        description="Upload an image of an unknown pill for AI-powered field identification."
      />

       <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>For Field Identification Only</AlertTitle>
            <AlertDescription>
                This tool is for preliminary identification and training purposes. It is NOT a substitute for a laboratory test. Do not taste or consume any unknown substance.
            </AlertDescription>
        </Alert>

        <Alert>
            <Camera className="h-4 w-4" />
            <AlertTitle>Image Quality Tips</AlertTitle>
            <AlertDescription>
                For best results: Use good lighting, ensure the pill is in focus, capture any text/numbers clearly, and include the entire pill in the frame. Avoid blurry or dark images.
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
                    <Image src={previewUrl} alt="Pill preview" layout="fill" objectFit="contain" className="rounded-md" />
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
