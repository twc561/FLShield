"use client"

import React, { useState, useEffect } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { generateFeatureSummary } from "@/ai/flows/generate-feature-summary"
import type { FeatureModule } from "@/data/features"
import { ArrowRight } from "lucide-react"

type FeatureCardProps = {
  module: FeatureModule
  style?: React.CSSProperties
  className?: string
}

export function FeatureCard({
  module,
  style,
  className,
}: FeatureCardProps) {
  const [summary, setSummary] = useState(module.summary)
  const [isLoading, setIsLoading] = useState(!module.summary)

  useEffect(() => {
    // If the summary is empty, generate it using the AI flow.
    if (!module.summary) {
      const fetchSummary = async () => {
        try {
          const result = await generateFeatureSummary({ title: module.title })
          setSummary(result.summary)
        } catch (error) {
          console.error("Failed to generate summary:", error)
          // Fallback summary in case of an error
          setSummary(`Access the ${module.title} tools and resources.`)
        } finally {
          setIsLoading(false)
        }
      }
      fetchSummary()
    }
  }, [module.summary, module.title])

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
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <CardDescription>{summary}</CardDescription>
          )}
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
}
