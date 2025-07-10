
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Camera, AlertTriangle, ShieldAlert as ShieldAlertIcon, Gavel, ExternalLink, Swords } from 'lucide-react';
import { identifyWeaponFromImage, type IdentifyWeaponOutput } from '@/ai/flows/identify-weapon';
import Image from 'next/image';

function WeaponResult({ result }: { result: IdentifyWeaponOutput }) {
  if (!result.itemType || result.itemType === "Unknown") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Unable to Identify</AlertTitle>
        <AlertDescription>
            The AI could not confidently identify the item from the image. This could be an unusual item or a poor quality image.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Swords className="h-6 w-6 text-primary"/>
            Identified Item: {result.itemType}
        </CardTitle>
        <CardDescription>
            {result.notes}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {result.make && (
            <div className="grid grid-cols-2 gap-4 text-sm">
                 <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground/90">Make</p>
                    <p className="text-muted-foreground">{result.make}</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground/90">Model</p>
                    <p className="text-muted-foreground">{result.model}</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground/90">Caliber/Gauge</p>
                    <p className="text-muted-foreground">{result.caliber}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground/90">Standard Capacity</p>
                    <p className="text-muted-foreground">{result.standardMagazineCapacity}</p>
                </div>
            </div>
        )}
         {result.commonVariants && result.commonVariants.length > 0 && (
            <div>
                 <h3 className="font-semibold text-foreground/90 text-sm">Common Variants</h3>
                 <div className="flex flex-wrap gap-2 mt-2">
                    {result.commonVariants.map(variant => (
                        <span key={variant} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                            {variant}
                        </span>
                    ))}
                 </div>
            </div>
        )}
        <div>
            <h3 className="font-semibold text-foreground/90">Potentially Relevant Florida Statutes</h3>
            {result.relevantStatutes.length > 0 ? (
                <ul className="list-none space-y-2 mt-2">
                    {result.relevantStatutes.map((statute) => (
                        <li key={statute.statuteNumber}>
                             <Button asChild variant="secondary" className="w-full justify-start text-left h-auto py-2">
                                <Link href={`/legal-reference/statutes?search=${statute.statuteNumber}`}>
                                    <Gavel className="mr-3 h-4 w-4 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">{statute.statuteNumber}</p>
                                        <p className="text-xs font-normal text-muted-foreground">{statute.title}</p>
                                    </div>
                                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">No specific statutes were identified for this item type.</p>
            )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function WeaponIdentifierPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentifyWeaponOutput | null>(null);
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
        const response = await identifyWeaponFromImage({ imageDataUri: base64data });
        setResult(response);
      } catch (err) {
        console.error('Weapon Identification Error:', err);
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
        title="Weapon & Ammunition Identifier"
        description="Upload an image of a weapon to get AI-powered classification and links to relevant Florida statutes."
      />

       <Alert variant="destructive">
            <ShieldAlertIcon className="h-4 w-4" />
            <AlertTitle>For Training & Reference Only</AlertTitle>
            <AlertDescription>
                This tool provides AI-based suggestions and is NOT a definitive legal determination. All weapons should be treated as real and loaded until proven safe by a qualified individual.
            </AlertDescription>
        </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload Weapon Image</CardTitle>
          <CardDescription>For best results, use a clear, side-profile photo of the weapon on a neutral background.</CardDescription>
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
                    <Image src={previewUrl} alt="Weapon preview" layout="fill" objectFit="contain" className="rounded-md" />
                </div>
            )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleAnalyze} disabled={!imageFile || isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
                {isLoading ? 'Analyzing...' : 'Identify Weapon'}
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

      {result && <WeaponResult result={result} />}

    </div>
  );
}
