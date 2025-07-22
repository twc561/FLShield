"use client"

import React, { memo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PinButton } from "@/components/PinButton"
import * as LucideIcons from "lucide-react"
import { Crown } from "lucide-react"
import { useSubscription } from "@/hooks/use-subscription"
import type { FeatureModule } from "@/types"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type FeatureCardProps = {
  module: FeatureModule
  showPinButton?: boolean
}

export const FeatureCard = memo(function FeatureCard({ module, showPinButton = true }: FeatureCardProps) {
  const { isPro, mounted } = useSubscription()
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 20px hsla(var(--primary), 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full relative"
    >
      <Card className="h-full flex flex-col hover:border-primary transition-colors duration-200">
        {mounted && module.isPremium && (
          <div className="absolute top-2 right-2 z-20">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-base">{module.title}</CardTitle>
            </div>
            {showPinButton && (
              <div className="z-10" onClick={(e) => e.stopPropagation()}>
                <PinButton module={module} />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{module.summary}</CardDescription>
        </CardContent>
        <CardFooter className="pt-4">
            <div className="flex items-center justify-between w-full">
              <Button variant="link" asChild className="p-0 h-auto text-sm">
                <Link href={module.targetPage} className="flex items-center gap-1">
                  Learn More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              {showPinButton && (
                <div className="flex items-center gap-1">
                  <PinButton module={module} variant="ghost" size="sm" />
                </div>
              )}
            </div>
          </CardFooter>
      </Card>
    </motion.div>
  )
})