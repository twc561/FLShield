
'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Users, AlertTriangle, BookOpen, Shield, Zap, Clock, TrendingUp, MapPin, MessageSquare, FileText, Briefcase, Target, Eye, GraduationCap, Heart, Search, Headphones, Crown, Sparkles, Command, Keyboard } from "lucide-react"
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
        <Card className="h-full hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-card/50 to-accent/5 border-border hover:border-accent/30 hover:scale-[1.02]">
          <CardHeader className="pb-3 p-4 md:p-6 md:pb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-accent/20 rounded-lg">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                </div>
                {isClient && mounted && isPro && module.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="text-base md:text-lg leading-tight text-card-foreground">{module.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 md:p-6 md:pt-0 md:space-y-4">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">{module.summary}</p>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <PinButton module={module} variant="ghost" size="icon" />
      </div>
    </div>
  )
}

const SectionCard = ({ title, description, icon: Icon, children, gradient = false }: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
  gradient?: boolean;
}) => (
  <Card className={`w-full transition-all duration-200 hover:shadow-lg ${gradient ? 'bg-gradient-to-r from-card/50 to-accent/10' : 'bg-card'} border-border`}>
    <CardContent className="p-4 md:p-6">
      <div className="flex items-start md:items-center gap-3 mb-4 md:mb-6">
        <div className="p-1.5 md:p-2 bg-accent/20 rounded-lg flex-shrink-0">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {children}
    </CardContent>
  </Card>
)

const QuickAccessGrid = ({ isClient }: { isClient: boolean }) => {
  const { isPro, mounted } = useSubscription()
  
  const quickAccess: FeatureModule[] = [
    dashboardFeatureGroups.find(g => g.category === "AI Assistant Tools")?.features[0],
    dashboardFeatureGroups.find(g => g.category === "Field Operations & Procedures")?.features[0],
    dashboardFeatureGroups.find(g => g.category === "Legal Reference Library")?.features[0],
    dashboardFeatureGroups.find(g => g.category === "Emergency Response Protocols")?.features[0],
  ].filter(Boolean) as FeatureModule[];

  return (
    <motion.div variants={itemVariants}>
      <SectionCard
        title="Quick Access"
        description="Your most essential tools, ready to go"
        icon={Zap}
        gradient={true}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quickAccess.map(tool => (
            <ToolCard key={tool.id} module={tool} />
          ))}
        </div>
      </SectionCard>
    </motion.div>
  )
}

const OperationalHub = ({ isClient }: { isClient: boolean }) => {
  return (
    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <SectionCard
        title="Daily Roll Call"
        description="Stay informed with today's critical briefing information"
        icon={Shield}
      >
        <DailyRollCall />
      </SectionCard>
      <SectionCard
        title="Training Progress"
        description="Track your professional development and skill advancement"
        icon={TrendingUp}
      >
        <BriefingStats />
      </SectionCard>
    </motion.div>
  )
}

const PinnedToolsSection = ({ isClient }: { isClient: boolean }) => {
  return (
    <motion.div variants={itemVariants}>
      <SectionCard
        title="Pinned Tools"
        description="Quick access to your most frequently used tools"
        icon={Target}
        gradient={true}
      >
        <PinnedToolsGrid isClient={isClient} />
      </SectionCard>
    </motion.div>
  )
}

const ToolsLibrary = ({ isClient }: { isClient: boolean }) => {
  return (
    <motion.div variants={itemVariants}>
      <SectionCard
        title="Complete Tools Library"
        description={`${dashboardFeatureGroups.reduce((acc, group) => acc + group.features.length, 0)} tools across ${dashboardFeatureGroups.length} categories`}
        icon={BookOpen}
      >
        <div className="space-y-6">
          {Array.isArray(dashboardFeatureGroups) && dashboardFeatureGroups.map((group, index) => {
            const GroupIcon = (LucideIcons as any)[group.icon] || LucideIcons.HelpCircle
            return (
              <motion.div
                key={group.category}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                className="border border-border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <GroupIcon className="w-5 h-5 text-accent"/>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{group.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {group.features.length} {group.features.length === 1 ? 'tool' : 'tools'} available
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm bg-accent/20 text-accent">
                    {group.features.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {group.features.map((feature) => (
                    <ToolCard key={feature.id} module={feature} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionCard>
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6 max-w-7xl">
        <PageHeader 
          title={`${greeting}, ${userName || "Officer"}.`}
          description={
            isClient && mounted && isPro ? (
              <div className="flex items-center gap-2 text-amber-400">
                <Crown className="w-4 h-4" />
                <span className="text-sm md:text-base">Pro Member - All premium features unlocked</span>
              </div>
            ) : (
              "Welcome to your Mission Hub. How can I help?"
            )
          }
        />

        <motion.div 
          className="space-y-6 md:space-y-8 mt-6 md:mt-8"
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
              <CardContent className="p-4 md:p-6 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <div className="p-2 md:p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
                    <Crown className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-400">Shield FL Pro Active</h3>
                    <p className="text-sm md:text-base text-amber-300">Access to all premium AI tools and features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Access Section */}
        <QuickAccessGrid isClient={isClient} />

        {/* Operational Hub */}
        <OperationalHub isClient={isClient} />

        {/* Pinned Tools Section */}
        <PinnedToolsSection isClient={isClient} />

        {/* Complete Tools Library */}
        <ToolsLibrary isClient={isClient} />

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
