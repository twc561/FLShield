
'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
}

const QuickActionCard = ({ module }: { module: FeatureModule }) => {
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Link href={module.targetPage}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group"
      >
        <Card className="h-full bg-gradient-to-br from-background to-muted/20 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              {isClient && mounted && isPro && module.isPremium && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-sm leading-tight mb-2">{module.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{module.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-primary font-medium">Tap to open</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

const CategorySection = ({ group, index }: { group: any, index: number }) => {
  const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
  const [isExpanded, setIsExpanded] = useState(index < 2) // Show first 2 categories expanded by default

  return (
    <motion.div variants={itemVariants} className="space-y-3">
      <Card className="overflow-hidden bg-gradient-to-r from-card to-card/80 border border-border/50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GroupIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base">{group.category}</h3>
                <p className="text-sm text-muted-foreground">{group.features.length} tools</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 gap-3">
              {group.features.slice(0, isExpanded ? undefined : 3).map((feature: FeatureModule) => (
                <QuickActionCard key={feature.id} module={feature} />
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

const StatsCard = ({ title, value, icon: Icon, color = "primary" }: { title: string; value: string; icon: any; color?: string }) => (
  <Card className="bg-gradient-to-br from-background to-muted/20 border border-border/50">
    <CardContent className="p-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`h-4 w-4 text-${color}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="font-semibold text-sm">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good day")
  const [userName, setUserName] = useState<string | null>("Officer");
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return "Good morning"
      else if (hour < 18) return "Good afternoon"
      else return "Good evening"
    }
    setGreeting(getGreeting());

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

  const featuredTools = [
    dashboardFeatureGroups.find(g => g.category === "AI Assistant Tools")?.features.slice(0, 3),
    dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features.slice(0, 2),
    dashboardFeatureGroups.find(g => g.category === "Emergency Response Protocols")?.features.slice(0, 1),
  ].flat().filter(Boolean) as FeatureModule[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 pb-20">
      <div className="px-4 pt-6 space-y-6">
        
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          initial="hidden" 
          animate="show"
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {greeting}, {userName}
          </h1>
          {isClient && mounted && isPro ? (
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Shield FL Pro Active</span>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Your command center awaits</p>
          )}
        </motion.div>

        <motion.div 
          className="space-y-6"
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
            <div className="grid grid-cols-2 gap-3">
              <StatsCard 
                title="Tools Available" 
                value={`${dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)}`}
                icon={Shield}
              />
              <StatsCard 
                title="Categories" 
                value={`${dashboardFeatureGroups.length}`}
                icon={Briefcase}
              />
            </div>
          </motion.div>

          {/* Daily Roll Call */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-primary/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-semibold text-lg">Today's Briefing</h2>
            </div>
            <DailyRollCall />
          </motion.div>

          {/* Featured Tools */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-amber-500/10 rounded-lg">
                  <Star className="h-4 w-4 text-amber-500" />
                </div>
                <h2 className="font-semibold text-lg">Quick Access</h2>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/favorites">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {featuredTools.map((tool) => (
                <QuickActionCard key={tool.id} module={tool} />
              ))}
            </div>
          </motion.div>

          {/* Training Progress */}
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h2 className="font-semibold text-lg">Your Progress</h2>
            </div>
            <Card className="bg-gradient-to-br from-background to-muted/20 border border-border/50">
              <CardContent className="p-4">
                <BriefingStats />
              </CardContent>
            </Card>
          </motion.div>

          {/* All Categories */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-blue-500/10 rounded-lg">
                <Briefcase className="h-4 w-4 text-blue-500" />
              </div>
              <h2 className="font-semibold text-lg">All Tools</h2>
            </div>
            <div className="space-y-3">
              {dashboardFeatureGroups.map((group, index) => (
                <CategorySection key={group.category} group={group} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div variants={itemVariants}>
            <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-sm">Training Use Only</AlertTitle>
              <AlertDescription className="text-xs">
                This app is for training purposes only. Do not enter real Criminal Justice Information (CJI) or PII.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
