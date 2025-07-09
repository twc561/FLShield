
'use client'

import {
  BookOpen,
  History,
  Lightbulb,
  Newspaper,
  ChevronDown,
  Flame,
  Download,
} from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { dashboardFeatureGroups } from "@/data/dashboard-features"
import { FeatureCard } from "@/components/FeatureCard"
import { useToast } from "@/hooks/use-toast"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { PageHeader } from "@/components/PageHeader"
import AICommandSearch from "@/components/AICommandSearch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();

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
        }
    });
    
    return () => unsubscribe();
  }, [])
  
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const MOBILE_BREAKPOINT = 768;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const hintKey = 'mobileNavHintShown';

    const hasSeenHint = localStorage.getItem(hintKey);

    if (isMobile && !hasSeenHint) {
      setTimeout(() => {
        toast({
          title: "Navigation Tip",
          description: "Tap the 'More' button in the bottom right to access all guides and tools.",
        });
        localStorage.setItem(hintKey, 'true');
      }, 1500);
    }
  }, [toast]);

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <PageHeader 
        title={`${greeting}, ${userName || "Officer"}.`}
        description="Welcome to your dashboard. Access your tools and guides below."
      />
      
      <motion.div variants={itemVariants}>
        <AICommandSearch />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
                <Download className="w-6 h-6 text-primary"/>
                <div>
                    <CardTitle>Get the Full App Experience</CardTitle>
                    <CardDescription>Install Shield FL to your device's home screen for faster access.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/install">View Install Instructions</Link>
                </Button>
            </CardContent>
        </Card>
      </motion.div>

      {dashboardFeatureGroups.map((group, groupIndex) => (
        <motion.div key={group.category} variants={itemVariants}>
          <h2 className="text-xl font-bold tracking-tight mb-4">{group.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {group.features.map((feature, featureIndex) => (
              <FeatureCard key={feature.id} module={feature} />
            ))}
          </div>
        </motion.div>
      ))}

      <motion.footer variants={itemVariants} className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
          <strong className="font-semibold text-foreground/80">Disclaimer & CJIS Warning:</strong> The Florida Shield application is for informational and training purposes only and is not a substitute for legal advice, agency policy, or certified training. All information should be independently verified. <strong className="text-destructive">This is NOT a CJIS-compliant environment.</strong> Users are strictly prohibited from entering, storing, or transmitting any real Personally Identifiable Information (PII), Criminal Justice Information (CJI), or any other sensitive case-specific details. All user-input fields must be treated as unsecure and for training or note-taking purposes only. Violation of this policy may result in disciplinary action.
        </p>
      </motion.footer>
    </motion.div>
  )
}
