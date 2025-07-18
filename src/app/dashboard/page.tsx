
'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { PageHeader } from "@/components/PageHeader"
import AICommandSearch from "@/components/AICommandSearch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { DailyBriefingSheet } from "@/components/DailyBriefingSheet"
import Link from 'next/link'
import * as LucideIcons from "lucide-react"

import { dashboardFeatureGroups } from "@/data/dashboard-features"
import type { FeatureModule } from "@/data/dashboard-features"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


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
    <Link href={module.targetPage} className="group">
      <Card className="h-full hover:border-primary/80 hover:bg-card/60 transition-colors flex items-center p-3 gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{module.title}</p>
          <p className="text-xs text-muted-foreground">{module.summary}</p>
        </div>
      </Card>
    </Link>
  )
}

const locationTools: FeatureModule[] = [
  {
    id: 'jurisdiction-finder',
    title: 'Jurisdiction Finder',
    summary: 'Use GPS to identify your current jurisdiction and access local laws.',
    icon: 'MapPin',
    targetPage: '/field-procedures/jurisdiction-finder',
    category: 'Field Operations & Procedures'
  },
  {
    id: 'nearby-resources',
    title: 'Nearby Resources',
    summary: 'Find the closest hospitals, courthouses, and support centers.',
    icon: 'Building',
    targetPage: '/field-procedures/nearby-resources',
    category: 'Field Operations & Procedures'
  },
];


const LocationTools = () => (
    <motion.div variants={itemVariants}>
        <h2 className="text-lg font-bold tracking-tight mb-3 px-1">Location-Based Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationTools.map(tool => {
                const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.HelpCircle;
                return (
                    <Link href={tool.targetPage} key={tool.id} className="group">
                        <Card className="h-full hover:border-primary transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Icon className="w-5 h-5 text-primary"/>
                                    </div>
                                    <CardTitle className="text-base">{tool.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{tool.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    </motion.div>
);


const FeaturedTools = () => {
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
            <h2 className="text-lg font-bold tracking-tight mb-3 px-1">Smart Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.map(tool => (
                     <Link href={tool.targetPage} key={tool.id} className="group">
                        <Card className="h-full hover:border-primary transition-colors">
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


const PinnedTools = () => {
  return (
    <motion.div variants={itemVariants}>
      <h2 className="text-lg font-bold tracking-tight mb-3 px-1">Pinned Tools</h2>
      <div className="p-8 text-center border-2 border-dashed rounded-lg">
        <div className="flex justify-center mb-4">
          <LucideIcons.Star className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">Feature Coming Soon</h3>
        <p className="text-sm text-muted-foreground">
          Pin your most-used tools here for instant access.
        </p>
      </div>
    </motion.div>
  )
}


export default function DashboardPage() {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState<string | null>(null);
  
  useEffect(() => {
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
      <div className="flex justify-between items-start gap-4">
        <PageHeader 
          title={`${greeting}, ${userName || "Officer"}.`}
          description="Welcome to your Mission Hub. How can I help?"
        />
        <div className="pt-2">
           <DailyBriefingSheet /> 
        </div>
      </div>
      
      <motion.div variants={itemVariants}>
        <AICommandSearch />
      </motion.div>
      
      <LocationTools />

      <FeaturedTools />

      <PinnedTools />

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
