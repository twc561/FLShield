
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
  ChevronRight,
  Heart,
  HeartPulse,
  Shield,
  Siren,
  ShieldCheck,
  ClipboardEdit,
  Lock,
  Search,
  GraduationCap,
  Download,
  CreditCard,
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

// Hardcoded menu sections to avoid hydration issues
const mobileMenuSections = [
  {
    label: "AI Assistant Tools",
    icon: Bot,
    items: [
      { href: "/reporting-development/ai-charge-assistant", label: "AI Charge Assistant", icon: Shield },
      { href: "/ai-legal-advisor", label: "AI Legal Advisor", icon: Shield },
      { href: "/reporting-development/ai-report-writer", label: "AI Report Assistant", icon: ClipboardEdit },
    ]
  },
  {
    label: "Emergency Response",
    icon: Siren,
    items: [
      { href: "/emergency-response/baker-act-guide", label: "Baker Act Procedures", icon: Heart },
      { href: "/emergency-response/first-aid-guide", label: "Field First Aid Guide", icon: HeartPulse },
      { href: "/emergency-response/hazmat-guide", label: "HAZMAT Response Guide", icon: Shield },
    ]
  },
  {
    label: "Field Operations",
    icon: ShieldCheck,
    items: [
      { href: "/field-procedures/crime-scene-management", label: "Crime Scene Management", icon: Shield },
      { href: "/field-procedures/domestic-violence-protocol", label: "Domestic Violence Protocol", icon: Shield },
      { href: "/field-procedures/evidence-management-guide", label: "Evidence Management", icon: ClipboardEdit },
    ]
  },
  {
    label: "Legal Reference",
    icon: Scale,
    items: [
      { href: "/legal-reference/statutes", label: "Florida Statutes", icon: Scale },
      { href: "/legal-reference/case-law", label: "Case Law Database", icon: Scale },
      { href: "/legal-reference/constitutional-law-guide", label: "Constitutional Law", icon: Shield },
    ]
  },
  {
    label: "Quick Tools",
    icon: Search,
    items: [
      { href: "/notes", label: "Digital Field Notes", icon: ClipboardEdit },
      { href: "/field-translation-guide", label: "Field Translator", icon: Bot },
      { href: "/wellness", label: "Wellness Resources", icon: Heart },
    ]
  }
]

// Simple mobile menu component
function MobileMenuDrawer({ 
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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-[100] md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background border-r shadow-2xl z-[101] flex flex-col md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <Flame className="w-6 h-6 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-base text-foreground">
                Florida Shield
              </span>
              {isPro && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 text-xs w-fit mt-1">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 space-y-6">
            {mobileMenuSections.map((section) => (
              <div key={section.label} className="space-y-2">
                <h3 className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-muted-foreground">
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-accent text-foreground group"
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Subscription Section */}
            {!isPro && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Account
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/subscription"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-accent text-foreground group"
                  >
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span className="flex-1">Upgrade to Pro</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-background">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
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
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="h-16 flex justify-around items-center animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center w-full h-full">
              <div className="w-6 h-6 bg-muted rounded" />
              <div className="w-8 h-3 bg-muted rounded mt-1" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
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
        <div className="h-16 flex justify-around items-center bg-background">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors",
                isActive(item.href) && "text-primary"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}

          {/* More Button */}
          <button
            type="button"
            onClick={handleMenuToggle}
            className="flex flex-col items-center justify-center text-muted-foreground w-full h-full transition-colors relative"
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs mt-1">More</span>
            {subscriptionMounted && isPro && (
              <div className="absolute -top-1 -right-1">
                <Crown className="w-3 h-3 text-amber-500" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenuDrawer 
        isOpen={isMenuOpen} 
        onClose={handleMenuClose} 
        isPro={subscriptionMounted && isPro} 
      />
    </>
  )
})
