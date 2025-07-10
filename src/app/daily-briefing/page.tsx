
'use client'

import { PageHeader } from "@/components/PageHeader";
import { dailyBriefingData } from "@/data/daily-briefing";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyBriefingPage() {
  const briefing = dailyBriefingData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: "easeOut"
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      key="daily-briefing-page"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <PageHeader
        title="Daily Legal Briefing"
        description={`Today's update: ${briefing.briefingDate}`}
      />

      <Card className="w-full">
        <CardHeader>
          <motion.div variants={itemVariants}>
            <Badge variant="destructive" className="w-fit mb-2">{briefing.caseInfo.court}</Badge>
          </motion.div>
           <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl md:text-3xl tracking-tight">{briefing.headline}</CardTitle>
          </motion.div>
           <motion.div variants={itemVariants}>
            <CardDescription className="pt-2 text-base">
              {briefing.caseInfo.caseName} / {briefing.caseInfo.citation}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
           <motion.div variants={itemVariants}>
            <p className="text-base text-muted-foreground leading-relaxed">
              {briefing.plainLanguageSummary}
            </p>
          </motion.div>

           <motion.div variants={itemVariants}>
            <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
              <h3 className="font-semibold text-lg text-accent-foreground/90 mb-3 flex items-center">
                  <AlertTriangle className="mr-3 h-5 w-5"/>
                  {briefing.tacticalImpact.title}
              </h3>
              <ul className="space-y-3">
                  {briefing.tacticalImpact.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-accent mt-1 flex-shrink-0"/>
                          <span className="text-accent-foreground/80">{point}</span>
                      </li>
                  ))}
              </ul>
            </div>
          </motion.div>

           <motion.div variants={itemVariants}>
            <div>
              <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
                  "{briefing.keyQuote}"
              </blockquote>
            </div>
          </motion.div>
        </CardContent>
      </Card>
      <motion.div variants={itemVariants}>
        <p className="text-center text-sm text-muted-foreground mt-8">Disclaimer: This briefing is for informational purposes only and is not a substitute for legal advice or agency training.</p>
      </motion.div>
    </motion.div>
  );
}
