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

type FeatureCardProps = {
  module: FeatureModule
  showPinButton?: boolean
}

export const FeatureCard = memo(function FeatureCard({ module, showPinButton = true }: FeatureCardProps) {
  const { isPro, mounted } = useSubscription()
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle

  if (!mounted) {
    return (
      <Card className="h-full flex flex-col animate-pulse">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 rounded-lg w-9 h-9"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </CardFooter>
      </Card>
    )
  }

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
        <CardFooter>
          <Link
            href={module.targetPage}
            className="w-full text-sm font-medium text-primary flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-primary/20 hover:bg-primary/5 transition-colors group"
          >
            Open
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
})