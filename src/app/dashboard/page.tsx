
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
    <div className="group relative">
      <Link href={module.targetPage}>
        <Card className="h-full hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                {isClient && mounted && isPro && module.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{module.summary}</p>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-card-foreground mb-4">Smart Suggestions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    AI-powered tool recommendations based on your current shift context
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-card-foreground mb-4">Pinned Tools</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
    <div className="container mx-auto p-4 md:p-6">
      <PageHeader 
        title={`${greeting}, ${userName || "Officer"}.`}
        description={
          isClient && mounted && isPro ? (
            <div className="flex items-center gap-2 text-amber-600">
              <Crown className="w-4 h-4" />
              <span>Pro Member - All premium features unlocked</span>
            </div>
          ) : (
            "Welcome to your Mission Hub. How can I help?"
          )
        }
      />

      <motion.div 
        className="space-y-12"
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
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-900">Shield FL Pro Active</h3>
                    <p className="text-amber-700">Access to all premium AI tools and features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Daily Roll Call Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">Daily Roll Call</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with today's critical briefing information
            </p>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <DailyRollCall />
            </CardContent>
          </Card>
        </motion.div>

        {/* Training Progress Section */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">Training Progress</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your professional development and skill advancement
            </p>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">Complete Tools Library</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive collection of law enforcement tools and resources
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-muted-foreground text-center">
              Showing {dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)} tools across {dashboardFeatureGroups.length} categories
            </p>
          </div>

          <div className="space-y-8">
            {Array.isArray(dashboardFeatureGroups) && dashboardFeatureGroups.map((group, index) => {
              const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
              return (
                <motion.div
                  key={group.category}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <GroupIcon className="w-6 h-6 text-primary"/>
                          </div>
                          <div>
                            <CardTitle className="text-xl">{group.category}</CardTitle>
                            <CardDescription className="text-sm">
                              {group.features.length} {group.features.length === 1 ? 'tool' : 'tools'} available
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {group.features.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
