
'use client'

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Users, AlertTriangle, BookOpen, Shield, Zap, Clock, TrendingUp, MapPin, MessageSquare, FileText, Briefcase, Target, Eye, GraduationCap, Heart, Search, Headphones, Crown, ChevronRight, Star, Bookmark } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DailyRollCall } from "@/components/DailyRollCall"
import { BriefingStats } from "@/components/BriefingStats"
import { PinnedToolsGrid } from "@/components/PinnedToolsGrid"
import { Badge } from "@/components/ui/badge"
import { useSubscription } from "@/hooks/use-subscription"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

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
      staggerChildren: 0.02,
      ease: "easeOut",
      duration: 0.3
    },
  },
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3
    },
  },
}

const QuickActionCard = React.memo(({ module }: { module: FeatureModule }) => {
  const Icon = useMemo(() => (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle, [module.icon]);
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Link href={module.targetPage} className="block w-full">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group h-full"
      >
        <Card className="h-full bg-gradient-to-br from-background to-muted/10 border border-border/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-primary/8 rounded-lg shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              {isClient && mounted && isPro && module.isPremium && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs px-1.5 py-0.5 shrink-0">
                  <Crown className="w-2.5 h-2.5 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-sm leading-tight mb-1.5 line-clamp-2">{module.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2.5 line-clamp-2">{module.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-primary font-medium">Tap to open</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
})

const CategorySection = React.memo(({ group, index }: { group: any, index: number }) => {
  const GroupIcon = useMemo(() => (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle, [group.icon])
  const [isExpanded, setIsExpanded] = useState(index < 2) // Show first 2 categories expanded by default
  
  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <motion.div variants={itemVariants} className="w-full">
      <Card className="overflow-hidden bg-gradient-to-r from-card to-card/80 border border-border/40">
        <button
          onClick={toggleExpanded}
          className="w-full p-3 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0 flex-1">
              <div className="p-1.5 bg-primary/8 rounded-lg shrink-0">
                <GroupIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">{group.category}</h3>
                <p className="text-xs text-muted-foreground">{group.features.length} tools</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-3 pb-3">
            <div className="grid grid-cols-1 gap-2">
              {group.features.slice(0, isExpanded ? undefined : 3).map((feature: FeatureModule) => (
                <QuickActionCard key={feature.id} module={feature} />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
})

const StatsCard = React.memo(({ title, value, icon: Icon, color = "primary" }: { title: string; value: string; icon: any; color?: string }) => (
  <Card className="bg-gradient-to-br from-background to-muted/10 border border-border/40">
    <CardContent className="p-3">
      <div className="flex items-center space-x-2.5">
        <div className={`p-1.5 rounded-lg bg-${color}/10 shrink-0`}>
          <Icon className={`h-3.5 w-3.5 text-${color}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="font-semibold text-sm">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
))

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState<string | null>(null);
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Memoize expensive computations
  const featuredTools = useMemo(() => {
    return [
      dashboardFeatureGroups.find(g => g.category === "AI Assistant Tools")?.features.slice(0, 3),
      dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features.slice(0, 2),
      dashboardFeatureGroups.find(g => g.category === "Emergency Response Protocols")?.features.slice(0, 1),
    ].flat().filter(Boolean) as FeatureModule[];
  }, [])

  const totalTools = useMemo(() => {
    return dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)
  }, [])

  const totalCategories = useMemo(() => {
    return dashboardFeatureGroups.length
  }, [])

  useEffect(() => {
    // Prevent hydration mismatches by setting everything on client side
    const initializeClient = () => {
      setIsClient(true)
      
      const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        else if (hour < 18) return "Good afternoon"
        else return "Good evening"
      }
      setGreeting(getGreeting());

      // Set hydrated after a short delay to prevent SSR mismatches
      setTimeout(() => setHydrated(true), 50)
    }

    initializeClient()

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

    return () => unsubscribe();
  }, [])

  // Prevent hydration mismatch by not rendering dynamic content until fully hydrated
  if (!isClient || !mounted || !hydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 pb-20">
        <div className="px-3 pt-4 max-w-md mx-auto w-full">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text mb-1">
              Good day, Officer
            </h1>
            <p className="text-muted-foreground text-xs">Your command center awaits</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 pb-20">
      <div className="px-3 pt-4 max-w-md mx-auto w-full">
        
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          initial="hidden" 
          animate="show"
          className="text-center mb-4"
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text mb-1">
            {greeting}, {userName}
          </h1>
          {isClient && mounted && isPro ? (
            <div className="flex items-center justify-center gap-1.5 text-amber-400">
              <Crown className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Shield FL Pro Active</span>
            </div>
          ) : (
            <p className="text-muted-foreground text-xs">Your command center awaits</p>
          )}
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* AI Command Search */}
          <motion.div variants={itemVariants}>
            <AICommandSearch />
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-2">
              <StatsCard 
                title="Tools Available" 
                value={`${totalTools}`}
                icon={Shield}
              />
              <StatsCard 
                title="Categories" 
                value={`${totalCategories}`}
                icon={Briefcase}
              />
            </div>
          </motion.div>

          {/* Daily Roll Call */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-primary/8 rounded-lg">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
              </div>
              <h2 className="font-semibold text-base">Today's Briefing</h2>
            </div>
            <DailyRollCall />
          </motion.div>

          {/* Featured Tools */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-amber-500/8 rounded-lg">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <h2 className="font-semibold text-base">Quick Access</h2>
              </div>
              <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
                <Link href="/favorites">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {featuredTools.map((tool) => (
                <QuickActionCard key={tool.id} module={tool} />
              ))}
            </div>
          </motion.div>

          {/* Training Progress */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-500/8 rounded-lg">
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              </div>
              <h2 className="font-semibold text-base">Your Progress</h2>
            </div>
            <Card className="bg-gradient-to-br from-background to-muted/10 border border-border/40">
              <CardContent className="p-3">
                <BriefingStats />
              </CardContent>
            </Card>
          </motion.div>

          {/* All Categories */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-blue-500/8 rounded-lg">
                <Briefcase className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <h2 className="font-semibold text-base">All Tools</h2>
            </div>
            <div className="space-y-2">
              {dashboardFeatureGroups.map((group, index) => (
                <CategorySection key={group.category} group={group} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
              <AlertTriangle className="h-3.5 w-3.5" />
              <AlertTitle className="text-xs">Training Use Only</AlertTitle>
              <AlertDescription className="text-xs leading-relaxed">
                This app is for training purposes only. Do not enter real Criminal Justice Information (CJI) or PII.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
