"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Scenario } from "@/data/field-procedures/scenario-checklists"
import * as LucideIcons from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioWalkthrough } from "./ScenarioWalkthrough"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ScenarioChecklistsClient = React.memo(function ScenarioChecklistsClient({
  initialScenarios,
  groupedScenarios,
  categoryOrder,
}: {
  initialScenarios: Scenario[]
  groupedScenarios: Record<string, Scenario[]>
  categoryOrder: string[]
}) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedScenario, setSelectedScenario] = React.useState<Scenario | null>(null)
  const [openAccordionItem, setOpenAccordionItem] = React.useState<string | undefined>(undefined)

  const [difficultyFilter, setDifficultyFilter] = React.useState<string>("all")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")
  const [completedScenarios, setCompletedScenarios] = React.useState<Set<string>>(new Set())
  const [favoriteScenarios, setFavoriteScenarios] = React.useState<Set<string>>(new Set())
  const [scenarioProgress, setScenarioProgress] = React.useState<Record<string, number>>({})

  // Load user preferences from localStorage
  React.useEffect(() => {
    const completed = localStorage.getItem('completed-scenarios')
    const favorites = localStorage.getItem('favorite-scenarios')
    const progress = localStorage.getItem('scenario-progress')

    if (completed) setCompletedScenarios(new Set(JSON.parse(completed)))
    if (favorites) setFavoriteScenarios(new Set(JSON.parse(favorites)))
    if (progress) setScenarioProgress(JSON.parse(progress))
  }, [])

  const toggleFavorite = (scenarioId: string) => {
    const newFavorites = new Set(favoriteScenarios)
    if (newFavorites.has(scenarioId)) {
      newFavorites.delete(scenarioId)
    } else {
      newFavorites.add(scenarioId)
    }
    setFavoriteScenarios(newFavorites)
    localStorage.setItem('favorite-scenarios', JSON.stringify(Array.from(newFavorites)))
  }

  const markCompleted = (scenarioId: string) => {
    const newCompleted = new Set(completedScenarios)
    newCompleted.add(scenarioId)
    setCompletedScenarios(newCompleted)
    localStorage.setItem('completed-scenarios', JSON.stringify(Array.from(newCompleted)))
  }

  const updateProgress = (scenarioId: string, progress: number) => {
    const newProgress = { ...scenarioProgress, [scenarioId]: progress }
    setScenarioProgress(newProgress)
    localStorage.setItem('scenario-progress', JSON.stringify(newProgress))
  }

  const getDifficultyLevel = (scenario: Scenario): 'Basic' | 'Intermediate' | 'Advanced' => {
    const complexityFactors = [
      scenario.walkthrough ? Object.keys(scenario.walkthrough).length : 0,
      scenario.keyStatutes.length,
      scenario.staticChecklist.reduce((sum, section) => sum + section.items.length, 0)
    ]
    const totalComplexity = complexityFactors.reduce((sum, factor) => sum + factor, 0)

    if (totalComplexity < 15) return 'Basic'
    if (totalComplexity < 25) return 'Intermediate'
    return 'Advanced'
  }

  const filteredScenarios = React.useMemo(() => {
    return initialScenarios.filter(scenario => {
      const matchesSearch = !searchTerm || (
        scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scenario.goal.toLowerCase().includes(searchTerm.toLowerCase())
      )

      const matchesCategory = categoryFilter === "all" || scenario.category === categoryFilter
      const matchesDifficulty = difficultyFilter === "all" || getDifficultyLevel(scenario) === difficultyFilter

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [initialScenarios, searchTerm, categoryFilter, difficultyFilter])

  return (
    <div className="space-y-6">
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search scenarios by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categoryOrder.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Difficulty:</label>
            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All Levels</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600">
              Completed: {completedScenarios.size} | Favorites: {favoriteScenarios.size}
            </span>
          </div>
        </div>
      </div>

      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-2"
        value={openAccordionItem}
        onValueChange={setOpenAccordionItem}
      >
        {categoryOrder
          .filter(category => 
            filteredScenarios.some(s => s.category === category)
          )
          .map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold tracking-tight my-4 px-1">{category}</h2>
              {filteredScenarios
                .filter(s => s.category === category)
                .map((scenario) => {
                  const Icon = (LucideIcons as any)[scenario.icon] || LucideIcons.HelpCircle
                  const isCompleted = completedScenarios.has(scenario.id)
                  const isFavorite = favoriteScenarios.has(scenario.id)
                  const progress = scenarioProgress[scenario.id] || 0
                  const difficulty = getDifficultyLevel(scenario)

                  const getDifficultyColor = (level: string) => {
                    switch(level) {
                      case 'Basic': return 'text-green-600 bg-green-100'
                      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
                      case 'Advanced': return 'text-red-600 bg-red-100'
                      default: return 'text-gray-600 bg-gray-100'
                    }
                  }
                  return (
                    <AccordionItem value={scenario.id} key={scenario.id} className="border rounded-md mb-2 bg-card">
                      <div className="p-4">
                        <div className="flex items-start gap-4 w-full">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center relative">
                            <Icon className="w-6 h-6 text-primary" />
                            {isCompleted && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <AccordionTrigger className="font-semibold text-base p-0 hover:no-underline flex-grow text-left">
                                {scenario.name}
                              </AccordionTrigger>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(scenario.id)
                                }}
                                className={`p-1 rounded-full hover:bg-gray-100 ${
                                  isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                }`}
                              >
                                <LucideIcons.Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                              </button>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                                {difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{scenario.subtitle}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{scenario.goal}</p>
                            {progress > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">{progress}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <AccordionContent className="p-4 pt-0">
                        <div className="border-t pt-4">
                           <Tabs defaultValue="interactive" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="interactive">Interactive Guide</TabsTrigger>
                                <TabsTrigger value="static">Static Checklist</TabsTrigger>
                              </TabsList>
                              <TabsContent value="interactive" className="mt-4">
                                <ScenarioWalkthrough 
                                  scenario={scenario} 
                                  onProgress={(progress) => updateProgress(scenario.id, progress)}
                                  onComplete={() => markCompleted(scenario.id)}
                                />
                              </TabsContent>
                              <TabsContent value="static" className="mt-4">
                                 <div className="space-y-4">
                                    {scenario.staticChecklist?.map((section, index) => {
                                        const SectionIcon = (LucideIcons as any)[section.icon] || Check
                                        return (
                                            <Card key={index} className="bg-muted/50">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-3 text-base">
                                                        <SectionIcon className="w-5 h-5 text-primary" />
                                                        {section.section}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-3">
                                                        {section.items.map((item, i) => (
                                                            <li key={i} className="flex items-start">
                                                                <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                                <span className="text-muted-foreground">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        )
                                    }) || (
                                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                                        <p className="text-muted-foreground">No static checklist available for this scenario.</p>
                                      </div>
                                    )}
                                </div>
                              </TabsContent>
                            </Tabs>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
            </div>
          ))}
      </Accordion>
    </div>
  )
})