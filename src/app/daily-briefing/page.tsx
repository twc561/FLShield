'use client'

import { useState, useMemo } from 'react'
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BriefingStats } from "@/components/BriefingStats"
import Link from 'next/link'
import { Search, Calendar, Clock, Target, CheckCircle2, PlayCircle, BookOpen, Crown } from 'lucide-react'
import { dailyRollCallModules } from "@/data/daily-roll-call"
import { categories } from "@/data/daily-briefing"
import { useSubscription } from "@/hooks/use-subscription"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DailyBriefingPage() {
  const { isPro } = useSubscription()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Block access for non-pro users
  if (!isPro) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Premium Feature</CardTitle>
            <CardDescription>
              Daily Briefing Archive requires a Shield FL Pro subscription to access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/subscription">
                  Upgrade to Pro - $9.99/month
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

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


/>

      {/* Search and Filter Controls */}
      <div className="bg-card rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search modules by title, content, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <span className="mr-1">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Modules Grid */}
          <div className="space-y-6">
            {categories.map((category) => (
              <TabsContent key={category.id} value={selectedCategory} className="m-0">
                {(selectedCategory === 'all' || selectedCategory === category.id) && 
                 filteredModules.filter(module => selectedCategory === 'all' || module.category === category.id).length > 0 && (
                  <div className="space-y-4">
                    {selectedCategory === 'all' && (
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-xl font-semibold text-card-foreground">{category.name}</h2>
                        <Badge variant="secondary" className="ml-auto">
                          {filteredModules.filter(m => m.category === category.id).length} modules
                        </Badge>
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredModules && filteredModules.map((module) => {
                          const completionStatus = getCompletionStatus(module.id);

                          return (
                            <Card key={module.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 relative">
                              <div className="absolute top-2 right-2 z-20">
                                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Pro
                                </Badge>
                              </div>
                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{module.categoryIcon}</span>
                                    <Badge 
                                      variant="outline" 
                                      className={categoryColors[module.category]}
                                    >
                                      {categories.find(c => c.id === module.category)?.name}
                                    </Badge>
                                  </div>
                                  {completionStatus === 'completed' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                  )}
                                </div>
                                <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">{module.hook}</p>

                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(module.dateCreated).toLocaleDateString()}
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {module.difficulty}
                                  </Badge>
                                </div>

                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-4"
                                  onClick={() => window.location.href = `/daily-briefing/${module.id}`}
                                >
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  {completionStatus === 'completed' ? 'Review Module' : 'Start Module'}
                                </Button>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}

            {filteredModules.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No modules found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search terms or selected category.</p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}