"use client"

import { useState } from 'react'
import * as LucideIcons from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { HazmatPlacard } from "@/data/emergency-response/hazmat"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function HazmatClient({ data }: { data: HazmatPlacard[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState<HazmatPlacard | null | undefined>(undefined)

  const handleSearch = () => {
    const found = data.find(p => p.id === searchTerm)
    setResult(found)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>HAZMAT Placard Lookup</CardTitle>
          <CardDescription>Enter the 4-digit UN/NA number from a placard to get instant ERG information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex max-w-sm items-center space-x-2">
            <Input 
              type="text" 
              placeholder="e.g., 1203" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg h-12"
            />
            <Button onClick={handleSearch} className="h-12">
              <LucideIcons.Search className="mr-2 h-4 w-4" /> Look Up
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== undefined && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>{result ? `Result for UN/NA ${result.id}: ${result.name}` : 'Placard Not Found'}</CardTitle>
            <CardDescription>{result ? `Guide Number: ${result.guideNumber}` : 'No information available for the entered number.'}</CardDescription>
          </CardHeader>
          {result && (
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <LucideIcons.Flame className="h-4 w-4" />
                <AlertTitle>Potential Hazards</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.hazards.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
              <Alert>
                <LucideIcons.ShieldCheck className="h-4 w-4" />
                <AlertTitle>Public Safety / Evacuation</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.publicSafety.map((ps, i) => <li key={i}>{ps}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
              <Alert>
                <LucideIcons.HeartPulse className="h-4 w-4" />
                <AlertTitle>Emergency Response / First Aid</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.emergencyResponse.map((er, i) => <li key={i}>{er}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}
