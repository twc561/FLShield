'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePinnedTools } from "@/hooks/use-pinned-tools"
import { useSubscription } from "@/hooks/use-subscription"
import * as LucideIcons from "lucide-react"
import { Crown, X, GripVertical, Settings, Star } from "lucide-react"
import type { FeatureModule } from '@/types'

interface PinnedToolsGridProps {
  isClient: boolean
}

const PinnedToolCard = ({ 
  module, 
  onUnpin, 
  isEditMode, 
  onDragStart,
  onDragOver,
  onDrop,
  dragIndex
}: { 
  module: FeatureModule
  onUnpin: (id: string) => void
  isEditMode: boolean
  onDragStart: (e: React.DragEvent, index: number) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, index: number) => void
  dragIndex: number
}) => {
  const { isPro, mounted } = useSubscription()
  const Icon = (LucideIcons as any)[module.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle

  return (
    <div
      draggable={isEditMode}
      onDragStart={(e) => onDragStart(e, dragIndex)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, dragIndex)}
      className="group relative"
    >
      <Link href={module.targetPage} className={`block ${isEditMode ? 'pointer-events-none' : ''}`}>
        <Card className="h-full hover:border-primary transition-colors relative cursor-pointer">
          {mounted && isPro && module.isPremium && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
          )}

          {isEditMode && (
            <>
              <div className="absolute top-2 left-2 opacity-60">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 w-6 h-6 p-0"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onUnpin(module.id)
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </>
          )}

          <CardHeader className={isEditMode ? 'pt-8' : ''}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-base">{module.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{module.summary}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export function PinnedToolsGrid({ isClient }: PinnedToolsGridProps) {
  const { pinnedTools, isLoaded, unpinTool, reorderTools } = usePinnedTools()
  const [isEditMode, setIsEditMode] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderTools(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  if (!isClient || !isLoaded) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight px-1">Pinned Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (pinnedTools.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight px-1">Pinned Tools</h2>
        </div>
        <div className="p-8 text-center border-2 border-dashed rounded-lg">
          <div className="flex justify-center mb-4">
            <Star className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold mb-2">No Pinned Tools Yet</h3>
          <p className="text-sm text-muted-foreground">
            Pin your most-used tools from the library below for instant access.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight px-1">Pinned Tools</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditMode(!isEditMode)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          {isEditMode ? 'Done' : 'Edit'}
        </Button>
      </div>

      {isEditMode && (
        <div className="text-sm text-muted-foreground px-1">
          Drag to reorder • Click X to remove • Maximum 6 tools
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pinnedTools.map((tool, index) => (
          <PinnedToolCard
            key={tool.id}
            module={tool}
            onUnpin={unpinTool}
            isEditMode={isEditMode}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            dragIndex={index}
          />
        ))}
      </div>
    </div>
  )
}