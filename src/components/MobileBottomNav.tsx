
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import { memo, useCallback, useState, useEffect } from "react"
import {
  LayoutGrid,
  Scale,
  Menu,
  Flame,
  LogOut,
  Bot,
  Crown,
  MapPin,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useSubscription } from "@/hooks/use-subscription"
import { Badge } from "@/components/ui/badge"

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/legal-reference/statutes", label: "Statutes", icon: Scale },
  { href: "/ai-tools", label: "AI Tools", icon: Bot },
  {
    href: "/field-procedures/nearby-resources",
    label: "Nearby",
    icon: MapPin,
  },
]

// Simple overlay menu without Sheet component to avoid hydration issues
function MobileMenu({ 
  isOpen, 
  onClose, 
  isPro 
}: { 
  isOpen: boolean
  onClose: () => void
  isPro: boolean
}) {
  const router = useRouter()
  
  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth)
      onClose()
      router.push('/')
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }, [router, onClose])

  const handleLinkClick = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80" 
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-background border-r shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={handleLinkClick}
          >
            <Flame className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">
                Florida Shield
              </span>
              {isPro && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs w-fit">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* AI Assistant Tools */}
            <div>
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md mb-2">
                <Bot className="h-4 w-4" />
                AI Assistant Tools
              </h3>
              <div className="space-y-1 ml-2">
                <Link
                  href="/reporting-development/ai-charge-assistant"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  AI Charge Assistant
                </Link>
                <Link
                  href="/ai-legal-advisor"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  AI Legal Advisor
                </Link>
                <Link
                  href="/reporting-development/ai-report-writer"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  AI Report Assistant
                </Link>
              </div>
            </div>

            {/* Emergency Response */}
            <div>
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md mb-2">
                Emergency Response
              </h3>
              <div className="space-y-1 ml-2">
                <Link
                  href="/emergency-response/baker-act-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Baker Act Procedures
                </Link>
                <Link
                  href="/emergency-response/first-aid-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Field First Aid Guide
                </Link>
                <Link
                  href="/emergency-response/hazmat-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  HAZMAT Response Guide
                </Link>
              </div>
            </div>

            {/* Field Operations */}
            <div>
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md mb-2">
                Field Operations
              </h3>
              <div className="space-y-1 ml-2">
                <Link
                  href="/field-procedures/crime-scene-management"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Crime Scene Management
                </Link>
                <Link
                  href="/field-procedures/domestic-violence-protocol"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Domestic Violence Protocol
                </Link>
                <Link
                  href="/field-procedures/evidence-management-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Evidence Management
                </Link>
              </div>
            </div>

            {/* Legal Reference */}
            <div>
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md mb-2">
                <Scale className="h-4 w-4" />
                Legal Reference
              </h3>
              <div className="space-y-1 ml-2">
                <Link
                  href="/legal-reference/statutes"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Florida Statutes
                </Link>
                <Link
                  href="/legal-reference/case-law"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Case Law Database
                </Link>
                <Link
                  href="/legal-reference/constitutional-law-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Constitutional Law
                </Link>
              </div>
            </div>

            {/* Quick Tools */}
            <div>
              <h3 className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-foreground/80 bg-muted/30 rounded-md mb-2">
                Quick Tools
              </h3>
              <div className="space-y-1 ml-2">
                <Link
                  href="/notes"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Digital Field Notes
                </Link>
                <Link
                  href="/field-translation-guide"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Field Translator
                </Link>
                <Link
                  href="/wellness"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors hover:bg-accent text-foreground"
                >
                  Wellness Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 rounded-md text-foreground hover:bg-muted w-full transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isPro, mounted: subscriptionMounted } = useSubscription()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = useCallback((href: string) => {
    if (!mounted) return false
    if (href === "/dashboard" || href === "/ai-tools") return pathname === href
    if (href === "/field-procedures/nearby-resources") return pathname.startsWith(href)
    return pathname.startsWith(href)
  }, [mounted, pathname])

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 shadow-lg">
        <div className="h-16 flex justify-around items-center">
          {mainNavItems.map((item) => (
            <div
              key={item.href}
              className="flex flex-col items-center justify-center text-muted-foreground w-full h-full"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center text-muted-foreground w-full h-full">
            <Menu className="h-6 w-6" />
            <span className="text-xs">More</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50 shadow-lg">
        {/* Pro Status Bar */}
        {subscriptionMounted && isPro && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-1">
            <div className="flex items-center justify-center gap-2 text-white text-xs font-medium">
              <Crown className="w-3 h-3" />
              <span>Shield FL Pro Active</span>
            </div>
          </div>
        )}

        {/* Navigation Bar */}
        <div className="h-16 flex justify-around items-center">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-all duration-200 active:scale-95 active:bg-accent/20 rounded-lg",
                isActive(item.href) && "text-primary bg-primary/5"
              )}
            >
              <item.icon className={cn(
                "h-6 w-6 transition-all duration-200",
                isActive(item.href) && "scale-110"
              )} />
              <span className={cn(
                "text-xs transition-all duration-200",
                isActive(item.href) && "font-medium"
              )}>{item.label}</span>
            </Link>
          ))}
          
          {/* More Menu Button */}
          <button
            type="button"
            onClick={handleMenuToggle}
            className="flex flex-col items-center justify-center text-muted-foreground w-full h-full relative transition-all duration-300"
            aria-label="Open full menu"
          >
            <Menu className="h-6 w-6 transition-all duration-300" />
            <span className="text-xs transition-all duration-300">More</span>
            {subscriptionMounted && isPro && (
              <div className="absolute -top-1 -right-1">
                <Crown className="w-3 h-3 text-amber-500" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={handleMenuClose} 
        isPro={subscriptionMounted && isPro} 
      />
    </>
  )
})
