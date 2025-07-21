
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calendar, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { dailyRollCallModules, DailyRollCallModule } from '@/data/daily-roll-call';

export default function DailyBriefingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredModules = dailyRollCallModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.hook.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.rationale.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCompletionStatus = (moduleId: string) => {
    const completionKey = `daily-roll-call-${moduleId}`;
    return localStorage.getItem(completionKey) ? 'completed' : 'not-completed';
  };

  const categoryColors = {
    'legal-update': 'bg-blue-100 text-blue-800 border-blue-200',
    'procedural-refresher': 'bg-green-100 text-green-800 border-green-200',
    'scenario-based': 'bg-purple-100 text-purple-800 border-purple-200',
    'case-law-spotlight': 'bg-red-100 text-red-800 border-red-200',
    'officer-safety': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'legal-update', name: 'Legal Updates', icon: '⚖️' },
    { id: 'procedural-refresher', name: 'Procedural Refreshers', icon: '🧠' },
    { id: 'scenario-based', name: 'Scenario Training', icon: '🎯' },
    { id: 'case-law-spotlight', name: 'Case Law Spotlight', icon: '🛑' },
    { id: 'officer-safety', name: 'Officer Safety', icon: '🛡️' }
  ];

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Daily Briefing Archive"
        description="Review past Daily Roll Call modules and enhance your knowledge with interactive micro-learning content."
      />

      {/* Search and Filter Controls */}
      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search briefings by topic, content, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <span className="mr-1">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {filteredModules.length} Briefing{filteredModules.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((module) => {
            const isCompleted = getCompletionStatus(module.id) === 'completed';
            
            return (
              <Card key={module.id} className={`hover:shadow-lg transition-shadow ${isCompleted ? 'border-green-200 bg-green-50/50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl">{module.categoryIcon}</div>
                      <Badge variant="outline" className={`${categoryColors[module.category]} text-xs`}>
                        {module.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <CardTitle className="text-base leading-tight">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {module.hook}
                  </p>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>Created: {new Date(module.dateCreated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-3 w-3" />
                      <span>Difficulty: {module.difficulty}</span>
                    </div>
                  </div>

                  {/* Mini Preview of Rationale */}
                  <div className="text-xs bg-muted/50 p-2 rounded">
                    <strong>Key Point:</strong> {module.rationale.substring(0, 120)}...
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      {module.deepDiveLinks.length} related resource{module.deepDiveLinks.length !== 1 ? 's' : ''}
                    </span>
                    <Button size="sm" variant="outline">
                      {isCompleted ? 'Review' : 'Start'} Briefing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredModules.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No briefings found</h3>
              <p>Try adjusting your search terms or category filters.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
