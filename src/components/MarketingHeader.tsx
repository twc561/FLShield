
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Flame, Menu } from 'lucide-react'

const navLinks = [
  { href: "/for-officers", label: "For Officers" },
  { href: "/agency-intelligence", label: "For Agencies" },
  { href: "/features", label: "Features" },
  { href: "/security", label: "Security" },
  { href: "/support", label: "Support" },
];

export function MarketingHeader() {
  const router = useRouter()

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Flame className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Florida Shield</h1>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4 items-center">
        {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
            </Link>
        ))}
        <Button onClick={() => router.push('/login')}>
          App Login
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
                <SheetTitle className="text-left">
                    <Link href="/" className="flex items-center gap-2">
                        <Flame className="w-6 h-6 text-primary" />
                        <span className="text-xl font-bold">Florida Shield</span>
                    </Link>
                </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 pt-10">
              {navLinks.map(link => (
                <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left">
                        {link.label}
                    </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button onClick={() => router.push('/login')} className="w-full mt-4">
                    App Login
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
