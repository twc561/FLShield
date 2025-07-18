
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useGeolocation } from '@/hooks/use-geolocation';
import { Loader2, Hospital, Building, Shield, Scale, HeartHandshake, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { findNearbyResources, type Resource } from '@/ai/flows/find-nearby-resources';
import Link from 'next/link';

const resourceIcons: { [key: string]: React.ElementType } = {
  'County Sheriff Office': Shield,
  'Local Police Department': Shield,
  'State Highway Patrol Station': Shield,
  'County Courthouse': Scale,
  'Victim Advocacy Center': HeartHandshake,
  'Baker Act Receiving Facility': Hospital,
};

const ResourceResults = ({ resources }: { resources: Resource[] }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {resources.map((resource) => {
        const Icon = resourceIcons[resource.type] || Building;
        return (
          <Card key={resource.name}>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary mt-1" />
                <span>{resource.name}</span>
              </CardTitle>
              <CardDescription>{resource.type}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>{resource.address}</p>
              <p>
                <Link href={`tel:${resource.phone}`} className="text-primary hover:underline">
                  {resource.phone}
                </Link>
              </p>
              {resource.distance && (
                <p className="text-xs text-muted-foreground">{resource.distance} miles away</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default function NearbyResourcesPage() {
  const { position, error: geoError, isLoading: isGeoLoading, hasPermission, requestPermission } = useGeolocation();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (position) {
      handleFindResources(position.coords.latitude, position.coords.longitude);
    }
  }, [position]);

  const handleFindResources = async (latitude: number, longitude: number) => {
    setIsAiLoading(true);
    setAiError(null);
    setResources(null);
    try {
      const data = await findNearbyResources({ latitude, longitude });
      setResources(data.resources);
    } catch (err) {
      console.error(err);
      setAiError('AI analysis failed. Could not find nearby resources.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const isLoading = isGeoLoading || isAiLoading;

  const renderContent = () => {
    if (!hasPermission) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Enable Location Access</CardTitle>
            <CardDescription>This feature requires your location to find nearby resources.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={requestPermission}>Grant Permission</Button>
          </CardFooter>
        </Card>
      );
    }

    if (geoError) {
      return <p className="text-destructive">{geoError}</p>;
    }

    if (isLoading) {
      return (
        <div className="text-center py-10">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            {isGeoLoading ? 'Acquiring your location...' : 'Finding nearby resources...'}
          </p>
        </div>
      );
    }

    if (aiError) {
      return <p className="text-destructive">{aiError}</p>;
    }

    if (resources) {
      return <ResourceResults resources={resources} />;
    }

    return <p>Use the button above to start a search.</p>;
  };
  
  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader
        title="Nearby Resources Checkpoint"
        description="Find the closest law enforcement and support facilities based on your current location."
      />
      {renderContent()}
    </div>
  );
}
