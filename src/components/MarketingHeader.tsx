'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Flame } from 'lucide-react'

export function MarketingHeader() {
  const router = useRouter()

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <Flame className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Florida Shield</h1>
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
        <Link href="/for-agencies" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">For Agencies</Link>
        <Link href="/security" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Security</Link>
        <Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Support</Link>
        <Button onClick={() => router.push('/login')}>
          App Login
        </Button>
      </nav>
      <Button onClick={() => router.push('/login')} className="md:hidden">Login</Button>
    </header>
  )
}
