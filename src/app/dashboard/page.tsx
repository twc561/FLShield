
'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Users, AlertTriangle, BookOpen, Shield, Zap, Clock, TrendingUp, MapPin, MessageSquare, FileText, Briefcase, Target, Eye, GraduationCap, Heart, Search, Headphones, Crown } from "lucide-react"
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
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const ToolCard = ({ module }: { module: FeatureModule }) => {
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="group relative w-full">
      <Link href={module.targetPage}>
        <Card className="h-full hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 bg-card border-border w-full">
          <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
            <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2">
              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                <span className="text-base sm:text-lg flex-shrink-0">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </span>
                {isClient && mounted && isPro && module.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs flex-shrink-0">
                    <Crown className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-sm sm:text-base md:text-lg leading-tight text-card-foreground break-words">{module.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">{module.summary}</p>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <PinButton module={module} variant="ghost" size="icon" />
      </div>
    </div>
  )
}

const FeaturedTools = ({ isClient }: { isClient: boolean }) => {
    const { isPro, mounted } = useSubscription()
    
    const featured: FeatureModule[] = [
        dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features[0],
        dashboardFeatureGroups.find(g => g.category === "Legal Reference Library")?.features[0],
        dashboardFeatureGroups.find(g => g.category === "Reporting & Documentation")?.features[2],
    ].filter(Boolean) as FeatureModule[];

    return (
        <motion.div variants={itemVariants}>
            <div className="text-center mb-4 sm:mb-6 px-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">Smart Suggestions</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    AI-powered tool recommendations based on your current shift context
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {featured.map(tool => (
                    <ToolCard key={tool.id} module={tool} />
                ))}
            </div>
        </motion.div>
    )
}

const PinnedTools = ({ isClient }: { isClient: boolean }) => {
  return (
    <motion.div variants={itemVariants}>
      <div className="text-center mb-4 sm:mb-6 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">Pinned Tools</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Quick access to your most frequently used tools
        </p>
      </div>
      <PinnedToolsGrid isClient={isClient} />
    </motion.div>
  )
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good day")
  const [userName, setUserName] = useState<string | null>("Officer");
  const { isPro, mounted } = useSubscription()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) {
        return "Good morning"
      } else if (hour < 18) {
        return "Good afternoon"
      } else {
        return "Good evening"
      }
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

  return (
    <div className="w-full max-w-full mx-auto px-3 sm:px-4 md:px-6 bg-background text-foreground overflow-x-hidden">
      <PageHeader 
        title={`${greeting}, ${userName || "Officer"}.`}
        description={
          isClient && mounted && isPro ? (
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="break-words">Pro Member - All premium features unlocked</span>
            </div>
          ) : (
            "Welcome to your Mission Hub. How can I help?"
          )
        }
      />

      <motion.div 
        className="space-y-4 sm:space-y-6 md:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* AI Command Search */}
        <motion.div variants={itemVariants}>
          <AICommandSearch />
        </motion.div>

        {/* Pro Status Card */}
        {isClient && mounted && isPro && (
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-amber-600/30 bg-card">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-400">Shield FL Pro Active</h3>
                    <p className="text-amber-300">Access to all premium AI tools and features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Daily Roll Call Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">Daily Roll Call</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Stay informed with today's critical briefing information
            </p>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300 bg-card border-border w-full">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <DailyRollCall />
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Progress Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">Training Progress</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Track your professional development and skill advancement
            </p>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300 bg-card border-border w-full">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <BriefingStats />
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Tools Section */}
        <div>
          <FeaturedTools isClient={isClient} />
        </div>

        {/* Pinned Tools Section */}
        <div>
          <PinnedTools isClient={isClient} />
        </div>

        {/* Complete Tools Library */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">Complete Tools Library</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Comprehensive collection of law enforcement tools and resources
            </p>
          </div>
          
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
              Showing {dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)} tools across {dashboardFeatureGroups.length} categories
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {Array.isArray(dashboardFeatureGroups) && dashboardFeatureGroups.map((group, index) => {
              const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
              return (
                <motion.div
                  key={group.category}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 bg-card border-border w-full">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <GroupIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary"/>
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base sm:text-lg md:text-xl truncate">{group.category}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">
                              {group.features.length} {group.features.length === 1 ? 'tool' : 'tools'} available
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs sm:text-sm flex-shrink-0">
                          {group.features.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
                        {group.features.map((feature) => (
                          <ToolCard key={feature.id} module={feature} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={itemVariants}>
          <Alert variant="destructive">
            <LucideIcons.ShieldAlert className="h-4 w-4" />
            <AlertTitle>For Informational Use Only</AlertTitle>
            <AlertDescription>
              This application is a training and informational aid. It is NOT a CJIS-compliant system. Do not enter, store, or transmit any real Criminal Justice Information (CJI) or Personally Identifiable Information (PII).
            </AlertDescription>
          </Alert>
        </motion.div>
      </motion.div>
    </div>
  )
}
