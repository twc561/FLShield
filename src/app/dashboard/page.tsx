'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Users, AlertTriangle, BookOpen, Shield, Zap, Clock, TrendingUp, MapPin, MessageSquare, FileText, Briefcase, Target, Eye, GraduationCap, Heart, Search, Headphones, Crown, ChevronRight, Star, Bookmark, Plus, ArrowRight, ChevronDown } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DailyRollCall } from "@/components/DailyRollCall"
import { BriefingStats } from "@/components/BriefingStats"
import { PinnedToolsGrid } from "@/components/PinnedToolsGrid"
import { Badge } from "@/components/ui/badge"
import { useSubscription } from "@/hooks/use-subscription"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import AICommandSearch from "@/components/AICommandSearch"
import { PinButton } from "@/components/PinButton"
import Link from 'next/link'
import * as LucideIcons from "lucide-react"

import { dashboardFeatureGroups } from "@/data/dashboard-features"
import type { FeatureModule } from "@/data/dashboard-features"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  },
}

const CompactToolCard = ({ module }: { module: FeatureModule }) => {
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Link href={module.targetPage} className="block w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group"
      >
        <Card className="h-16 bg-white/50 dark:bg-gray-900/30 border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden backdrop-blur-sm">
          <CardContent className="p-3 h-full">
            <div className="flex items-center space-x-3 h-full">
              <div className="p-1.5 bg-primary/10 rounded-md shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm leading-tight truncate">{module.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{module.summary}</p>
              </div>
              {isClient && mounted && isPro && module.isPremium && (
                <Crown className="w-3 h-3 text-amber-500 shrink-0" />
              )}
              <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

const CategorySection = ({ group, index }: { group: any, index: number }) => {
  const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div variants={itemVariants} className="w-full">
      <Card className="overflow-hidden bg-white/40 dark:bg-gray-900/20 border-0 shadow-sm backdrop-blur-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3 text-left focus:outline-none transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="p-1 bg-primary/8 rounded-md shrink-0">
                <GroupIcon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm truncate">{group.category}</h3>
                <p className="text-xs text-muted-foreground">{group.features.length} tools</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-3 pb-3 space-y-2">
            {group.features.map((feature: FeatureModule) => (
              <CompactToolCard key={feature.id} module={feature} />
            ))}
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

const QuickStatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <Card className="bg-white/30 dark:bg-gray-900/20 border-0 shadow-sm backdrop-blur-sm">
    <CardContent className="p-3">
      <div className="flex items-center space-x-2">
        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="font-semibold text-sm">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const CollapsibleBriefingSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <h3 className="font-medium text-sm">Today's Briefing</h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <DailyRollCall />
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good day")
  const [userName, setUserName] = useState<string | null>("Officer");
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)
  const [contextualTools, setContextualTools] = useState<FeatureModule[]>([])
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning')
  const [usageStats, setUsageStats] = useState<any>(null)
  const [frequentlyUsed, setFrequentlyUsed] = useState<FeatureModule[]>([])
  const [recentlyUsed, setRecentlyUsed] = useState<FeatureModule[]>([])
  const [contextualMessage, setContextualMessage] = useState<string>('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const getTimeContext = () => {
      const hour = new Date().getHours()

      const isNightShift = hour >= 18 || hour < 5

      if (isNightShift) {
        setTimeOfDay('night')
        if (hour >= 18) {
          return "Good evening"
        } else {
          return "Good morning"
        }
      } else if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning')
        return "Good morning"
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon') 
        return "Good afternoon"
      }
    }
    setGreeting(getTimeContext());

    const loadUsageData = () => {
      try {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}')
        const recent = JSON.parse(localStorage.getItem('recentTools') || '[]')

        const frequentIds = Object.entries(usage)
          .sort(([,a], [,b]) => (b as number) - (a as number))
          .slice(0, 4)
          .map(([id]) => id)

        const frequent = dashboardFeatureGroups
          .flatMap(g => g.features)
          .filter(f => frequentIds.includes(f.id))
          .sort((a, b) => frequentIds.indexOf(a.id) - frequentIds.indexOf(b.id))

        const recentTools = recent
          .map((id: string) => dashboardFeatureGroups.flatMap(g => g.features).find(f => f.id === id))
          .filter(Boolean)
          .slice(0, 3)

        setFrequentlyUsed(frequent)
        setRecentlyUsed(recentTools)
      } catch (error) {
        console.error('Error loading usage data:', error)
      }
    }

    const loadUsageStats = async () => {
      if (!auth.currentUser) return

      try {
        const response = await fetch(`/api/usage?userId=${auth.currentUser.uid}`, {
          headers: {
            'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
          }
        })

        if (response.ok) {
          const text = await response.text();
          if (text) {
            try {
              const data = JSON.parse(text);
              setUsageStats(data.summary)
            } catch (parseError) {
              console.error('Failed to parse usage stats JSON:', parseError, 'Response text:', text);
            }
          }
        } else {
          console.error('Usage API response not ok:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error loading usage stats:', error)
      }
    }

    const getContextualTools = () => {
      const hour = new Date().getHours()
      let suggestions: FeatureModule[] = []
      let message = ''

      const isNightShift = hour >= 18 || hour < 5

      if (isNightShift) {
        if (hour >= 18 && hour < 20) {
          suggestions = dashboardFeatureGroups
            .flatMap(g => g.features)
            .filter(f => ['daily-briefing', 'scenario-checklists', 'field-notes'].includes(f.id))
          message = "🌅 Night shift - Check briefing"
        } else {
          suggestions = dashboardFeatureGroups
            .flatMap(g => g.features)
            .filter(f => ['baker-act-guide', 'domestic-violence-protocol', 'first-aid-guide'].includes(f.id))
          message = "🌙 Emergency protocols ready"
        }
      } else if (hour >= 5 && hour < 8) {
        suggestions = dashboardFeatureGroups
          .flatMap(g => g.features)
          .filter(f => ['daily-briefing', 'scenario-checklists', 'field-notes'].includes(f.id))
        message = "🌅 Day shift starting"
      } else if (hour >= 8 && hour < 14) {
        suggestions = dashboardFeatureGroups
          .flatMap(g => g.features)
          .filter(f => ['ai-charge-assistant', 'field-interview-contact', 'traffic-enforcement'].includes(f.id))
        message = "☀️ Morning patrol tools"
      } else {
        suggestions = dashboardFeatureGroups
          .flatMap(g => g.features)
          .filter(f => ['ai-legal-advisor', 'visual-evidence-identifier', 'ai-report-writer'].includes(f.id))
        message = "⚡ Afternoon tools"
      }

      setContextualTools(suggestions.slice(0, 3))
      setContextualMessage(message)
    }

    loadUsageData()
    loadUsageStats()
    getContextualTools()

    const contextualInterval = setInterval(getContextualTools, 30 * 60 * 1000)

    return () => {
      clearInterval(contextualInterval)
    }
  }, [isClient])

  useEffect(() => {
    if (!isClient) return

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
            if (user.displayName) {
                setUserName(user.displayName.split(' ')[0]);
            } else if (user.email) {
                const emailName = user.email.split('@')[0];
                setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
            } else if (user.isAnonymous) {
                setUserName("Guest");
            } else {
                setUserName("Officer");
            }
        } else {
            setUserName("Officer");
        }
    });

    return () => {
      unsubscribe()
    }
  }, [isClient])

  if (!isClient || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 pb-20" suppressHydrationWarning>
        <div className="px-4 pt-6 max-w-md mx-auto w-full">
          <div className="text-center mb-6">
            <div className="h-6 bg-gray-200/50 dark:bg-gray-700/30 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-100/50 dark:bg-gray-800/30 rounded animate-pulse w-2/3 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  const featuredTools = [
    dashboardFeatureGroups.find(g => g.category === "AI Assistant Tools")?.features.slice(0, 2),
    dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features.slice(0, 1),
  ].flat().filter(Boolean) as FeatureModule[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 pb-20">
      <div className="px-4 pt-6 max-w-md mx-auto w-full">

        {/* Compressed Header */}
        <motion.div 
          variants={itemVariants}
          initial="hidden" 
          animate="show"
          className="text-center mb-6"
          suppressHydrationWarning
        >
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            {greeting}, {userName}
          </h1>
          <div suppressHydrationWarning>
            {isClient && mounted && isPro ? (
              <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400">
                <Crown className="w-3 h-3" />
                <span className="text-xs font-medium">Pro Active</span>
              </div>
            ) : (
              <p className="text-muted-foreground text-xs">Your command center</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* AI Search - Keep as is but slightly compressed */}
          <motion.div variants={itemVariants}>
            <AICommandSearch />
          </motion.div>

          {/* Compressed Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-2">
              <QuickStatCard 
                title="Tools Available" 
                value={`${dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)}`}
                icon={Shield}
              />
              <QuickStatCard 
                title="Most Used" 
                value={frequentlyUsed.length > 0 ? frequentlyUsed[0]?.title.split(' ')[0] || 'None' : 'None'}
                icon={TrendingUp}
              />
            </div>
          </motion.div>

          {/* Contextual Smart Tools - Compressed */}
          {contextualMessage && (
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-blue-950/20 dark:to-indigo-950/10 border-0 shadow-sm backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <BrainCircuit className="h-3.5 w-3.5 text-blue-600" />
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">{contextualMessage}</p>
                  </div>
                  <div className="space-y-1.5">
                    {contextualTools.map((tool) => (
                      <CompactToolCard key={tool.id} module={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Access - More Compressed */}
          {(frequentlyUsed.length > 0 || recentlyUsed.length > 0) && (
            <motion.div variants={itemVariants}>
              <Card className="bg-white/40 dark:bg-gray-900/20 border-0 shadow-sm backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-3.5 w-3.5 text-purple-600" />
                      <h3 className="font-medium text-sm">Quick Access</h3>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {frequentlyUsed.slice(0, 2).map((tool) => (
                      <CompactToolCard key={tool.id} module={tool} />
                    ))}
                    {recentlyUsed.slice(0, 1).map((tool) => (
                      <CompactToolCard key={tool.id} module={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Collapsible Daily Briefing */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/40 dark:bg-gray-900/20 border-0 shadow-sm backdrop-blur-sm">
              <CardContent className="p-3">
                <CollapsibleBriefingSection />
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Tools - More Compact */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/40 dark:bg-gray-900/20 border-0 shadow-sm backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-3.5 w-3.5 text-amber-600" />
                    <h3 className="font-medium text-sm">Featured</h3>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="h-6 px-2 text-xs">
                    <Link href="/favorites">All</Link>
                  </Button>
                </div>
                <div className="space-y-1.5">
                  {featuredTools.map((tool) => (
                    <CompactToolCard key={tool.id} module={tool} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* All Categories - Ultra Compressed */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <h3 className="font-medium text-sm">All Tools</h3>
            </div>
            <div className="space-y-2">
              {dashboardFeatureGroups.map((group, index) => (
                <CategorySection key={group.category} group={group} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Compressed Disclaimer */}
          <motion.div variants={itemVariants}>
            <Alert className="border-amber-200/60 bg-amber-50/40 dark:border-amber-800/40 dark:bg-amber-950/20 backdrop-blur-sm">
              <AlertTriangle className="h-3 w-3" />
              <AlertDescription className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
                Training use only. No real CJI or PII.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}