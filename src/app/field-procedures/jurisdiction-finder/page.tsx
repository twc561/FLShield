
'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useGeolocation } from '@/hooks/use-geolocation';
import { Loader2, MapPin, Building, Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getJurisdictionInfo, type GetJurisdictionOutput } from '@/ai/flows/get-jurisdiction-info';
import Link from 'next/link';

const JurisdictionResultDisplay = ({ data }: { data: GetJurisdictionOutput }) => (
  <Card className="animate-fade-in-up">
    <CardHeader>
      <CardTitle>Jurisdictional Analysis</CardTitle>
      <CardDescription>Based on your current location.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>County:</strong> {data.county}</p>
      <p><strong>Primary LE Jurisdiction:</strong> {data.lawEnforcementJurisdiction}</p>
      <p><strong>Judicial Circuit:</strong> {data.judicialCircuit}</p>
      <p><strong>Appellate District:</strong> {data.appellateDistrict}</p>
    </CardContent>
    <CardFooter>
      <Button asChild>
        <Link href={`/legal-reference/local-ordinances-guide?search=${data.city}`}>
          <Search className="mr-2 h-4 w-4" />
          Search {data.city} Ordinances
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function JurisdictionFinderPage() {
  const { position, error, isLoading: isGeoLoading, hasPermission, requestPermission } = useGeolocation();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [jurisdictionData, setJurisdictionData] = useState<GetJurisdictionOutput | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAnalyzeLocation = async () => {
    if (!position) return;
    setIsAiLoading(true);
    setAiError(null);
    setJurisdictionData(null);
    try {
      const { latitude, longitude } = position.coords;
      const data = await getJurisdictionInfo({ latitude, longitude });
      setJurisdictionData(data);
    } catch (err) {
      console.error(err);
      setAiError('AI analysis failed. Could not determine jurisdiction.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const isLoading = isGeoLoading || isAiLoading;

  if (!hasPermission) {
    return (
      <div className="animate-fade-in-up">
        <PageHeader
          title="Jurisdiction Finder"
          description="Instantly identify your current jurisdiction and access local ordinances."
        />
        <Card>
          <CardHeader>
            <CardTitle>🛡️ Enable Critical Field Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide instant, location-specific legal and tactical information, Shield FL needs to access your current location.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
              <li>✅ Instantly identify your current jurisdiction and access local ordinances.</li>
              <li>✅ Pinpoint the correct Judicial Circuit for reports and procedures.</li>
              <li>✅ Map the nearest hospitals, courthouses, and partner agencies.</li>
            </ul>
             <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                    <span className="font-bold">🔒 Security & Privacy Assurance:</span> Your location is processed on-device for immediate use only. It is never tracked, stored, or shared.
                </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={requestPermission} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Enable Location
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader
        title="Jurisdiction Finder"
        description="Instantly identify your current jurisdiction and access local ordinances."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
          <CardDescription>Use your device's GPS to analyze your current jurisdiction.</CardDescription>
        </CardHeader>
        <CardContent>
          {isGeoLoading && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Fetching coordinates...</div>}
          {error && <p className="text-destructive">{error}</p>}
          {position && (
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <p><strong>Latitude:</strong> {position.coords.latitude.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {position.coords.longitude.toFixed(6)}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyzeLocation} disabled={!position || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            {isAiLoading ? 'AI Analyzing...' : 'Analyze Jurisdiction'}
          </Button>
        </CardFooter>
      </Card>
      
      {aiError && <p className="text-destructive">{aiError}</p>}
      {jurisdictionData && <JurisdictionResultDisplay data={jurisdictionData} />}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manual Lookup</CardTitle>
          <CardDescription>Manually search for local ordinances by jurisdiction.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <Label htmlFor="manual-jurisdiction">Jurisdiction</Label>
                <Input id="manual-jurisdiction" placeholder="e.g., Orange County" />
            </div>
        </CardContent>
        <CardFooter>
            <Button asChild>
                <Link href="/legal-reference/local-ordinances-guide">
                    <Search className="mr-2 h-4 w-4" /> Search Ordinances
                </Link>
            </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
