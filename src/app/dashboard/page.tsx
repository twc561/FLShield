
'use client'

import {
  BookOpen,
  History,
  Lightbulb,
  Newspaper,
  ChevronDown,
  Flame,
} from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { dashboardFeatureGroups } from "@/data/dashboard-features"
import { dailyBriefingData } from "@/data/daily-briefing"
import { FeatureCard } from "@/components/FeatureCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import AICommandSearch from '@/components/AICommandSearch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"

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

const linkGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const linkItemVariants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};


export default function DashboardPage() {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
            // Use displayName if available, otherwise parse email for a name, or fallback.
            if (user.displayName) {
                setUserName(user.displayName.split(' ')[0]); // Just get the first name
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
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [])
  
  useEffect(() => {
    // Check if running on the client to safely access window and localStorage
    if (typeof window === 'undefined') {
      return;
    }

    const MOBILE_BREAKPOINT = 768; // md breakpoint in Tailwind is 768px
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
      }, 1500); // Delay to allow the page to settle
    }
  }, [toast]);

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="flex justify-center items-center gap-3">
          <Flame className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {greeting}, {userName || "Officer"}.
          </h1>
        </div>
        <p className="text-muted-foreground mt-1">{today}</p>
        <div className="mt-4">
          <AICommandSearch />
        </div>
      </motion.div>

      {/* Core Content Area */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={itemVariants}>
        <div className="lg:col-span-2 space-y-6">
            <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                <CardTitle>What's New</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                New Feature Added: The{" "}
                <Link href="/training-development/role-play-simulator" className="font-semibold text-primary hover:underline">
                    AI Role-Play Simulator
                </Link>{" "}
                is now live. Practice your de-escalation skills today!
                </p>
            </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-primary" />
              <CardTitle>Daily Briefing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold text-foreground/90">
              {dailyBriefingData.headline}
            </p>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/daily-briefing">View Full Briefing</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Main Navigator */}
      <motion.div className="space-y-4" variants={itemVariants}>
        {dashboardFeatureGroups.map((group) => {
          const Icon = group.icon;
          const isOpen = openSections[group.category] ?? false;

          return (
            <Collapsible key={group.category} open={isOpen} onOpenChange={(val) => setOpenSections(prev => ({...prev, [group.category]: val}))}>
              <CollapsibleTrigger asChild>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01, boxShadow: "0 8px 30px hsla(var(--primary), 0.12)"}}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full cursor-pointer"
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>{group.category}</CardTitle>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </CollapsibleTrigger>
              <AnimatePresence>
                {isOpen && (
                  <CollapsibleContent forceMount asChild>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0, height: 0 },
                        show: { opacity: 1, height: 'auto' }
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-4"
                        variants={linkGridVariants}
                      >
                        {group.features.map((feature) => (
                          <motion.div key={feature.id} variants={linkItemVariants}>
                            <FeatureCard module={feature} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </CollapsibleContent>
                )}
              </AnimatePresence>
            </Collapsible>
          );
        })}
      </motion.div>

      {/* Personalized Widgets */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <CardTitle>Recently Viewed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <Link href="/legal-reference/statutes?search=784.03" className="block text-center text-xs w-24 shrink-0">
                  <div className="p-4 bg-muted rounded-md flex items-center justify-center mb-1">
                      <BookOpen className="h-8 w-8 text-muted-foreground"/>
                  </div>
                  <p className="truncate text-muted-foreground">F.S. 784.03</p>
              </Link>
               <Link href="/field-procedures/scenario-checklists" className="block text-center text-xs w-24 shrink-0">
                  <div className="p-4 bg-muted rounded-md flex items-center justify-center mb-1">
                      <BookOpen className="h-8 w-8 text-muted-foreground"/>
                  </div>
                  <p className="truncate text-muted-foreground">DUI Checklist</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Disclaimer */}
      <motion.footer variants={itemVariants} className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
          <strong className="font-semibold text-foreground/80">Disclaimer & CJIS Warning:</strong> The Florida Shield application is for informational and training purposes only and is not a substitute for legal advice, agency policy, or certified training. All information should be independently verified. <strong className="text-destructive">This is NOT a CJIS-compliant environment.</strong> Users are strictly prohibited from entering, storing, or transmitting any real Personally Identifiable Information (PII), Criminal Justice Information (CJI), or any other sensitive case-specific details. All user-input fields must be treated as unsecure and for training or note-taking purposes only. Violation of this policy may result in disciplinary action.
        </p>
      </motion.footer>
    </motion.div>
  )
}
