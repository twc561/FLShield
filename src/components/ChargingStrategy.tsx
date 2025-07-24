
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Scale, 
  Target, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Gavel,
  Users,
  FileText,
  TrendingUp
} from "lucide-react"

interface ChargingStrategyProps {
  results: any // Replace with your enhanced results type
}

export function ChargingStrategy({ results }: ChargingStrategyProps) {
  const [selectedCharge, setSelectedCharge] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'strategy' | 'elements' | 'timeline'>('strategy')

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Strong': return 'bg-green-500'
      case 'Moderate': return 'bg-yellow-500'
      case 'Weak': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStrengthScore = (strength: string) => {
    switch (strength) {
      case 'Strong': return 85
      case 'Moderate': return 65
      case 'Weak': return 35
      default: return 0
    }
  }

  return (
    <div className="space-y-6">
      {/* Prosecution Strategy Overview */}
      <Card className="border-2 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Prosecution Strategy Matrix
          </CardTitle>
          <CardDescription>
            Comprehensive charging strategy with case strength analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.primaryCharges?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Primary Charges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {results.alternativeCharges?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Alternative Charges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {results.enhancementOpportunities?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Enhancements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="elements">Elements Analysis</TabsTrigger>
          <TabsTrigger value="timeline">Prosecution Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="space-y-4">
          {/* Primary Charges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Primary Charging Recommendations
            </h3>
            {results.primaryCharges?.map((charge: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{charge.statuteTitle}</CardTitle>
                      <CardDescription>F.S. § {charge.statuteNumber} - {charge.degree}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStrengthColor(charge.strengthOfCase)}>
                        {charge.strengthOfCase}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{getStrengthScore(charge.strengthOfCase)}%</div>
                        <div className="text-xs text-muted-foreground">Case Strength</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={getStrengthScore(charge.strengthOfCase)} className="mb-4" />
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-1">Legal Justification:</h5>
                      <p className="text-sm text-muted-foreground">{charge.justification}</p>
                    </div>
                    
                    {charge.requiredElements && (
                      <div>
                        <h5 className="font-medium mb-2">Required Elements:</h5>
                        <div className="grid grid-cols-1 gap-1">
                          {charge.requiredElements.map((element: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {element}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {charge.potentialDefenses && charge.potentialDefenses.length > 0 && (
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertTitle>Potential Defense Arguments</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc list-inside text-sm mt-2">
                            {charge.potentialDefenses.map((defense: string, idx: number) => (
                              <li key={idx}>{defense}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhancement Opportunities */}
          {results.enhancementOpportunities && results.enhancementOpportunities.length > 0 && (
            <Card className="border-2 border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Sentence Enhancement Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.enhancementOpportunities.map((enhancement: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        Enhancement
                      </Badge>
                      <span className="text-sm">{enhancement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="elements" className="space-y-4">
          {results.courtReadyPackage?.elementsMatrix && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Elements Analysis Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.courtReadyPackage.elementsMatrix.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{item.element}</h5>
                        <Badge 
                          variant={item.strength === 'Proven' ? 'default' : 
                                  item.strength === 'Likely' ? 'secondary' : 'destructive'}
                        >
                          {item.strength}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.evidence}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Prosecution Timeline & Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.investigationRecommendations && (
                  <div>
                    <h5 className="font-medium mb-2">Immediate Investigation Priorities:</h5>
                    <ul className="space-y-1">
                      {results.investigationRecommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {results.courtReadyPackage?.witnessStrategy && (
                  <div>
                    <h5 className="font-medium mb-2">Witness Strategy:</h5>
                    <ul className="space-y-1">
                      {results.courtReadyPackage.witnessStrategy.map((strategy: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-blue-500" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Risk Assessment for Booking */}
      {results.riskAssessment && (
        <Card className="border-2 border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Risk Assessment & Booking Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.riskAssessment.flightRisk && (
                <div>
                  <div className="text-sm font-medium">Flight Risk</div>
                  <Badge className={
                    results.riskAssessment.flightRisk === 'High' ? 'bg-red-500' :
                    results.riskAssessment.flightRisk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }>
                    {results.riskAssessment.flightRisk}
                  </Badge>
                </div>
              )}
              {results.riskAssessment.publicSafetyRisk && (
                <div>
                  <div className="text-sm font-medium">Public Safety Risk</div>
                  <Badge className={
                    results.riskAssessment.publicSafetyRisk === 'High' ? 'bg-red-500' :
                    results.riskAssessment.publicSafetyRisk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }>
                    {results.riskAssessment.publicSafetyRisk}
                  </Badge>
                </div>
              )}
              {results.riskAssessment.recommendedBond && (
                <div>
                  <div className="text-sm font-medium">Recommended Bond</div>
                  <div className="font-semibold">{results.riskAssessment.recommendedBond}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
