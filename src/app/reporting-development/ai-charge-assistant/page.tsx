
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChargingStrategy } from "@/components/ChargingStrategy";
import { suggestChargesEnhanced } from "@/ai/flows/suggest-charges-enhanced";
import { 
  Gavel, 
  FileText, 
  AlertTriangle, 
  Upload, 
  MapPin, 
  Clock, 
  Users, 
  History,
  Sparkles,
  Brain,
  Scale,
  Target
} from "lucide-react";

interface Evidence {
  id: string;
  description: string;
  type: 'physical' | 'digital' | 'witness' | 'documentary';
}

export default function AIChargeAssistantPage() {
  const [narrative, setNarrative] = useState('');
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [newEvidence, setNewEvidence] = useState({ description: '', type: 'physical' as const });
  const [location, setLocation] = useState('');
  const [timeFactors, setTimeFactors] = useState('');
  const [witnesses, setWitnesses] = useState<string[]>(['']);
  const [suspectHistory, setSuspectHistory] = useState('');
  const [analysisMode, setAnalysisMode] = useState<'basic' | 'comprehensive' | 'court-ready'>('comprehensive');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addEvidence = () => {
    if (newEvidence.description.trim()) {
      setEvidence([...evidence, { 
        id: Date.now().toString(), 
        ...newEvidence 
      }]);
      setNewEvidence({ description: '', type: 'physical' });
    }
  };

  const removeEvidence = (id: string) => {
    setEvidence(evidence.filter(e => e.id !== id));
  };

  const addWitness = () => {
    setWitnesses([...witnesses, '']);
  };

  const updateWitness = (index: number, value: string) => {
    const updated = [...witnesses];
    updated[index] = value;
    setWitnesses(updated);
  };

  const removeWitness = (index: number) => {
    setWitnesses(witnesses.filter((_, i) => i !== index));
  };

  const handleAnalysis = async () => {
    if (!narrative.trim()) return;

    setIsLoading(true);
    try {
      const result = await suggestChargesEnhanced({
        narrative,
        evidenceDescriptions: evidence.map(e => `${e.type}: ${e.description}`),
        location: location || undefined,
        timeFactors: timeFactors || undefined,
        witnesses: witnesses.filter(w => w.trim()) || undefined,
        suspectHistory: suspectHistory || undefined,
        analysisMode
      });
      setResults(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAnalysisModeIcon = (mode: string) => {
    switch (mode) {
      case 'basic': return <Target className="w-4 h-4" />;
      case 'comprehensive': return <Brain className="w-4 h-4" />;
      case 'court-ready': return <Scale className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getAnalysisModeDescription = (mode: string) => {
    switch (mode) {
      case 'basic': return 'Quick charge suggestions based on narrative';
      case 'comprehensive': return 'Detailed analysis with elements, defenses, and strategic considerations';
      case 'court-ready': return 'Full prosecutorial analysis with case law references and trial strategy';
      default: return '';
    }
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      <PageHeader
        title="AI Charge Assistant"
        description="Advanced AI-powered charge analysis with comprehensive case building capabilities."
      />

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Professional Legal Tool</AlertTitle>
        <AlertDescription>
          This enhanced AI assistant provides detailed charge analysis, evidence evaluation, and strategic recommendations. 
          Always consult with prosecutors and legal counsel for final charging decisions.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="narrative" className="text-base font-medium">
                  Incident Narrative *
                </Label>
                <Textarea
                  id="narrative"
                  placeholder="Provide a detailed narrative of the incident, including all relevant facts, circumstances, and observations..."
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  className="min-h-[120px] mt-2"
                />
              </div>

              <Tabs defaultValue="evidence" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                </TabsList>

                <TabsContent value="evidence" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe evidence item..."
                      value={newEvidence.description}
                      onChange={(e) => setNewEvidence({...newEvidence, description: e.target.value})}
                      className="flex-1"
                    />
                    <Select
                      value={newEvidence.type}
                      onValueChange={(value: any) => setNewEvidence({...newEvidence, type: value})}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="digital">Digital</SelectItem>
                        <SelectItem value="witness">Witness</SelectItem>
                        <SelectItem value="documentary">Document</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addEvidence} size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {evidence.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 border rounded">
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                        <span className="flex-1 text-sm">{item.description}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvidence(item.id)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <div>
                    <Label htmlFor="location">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location Details
                    </Label>
                    <Textarea
                      id="location"
                      placeholder="Address, jurisdiction, property type, special circumstances..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeFactors">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time Factors
                    </Label>
                    <Textarea
                      id="timeFactors"
                      placeholder="Time of day, duration, sequence of events, deadlines..."
                      value={timeFactors}
                      onChange={(e) => setTimeFactors(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="witnesses" className="space-y-4">
                  <div>
                    <Label>
                      <Users className="w-4 h-4 inline mr-1" />
                      Witness Information
                    </Label>
                    <div className="space-y-2 mt-2">
                      {witnesses.map((witness, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Witness statement or observation..."
                            value={witness}
                            onChange={(e) => updateWitness(index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeWitness(index)}
                            className="h-9 w-9 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={addWitness}>
                        Add Witness
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="background" className="space-y-4">
                  <div>
                    <Label htmlFor="suspectHistory">
                      <History className="w-4 h-4 inline mr-1" />
                      Suspect Criminal History
                    </Label>
                    <Textarea
                      id="suspectHistory"
                      placeholder="Relevant prior convictions, pending charges, probation status..."
                      value={suspectHistory}
                      onChange={(e) => setSuspectHistory(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                Analysis Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Analysis Depth</Label>
                <Select
                  value={analysisMode}
                  onValueChange={(value: any) => setAnalysisMode(value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Basic Analysis
                      </div>
                    </SelectItem>
                    <SelectItem value="comprehensive">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Comprehensive
                      </div>
                    </SelectItem>
                    <SelectItem value="court-ready">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4" />
                        Court-Ready
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {getAnalysisModeDescription(analysisMode)}
                </p>
              </div>

              <Button
                onClick={handleAnalysis}
                disabled={!narrative.trim() || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    {getAnalysisModeIcon(analysisMode)}
                    Generate Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Case Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Evidence Items:</span>
                <Badge variant="secondary">{evidence.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Witnesses:</span>
                <Badge variant="secondary">{witnesses.filter(w => w.trim()).length}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Narrative Length:</span>
                <Badge variant="secondary">{narrative.length} chars</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="mt-8">
          <ChargingStrategy results={results} />
        </div>
      )}
    </div>
  );
}
