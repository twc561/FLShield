"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppMenuContent } from "./AppMenuContent"
import { usePathname } from "next/navigation"
import { Flame, Home, Search, User, Shield } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { setOpen } = useSidebar()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  const handleMoreNavigate = () => {
    setIsMoreOpen(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="flex h-16 items-center justify-around border-t bg-background px-4">
        <Link
          href="/dashboard"
          onClick={handleLinkClick}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            <span className="text-xs font-medium">Dashboard</span>
          </Button>
        </Link>

        <Link href="/favorites">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-medium">Favorites</span>
          </Button>
        </Link>

        <Link href="/ai-legal-advisor">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs font-medium">AI Advisor</span>
          </Button>
        </Link>

        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-xs font-medium">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] flex flex-col bg-background/95 backdrop-blur-sm border-t z-[100]">
            <div className="flex-shrink-0 pb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="pr-4">
                  <AppMenuContent onLinkClick={handleMoreNavigate} />
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}