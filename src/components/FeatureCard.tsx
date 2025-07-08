
"use client"

import React, { memo } from "react"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { FeatureModule } from "@/types"
import { ArrowRight } from "lucide-react"

type FeatureCardProps = {
  module: FeatureModule
  style?: React.CSSProperties
  className?: string
}

export const FeatureCard = memo(function FeatureCard({
  module,
  style,
  className,
}: FeatureCardProps) {
  // Dynamically select the icon component from lucide-react based on the string name
  const Icon =
    (LucideIcons as any)[module.icon as keyof typeof LucideIcons] ||
    LucideIcons.HelpCircle

  return (
    <Link
      href={module.targetPage}
      className="block group"
      style={style}
    >
      <Card
        className={`h-full flex flex-col hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 ${className}`}
      >
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{module.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{module.summary}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="text-sm font-medium text-primary flex items-center gap-2">
            Open
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
})
