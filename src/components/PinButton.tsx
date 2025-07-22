
'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { usePinnedTools } from "@/hooks/use-pinned-tools"
import type { FeatureModule } from '@/types'
import { useToast } from "@/hooks/use-toast"

interface PinButtonProps {
  module: FeatureModule
  variant?: 'default' | 'ghost'
  size?: 'default' | 'sm' | 'icon'
}

export function PinButton({ module, variant = 'ghost', size = 'icon' }: PinButtonProps) {
  const { pinTool, unpinTool, isPinned, canPin } = usePinnedTools()
  const { toast } = useToast()
  
  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const toolIsPinned = isPinned(module.id)
    
    if (toolIsPinned) {
      unpinTool(module.id)
      toast({
        description: `Unpinned ${module.title}`,
      })
    } else {
      const success = pinTool(module)
      if (success) {
        toast({
          description: `Pinned ${module.title}`,
        })
      } else if (!canPin) {
        toast({
          description: "Maximum 6 tools can be pinned",
          variant: "destructive",
        })
      }
    }
  }

  const toolIsPinned = isPinned(module.id)

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePin}
      className={`transition-all duration-200 ${
        toolIsPinned 
          ? 'text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100' 
          : 'text-muted-foreground hover:text-amber-500 hover:bg-amber-50'
      }`}
      title={toolIsPinned ? 'Unpin from dashboard' : 'Pin to dashboard for quick access'}
    >
      <Star className={`w-4 h-4 transition-all duration-200 ${toolIsPinned ? 'fill-current scale-110' : 'hover:scale-110'}`} />
      {size !== 'icon' && (
        <span className="ml-1 text-xs">
          {toolIsPinned ? 'Pinned' : 'Pin'}
        </span>
      )}
    </Button>
  )
}
