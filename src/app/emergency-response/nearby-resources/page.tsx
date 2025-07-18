
'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useGeolocation } from '@/hooks/use-geolocation';
import { Loader2, Hospital, Building, AlertTriangle, ShieldCheck, Link as LinkIcon, Handcuffs, Baby } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const resourceTypes = [
  { name: 'Hospitals', icon: Hospital, query: 'hospital' },
  { name: 'Trauma Centers', icon: AlertTriangle, query: 'trauma center' },
  { name: 'Courthouses', icon: Building, query: 'courthouse' },
  { name: 'County Jails', icon: Handcuffs, query: 'county jail' },
  { name: 'Juvenile Assessment Centers', icon: Baby, query: 'juvenile assessment center' },
  { name: 'Police Departments', icon: ShieldCheck, query: 'police department' },
];

export default function NearbyResourcesPage() {
  const { position, error, isLoading, hasPermission, requestPermission } = useGeolocation();

  const handleResourceClick = (query: string) => {
    if (position) {
      const { latitude, longitude } = position.coords;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}+near+${latitude},${longitude}`;
      window.open(mapsUrl, '_blank');
    }
  };

  if (!hasPermission) {
    return (
      <div className="animate-fade-in-up">
        <PageHeader
          title="Nearby Resources"
          description="Find essential facilities near your current location."
        />
        <Card>
          <CardHeader>
            <CardTitle>🛡️ Enable Critical Field Intelligence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide instant, location-specific tactical information, Shield FL needs to access your current location.
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
              <li>✅ Map the nearest hospitals, trauma centers, and jails.</li>
              <li>✅ One-tap directions to essential facilities.</li>
              <li>✅ Enhance your situational awareness in unfamiliar areas.</li>
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

  if (isLoading) {
    return (
      <div className="animate-fade-in-up">
        <PageHeader
          title="Nearby Resources"
          description="Finding essential facilities near your current location."
        />
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in-up">
        <PageHeader
          title="Nearby Resources"
          description="Find essential facilities near your current location."
        />
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Nearby Resources"
        description="Find essential facilities near your current location."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resourceTypes.map(({ name, icon: Icon, query }) => (
            <Card key={name} className="hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleResourceClick(query)} className="w-full">
                  <LinkIcon className="mr-2 h-4 w-4" /> Find Nearest
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
