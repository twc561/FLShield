
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
  return (
    <div className="group relative">
      <Link href={module.targetPage}>
        <Card className="h-full hover:border-primary/80 hover:bg-card/60 transition-colors flex items-center p-3 gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">{module.title}</p>
            <p className="text-xs text-muted-foreground">{module.summary}</p>
          </div>
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
    
    // In a real AI-driven app, this logic would be powered by a model
    // analyzing context (time, location, user history).
    // Here, we simulate it by selecting a few key tools.
    const featured: FeatureModule[] = [
        dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features[0],
        dashboardFeatureGroups.find(g => g.category === "Legal Reference Library")?.features[0],
        dashboardFeatureGroups.find(g => g.category === "Reporting & Documentation")?.features[2],
    ].filter(Boolean) as FeatureModule[];

    return (
        <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold tracking-tight px-1">Smart Suggestions</h2>
                {isClient && mounted && isPro && (
                    <Badge variant="outline" className="text-amber-600 border-amber-300">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro Features
                    </Badge>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.map(tool => (
                     <Link href={tool.targetPage} key={tool.id} className="group">
                        <Card className="h-full hover:border-primary transition-colors relative">
                            {isClient && mounted && isPro && tool.isPremium && (
                                <div className="absolute top-2 right-2">
                                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Pro
                                    </Badge>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <LucideIcons.Star className="w-5 h-5 text-primary"/>
                                    </div>
                                    <CardTitle className="text-base">{tool.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{tool.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </motion.div>
    )
}


const PinnedTools = ({ isClient }: { isClient: boolean }) => {
  return (
    <motion.div variants={itemVariants}>
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
            setUserName("Officer"); // Fallback for loading state
        }
    });

    return () => unsubscribe();
  }, [])

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <PageHeader 
        title={
          <div className="flex items-center gap-3">
            {`${greeting}, ${userName || "Officer"}.`}
            {isClient && mounted && isPro && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg text-sm px-3 py-1">
                <Crown className="w-4 h-4 mr-2" />
                Shield FL Pro
              </Badge>
            )}
          </div>
        }
        description={
          isClient && mounted && isPro ? (
            "All premium AI features unlocked. Thank you for your support!"
          ) : (
            "Welcome to your Mission Hub. How can I help?"
          )
        }
      />

      <motion.div variants={itemVariants}>
        <AICommandSearch />
      </motion.div>
      
      {/* Daily Roll Call - Primary focal point */}
        <div className="mb-6">
          <DailyRollCall />
        </div>

        {/* Briefing Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Training Progress</h2>
          <BriefingStats />
        </div>

      <FeaturedTools isClient={isClient} />

      <PinnedTools isClient={isClient} />

      {/* The "All Tools" Library */}
      <motion.div variants={itemVariants}>
        <h2 className="text-lg font-bold tracking-tight mb-3 px-1">All Tools Library</h2>
        <div className="space-y-6">
          {Array.isArray(dashboardFeatureGroups) && dashboardFeatureGroups.map((group) => {
            const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
            return (
              <Card key={group.category} className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <GroupIcon className="w-5 h-5 text-primary"/>
                        {group.category}
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.features.map((feature) => (
                    <ToolCard key={feature.id} module={feature} />
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4">
        <Alert variant="destructive">
            <LucideIcons.ShieldAlert className="h-4 w-4" />
            <AlertTitle>For Informational Use Only</AlertTitle>
            <AlertDescription>
            This application is a training and informational aid. It is NOT a CJIS-compliant system. Do not enter, store, or transmit any real Criminal Justice Information (CJI) or Personally Identifiable Information (PII).
            </AlertDescription>
        </Alert>
      </motion.div>

    </motion.div>
  )
}
